export default function HomeLayout({
  children,
  sheet,
}: Readonly<{
  children: React.ReactNode;
  sheet: React.ReactNode;
}>) {
  return (
    <div>
      {sheet}
      {children}
    </div>
  );
}
