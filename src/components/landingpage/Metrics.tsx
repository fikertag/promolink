import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
  CardAction,
} from "@/components/ui/card";

const metrics = [
  {
    value: 25,
    title: "Active Creators",
    description: "Growing every day with successful partnerships",
  },
  {
    value: 15,
    title: "Business Partners",
    description: "Brands seeing real growth through collaborations",
  },
  {
    value: 90,
    title: "Successful Sales",
    description: "Creating win-win scenarios for everyone involved",
  },
];

export default function Metrics() {
  return (
    <section className="container mx-auto px-5  mt-18 ">
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-stretch gap-10">
        {metrics.map((metric, idx) => (
          <Card className="text-center" key={idx}>
            <CardHeader>
              <CardTitle>
                <span className="text-primary text-5xl font-extrabold mb-2 counter">
                  {metric.value}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-medium">{metric.title}</div>
              <CardDescription className="mt-2">
                {metric.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
