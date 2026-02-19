import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="space-y-3 py-6 text-center">
        <div className="text-4xl">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
