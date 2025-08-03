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
import { toast } from 'sonner';

const formSchema = z.object({
  mobileNumber: z.string().min(10, 'Phone number must be at least 10 characters long'),
  password: z.string(),
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
          loading: 'Logging in...',
          success: 'Logged in successfully',
          error: 'incorrect mobile number or password',
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
              <FormLabel>Mobile number</FormLabel>
              <FormControl>
                <Input placeholder='Mobile number' {...field} />
              </FormControl>
              <FormDescription>This is your phone number.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Enter your Password' {...field} />
              </FormControl>
              <FormDescription>This is your password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full' disabled={isPending}>
          Sign In
        </Button>

        <div className='text-center'>
          <a href='/request-otp' className='text-sm text-blue-600 hover:text-blue-800 font-medium'>
            Forgot your password?
          </a>
        </div>
      </form>
    </Form>
  );
}
