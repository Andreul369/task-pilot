import { useCallback } from 'react';
import { $generateHtmlFromNodes } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { addCardDescription, upsertCardComment } from '@/actions/cards';
import { Button } from '@/components/ui';
import { useSession } from '@/hooks/use-session';

interface AddCommentPluginProps {
  commentId?: string | undefined;
  cardId: string;
  listId?: string;
  onCancel: () => void;
  mode: 'description' | 'comment';
}

export default function AddCommentPlugin({
  commentId,
  cardId,
  listId,
  onCancel,
  mode,
}: AddCommentPluginProps) {
  const [editor] = useLexicalComposerContext();
  const { session } = useSession();

  const onSubmit = useCallback(async () => {
    try {
      const htmlString = editor.getEditorState().read(() => {
        return $generateHtmlFromNodes(editor, null);
      });

      if (mode === 'description') {
        await addCardDescription(cardId, listId, htmlString);
      } else if (session?.user.id) {
        await upsertCardComment(
          commentId,
          cardId,
          htmlString,
          session?.user.id,
        );
      }

      onCancel();
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  }, [cardId, editor, mode, onCancel, session?.user.id]);

  return (
    <div>
      {/* Display the content as formatted HTML */}
      <div className="space-x-2">
        <Button onClick={onSubmit}>Save</Button>
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
