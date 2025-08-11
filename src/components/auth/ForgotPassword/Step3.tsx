'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resetPassword } from '@/services/auth/AuthService';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type FormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  newPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});
interface Step3Props {
  mobileNumber: string;
  onSuccess: () => void;
  onBack: () => void;
}

export default function Step3({ mobileNumber, onSuccess, onBack }: Step3Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPassword = watch('newPassword');

  const onSubmit = async (data: FormValues) => {
    if (data.confirmPassword && data.newPassword !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(mobileNumber, data.newPassword, data.confirmPassword);
      toast.success('Password reset successfully!');
      onSuccess();
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === 'object' && 'response' in error
          ? (error.response as { data?: { message?: string } })?.data?.message ||
            'Failed to reset password'
          : 'Failed to reset password';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='space-y-6'>
      <Button variant='outline' className='' onClick={onBack}>
        <ArrowLeft className='w-4 h-4' />
      </Button>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <h2 className='text-2xl font-bold text-gray-800'>Create a new password</h2>
        <p>Create a new strong password for your account.</p>

        <div className='space-y-2'>
          <Label htmlFor='newPassword'>New Password</Label>
          <div className='relative'>
            <Input
              id='newPassword'
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter new password'
              {...register('newPassword')}
              className={errors.newPassword ? 'border-red-500 pr-10' : 'pr-10'}
            />
            <button
              type='button'
              className='absolute inset-y-0 right-0 pr-3 flex items-center'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className='h-4 w-4 text-gray-400' />
              ) : (
                <Eye className='h-4 w-4 text-gray-400' />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className='text-red-500 text-sm'>{errors.newPassword.message}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='confirmPassword'>Confirm New Password</Label>
          <div className='relative'>
            <Input
              id='confirmPassword'
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Confirm new password'
              {...register('confirmPassword', {
                validate: value => value === newPassword || 'Passwords do not match',
              })}
              className={errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'}
            />
            <button
              type='button'
              className='absolute inset-y-0 right-0 pr-3 flex items-center'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className='h-4 w-4 text-gray-400' />
              ) : (
                <Eye className='h-4 w-4 text-gray-400' />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* <div className='text-sm text-gray-600'>
          <p>Password must:</p>
          <ul className='list-disc list-inside mt-1 space-y-1'>
            <li>Be at least 8 characters long</li>
            <li>Contain uppercase and lowercase letters</li>
            <li>Include at least one number</li>
          </ul>
        </div> */}

        <div className='space-y-3'>
          <Button type='submit' className='w-full text-white' disabled={isLoading}>
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </div>
      </form>
    </div>
  );
}
