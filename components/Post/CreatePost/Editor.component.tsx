import React from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';

interface EditorProps {
    onChange: (blocks: OutputData['blocks']) => void;
    initialBlocks: OutputData['blocks'];
}

export const Editor: React.FC<EditorProps> = ({ onChange, initialBlocks }) => {
    React.useEffect(() => {
        const editor = new EditorJS({
            holder: 'editor',
            data: {
                blocks: initialBlocks
            },
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
    }, [initialBlocks, onChange]);

    return <div id="editor" />;
};
