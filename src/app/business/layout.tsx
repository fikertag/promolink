import Nav from "@/layouts/Nav";
import { UserProvider } from "@/context/User";
import { InfluencerProvider } from "@/context/Influencer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" min-h-screen bg-gray-50 ">
      <UserProvider>
        <InfluencerProvider>
          <Nav />
          {children}
        </InfluencerProvider>
      </UserProvider>
    </div>
  );
}
