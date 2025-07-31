import { LoginForm } from '@/components/login/login-form';

export default function LoginPage() {
  return (
    <div className='bg-white shadow-2xl rounded-lg p-8'>
      <div className='text-center mb-6'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Welcome Back</h1>
        <p className='text-gray-600'>Please enter your credentials to login.</p>
      </div>
      <LoginForm />
    </div>
  );
}
