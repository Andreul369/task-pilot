export default async function BoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex h-full w-full">{children}</div>;
}
