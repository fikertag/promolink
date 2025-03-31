import Nav from "@/layouts/Nav";
import { JobProvider } from "@/context/Job";
import { ProposalProvider } from "@/context/Proposal";
import { MessageProvider } from "@/context/Message";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProposalProvider>
        <JobProvider>
          <MessageProvider>
            <Nav />
            {children}
          </MessageProvider>
        </JobProvider>
      </ProposalProvider>
    </>
  );
}
