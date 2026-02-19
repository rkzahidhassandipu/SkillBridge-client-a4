import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  name: string;
  role: string;
  review: string;
  rating: number;
  image: string;
}

export function TestimonialCard({
  name,
  role,
  review,
  rating,
  image,
}: TestimonialCardProps) {
  return (
    <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-center text-yellow-500">
          {"★".repeat(rating)}
        </div>
        <p className="text-sm text-muted-foreground">{review}</p>
        <div className="flex items-center gap-3 mt-4">
          <Image
            src={image}
            alt={name}
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          <div>
            <h4 className="text-base font-semibold">{name}</h4>
            <p className="text-xs text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
