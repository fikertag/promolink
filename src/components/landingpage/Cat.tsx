import { Button } from "../ui/button";
import Link from "next/link";

export default function Cat() {
  return (
    <section className="container  mx-auto mt-18 mb-16 flex flex-col items-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl text-foreground mb-8 text-center font-semibold">
        Ready to Join the Economy?
      </h2>
      <p className="text-lg  max-w-3xl mx-2 mb-6 text-center ">
        Whether you&apos;re a business looking to grow, an influencer wanting to
        monetize your audience, or a customer seeking great deals, PromoLink is
        your gateway to meaningful connections.
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
