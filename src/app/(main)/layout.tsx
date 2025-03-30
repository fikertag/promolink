import Nav from "@/layouts/Nav";
import { JobProvider } from "@/context/Job";
import { ProposalProvider } from "@/context/Proposal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProposalProvider>
        <JobProvider>
          <Nav />
          {children}
        </JobProvider>
      </ProposalProvider>
    </>
  );
}
