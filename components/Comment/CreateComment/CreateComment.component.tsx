import React, { useState } from 'react';
import { Button, Input, Row } from 'antd';

import { createCommentApi } from 'pages/api/ApiService';

import styles from './CreateComment.module.css';

interface ICreateComment {
    postId: string;
}

export const CreateComment = ({ postId }: ICreateComment): JSX.Element => {
    const [text, setText] = useState('');

    const onSubmitComment = async () => {
        await createCommentApi({ text, postId });
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
