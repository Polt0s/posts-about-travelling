import {
    Row,
    Typography,
    Image,
    Breadcrumb
} from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { ShortComment, CreateComment } from 'components/Comment';
import { cutString } from 'utils';

import styles from './FullPost.module.css';

import type { IComment, IPost } from 'types';

interface IFullPost {
    post: IPost;
    comments: IComment[];
}

const EditorJs = dynamic(() => import('components/Editor').then((res) => res.Editor), { ssr: false });

export const FullPost = ({
    post,
    comments
}: IFullPost): JSX.Element => {
    const { Title, Text } = Typography;

    return (
        <>
            <Breadcrumb className={styles['Navigation']}>
                <Breadcrumb.Item>
                    <Link href="/">Main</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {cutString(post.title, 0, 20)}
                </Breadcrumb.Item>
            </Breadcrumb>

            <div className={styles['Container']}>
                <Row justify="start" className={styles['FullPost-blocks']}>
                    <div className={styles['FullPost-blocks__content']}>
                        <Title level={1}>
                            {post.title}
                        </Title>

                        <Text className={styles['Text-content']}>
                            {post.description}
                        </Text>

                        <Row className={styles['Image-block']}>
                            <Image
                                width="100%"
                                height="22rem"
                                preview={false}
                                src={String(post.imageUrl)}
                                alt="test1"

                            />
                        </Row>

                        <div className={styles['Text-content']}>
                            <EditorJs
                                initialBlocks={post.body || []}
                                onChange={() => console.log}
                                readOnly={true}
                            />
                        </div>
                    </div>
                </Row>

                <Row justify="start" className={styles['FullPost-blocks']}>
                    <div className={styles['FullPost-blocks__content']}>
                        <Title level={3}>{comments.length} comments</Title>

                        <CreateComment postId={post.id} />

                        {comments.map((item) => (
                            <ShortComment
                                id={item.id}
                                key={item.id}
                                user={item.user}
                                text={item.text}
                                createdAt={item.createdAt}
                            />
                        ))}
                    </div>
                </Row>
            </div>
        </>
    );
};
