import { Star, StarHalf } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="container mx-auto mt-10 flex justify-center text-center items-center">
      <div>
        <h1 className="text-5xl  sm:text-5xl lg:text-6xl font-extrabold mb-3 md:mb-6">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Socials To Revenue
          </span>
        </h1>
        <p className="text-lg md:text-xl text-foreground mb-6 md:mb-8 max-w-3xl mx-2">
          platform that bridges the gap between{" "}
          <span className="font-semibold">businesses</span>,{" "}
          <span className="font-semibold">influencers</span>, and{" "}
          <span className="font-semibold">customers</span> in a seamless
          ecosystem where everyone wins.
        </p>

        <Button
          asChild
          variant="default"
          size="lg"
          className=" text-lg font-semibold "
        >
          <Link href={"/signup"} className="">
            Get Started <ArrowRight className="ml-2" />
          </Link>
        </Button>

        {/* <div className="flex items-center mt-6 md:mt-10 justify-center">
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </div>
          <div className="ml-4">
            <div className="flex items-center">
              <div className="flex ">
                <Star fill="gold" strokeWidth={0} />
                <Star fill="gold" strokeWidth={0} />
                <Star fill="gold" strokeWidth={0} />
                <Star fill="gold" strokeWidth={0} />
                <StarHalf fill="gold" strokeWidth={0} />
              </div>
              <span className=" font-medium">4.8/5</span>
            </div>
            <p className="text-sm text-gray-500 ">from 500+ reviews</p>
          </div>
        </div> */}
      </div>
    </section>
  );
}
