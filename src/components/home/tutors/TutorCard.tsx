import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface TutorCardProps {
  name: string;
  bio: string;
  image?: string;
}

export function TutorCard({ name, image, bio }: TutorCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex justify-center">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={120}
            height={120}
            className="rounded-full object-cover w-36 h-36"
          />
        ) : (
          <div className="w-30 h-30 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </CardHeader>
      <CardContent className="text-center">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{bio}</p>
      </CardContent>
    </Card>
  );
}
