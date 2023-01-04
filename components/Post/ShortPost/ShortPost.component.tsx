import { useState } from 'react';
import { Card, Dropdown, Typography } from 'antd';
import Link from 'next/link';

import { DeletePost } from '../DeletePost';
import { CreatePost } from '../CreatePost';

import styles from './Post.module.css';

import type { IPost } from 'types';

export const ShortPost = ({
    _id,
    title,
    description,
    body,
    imageUrl
}: IPost): JSX.Element => {
    const { Title, Text } = Typography;
    const [open, setOpen] = useState(false);

    return (
        <Card bordered className={styles['Post']}>
            <div className={styles['Post-navigation']}>
                <Text>Author</Text>

                <Dropdown
                    placement="bottomRight"
                    trigger={['click']}
                    onOpenChange={() => setOpen(!open)}
                    open={open}
                    dropdownRender={(menu) => (
                        <div className={styles['Dropdown']}>
                            <div className={styles['Dropdown__item']} onClick={() => setOpen(false)}>
                                <CreatePost tag="update" data={{ title, body, _id }} />
                            </div>

                            <div className={styles['Dropdown__item']} onClick={() => setOpen(false)}>
                                <DeletePost id={_id} />
                            </div>
                        </div>
                    )}
                >
                    <span className={styles['Post-navigation__dropdown']}>...</span>
                </Dropdown>
            </div>

            <Link href={`/post/${_id}`}>
                <Title level={3}>{title}</Title>
            </Link>
            <Text>{description}</Text>
        </Card>
    );
};
