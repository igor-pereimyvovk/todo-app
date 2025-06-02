'use client';

import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/features/auth/ui/auth-layout';
import { LoginForm } from '@/features/auth/ui/login-form';

export function LoginPage() {
  const router = useRouter();

  return (
    <AuthLayout
      header="Sign In"
      form={<LoginForm />}
      footer={
        <p className="text-sm">
          Don&apos;t have an account?{' '}
          <button
            onClick={() => router.push('/register')}
            className="text-blue-600 hover:underline font-medium"
            type="button"
          >
            Sign Un
          </button>
        </p>
      }
    />
  );
}
