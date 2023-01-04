import { axiosBase } from './config';

import type { IPost } from 'types/Post';
import type { OutputData } from '@editorjs/editorjs';

type CreatePostDto = {
    title: string;
    body: OutputData['blocks'];
};

export const getAllPosts = async () => {
    try {
        const response = await axiosBase.get<IPost[]>('/api/posts/getAllPosts');

        return response.data;
    } catch (error) {
        throw new Error(`Failed get all posts ${error}`);
    }
};

export const createPost = async (data: CreatePostDto) => {
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
        const response = await axiosBase.put<void>(`/api/posts/updatePost?id=${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error(`Failed update post ${error}`);
    }
};

export const removePost = async (id: string) => {
    try {
        const response = await axiosBase.delete<void>(`/api/posts/removePost?id=${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed remove post ${error}`);
    }
};
