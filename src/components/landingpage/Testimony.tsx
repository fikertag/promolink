import { Card } from "@/components/ui/card";

const testimonies = [
  {
    name: "peak craft",
    role: "Business Owner",
    initial: "P",
    color: "text-primary",
    bg: "bg-primary/10",
    text: "My kalat  changed how we connect with our members.",
    stars: 5,
  },
  {
    name: "Eden",
    role: "Influencer",
    initial: "E",
    color: "text-accent",
    bg: "bg-accent/10",
    text: "I only promote products I believe in. My audience trusts my recommendations.",
    stars: 4.5,
  },
  {
    name: "Fiker",
    role: "Influencer",
    initial: "F",
    color: "text-accent",
    bg: "bg-accent/10",
    text: "What I appreciate most is knowing these are genuine recommendations, not just paid ads.",
    stars: 5,
  },
];

export default function Testimony() {
  return (
    <section className="max-w-7xl mx-auto mt-16 md:mt-30">
      <div className="text-center mb-14">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-foreground mb-8 text-center font-semibold">
          What Our Users Say
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Real stories from businesses, influencers, and customers using My
          kalat .
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-stretch gap-10 mx-5">
        {testimonies.map((t, i) => (
          <Card key={t.name} className="p-8 rounded-xl relative z-10 bg-card">
            <div className="flex items-center mb-4">
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center mr-4 ${t.bg}`}
              >
                <span className={`font-bold ${t.color}`}>{t.initial}</span>
              </div>
              <div>
                <h4 className="font-bold text-primary capitalize">{t.name}</h4>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">{t.text}</p>
            <div className=" flex-grow flex items-end">
              {Array.from({ length: Math.floor(t.stars) }).map((_, idx) => (
                <svg
                  key={idx}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.174 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" />
                </svg>
              ))}
              {t.stars % 1 !== 0 && (
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <defs>
                    <linearGradient id={`half${i}`}>
                      <stop offset="50%" stopColor="currentColor" />
                      <stop offset="50%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.174 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z"
                    fill={`url(#half${i})`}
                  />
                </svg>
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
