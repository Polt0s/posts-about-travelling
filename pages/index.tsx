import Head from 'next/head';
import { Row, Space } from 'antd';

import { ShortPost } from 'components';

import { getAllPosts } from './api/ApiService';

import type { GetServerSideProps } from 'next/types';
import type { IPost } from 'types/Post';

interface IHome {
    posts: IPost[];
}

export default function Home({ posts }: IHome) {
    return (
        <>
            <Head>
                <title>posts-about-travelling</title>
                <meta name="description" content="Interesting posts for travelers" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Row justify="center">
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    {posts.map((post) => (
                        <ShortPost
                            key={post._id}
                            _id={post._id}
                            title={post.title}
                            description={post.description}
                            imageUrl={post.imageUrl}
                            body={post.body}
                        />
                    ))}
                </Space>
            </Row>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const response = await getAllPosts();

    return {
        props: { posts: response },
    };
};
