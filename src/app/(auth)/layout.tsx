export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex justify-center pt-16 h-screen">{children}</main>;
}
