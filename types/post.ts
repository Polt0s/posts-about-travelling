import type { OutputData } from '@editorjs/editorjs';
import type { UploadFile } from 'antd/es/upload';

export interface IPost {
    id: string;
    title: string;
    description?: string;
    imageUrl?: UploadFile;
    body: OutputData['blocks'];
}
