import Nav from "@/layouts/Nav";
import { JobProvider } from "@/context/Job";
import { ProposalProvider } from "@/context/Proposal";
import { MessageProvider } from "@/context/Message";
import { ContractProvider } from "@/context/Contract";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProposalProvider>
        <ContractProvider>
          <JobProvider>
            <MessageProvider>
              <Nav />
              {children}
            </MessageProvider>
          </JobProvider>
        </ContractProvider>
      </ProposalProvider>
    </>
  );
}
