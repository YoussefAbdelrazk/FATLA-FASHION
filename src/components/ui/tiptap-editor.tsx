'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableRow } from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Redo,
  Table as TableIcon,
  Underline as UnderlineIcon,
  Undo,
} from 'lucide-react';
import { useCallback, useEffect } from 'react';

interface TipTapEditorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  className?: string;
}

export function TipTapEditor({ value, onChange, label, className }: TipTapEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4',
      },
    },
  });

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt('Image URL');
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const insertTable = useCallback(() => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  const toolbarButtons = [
    {
      icon: Undo,
      action: () => editor.chain().focus().undo().run(),
      title: 'Undo',
      disabled: !editor.can().chain().focus().undo().run(),
    },
    {
      icon: Redo,
      action: () => editor.chain().focus().redo().run(),
      title: 'Redo',
      disabled: !editor.can().chain().focus().redo().run(),
    },
    {
      icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
      title: 'Bold',
      isActive: editor.isActive('bold'),
    },
    {
      icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
      title: 'Italic',
      isActive: editor.isActive('italic'),
    },
    {
      icon: UnderlineIcon,
      action: () => editor.chain().focus().toggleUnderline().run(),
      title: 'Underline',
      isActive: editor.isActive('underline'),
    },
    {
      icon: Code,
      action: () => editor.chain().focus().toggleCode().run(),
      title: 'Code',
      isActive: editor.isActive('code'),
    },
    {
      icon: Quote,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      title: 'Quote',
      isActive: editor.isActive('blockquote'),
    },
    {
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
      title: 'Bullet List',
      isActive: editor.isActive('bulletList'),
    },
    {
      icon: ListOrdered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      title: 'Ordered List',
      isActive: editor.isActive('orderedList'),
    },
    {
      icon: AlignLeft,
      action: () => editor.chain().focus().setTextAlign('left').run(),
      title: 'Align Left',
      isActive: editor.isActive({ textAlign: 'left' }),
    },
    {
      icon: AlignCenter,
      action: () => editor.chain().focus().setTextAlign('center').run(),
      title: 'Align Center',
      isActive: editor.isActive({ textAlign: 'center' }),
    },
    {
      icon: AlignRight,
      action: () => editor.chain().focus().setTextAlign('right').run(),
      title: 'Align Right',
      isActive: editor.isActive({ textAlign: 'right' }),
    },
    {
      icon: LinkIcon,
      action: setLink,
      title: 'Add Link',
      isActive: editor.isActive('link'),
    },
    {
      icon: ImageIcon,
      action: addImage,
      title: 'Add Image',
    },
    {
      icon: TableIcon,
      action: insertTable,
      title: 'Insert Table',
    },
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <div className='flex items-center justify-between'>
        <Label className='text-lg font-semibold'>{label}</Label>
      </div>

      <Card>
        <CardHeader className='pb-3'>
          <div className='flex flex-wrap gap-1'>
            {toolbarButtons.map((button, index) => (
              <Button
                key={index}
                type='button'
                variant={button.isActive ? 'default' : 'outline'}
                size='sm'
                onClick={button.action}
                title={button.title}
                disabled={button.disabled}
                className='h-8 w-8 p-0'
              >
                <button.icon className='h-4 w-4' />
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className='border rounded-md min-h-[300px] focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
            <EditorContent editor={editor} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
