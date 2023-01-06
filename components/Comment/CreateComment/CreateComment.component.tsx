import React, { useState } from 'react';
import { Button, Input, Row } from 'antd';
import { v4 as uuidV4 } from 'uuid';

import { useCommentStore } from 'store';

import styles from './CreateComment.module.css';

interface ICreateComment {
    postId: string;
}

export const CreateComment = ({ postId }: ICreateComment): JSX.Element => {
    const [text, setText] = useState('');

    const { fetchAddNewComment } = useCommentStore((state) => state);

    const onSubmitComment = async () => {
        fetchAddNewComment({
            text,
            id: uuidV4(),
            postId,
            createdAt: new Date().toLocaleDateString('en-US'),
        });
        setText('');
    };

    return (
        <div className={styles['Comment-block']}>
            <Input.TextArea
                rows={3}
                placeholder="Write a comment ..."
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setText(event.target.value)}
                value={text}
                bordered={false}
                autoSize={true}
            />

            <Row justify="end" className={styles['Comment-block__button']}>
                <Button
                    size="large"
                    type="primary"
                    onClick={onSubmitComment}
                    disabled={!text.length}
                >
                    Send
                </Button>
            </Row>
        </div>
    );
};
