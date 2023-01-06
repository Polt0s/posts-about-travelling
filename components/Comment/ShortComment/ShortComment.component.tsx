import Image from 'next/image';
import React, { useState } from 'react';
import {
    Row,
    Typography,
    Col,
    Dropdown,
    Input,
    Button
} from 'antd';

import avatarTest from 'public/testAvatar.png';
import { ModalDelete } from 'components/ModalDelete';
import { useCommentStore } from 'store';

import styles from './ShortComment.module.css';

import type { IComment } from 'types';

export const ShortComment = ({
    user,
    text,
    createdAt,
    id
}: IComment): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [dataText, setDataText] = useState<string>(text);

    const { fetchRemoveComment, fetchUpdateComment } = useCommentStore((state) => state);

    const handleEditComment = () => {
        setIsEdit(true);
        setOpen(false);
    };

    const onUpdateComment = async () => {
        fetchUpdateComment({ text: dataText, id }, id);
        setIsEdit(false);
    };

    return (
        <div className={styles['ShortComment']}>
            <Row justify="space-between" className={styles['ShortComment__header']}>
                <Row align="middle" className={styles['Info']}>
                    <Image
                        width={40}
                        height={40}
                        src={avatarTest}
                        alt={user || ''}
                        className={styles['Info__image']}
                    />

                    <Col>
                        <Row>
                            <Typography.Title level={5}>
                                Marina
                            </Typography.Title>
                        </Row>
                        <Row>
                            <span>{createdAt}</span>
                        </Row>
                    </Col>
                </Row>

                <Dropdown
                    placement="bottomRight"
                    trigger={['click']}
                    onOpenChange={() => setOpen(!open)}
                    open={open}
                    dropdownRender={() => (
                        <div className={styles['Dropdown']}>
                            <div className={styles['Dropdown__item']} onClick={handleEditComment}>
                                <Typography.Text>Edit</Typography.Text>
                            </div>

                            <div className={styles['Dropdown__item']} onClick={() => setOpen(false)}>
                                <ModalDelete
                                    id={id}
                                    content="Are you sure you want to delete the comment?"
                                    func={fetchRemoveComment}
                                />
                            </div>
                        </div>
                    )}
                >
                    <span className={styles['Dropdown__navigation']}>...</span>
                </Dropdown>
            </Row>

            <div>
                {isEdit ? (
                    <>
                        <Input.TextArea
                            value={dataText}
                            bordered={false}
                            autoSize={true}
                            placeholder="Write a comment ..."
                            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                                setDataText(event.target.value)
                            }
                        />
                        <Row justify="end" className={styles['Navigation-buttons']}>
                            <Button
                                type="default"
                                key="back"
                                onClick={() => setIsEdit(false)}
                                size="large"
                            >
                                Cancel
                            </Button>
                            <Button
                                size="large"
                                type="primary"
                                onClick={onUpdateComment}
                                disabled={!dataText.length}
                            >
                                Update
                            </Button>
                        </Row>
                    </>
                ) : (
                    <Typography.Text className={styles['ShortComment__content']}>
                        {text}
                    </Typography.Text>
                )}
            </div>
        </div>
    );
};
