import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import Image from "next/image";

export const LogoCloud = () => {
  return (
    <section className="pb-16 md:pb-32">
      <div className="group relative m-auto max-w-6xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="inline md:max-w-44 md:border-r md:pr-6">
            <p className="text-end text-sm">Powering the best teams</p>
          </div>
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
              <div className="flex items-center font-bold justify-center">
                <span>PEAK CRAFT</span>
              </div>
              <div className="flex items-center w-20 justify-center">
                <Image src="/peak.png" alt="Peak Logo" height="80" width="80" />
              </div>
              <div className="flex items-center font-bold justify-center">
                HAWASSA UNIVERSITY
              </div>
              <div className="flex items-center w-20 justify-center">
                <Image
                  src="/hawasa.png"
                  alt="Hawasa Logo"
                  height="80"
                  width="80"
                />
              </div>
              <div className="flex items-center font-bold justify-center">
                YEEP
              </div>
              <div className="flex items-center w-20 justify-center">
                <Image src="/yeep.png" alt="Yelp Logo" height="80" width="80" />
              </div>
            </InfiniteSlider>

            <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
            <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
