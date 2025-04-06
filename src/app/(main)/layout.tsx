import Nav from "@/layouts/Nav";
import { JobProvider } from "@/context/Job";
import { ProposalProvider } from "@/context/Proposal";
import { MessageProvider } from "@/context/Message";
import { ContractProvider } from "@/context/Contract";
import { UserProvider } from "@/context/User";
import { EarningProvider } from "@/context/Earning";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" min-h-screen bg-gray-50 ">
      <UserProvider>
        <JobProvider>
          <ProposalProvider>
            <ContractProvider>
              <EarningProvider>
                <MessageProvider>
                  <Nav />
                  {children}
                </MessageProvider>
              </EarningProvider>
            </ContractProvider>
          </ProposalProvider>
        </JobProvider>
      </UserProvider>
    </div>
  );
}
