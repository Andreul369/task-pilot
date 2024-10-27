/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { $createCodeNode } from '@lexical/code';
import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { mergeRegister } from '@lexical/utils';
import {
  $createParagraphNode,
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
import {
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListChecks,
  ListOrdered,
  Quote,
  ScrollText,
} from 'lucide-react';

import * as Icons from '@/components/icons/icons';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui';

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

  const [selectedTextFormat, setSelectedTextFormat] = useState('Normal');
  // const [isItalic, setIsItalic] = useState(false);
  // const [isUnderline, setIsUnderline] = useState(false);
  // const [isStrikethrough, setIsStrikethrough] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      // setIsItalic(selection.hasFormat('italic'));
      // setIsUnderline(selection.hasFormat('underline'));
      // setIsStrikethrough(selection.hasFormat('strikethrough'));
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
      {/* Text format */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <ScrollText className="mr-2 size-4" />
            {selectedTextFormat}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onSelect={() => {
                editor.update(() => {
                  const selection = $getSelection();
                  if ($isRangeSelection(selection)) {
                    $setBlocksType(selection, () => $createParagraphNode());
                  }
                });
                setSelectedTextFormat('Normal');
              }}
            >
              <ScrollText className="mr-2 size-4" />
              <span>Normal</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                editor.update(() => {
                  const selection = $getSelection();
                  if ($isRangeSelection(selection)) {
                    $setBlocksType(selection, () => $createHeadingNode('h1'));
                  }
                });
                setSelectedTextFormat('Heading 1');
              }}
            >
              <Heading1 className="mr-2 size-4" />
              <span>Heading 1</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                editor.update(() => {
                  const selection = $getSelection();
                  if ($isRangeSelection(selection)) {
                    $setBlocksType(selection, () => $createHeadingNode('h2'));
                  }
                });
                setSelectedTextFormat('Heading 2');
              }}
            >
              <Heading2 className="mr-2 size-4" />
              <span>Heading 2</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                editor.update(() => {
                  const selection = $getSelection();
                  if ($isRangeSelection(selection)) {
                    $setBlocksType(selection, () => $createHeadingNode('h3'));
                  }
                });
                setSelectedTextFormat('Heading 3');
              }}
            >
              <Heading3 className="mr-2 size-4" />
              <span>Heading 3</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onSelect={() => {
                editor.dispatchCommand(
                  INSERT_UNORDERED_LIST_COMMAND,
                  undefined,
                );
                setSelectedTextFormat('Bullet List');
              }}
            >
              <List className="mr-2 size-4" />
              <span>Bullet list</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
                setSelectedTextFormat('Numbered List');
              }}
            >
              <ListOrdered className="mr-2 size-4" />
              <span>Numbered List</span>
            </DropdownMenuItem>
            {/* <DropdownMenuItem
              onSelect={() => {
                editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
                setSelectedTextFormat('Check List');
              }}
            >
              <ListChecks className="mr-2 size-4" />
              <span>Check List</span>
            </DropdownMenuItem> */}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={() =>
              editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                  $setBlocksType(selection, () => $createQuoteNode());
                }
              })
            }
          >
            <Quote className="mr-2 size-4" />
            <span>Quote</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() =>
              editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                  if (selection.isCollapsed()) {
                    $setBlocksType(selection, () => $createCodeNode());
                  } else {
                    // Will this ever happen?
                    const textContent = selection.getTextContent();
                    const codeNode = $createCodeNode();
                    selection.insertNodes([codeNode]);
                    selection.insertRawText(textContent);
                  }
                }
              })
            }
          >
            <Code className="mr-2 size-4" />
            <span>Code block</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
      {/* <Toggle
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
      </Toggle> */}
      {/* <Toggle
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
      </Toggle> */}
      {/* <Toggle
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
      </Toggle> */}
      <Divider />

      {/* Text align */}
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
