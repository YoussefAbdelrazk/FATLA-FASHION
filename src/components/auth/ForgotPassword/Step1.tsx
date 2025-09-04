'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Loader2 } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { requestOtp } from '@/services/auth/AuthService';
import { toast } from 'sonner';
import { useState } from 'react';

const formSchema = z.object({
  mobileNumber: z.string().nonempty('رقم الهاتف مطلوب'),
});

const defaultValues = {
  mobileNumber: '',
};

type FormValues = z.infer<typeof formSchema>;

export function Step1({ onNext }: { onNext: (mobileNumber: string) => void }) {
  const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormValues> = async data => {
    console.log(data, 'data');
    try {
      setIsLoading(true);
      await requestOtp(data.mobileNumber);
      toast.success('تم إرسال رمز الإسترجاع بنجاح!');
      onNext(data.mobileNumber);
    } catch (error) {
      const errorMessage =
        error && typeof error === 'object' && 'response' in error
          ? (error.response as { data?: { message?: string } })?.data?.message ||
            'فشل إرسال رمز الإسترجاع'
          : 'فشل إرسال رمز الإسترجاع';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='space-y-6 max-w-[720px]'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <h2 className='text-2xl font-bold text-gray-800'>نسيت كلمة المرور؟</h2>
        <p className='text-gray-500  max-w-[452px] '>لا تقلق, سنساعدك في استرجاع كلمة المرور.</p>
        <div className='space-y-2'>
          <Label htmlFor='mobileNumber'>رقم الهاتف</Label>
          <Input
            id='mobileNumber'
            type='text'
            placeholder='أدخل رقم هاتفك'
            {...register('mobileNumber')}
            className={errors.mobileNumber ? 'border-red-500' : ''}
          />
          {errors.mobileNumber && (
            <p className='text-red-500 text-sm'>{errors.mobileNumber.message}</p>
          )}
        </div>

        <Button type='submit' className='w-full  text-white' disabled={isLoading}>
          إرسال رمز الإسترجاع
          {isLoading ? <Loader2 className='w-4 h-4' /> : <ArrowRight className='w-4 h-4' />}
        </Button>
      </form>
    </div>
  );
}
