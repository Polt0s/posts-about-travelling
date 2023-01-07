import { Controller } from '../config';

import type { IComment } from 'types';
import type { IGetCommentRequest, IUpdateCommentRequest } from './request.types';

class CommentsController extends Controller {
    public constructor() {
        super({
            requestUrl: '/api/comments/'
        });
    }

    public async getAllComments(postId: string) {
        return this.get<IComment[]>(`getAllComments?id=${postId}`);
    }

    public async postCreateComment(data: IGetCommentRequest) {
        return this.post<IComment>('createComment', data);
    }

    public async putUpdateComment({ comment, id }: IUpdateCommentRequest) {
        return this.put<IComment>(`updateComment?id=${id}`, comment);
    }

    public async deleteComment(id: string) {
        return this.delete<void>(`removeComment?id=${id}`);
    }
}

export const commentsAPI = new CommentsController();
