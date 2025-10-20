import Nav from "@/layouts/Nav";
import { JobProvider } from "@/context/Job";
import { ProposalProvider } from "@/context/Proposal";
import { MessageProvider } from "@/context/Message";
import { ContractProvider } from "@/context/Contract";
import { UserProvider } from "@/context/User";
import { EarningProvider } from "@/context/Earning";
import Footer from "@/components/footer";
import ReactQueryProvider from "@/QueryClientProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <div className=" min-h-screen bg-gray-200 ">
        <UserProvider>
          <JobProvider>
            <ProposalProvider>
              <ContractProvider>
                <EarningProvider>
                  <MessageProvider>
                    <Nav path="influencer" />
                    {children}
                    <Footer />
                  </MessageProvider>
                </EarningProvider>
              </ContractProvider>
            </ProposalProvider>
          </JobProvider>
        </UserProvider>
      </div>
    </ReactQueryProvider>
  );
}
