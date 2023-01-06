import React, { useState } from 'react';
import {
    Button,
    Typography,
    Modal,
    Row
} from 'antd';

import styles from './ModalDelete.module.css';

interface IDeletePost {
    id: string;
    func: (id: string) => void;
    content: string;
}

export const ModalDelete = ({ id, func, content }: IDeletePost): JSX.Element => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const onDeletePost = async () => {
        func(id);
        setOpenModal(false);
    };

    return (
        <>
            <Typography.Text className={styles['Text-position']} onClick={() => setOpenModal(true)}>
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
                    <Typography.Text className={styles['Content']}>
                        {content}
                    </Typography.Text>
                </Row>
            </Modal>
        </>
    );
};
