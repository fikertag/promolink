import { Button } from "../ui/button";
import Link from "next/link";

export default function Cat() {
  return (
    <section className="container  mx-auto my-10 flex flex-col items-center">
      <h2 className="text-foreground mb-4 text-center text-4xl leading-[1.2] font-bold tracking-tighter md:text-5xl">
        Ready to Join the Economy?
      </h2>
      <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-center text-lg font-medium tracking-tight text-balance">
        Whether you&apos;re a business looking to grow or you are an influencer
        wanting to monetize ,
        <span className="bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-transparent">
          My Kalat
        </span>{" "}
        is your go-to platform.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <Link
          href={"/signup"}
          className="py-4 text-center w-full max-w-[300px]"
        >
          <Button variant="default" className="w-full">
            Create Your Account <i className="fas fa-arrow-right ml-2"></i>
          </Button>
        </Link>

        {/* <button className="py-4 w-full max-w-[300px] border border-white text-white hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center font-medium">
                    <i className="fas fa-headset mr-2"></i>
                    Talk to Our Team
                  </button> */}
      </div>
    </section>
  );
}
