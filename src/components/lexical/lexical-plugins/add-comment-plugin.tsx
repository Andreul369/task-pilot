import { useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getRoot,
  $getSelection,
  createCommand,
  LexicalCommand,
  LexicalEditor,
} from 'lexical';

import { Button, Textarea } from '@/components/ui';

export default function AddCommentPlugin() {
  const [editor] = useLexicalComposerContext();

  const root = $getRoot;

  const onSubmit = () => {
    console.log('editor::::', editor);
    console.log('root::::::', root);
  };

  return (
    <div>
      {/* Display the content as formatted HTML */}
      <Button onClick={onSubmit}>Log Content</Button>
    </div>
  );
}
