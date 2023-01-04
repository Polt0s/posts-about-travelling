import { Row, Typography } from 'antd';

import styles from './FullPost.module.css';

import type { OutputData } from '@editorjs/editorjs';

interface IFullPost {
    title: string;
    blocks: OutputData['blocks'];
}

export const FullPost = ({ title, blocks }: IFullPost): JSX.Element => {
    const { Title, Text } = Typography;

    return (
        <div className={styles['Container']}>
            <Row justify="start" className={styles['FullPost']}>
                <div className={styles['FullPost__content']}>
                    <Title level={1}>
                        {title}
                    </Title>

                    <div>
                        {blocks && blocks.map((block) => (
                            <Text style={{ fontSize: '1.5rem' }} key={block.id}>
                                {block.data.text}
                            </Text>
                        ))}
                    </div>
                </div>
            </Row>

            <Row justify="start" className={styles['FullPost']}>
                <div className={styles['FullPost__content']}>
                    <Title level={2}>20 Comments</Title>
                </div>
            </Row>
        </div>
    );
};
