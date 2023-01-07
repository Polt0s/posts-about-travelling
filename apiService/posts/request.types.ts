import type { OutputData } from '@editorjs/editorjs';

export interface IPostRequest {
    title: string;
    body: OutputData['blocks'];
};

export interface IUpdatePostRequest {
    post: IPostRequest;
    id: string;
}