import React, { useState } from 'react';
import { Button, Typography, Modal, Row } from 'antd';

import { removePost } from 'pages/api/ApiService';

interface IDeletePost {
    id: string;
}

export const DeletePost = ({ id }: IDeletePost): JSX.Element => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const onDeletePost = async () => {
        await removePost(id);
        setOpenModal(false);
    };

    return (
        <>
            <Typography.Text style={{ width: '100%' }}
                onClick={() => setOpenModal(true)}>
                Delete
            </Typography.Text>

            <Modal
                open={openModal}
                centered
                onCancel={() => setOpenModal(false)}
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
                        danger
                        key="submit"
                        onClick={onDeletePost}
                        size="large"
                    >
                        Delete post
                    </Button>
                ]}
            >
                <Row justify="center">
                    <Typography.Text style={{ margin: '2rem', fontSize: '1rem' }}>
                        Are you sure you want to delete the post?
                    </Typography.Text>
                </Row>
            </Modal>
        </>
    );
};
