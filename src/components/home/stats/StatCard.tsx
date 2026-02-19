import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  description: string;
  icon: string;
}

export function StatCard({ title, description, icon }: StatCardProps) {
  return (
    <Card className="text-center shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="space-y-3 py-6">
        <div className="text-4xl">{icon}</div>
        <h3 className="text-2xl font-bold text-primary">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
