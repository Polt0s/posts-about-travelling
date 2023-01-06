import { axiosBase } from './config';

import type { IComment, IPost } from 'types';
import type { OutputData } from '@editorjs/editorjs';

type CreatePostDto = {
    title: string;
    body: OutputData['blocks'];
};

export const getAllPostsApi = async () => {
    try {
        const response = await axiosBase.get<IPost[]>('/api/posts/getAllPosts');

        return response.data;
    } catch (error) {
        throw new Error(`Failed get all posts ${error}`);
    }
};

export const createPostApi = async (data: CreatePostDto) => {
    try {
        const response = await axiosBase.post<IPost>('/api/posts/createPost', data);
        return response.data;
    } catch (error) {
        throw new Error(`Failed create post ${error}`);
    }
};

export const getOnePostApi = async (id: string) => {
    try {
        const response = await axiosBase.get<IPost[]>(`/api/posts/getOnePost?id=${id}`);

        return response.data;
    } catch (error) {
        throw new Error(`Failed get one post ${error}`);
    }
};

export const updatePostApi = async (data: CreatePostDto, id: string) => {
    try {
        const response = await axiosBase.put<IPost>(`/api/posts/updatePost?id=${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error(`Failed update post ${error}`);
    }
};

export const removePostApi = async (id: string) => {
    try {
        const response = await axiosBase.delete<void>(`/api/posts/removePost?id=${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed remove post ${error}`);
    }
};

type CreateCommentDto = {
    text: string;
    postId?: string;
    id: string;
}

export const createCommentApi = async (data: CreateCommentDto) => {
    try {
        const response = await axiosBase.post<CreateCommentDto>('/api/comments/createComment', data);

        return response.data;
    } catch (error) {
        throw new Error(`Failed create comment ${error}`);
    }
};

export const getAllCommentsApi = async (postId: string) => {
    try {
        const response = await axiosBase.get<IComment[]>(`/api/comments/getAllComments?id=${postId}`);

        return response.data;
    } catch (error) {
        throw new Error(`Failed create comment ${error}`);
    }
};

export const updateCommentApi = async (data: CreateCommentDto, id: string) => {
    try {
        const response = await axiosBase.put<CreateCommentDto>(`/api/comments/updateComment?id=${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error(`Failed update comment ${error}`);
    }
};

export const removeCommentApi = async (id: string) => {
    try {
        const response = await axiosBase.delete<void>(`/api/comments/removeComment?id=${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed remove comment ${error}`);
    }
};
