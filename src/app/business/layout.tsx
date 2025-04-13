import Nav from "@/layouts/Nav";
import { UserProvider } from "@/context/User";
import { JobProvider } from "@/context/Job";
import { InfluencerProvider } from "@/context/Influencer";
import { ProposalProvider } from "@/context/Proposal";
import { MessageProvider } from "@/context/Message";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" min-h-screen bg-gray-50 ">
      <UserProvider>
        <InfluencerProvider>
          <JobProvider>
            <ProposalProvider>
              <MessageProvider>
                <Nav path="business" />
                {children}
              </MessageProvider>
            </ProposalProvider>
          </JobProvider>
        </InfluencerProvider>
      </UserProvider>
    </div>
  );
}
