'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import FontSize from '@tiptap/extension-font-size';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { Table } from '@tiptap/extension-table';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableRow } from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Highlighter,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Palette,
  Quote,
  Redo,
  Strikethrough,
  SubscriptIcon,
  SuperscriptIcon,
  Table as TableIcon,
  Type,
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
  isRTL?: boolean;
  language?: 'ar' | 'en';
}

export function TipTapEditor({
  value,
  onChange,
  label,
  className,
  isRTL = false,
  language = 'en',
}: TipTapEditorProps) {
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
      TextStyle,
      Color.configure({
        types: [TextStyle.name],
      }),
      FontFamily.configure({
        types: [TextStyle.name],
      }),
      FontSize.configure({
        types: [TextStyle.name],
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
        defaultAlignment: isRTL ? 'right' : 'left',
      }),
      Underline,
      Highlight.configure({
        multicolor: true,
      }),
      Subscript,
      Superscript,
      Typography,
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
        class: `prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4 ${
          isRTL ? 'rtl' : 'ltr'
        }`,
        dir: isRTL ? 'rtl' : 'ltr',
        lang: language,
        style: isRTL ? 'text-align: right; direction: rtl;' : 'text-align: left; direction: ltr;',
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

  // Arabic font families
  const arabicFonts = [
    { label: 'افتراضي', value: 'default' },
    { label: 'العربية', value: 'Amiri, serif' },
    { label: 'الخط الكوفي', value: 'Scheherazade New, serif' },
    { label: 'الخط النسخ', value: 'Noto Naskh Arabic, serif' },
    { label: 'الخط الرقعة', value: 'Noto Sans Arabic, sans-serif' },
    { label: 'الخط الديواني', value: 'Noto Sans Arabic, sans-serif' },
  ];

  const englishFonts = [
    { label: 'Default', value: 'default' },
    { label: 'Inter', value: 'Inter, sans-serif' },
    { label: 'Serif', value: 'Times New Roman, serif' },
    { label: 'Sans Serif', value: 'Arial, sans-serif' },
    { label: 'Monospace', value: 'Courier New, monospace' },
  ];

  const fontSizes = [
    { label: isRTL ? 'افتراضي' : 'Default', value: 'default' },
    { label: '8px', value: '8px' },
    { label: '10px', value: '10px' },
    { label: '12px', value: '12px' },
    { label: '14px', value: '14px' },
    { label: '16px', value: '16px' },
    { label: '18px', value: '18px' },
    { label: '20px', value: '20px' },
    { label: '24px', value: '24px' },
    { label: '28px', value: '28px' },
    { label: '32px', value: '32px' },
    { label: '36px', value: '36px' },
    { label: '48px', value: '48px' },
  ];

  const colors = [
    { label: isRTL ? 'افتراضي' : 'Default', value: 'default' },
    { label: 'أسود', value: '#000000' },
    { label: 'أحمر', value: '#ef4444' },
    { label: 'أزرق', value: '#3b82f6' },
    { label: 'أخضر', value: '#10b981' },
    { label: 'أصفر', value: '#f59e0b' },
    { label: 'بنفسجي', value: '#8b5cf6' },
    { label: 'برتقالي', value: '#f97316' },
    { label: 'وردي', value: '#ec4899' },
  ];

  const toolbarButtons = [
    {
      icon: Undo,
      action: () => editor.chain().focus().undo().run(),
      title: isRTL ? 'تراجع' : 'Undo',
      disabled: !editor.can().chain().focus().undo().run(),
    },
    {
      icon: Redo,
      action: () => editor.chain().focus().redo().run(),
      title: isRTL ? 'إعادة' : 'Redo',
      disabled: !editor.can().chain().focus().redo().run(),
    },
    {
      icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
      title: isRTL ? 'عريض' : 'Bold',
      isActive: editor.isActive('bold'),
    },
    {
      icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
      title: isRTL ? 'مائل' : 'Italic',
      isActive: editor.isActive('italic'),
    },
    {
      icon: UnderlineIcon,
      action: () => editor.chain().focus().toggleUnderline().run(),
      title: isRTL ? 'تسطير' : 'Underline',
      isActive: editor.isActive('underline'),
    },
    {
      icon: Strikethrough,
      action: () => editor.chain().focus().toggleStrike().run(),
      title: isRTL ? 'خط في المنتصف' : 'Strikethrough',
      isActive: editor.isActive('strike'),
    },
    {
      icon: Code,
      action: () => editor.chain().focus().toggleCode().run(),
      title: isRTL ? 'كود' : 'Code',
      isActive: editor.isActive('code'),
    },
    {
      icon: Highlighter,
      action: () => editor.chain().focus().toggleHighlight().run(),
      title: isRTL ? 'تمييز' : 'Highlight',
      isActive: editor.isActive('highlight'),
    },
    {
      icon: SubscriptIcon,
      action: () => editor.chain().focus().toggleSubscript().run(),
      title: isRTL ? 'مكتوب أسفل' : 'Subscript',
      isActive: editor.isActive('subscript'),
    },
    {
      icon: SuperscriptIcon,
      action: () => editor.chain().focus().toggleSuperscript().run(),
      title: isRTL ? 'مكتوب أعلى' : 'Superscript',
      isActive: editor.isActive('superscript'),
    },
    {
      icon: Quote,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      title: isRTL ? 'اقتباس' : 'Quote',
      isActive: editor.isActive('blockquote'),
    },
    {
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
      title: isRTL ? 'قائمة نقطية' : 'Bullet List',
      isActive: editor.isActive('bulletList'),
    },
    {
      icon: ListOrdered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      title: isRTL ? 'قائمة مرقمة' : 'Ordered List',
      isActive: editor.isActive('orderedList'),
    },
    {
      icon: AlignLeft,
      action: () => editor.chain().focus().setTextAlign('left').run(),
      title: isRTL ? 'محاذاة يسار' : 'Align Left',
      isActive: editor.isActive({ textAlign: 'left' }),
    },
    {
      icon: AlignCenter,
      action: () => editor.chain().focus().setTextAlign('center').run(),
      title: isRTL ? 'محاذاة وسط' : 'Align Center',
      isActive: editor.isActive({ textAlign: 'center' }),
    },
    {
      icon: AlignRight,
      action: () => editor.chain().focus().setTextAlign('right').run(),
      title: isRTL ? 'محاذاة يمين' : 'Align Right',
      isActive: editor.isActive({ textAlign: 'right' }),
    },
    {
      icon: AlignJustify,
      action: () => editor.chain().focus().setTextAlign('justify').run(),
      title: isRTL ? 'محاذاة كاملة' : 'Justify',
      isActive: editor.isActive({ textAlign: 'justify' }),
    },
    {
      icon: LinkIcon,
      action: setLink,
      title: isRTL ? 'إضافة رابط' : 'Add Link',
      isActive: editor.isActive('link'),
    },
    {
      icon: ImageIcon,
      action: addImage,
      title: isRTL ? 'إضافة صورة' : 'Add Image',
    },
    {
      icon: TableIcon,
      action: insertTable,
      title: isRTL ? 'إدراج جدول' : 'Insert Table',
    },
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <div className='flex items-center justify-between'>
        <Label className='text-lg font-semibold'>{label}</Label>
      </div>

      <Card>
        <CardHeader className='pb-3 space-y-4'>
          {/* Main Toolbar */}
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

          {/* Font and Style Controls */}
          <div className='flex flex-wrap gap-2 items-center border-t pt-3'>
            {/* Font Family */}
            <div className='flex items-center gap-2'>
              <Type className='h-4 w-4 text-muted-foreground' />
              <Select
                value={editor.getAttributes('textStyle').fontFamily || 'default'}
                onValueChange={(value: string) => {
                  if (value === 'default') {
                    editor.chain().focus().unsetFontFamily().run();
                  } else {
                    editor.chain().focus().setFontFamily(value).run();
                  }
                }}
              >
                <SelectTrigger className='w-[140px] h-8'>
                  <SelectValue placeholder={isRTL ? 'الخط' : 'Font'} />
                </SelectTrigger>
                <SelectContent>
                  {(isRTL ? arabicFonts : englishFonts).map(font => (
                    <SelectItem key={font.value} value={font.value}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Font Size */}
            <div className='flex items-center gap-2'>
              <span className='text-sm text-muted-foreground'>{isRTL ? 'الحجم' : 'Size'}</span>
              <Select
                value={editor.getAttributes('textStyle').fontSize || 'default'}
                onValueChange={(value: string) => {
                  if (value === 'default') {
                    editor.chain().focus().unsetFontSize().run();
                  } else {
                    editor.chain().focus().setFontSize(value).run();
                  }
                }}
              >
                <SelectTrigger className='w-[80px] h-8'>
                  <SelectValue placeholder='16px' />
                </SelectTrigger>
                <SelectContent>
                  {fontSizes.map(size => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Text Color */}
            <div className='flex items-center gap-2'>
              <Palette className='h-4 w-4 text-muted-foreground' />
              <Select
                value={editor.getAttributes('textStyle').color || 'default'}
                onValueChange={(value: string) => {
                  if (value === 'default') {
                    editor.chain().focus().unsetColor().run();
                  } else {
                    editor.chain().focus().setColor(value).run();
                  }
                }}
              >
                <SelectTrigger className='w-[120px] h-8'>
                  <SelectValue placeholder={isRTL ? 'اللون' : 'Color'} />
                </SelectTrigger>
                <SelectContent>
                  {colors.map(color => (
                    <SelectItem key={color.value} value={color.value}>
                      <div className='flex items-center gap-2'>
                        {color.value === 'default' ? (
                          <div className='w-4 h-4 rounded border border-gray-300 bg-white' />
                        ) : (
                          <div
                            className='w-4 h-4 rounded border'
                            style={{ backgroundColor: color.value }}
                          />
                        )}
                        {color.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
