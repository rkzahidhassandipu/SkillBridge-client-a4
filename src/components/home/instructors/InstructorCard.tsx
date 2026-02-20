import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Instructor } from "@/types";
import { FaWhatsapp } from "react-icons/fa";

export interface InstructorCardProps {
  instructor: Instructor;
}

export function InstructorCard({ instructor }: InstructorCardProps) {
  const { pricePerHour, rating, totalReviews, user } = instructor;

  return (
    <Card className="shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex justify-center">
        {user?.image ? (
          <Image
            src={user.image}
            alt={user?.id || "Instructor"}
            width={120}
            height={120}
            className="rounded-full object-cover w-36 h-36"
          />
        ) : (
          <div className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center">
            No Image
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <h3 className="text-lg font-semibold text-center text-black">
          {user.name}
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <p>📱 {user?.phone}</p>
          <p className="flex">
            <FaWhatsapp className="text-green-600 mr-1" /> {user?.phone}
          </p>
          <p>⭐ Rating: {rating}</p>
          <p>⭐ Reviews: {totalReviews}</p>
        </div>
      </CardContent>
    </Card>
  );
}