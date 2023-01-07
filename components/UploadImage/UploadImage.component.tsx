import { UploadOutlined } from '@ant-design/icons';
import {
    Button,
    message,
    Space,
    Upload
} from 'antd';

import { convertToBase64 } from './UploadImage.helper';

import styles from './UploadImage.module.css';

import type { UploadProps, UploadFile } from 'antd';

interface IUploadImage {
    setFile: (file: UploadFile) => void;
}

export const UploadImage = ({ setFile }: IUploadImage) => {
    const props: UploadProps = {
        name: 'imageUrl',
        maxCount: 1,
        listType: 'picture',
        beforeUpload: async (file) => {
            const isFormat = file.type === 'image/png' || file.type === 'image/jpeg';
            if (!isFormat) {
                message.error(`${file.name} is not a png or jpeg file`);
            }
            const base64 = await convertToBase64(file) as UploadFile;
            setFile(base64);
            return isFormat || Upload.LIST_IGNORE;
        },
        onChange(info) {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <Space direction="vertical" className={styles['Upload']} size="large">
            <Upload {...props}>
                <Button icon={<UploadOutlined />} className={styles['Upload__button']}>
                    Upload Image
                </Button>
            </Upload>
        </Space>
    );
};
