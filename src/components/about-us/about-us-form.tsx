'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { htmlContentSchema } from '@/lib/schemas/html-content-schema';
import { AboutUs, AboutUsFormData } from '@/types/about-us';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, Eye, Save } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { HTMLEditor } from './html-editor';

interface AboutUsFormProps {
  initialData?: AboutUs;
  onSave: (data: AboutUsFormData) => Promise<void>;
  isLoading?: boolean;
}

export function AboutUsForm({ initialData, onSave, isLoading = false }: AboutUsFormProps) {
  const [isPreview, setIsPreview] = useState(false);

  const form = useForm<AboutUsFormData>({
    resolver: zodResolver(htmlContentSchema),
    defaultValues: {
      arHtml: initialData?.arHtml || '',
      enHtml: initialData?.enHtml || '',
    },
  });

  const handleSubmit = async (data: AboutUsFormData) => {
    try {
      await onSave(data);
      toast.success('تم حفظ معلومات من نحن بنجاح');
    } catch (error) {
      toast.error('فشل في حفظ المعلومات');
      console.error('Error saving about us:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Edit className='w-5 h-5' />
              إدارة صفحة من نحن
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-8'>
            {/* Arabic Content */}
            <FormField
              control={form.control}
              name='arHtml'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <HTMLEditor
                      value={field.value}
                      onChange={field.onChange}
                      label='المحتوى العربي'
                      placeholder='أدخل المحتوى العربي هنا...'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* English Content */}
            <FormField
              control={form.control}
              name='enHtml'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <HTMLEditor
                      value={field.value}
                      onChange={field.onChange}
                      label='المحتوى الإنجليزي'
                      placeholder='Enter English content here...'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Preview Section */}
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-semibold'>معاينة المحتوى</h3>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setIsPreview(!isPreview)}
                  className='flex items-center gap-2'
                >
                  <Eye className='w-4 h-4' />
                  {isPreview ? 'إخفاء المعاينة' : 'عرض المعاينة'}
                </Button>
              </div>

              {isPreview && (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <h4 className='font-medium text-sm text-muted-foreground'>المحتوى العربي</h4>
                    <div
                      className='min-h-[200px] p-4 border rounded-md bg-muted/50 prose prose-sm max-w-none'
                      dangerouslySetInnerHTML={{ __html: form.watch('arHtml') }}
                    />
                  </div>
                  <div className='space-y-2'>
                    <h4 className='font-medium text-sm text-muted-foreground'>المحتوى الإنجليزي</h4>
                    <div
                      className='min-h-[200px] p-4 border rounded-md bg-muted/50 prose prose-sm max-w-none'
                      dangerouslySetInnerHTML={{ __html: form.watch('enHtml') }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className='flex justify-end pt-4 border-t'>
              <Button type='submit' disabled={isLoading} className='min-w-[120px]'>
                {isLoading ? (
                  <>
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2' />
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <Save className='w-4 h-4 mr-2' />
                    حفظ التغييرات
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
