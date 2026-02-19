"use client";

import * as React from "react";
import { Calendar, Clock, BookOpen, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { GetBooking } from "@/types/booking";
import { updateBookingStatusAction } from "@/actions/booking.actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Update this to reflect that bookData contains the response object
interface TeachingSessionsProps {
  bookData: {
    success: boolean;
    date: GetBooking[];
  };
}

export default function TeachingSessionsBookings({
  bookData,
}: TeachingSessionsProps) {
  const bookingsArray = bookData?.date || [];
  const [activeTab, setActiveTab] = React.useState("upcoming");
  const [bookings, setBookings] = React.useState(bookingsArray);

  console.log(bookingsArray);

  const upcomingBookings = bookings.filter((b) => b.status === "CONFIRMED");
  const completedBookings = bookings.filter((b) => b.status === "COMPLETED");
  const cancelledBookings = bookings.filter((b) => b.status === "CANCELLED");

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleStatusChange = async (
    id: string,
    status: "COMPLETED" | "CANCELLED",
  ) => {
    const res = await updateBookingStatusAction(id, status);

    if (res.success) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b)),
      );
    } else {
      console.error("Failed to update:", res.message);
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      <Card className="shadow-lg border-0 bg-gradient-to-br from-indigo-50 to-purple-50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-2xl font-semibold text-gray-800">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-indigo-600" />
            </div>
            Teaching Sessions & Bookings
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-white/50">
              <TabsTrigger
                value="upcoming"
                className="data-[state=active]:bg-white"
              >
                Upcoming ({upcomingBookings.length})
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-white"
              >
                Completed ({completedBookings.length})
              </TabsTrigger>
              <TabsTrigger
                value="cancelled"
                className="data-[state=active]:bg-white"
              >
                Cancelled ({cancelledBookings.length})
              </TabsTrigger>
            </TabsList>

            {[
              {
                value: "upcoming",
                list: upcomingBookings,
                emptyMsg: "No confirmed upcoming sessions",
              },
              {
                value: "completed",
                list: completedBookings,
                emptyMsg: "No completed sessions yet",
              },
              {
                value: "cancelled",
                list: cancelledBookings,
                emptyMsg: "No cancelled sessions",
              },
            ].map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="mt-6 space-y-4"
              >
                {tab.list.length > 0 ? (
                  tab.list.map((booking) => (
                    <Card
                      key={booking.id}
                      className="border-l-4 border-l-indigo-500 bg-white hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
                          <div className="space-y-3 flex-1">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {booking.student.name}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                <BookOpen className="w-4 h-4" />
                                <span>{booking.category.name}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                              <div className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded">
                                <Calendar className="w-4 h-4 text-indigo-600" />
                                <span>{formatDate(booking.date)}</span>
                              </div>
                              <div className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded">
                                <Clock className="w-4 h-4 text-indigo-600" />
                                <span>{booking.timeSlot}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-500">
                                <Mail className="w-3 h-3" />
                                <span className="text-xs">
                                  {booking.student.email}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={
                                booking.status === "COMPLETED"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : booking.status === "CONFIRMED"
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : "bg-red-50 text-red-700 border-red-200"
                              }
                            >
                              {booking.status} {/* Status always visible */}
                            </Badge>

                            {booking.status === "CONFIRMED" && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    Update
                                  </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                  align="end"
                                  className="w-40"
                                >
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleStatusChange(
                                        booking.id,
                                        "COMPLETED",
                                      )
                                    }
                                  >
                                    Mark Completed
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleStatusChange(
                                        booking.id,
                                        "CANCELLED",
                                      )
                                    }
                                  >
                                    Cancel
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-400 bg-white/30 rounded-lg border-2 border-dashed">
                    {tab.emptyMsg}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
