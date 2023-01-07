export interface IGetCommentRequest {
    text: string;
    postId?: string;
    id: string;
}

export interface IUpdateCommentRequest {
    comment: IGetCommentRequest;
    id: string;
}
