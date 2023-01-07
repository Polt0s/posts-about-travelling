import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Input,
    Modal,
    Row,
    Typography
} from 'antd';
import dynamic from 'next/dynamic';
import { v4 as uuidV4 } from 'uuid';

import { usePostStore } from 'store';

import { UploadImage } from 'components/UploadImage';

import styles from './CreatePost.module.css';

import type { IPost } from 'types';
import type { UploadFile } from 'antd';

const EditorJs = dynamic(() => import('components/Editor').then((res) => res.Editor), { ssr: false });

interface ICreatePost {
    data?: IPost;
    tag: 'create' | 'update';
}

export const CreatePost = ({ data, tag }: ICreatePost): JSX.Element => {
    const [statePost, setStatePost] = useState({
        title: data?.title || '',
        description: data?.description || '',
        blocks: data?.body || [],
    });
    const [openModal, setOpenModal] = useState(false);
    const [file, setFile] = useState<UploadFile>();

    const { fetchUpdatePost, fetchAddNewPost } = usePostStore((state) => state);

    const onAddPost = (event: React.ChangeEvent<EventTarget>) => {
        event.preventDefault();

        const dataPost = {
            title: statePost.title,
            description: statePost.description,
            body: statePost.blocks,
        };

        if (!data) {
            fetchAddNewPost({
                ...dataPost,
                id: uuidV4(),
                imageUrl: file,
            });
            setStatePost(({ title: '', description: '', blocks: [] }));
            setOpenModal(false);
        } else {
            fetchUpdatePost({
                ...dataPost,
                id: data.id
            }, data.id);
            setOpenModal(false);
        }
    };

    return (
        <>
            {tag === 'create' ? (
                <Button
                    size="large"
                    icon={<PlusOutlined />}
                    type="primary"
                    onClick={() => setOpenModal(true)}
                >
                    Create post
                </Button>
            ) : (
                <Typography.Text onClick={() => setOpenModal(true)} className={styles['Text-position']}>
                    Update
                </Typography.Text>
            )}
            <Modal
                centered
                open={openModal}
                onOk={() => setOpenModal(false)}
                onCancel={() => setOpenModal(false)}
                width={1000}
                bodyStyle={{ overflowX: 'scroll' }}
                footer={[
                    <div key="upload" className={styles['Modal-footer']}>
                        {tag === 'create' && <UploadImage setFile={setFile} />}
                        <Row justify="end">
                            <Button
                                type="default"
                                key="back"
                                onClick={() => setOpenModal(false)}
                                size="large"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                key="submit"
                                onClick={onAddPost}
                                size="large"
                                disabled={(!statePost.blocks.length || !statePost.title)}
                            >
                                {!data ? 'Publish' : 'Save'}
                            </Button>
                        </Row>
                    </div>
                ]}
            >
                <div className={styles['Editor']}>
                    <div className={styles['Editor__header']}>
                        <Input
                            value={statePost.title}
                            placeholder="Header"
                            bordered={false}
                            size="large"
                            onChange={(event) => setStatePost(prev => ({ ...prev, title: event.target.value }))}
                        />

                        <Input.TextArea
                            maxLength={200}
                            value={statePost.description}
                            placeholder="Short description no more than 120 characters"
                            bordered={false}
                            autoSize={{ minRows: 2, maxRows: 3 }}
                            size="large"
                            onChange={(event) => setStatePost(prev => ({ ...prev, description: event.target.value }))}
                        />
                    </div>

                    <EditorJs
                        initialBlocks={data?.body || []}
                        onChange={(array) => setStatePost(prev => ({ ...prev, blocks: array }))}
                        readOnly={false}
                    />
                </div>
            </Modal>

        </>
    );
};
