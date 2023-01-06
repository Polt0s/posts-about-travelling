import React, { useEffect } from 'react';

import { FullPost } from 'components';
import { getAllCommentsApi, getOnePostApi } from 'pages/api/ApiService';
import { useCommentStore } from 'store';

import type { GetServerSideProps } from 'next/types';
import type { IComment, IPost } from 'types';

interface IFullPostPage {
    post: IPost;
    comments: IComment[];
};

const FullPostPage = ({ post, comments }: IFullPostPage) => {
    const { commentList, getAllComment } = useCommentStore((state) => state);

    useEffect(() => {
        if (comments) {
            getAllComment(comments);
        }
    }, [comments, getAllComment]);

    return (
        <>
            <FullPost
                post={post}
                comments={commentList}
            />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const id = ctx?.params?.id;

    const response = await getOnePostApi(String(id));
    const getComments = await getAllCommentsApi(String(id));

    return {
        props: { post: response, comments: getComments },
    };
};

export default FullPostPage;
