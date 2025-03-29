import Nav from "@/layouts/Nav";
import { JobProvider } from "@/context/Job";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <JobProvider>
        <Nav />
        {children}
      </JobProvider>
    </>
  );
}
