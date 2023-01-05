import React, { useId } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';

interface IEditor {
    onChange: (blocks: OutputData['blocks']) => void;
    initialBlocks: OutputData['blocks'];
}

export const Editor: React.FC<IEditor> = ({ onChange, initialBlocks }) => {
    const holder = useId();

    React.useEffect(() => {
        const editor = new EditorJS({
            holder,
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
    }, []);

    return <div id={holder} />;
};
