import { useState } from 'react';
import {
    Badge,
    Card,
    Dropdown,
    Typography,
    Image,
    Row
} from 'antd';
import Link from 'next/link';

import { ModalDelete } from 'components/ModalDelete';
import { usePostStore } from 'store';

import { CreatePost } from '../CreatePost';

import styles from './ShortPost.module.css';

import type { IPost } from 'types';

export const ShortPost = ({
    id,
    title,
    description,
    body,
    imageUrl
}: IPost): JSX.Element => {
    const { Title, Text } = Typography;
    const [open, setOpen] = useState(false);
    const { fetchRemovePost } = usePostStore((state) => state);

    return (
        <Card bordered className={styles['Post']}>
            <div className={styles['Post-navigation']}>
                <Badge.Ribbon text="Travel" color="purple" />

                <Dropdown
                    placement="bottomRight"
                    trigger={['click']}
                    onOpenChange={() => setOpen(!open)}
                    open={open}
                    dropdownRender={() => (
                        <div className={styles['Dropdown']}>
                            <div className={styles['Dropdown__item']} onClick={() => setOpen(false)}>
                                <CreatePost tag="update" data={{ title, description, body, id, imageUrl }} />
                            </div>

                            <div className={styles['Dropdown__item']} onClick={() => setOpen(false)}>
                                <ModalDelete
                                    id={id}
                                    content="Are you sure you want to delete the post?"
                                    func={fetchRemovePost}
                                />
                            </div>
                        </div>
                    )}
                >
                    <span className={styles['Post-navigation__dropdown']}>...</span>
                </Dropdown>
            </div>

            <Link href={`/post/${id}`}>
                <Title level={3}>{title}</Title>
            </Link>

            <Row>
                <Text className={styles['Post__description']}>
                    {description}
                </Text>
            </Row>

            <Image
                width="100%"
                height="22rem"
                preview={false}
                src={String(imageUrl)}
                alt="test1"
            />
        </Card>
    );
};
