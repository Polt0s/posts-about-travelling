import create from 'zustand';

import { createPostApi, removePostApi, updatePostApi } from 'pages/api/ApiService';

import type { IPost } from 'types';

interface IPostState {
    postList: IPost[];
    getAllPosts: (post: IPost[]) => void;
    fetchAddNewPost: (data: IPost) => void;
    fetchUpdatePost: (post: IPost, id: string) => void;
    fetchRemovePost: (id: string) => void;
}

export const usePostStore = create<IPostState>()((set, get) => ({
    postList: [],
    getAllPosts: (posts) => set(() => ({ postList: posts })),
    fetchAddNewPost: async (data) => {
        const getPost = await createPostApi(data);
        set({ postList: [getPost, ...get().postList] });
    },
    fetchUpdatePost: async (post, id) => {
        const getUpdatePost = await updatePostApi(post, id);
        set({ postList: get().postList.map((item) => item.id === id ? getUpdatePost : item) });
    },
    fetchRemovePost: async (id) => {
        await removePostApi(id);
        set({ postList: get().postList.filter((post) => post.id !== id) });
    },
}));
