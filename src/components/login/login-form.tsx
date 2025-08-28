'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuthHook } from '@/hooks/useAuthHook';
import Link from 'next/link';
import { toast } from 'sonner';

const formSchema = z.object({
  mobileNumber: z
    .string()

    .nonempty('رقم الهاتف مطلوب'),
  password: z.string().nonempty('كلمة المرور مطلوبة'),
});
const defaultValues = {
  mobileNumber: '',
  password: '',
};

type FormValues = z.infer<typeof formSchema>;

export function LoginForm() {
  const { loginMutation, isPending } = useAuthHook();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      await toast.promise(
        loginMutation({ mobileNumber: data.mobileNumber, password: data.password }),
        {
          loading: 'جاري تسجيل الدخول...',
          success: 'تم تسجيل الدخول بنجاح',
          error: 'رقم الهاتف أو كلمة المرور غير صحيحة',
        },
      );
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} method='POST' className='space-y-6'>
        <FormField
          control={form.control}
          name='mobileNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم الهاتف</FormLabel>
              <FormControl>
                <Input placeholder='رقم الهاتف' {...field} />
              </FormControl>
              <FormDescription>هذا هو رقم هاتفك.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>كلمة المرور</FormLabel>
              <FormControl>
                <Input type='password' placeholder='أدخل كلمة المرور' {...field} />
              </FormControl>
              <FormDescription>هذه هي كلمة المرور الخاصة بك</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full' disabled={isPending}>
          تسجيل الدخول
        </Button>

        <div className='text-center'>
          <Link
            href='/forgot-password'
            className='text-sm text-blue-600 hover:text-blue-800 font-medium'
          >
            نسيت كلمة المرور؟
          </Link>
        </div>
      </form>
    </Form>
  );
}
