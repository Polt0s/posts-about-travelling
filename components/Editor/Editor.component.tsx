import React, { useId } from 'react';
import EditorJS from '@editorjs/editorjs';

import styles from './Editor.module.css';

import type { OutputData } from '@editorjs/editorjs';

interface IEditor {
    onChange: (blocks: OutputData['blocks']) => void;
    initialBlocks: OutputData['blocks'];
    readOnly: boolean;
}

export const Editor: React.FC<IEditor> = ({ onChange, initialBlocks, readOnly }): JSX.Element => {
    const holder = useId();

    React.useEffect(() => {
        const editor = new EditorJS({
            holder,
            data: {
                blocks: initialBlocks
            },
            minHeight: 0,
            readOnly,
            placeholder: 'Enter text your post',
            async onChange() {
                const { blocks } = await editor.save();
                onChange(blocks);
            },
        });

        return () => {
            editor.isReady
                .then(() => {
                    editor.destroy();
                })
                .catch((e) => console.error('ERROR editor cleanup', e));
        };
    }, []);

    return <div id={holder} className={styles['Editor']} />;
};
