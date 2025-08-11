const brands = ["smart tech", "lekecoffe", "TechPro", "StyleX", "Fikiryilkal"];

export default function Trusted() {
  return (
    <section>
      <div className="mt-24 overflow-hidden relative container mx-auto ">
        <p className="text-2xl sm:text-3xl md:text-4xl text-foreground mb-8 text-center font-semibold">
          Trusted by leading brands
        </p>
        <div className="relative w-full">
          <div className="flex overflow-x-hidden">
            <div
              className="flex py-2 md:pt-4 trusted-marquee whitespace-nowrap"
              style={{ minWidth: "400%" }}
            >
              {Array(6)
                .fill(brands)
                .flat()
                .map((brand, index) => (
                  <div
                    key={index}
                    className="mx-8 text-foreground/60 font-bold text-lg"
                  >
                    {brand}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes trustedMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .trusted-marquee {
          animation: trustedMarquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
