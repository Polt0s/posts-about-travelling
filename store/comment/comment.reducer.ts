import create from 'zustand';

import { createCommentApi, updateCommentApi, removeCommentApi } from 'pages/api/ApiService';

import type { IComment } from 'types';

interface ICommentState {
    commentList: IComment[];
    getAllComment: (comment: IComment[]) => void;
    fetchAddNewComment: (data: IComment) => void;
    fetchUpdateComment: (comment: IComment, id: string) => void;
    fetchRemoveComment: (id: string) => void;
}

export const useCommentStore = create<ICommentState>()((set, get) => ({
    commentList: [],
    getAllComment: (comments) => set(() => ({ commentList: comments })),
    fetchAddNewComment: async (data) => {
        const getComment = await createCommentApi(data);
        set({ commentList: [...get().commentList, getComment] });
    },
    fetchUpdateComment: async (comment, id) => {
        const getUpdateComment = await updateCommentApi(comment, id);
        set({ commentList: get().commentList.map((item) => item.id === id ? getUpdateComment : item) });
    },
    fetchRemoveComment: async (id) => {
        await removeCommentApi(id);
        set({ commentList: get().commentList.filter((comment) => comment.id !== id) });
    },
}));
