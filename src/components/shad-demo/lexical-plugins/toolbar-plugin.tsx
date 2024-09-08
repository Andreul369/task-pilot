/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';

import * as Icons from '@/components/icons/icons';
import { Button, Toggle, ToggleGroup, ToggleGroupItem } from '@/components/ui';

const LowPriority = 1;

function Divider() {
  return <div className="divider border-r" />;
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, $updateToolbar]);

  return (
    <div className="flex border-b" ref={toolbarRef}>
      <Button
        aria-label="Undo"
        size="sm"
        variant="ghost"
        disabled={!canUndo}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
      >
        <Icons.Undo />
      </Button>
      <Button
        aria-label="Redo"
        size="sm"
        variant="ghost"
        disabled={!canRedo}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
      >
        <Icons.Redo />
      </Button>

      <Divider />
      <Toggle
        aria-label="Format Bold"
        size="sm"
        pressed={isBold}
        onPressedChange={(
          pressed: boolean | ((prevState: boolean) => boolean),
        ) => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
          setIsBold(pressed);
        }}
      >
        <Icons.Bold />
      </Toggle>
      <Toggle
        aria-label="Format Italics"
        size="sm"
        pressed={isItalic}
        onPressedChange={(
          pressed: boolean | ((prevState: boolean) => boolean),
        ) => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
          setIsItalic(pressed);
        }}
      >
        <Icons.Italic />
      </Toggle>
      <Toggle
        aria-label="Format Underline"
        size="sm"
        pressed={isUnderline}
        onPressedChange={(
          pressed: boolean | ((prevState: boolean) => boolean),
        ) => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
          setIsUnderline(pressed);
        }}
      >
        <Icons.Underline />
      </Toggle>
      <Toggle
        aria-label="Format Strikethrough"
        size="sm"
        pressed={isStrikethrough}
        onPressedChange={(
          pressed: boolean | ((prevState: boolean) => boolean),
        ) => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
          setIsStrikethrough(pressed);
        }}
      >
        <Icons.Strikethrough />
      </Toggle>
      <Divider />
      <ToggleGroup
        type="single"
        onValueChange={(value) => {
          if (value === 'left')
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');

          if (value === 'center')
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');

          if (value === 'right')
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');

          if (value === 'justify')
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
        }}
      >
        <ToggleGroupItem value="left" aria-label="Left Align">
          <Icons.AlignLeft />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Center Align">
          <Icons.AlignCenter />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Right Align">
          <Icons.AlignRight />
        </ToggleGroupItem>
        <ToggleGroupItem value="justify" aria-label="Justify Align">
          <Icons.AlignJustify />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
