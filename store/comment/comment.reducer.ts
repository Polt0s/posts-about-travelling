import create from 'zustand';

import { commentsAPI } from 'apiService';

import type { IComment } from 'types';

interface ICommentState {
    commentList: IComment[];
    isLoading: boolean;
    getAllComment: (comment: IComment[]) => void;
    fetchAddNewComment: (data: IComment) => void;
    fetchUpdateComment: (comment: IComment, id: string) => void;
    fetchRemoveComment: (id: string) => void;
}

export const useCommentStore = create<ICommentState>()((set, get) => ({
    commentList: [],
    isLoading: false,
    getAllComment: (comments) => set(() => ({ commentList: comments })),
    fetchAddNewComment: async (data) => {
        const { data: getComment } = await commentsAPI.postCreateComment(data);
        set({ commentList: [...get().commentList, getComment] });
    },
    fetchUpdateComment: async (comment, id) => {
        get().isLoading = true;
        const { data: getUpdateComment } = await commentsAPI.putUpdateComment({ comment, id })
            .then((response) => {
                get().isLoading = false;
                return response;
            });
        set({ commentList: get().commentList.map((item) => item.id === id ? getUpdateComment : item) });
    },
    fetchRemoveComment: async (id) => {
        await commentsAPI.deleteComment(id);
        set({ commentList: get().commentList.filter((comment) => comment.id !== id) });
    },
}));
