import { SetStateAction, useEffect, useState } from 'react';
import { CodeNode } from '@lexical/code';
import ListPlugin, { ListItemNode, ListNode } from '@lexical/list';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { EditorState } from 'lexical';

import { cn } from '@/utils/cn';
import AddCommentPlugin from './lexical-plugins/add-comment-plugin';
import ToolbarPlugin from './lexical-plugins/toolbar-plugin';
import TreeViewPlugin from './lexical-plugins/tree-view-plugin';

const theme = {
  // Theme styling goes here
  //...s
  code: 'editor-code',
  heading: {
    h1: 'editor-heading-h1',
    h2: 'editor-heading-h2',
    h3: 'editor-heading-h3',
  },
  image: 'editor-image',
  link: 'editor-link',
  list: {
    listitem: 'editor-listitem',
    nested: {
      listitem: 'editor-nested-listitem',
    },
    ol: 'editor-list-ol',
    ul: 'editor-list-ul',
  },
  ltr: 'ltr',
  paragraph: 'editor-paragraph',
  placeholder: 'editor-placeholder',
  quote: 'editor-quote',
  rtl: 'rtl',
  text: {
    bold: 'editor-text-bold',
    code: 'editor-text-code',
    hashtag: 'editor-text-hashtag',
    italic: 'editor-text-italic',
    overflowed: 'editor-text-overflowed',
    strikethrough: 'editor-text-strikethrough',
    underline: 'editor-text-underline',
    underlineStrikethrough: 'editor-text-underlineStrikethrough',
  },
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error);
}

interface ILexicalEditor {
  className?: string;
}

export function LexicalEditor({ className }: ILexicalEditor) {
  const editorConfig = {
    namespace: 'Editor',
    nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode, CodeNode],
    // Handling of errors during update
    onError(error: Error) {
      throw error;
    },
    // The editor theme
    theme: theme,
  };

  const [editorState, setEditorState] = useState();
  function onChange(editorState: SetStateAction<undefined>) {
    setEditorState(editorState);
    console.log(editorState);
  }

  const placeholder = 'Enter some rich text...';
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className={cn('relative bg-muted', className)}>
        <ToolbarPlugin />
        <div className="relative bg-muted">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="min-h-40 px-3 py-2"
                aria-placeholder={placeholder}
                placeholder={
                  <p className="editor-placeholder">{placeholder}</p>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
        </div>
      </div>
      <AddCommentPlugin />
      <TreeViewPlugin />
    </LexicalComposer>
  );
}
