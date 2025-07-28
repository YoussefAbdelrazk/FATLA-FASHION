import { SignupForm } from '@/components/signup/signup-form';

export default function page() {
  return (
    <div className='flex items-center justify-center w-full h-full mt-24 '>
      <div className='bg-white w-96 shadow-2xl rounded p-8'>
        <h1 className='text-2xl font-bold'>Register Page</h1>

        <SignupForm />
      </div>
    </div>
  );
}
