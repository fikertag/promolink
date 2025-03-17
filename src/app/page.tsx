"use client";

import JobLists from "@/components/JobLists";
import SideBar from "@/components/SideBar";
import { authClient } from "@/lib/auth-client"; //import the auth client

export default function Home() {
  const signUp = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email: "fikeryilkaltages@gmail.com", // user email address
        password: "12345678", // user password -> min 8 characters by default
        name: "fikir", // user display name
        callbackURL: "/dashboard", // a url to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: (ctx) => {
          console.log("request"); //show loading
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          alert("heloo");
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      }
    );
  };

  return (
    <div className="h-screen overflow-hidden ">
      <button onClick={signUp}>signup</button>
      <div className="grid lg:grid-cols-[8fr_3fr] grid-cols-1 gap-10 mx-3 lg:ml-20 ">
        <JobLists />
        <SideBar />
      </div>
    </div>
  );
}
