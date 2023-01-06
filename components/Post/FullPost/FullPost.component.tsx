import { Row, Typography } from 'antd';

import { ShortComment, CreateComment } from 'components/Comment';

import styles from './FullPost.module.css';

import type { IComment, IPost } from 'types';

interface IFullPost {
    post: IPost;
    comments: IComment[];
}

export const FullPost = ({
    post,
    comments
}: IFullPost): JSX.Element => {
    const { Title, Text } = Typography;

    return (
        <div className={styles['Container']}>
            <Row justify="start" className={styles['FullPost-blocks']}>
                <div className={styles['FullPost-blocks__content']}>
                    <Title level={1}>
                        {post.title}
                    </Title>

                    <Text className={styles['Text-content']}>
                        {post.description}
                    </Text>

                    <div>
                        {post.body && post.body.map((block) => (
                            <Text className={styles['Text-content']} key={block.id}>
                                {block.data.text}
                            </Text>
                        ))}
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
    );
};
