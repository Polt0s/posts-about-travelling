import React, { useEffect } from 'react';

import { FullPost } from 'components';
import { commentsAPI, postsAPI } from 'apiService';
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

    const { data: post } = await postsAPI.getOnePost(String(id));
    const { data: comments } = await commentsAPI.getAllComments(String(id));

    return {
        props: { post, comments },
    };
};

export default FullPostPage;
