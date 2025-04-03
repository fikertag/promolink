import Nav from "@/layouts/Nav";
import { JobProvider } from "@/context/Job";
import { ProposalProvider } from "@/context/Proposal";
import { MessageProvider } from "@/context/Message";
import { ContractProvider } from "@/context/Contract";
import { UserProvider } from "@/context/User";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UserProvider>
        <JobProvider>
          <ProposalProvider>
            <ContractProvider>
              <MessageProvider>
                <Nav />
                {children}
              </MessageProvider>
            </ContractProvider>
          </ProposalProvider>
        </JobProvider>
      </UserProvider>
    </>
  );
}
