import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    number: 1,
    bg: "bg-primary",
    fg: "text-secondary-foreground",
    title: "Businesses Join",
    desc: "Companies create profiles and set rates for their products",
    bar: "bg-primary",
  },
  {
    number: 2,
    bg: "bg-primary",
    fg: "text-secondary-foreground",
    title: "Influencers Connect",
    desc: "Creators find relevant products and generate unique promo",
    bar: "bg-secondary",
  },
  {
    number: 3,
    bg: "bg-primary",
    fg: "text-accent-foreground",
    title: "Audiences Engage",
    desc: "Followers discover products through authentic recommendations",
    bar: "bg-accent",
  },
  {
    number: 4,
    bg: "bg-primary",
    fg: "text-accent-foreground",
    title: "Everyone Wins",
    desc: "Businesses grow, influencers earn, and customers discover",
    bar: "bg-accent",
  },
];

export default function How() {
  return (
    <section className="max-w-7xl mx-auto mt-18 md:mt-30 px-4">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-foreground mb-8 text-center font-semibold">
          How PromoLink Works
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, idx) => (
          <Card
            key={idx}
            className="relative z-10 bg-card text-card-foreground p-4 py-6 rounded-xl shadow-lg text-center transform transition-all hover:-translate-y-2 duration-300"
          >
            <CardHeader>
              <div
                className={`h-14 w-14 rounded-full ${step.bg} flex items-center justify-center mb-2 mx-auto`}
              >
                <span className={`font-bold ${step.fg} text-xl`}>
                  {step.number}
                </span>
              </div>
              <CardTitle className="font-semibold text-lg mb-2">
                {step.title}
              </CardTitle>
            </CardHeader>
            <p className="text-muted-foreground">{step.desc}</p>
            <div className={`h-1 w-12 ${step.bar} mx-auto mt-4 rounded`}></div>
          </Card>
        ))}
      </div>
    </section>
  );
}
