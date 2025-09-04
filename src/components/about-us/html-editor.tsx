'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Toggle } from '@/components/ui/toggle';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Italic,
  List,
  ListOrdered,
  Quote,
  Underline,
} from 'lucide-react';
import { useRef, useState } from 'react';

interface HTMLEditorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  className?: string;
}

export function HTMLEditor({ value, onChange, label, placeholder, className }: HTMLEditorProps) {
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertTag = (openTag: string, closeTag: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText =
      value.substring(0, start) + openTag + selectedText + closeTag + value.substring(end);

    onChange(newText);

    // Set cursor position after the inserted tag
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + openTag.length,
        start + openTag.length + selectedText.length,
      );
    }, 0);
  };

  const insertLineTag = (tag: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lines = value.split('\n');
    let currentLine = 0;
    let charCount = 0;

    for (let i = 0; i < lines.length; i++) {
      if (charCount + lines[i].length >= start) {
        currentLine = i;
        break;
      }
      charCount += lines[i].length + 1; // +1 for newline
    }

    const currentLineText = lines[currentLine];

    // Check if line already has the tag
    if (
      currentLineText.trim().startsWith(`<${tag}>`) &&
      currentLineText.trim().endsWith(`</${tag}>`)
    ) {
      // Remove the tag
      const newLineText = currentLineText.replace(
        new RegExp(`^\\s*<${tag}>\\s*|\\s*</${tag}>\\s*$`, 'g'),
        '',
      );
      lines[currentLine] = newLineText;
    } else {
      // Add the tag
      lines[currentLine] = `<${tag}>${currentLineText.trim()}</${tag}>`;
    }

    const newValue = lines.join('\n');
    onChange(newValue);
  };

  const toolbarButtons = [
    { icon: Bold, action: () => insertTag('<strong>', '</strong>'), title: 'Bold' },
    { icon: Italic, action: () => insertTag('<em>', '</em>'), title: 'Italic' },
    { icon: Underline, action: () => insertTag('<u>', '</u>'), title: 'Underline' },
    { icon: Code, action: () => insertTag('<code>', '</code>'), title: 'Code' },
    { icon: Quote, action: () => insertLineTag('blockquote'), title: 'Quote' },
    { icon: List, action: () => insertTag('<ul>\n<li>', '</li>\n</ul>'), title: 'Unordered List' },
    {
      icon: ListOrdered,
      action: () => insertTag('<ol>\n<li>', '</li>\n</ol>'),
      title: 'Ordered List',
    },
    {
      icon: AlignLeft,
      action: () => insertTag('<p style="text-align: left;">', '</p>'),
      title: 'Align Left',
    },
    {
      icon: AlignCenter,
      action: () => insertTag('<p style="text-align: center;">', '</p>'),
      title: 'Align Center',
    },
    {
      icon: AlignRight,
      action: () => insertTag('<p style="text-align: right;">', '</p>'),
      title: 'Align Right',
    },
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <div className='flex items-center justify-between'>
        <Label className='text-lg font-semibold'>{label}</Label>
        <div className='flex items-center gap-2'>
          <Toggle pressed={isPreview} onPressedChange={setIsPreview} className='text-sm'>
            {isPreview ? 'Edit' : 'Preview'}
          </Toggle>
        </div>
      </div>

      <Card>
        <CardHeader className='pb-3'>
          <div className='flex flex-wrap gap-1'>
            {toolbarButtons.map((button, index) => (
              <Button
                key={index}
                variant='outline'
                size='sm'
                onClick={button.action}
                title={button.title}
                className='h-8 w-8 p-0'
              >
                <button.icon className='h-4 w-4' />
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {isPreview ? (
            <div
              className='min-h-[300px] p-4 border rounded-md bg-muted/50 prose prose-sm max-w-none'
              dangerouslySetInnerHTML={{ __html: value }}
            />
          ) : (
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={e => onChange(e.target.value)}
              placeholder={placeholder}
              className='min-h-[300px] font-mono text-sm'
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
