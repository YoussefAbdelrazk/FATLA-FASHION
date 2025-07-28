import { LoginForm } from '@/components/login/login-form';

export default function page() {
  return (
    <div className='flex items-center justify-center w-full h-full mt-24 '>
      <div className='bg-white w-96 shadow-2xl rounded p-8'>
        <h1 className='text-2xl font-bold'>Login Page</h1>
        <p className='text-gray-700'>Please enter your credentials to login.</p>
        <LoginForm />
      </div>
    </div>
  );
}
