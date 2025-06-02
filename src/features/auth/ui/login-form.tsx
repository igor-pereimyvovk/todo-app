'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FirebaseError } from 'firebase/app';

import { getFirebaseErrorMessage } from '@/shared/lib/firebaseError';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/kit/form';
import { Input } from '@/shared/ui/kit/input';
import { Button } from '@/shared/ui/kit/button';
import { loginUser } from '@/features/auth/api/loginUser';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await loginUser(values.email, values.password);
      router.push('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        const message = getFirebaseErrorMessage(error);
        form.setError('email', { message });
      } else {
        form.setError('email', { message: 'Unknown error occurred' });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Logging in...' : 'Sign In'}
        </Button>
      </form>
    </Form>
  );
}
