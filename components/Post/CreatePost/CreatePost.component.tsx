import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Input,
    Modal,
    Typography
} from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { createPost, updatePostApi } from 'pages/api/ApiService';

import styles from './CreatePost.module.css';

import type { IPost } from 'types';

const EditorJs = dynamic(() => import('./Editor.component').then((res) => res.Editor), { ssr: false });

interface ICreatePost {
    data?: IPost;
    onClick?: () => void;
    tag: 'create' | 'update';
}

export const CreatePost = ({ data, tag, onClick }: ICreatePost): JSX.Element => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState(data?.title || '');
    const [blocks, setBlocks] = useState(data?.body || []);
    const [openModal, setOpenModal] = useState(false);

    const onAddPost = async (event: any) => {
        event.preventDefault();

        try {
            setIsLoading(true);
            const dataPost = {
                title,
                body: blocks,
            };
            if (!data) {
                const post = await createPost(dataPost);
                setOpenModal(false);
                // await router.push(`/post/${post._id}`);
            } else {
                await updatePostApi(dataPost, data._id);
                setOpenModal(false);

            }
        } catch (error) {
            console.warn('create post', error);
        } finally {
            setIsLoading(false);
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
                <Typography.Text className={styles['Text-position']} onClick={() => setOpenModal(true)}>
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
                    <Button
                        type="default"
                        key="back"
                        onClick={() => setOpenModal(false)}
                        size="large"
                    >
                        Cancel
                    </Button>,
                    <Button
                        type="primary"
                        key="submit"
                        onClick={onAddPost}
                        size="large"
                        disabled={isLoading || !blocks.length || !title}
                    >
                        {!data ? 'Publish' : 'Save'}
                    </Button>
                ]}
            >
                <div className={styles['Editor']}>
                    <div className={styles['Editor__title']}>
                        <Input
                            value={title}
                            placeholder="Header"
                            bordered={false}
                            size="large"
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </div>

                    <EditorJs
                        initialBlocks={data?.body || []}
                        onChange={(array) => setBlocks(array)}
                    />
                </div>
            </Modal>

        </>
    );
};
