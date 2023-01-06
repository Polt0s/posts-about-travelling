import { OutputData } from '@editorjs/editorjs';

export interface IPost {
    id: string;
    title: string;
    description?: string;
    imageUrl?: string;
    body: OutputData['blocks'];
    createdAt?: string;
    updatedAt?: string;
}
