import { Row, Typography } from 'antd';

import { ShortComment, CreateComment } from 'components/Comment';

import styles from './FullPost.module.css';

import type { OutputData } from '@editorjs/editorjs';
import type { IComment } from 'types';

interface IFullPost {
    title: string;
    blocks: OutputData['blocks'];
    id: string;
    comments: IComment[];
}

export const FullPost = ({
    title,
    blocks,
    id,
    comments
}: IFullPost): JSX.Element => {
    const { Title, Text } = Typography;

    return (
        <div className={styles['Container']}>
            <Row justify="start" className={styles['FullPost-blocks']}>
                <div className={styles['FullPost-blocks__content']}>
                    <Title level={1}>
                        {title}
                    </Title>

                    <div>
                        {blocks && blocks.map((block) => (
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

                    <CreateComment postId={id} />

                    {comments.map((item) => (
                        <ShortComment
                            key={item._id}
                            user={item.user}
                            text={item.text}
                            _id={item._id}
                        />
                    ))}
                </div>
            </Row>
        </div>
    );
};
