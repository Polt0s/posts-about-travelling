import { Controller } from '../config';

import type { IPost } from 'types';
import type { IPostRequest, IUpdatePostRequest } from './request.types';

class PostsController extends Controller {
    public constructor() {
        super({
            requestUrl: '/api/posts/'
        });
    }

    public async getAllPosts() {
        return this.get<IPost[]>('getAllPosts');
    }

    public async postCreatePost(data: IPostRequest) {
        return this.post<IPost>('createPost', data);
    }

    public async getOnePost(id: string) {
        return this.get<IPost>(`getOnePost?id=${id}`);
    }

    public async putUpdatePost({ post, id }: IUpdatePostRequest) {
        return this.put<IPost>(`updatePost?id=${id}`, post);
    }

    public async deletePost(id: string) {
        return this.delete<void>(`removePost?id=${id}`);
    }
}

export const postsAPI = new PostsController();
