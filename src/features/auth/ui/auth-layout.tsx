'use client';

import { ReactNode } from 'react';

type AuthLayoutProps = {
  header: ReactNode;
  form: ReactNode;
  footer: ReactNode;
};

export function AuthLayout({ header, form, footer }: AuthLayoutProps) {
  return (
    <section className="w-full max-w-md p-6 space-y-6">
      <div className="text-2xl font-bold text-center">{header}</div>
      <div>{form}</div>
      <div className="text-center text-sm text-muted-foreground">{footer}</div>
    </section>
  );
}
