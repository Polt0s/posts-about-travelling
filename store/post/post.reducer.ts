import create from 'zustand';

import { postsAPI } from 'apiService';

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
        const { data: getPost } = await postsAPI.postCreatePost(data);
        set({ postList: [getPost, ...get().postList] });
    },
    fetchUpdatePost: async (post, id) => {
        const { data: getUpdatePost } = await postsAPI.putUpdatePost({ post, id });
        set({ postList: get().postList.map((item) => item.id === id ? getUpdatePost : item) });
    },
    fetchRemovePost: async (id) => {
        await postsAPI.deletePost(id);
        set({ postList: get().postList.filter((post) => post.id !== id) });
    },
}));
