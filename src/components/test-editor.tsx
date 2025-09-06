'use client';

import { TipTapEditor } from '@/components/ui/tiptap-editor';
import { useState } from 'react';

export function TestEditor() {
  const [arabicContent, setArabicContent] = useState('');
  const [englishContent, setEnglishContent] = useState('');

  return (
    <div className='space-y-8 p-6'>
      <h1 className='text-2xl font-bold'>TipTap Editor Test</h1>

      {/* Arabic Editor */}
      <div className='space-y-4'>
        <h2 className='text-xl font-semibold'>Arabic Editor (RTL)</h2>
        <TipTapEditor
          value={arabicContent}
          onChange={setArabicContent}
          label='محرر النصوص العربي'
          placeholder='اكتب النص العربي هنا...'
          isRTL={true}
          language='ar'
        />
        <div className='p-4 bg-gray-100 rounded'>
          <h3 className='font-semibold mb-2'>HTML Output:</h3>
          <pre className='text-sm overflow-auto'>{arabicContent}</pre>
        </div>
      </div>

      {/* English Editor */}
      <div className='space-y-4'>
        <h2 className='text-xl font-semibold'>English Editor (LTR)</h2>
        <TipTapEditor
          value={englishContent}
          onChange={setEnglishContent}
          label='English Text Editor'
          placeholder='Type English text here...'
          isRTL={false}
          language='en'
        />
        <div className='p-4 bg-gray-100 rounded'>
          <h3 className='font-semibold mb-2'>HTML Output:</h3>
          <pre className='text-sm overflow-auto'>{englishContent}</pre>
        </div>
      </div>

      {/* Test Instructions */}
      <div className='p-4 bg-blue-50 rounded'>
        <h3 className='font-semibold mb-2'>Test Instructions:</h3>
        <ul className='list-disc list-inside space-y-1 text-sm'>
          <li>Try typing in both Arabic and English editors</li>
          <li>Test font family selection (should work for both languages)</li>
          <li>Test font size selection</li>
          <li>Test text color selection</li>
          <li>Test bold, italic, underline formatting</li>
          <li>Test text alignment (especially RTL for Arabic)</li>
          <li>Test lists and other formatting options</li>
          <li>Test highlight functionality</li>
          <li>Test subscript and superscript</li>
        </ul>
      </div>
    </div>
  );
}
