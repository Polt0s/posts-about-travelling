import { useEffect } from 'react';
import Head from 'next/head';
import { Row, Space } from 'antd';

import { ShortPost } from 'components';
import { usePostStore } from 'store';

import { getAllPostsApi } from './api/ApiService';

import type { IPost } from 'types';

interface IHome {
    posts: IPost[];
}

export default function Home({ posts }: IHome) {
    const { getAllPosts, postList } = usePostStore((state) => state);

    useEffect(() => {
        if (posts) {
            getAllPosts(posts);
        }
    }, [getAllPosts, posts]);

    return (
        <>
            <Head>
                <title>posts-about-travelling</title>
                <meta name="description" content="Interesting posts for travelers" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Row justify="center">
                <Space direction="vertical" className="Post-container">
                    {postList.map((post) => (
                        <ShortPost
                            key={post.id}
                            id={post.id}
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

Home.getInitialProps = async () => {
    const response = await getAllPostsApi();

    return { posts: response };
};
