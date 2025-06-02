'use client';

import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/features/auth/ui/auth-layout';
import { RegisterForm } from '@/features/auth/ui/register-form';

export function RegisterPage() {
  const router = useRouter();

  return (
    <AuthLayout
      header="Sign Up"
      form={<RegisterForm />}
      footer={
        <p className="text-sm">
          Already have an account?{' '}
          <button
            onClick={() => router.push('/login')}
            className="text-blue-600 hover:underline font-medium"
            type="button"
          >
            Sign In
          </button>
        </p>
      }
    />
  );
}
