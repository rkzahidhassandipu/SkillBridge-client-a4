import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Users,
  UserCheck,
  Calendar,
  Clock,
  CheckCircle,
  ListChecks,
  DollarSign,
  TrendingUp,
} from "lucide-react";

import { getAllUsers } from "@/actions/user.actions";
import { User } from "@/types/user";

export default async function DashboardPage() {
  // Fetch users on the server
  const response = await getAllUsers();

  if (response.error) {
    return <div className="text-red-500">Error: {response.error.message}</div>;
  }

  const users: User[] = response.data;

  // Calculate totals
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "ACTIVE").length;

  const stats = [
    { label: "Total Users", value: totalUsers, icon: Users, bg: "bg-blue-100", text: "text-blue-700" },
    { label: "Active Users", value: activeUsers, icon: UserCheck, bg: "bg-green-100", text: "text-green-700" },
    { label: "Total Bookings", value: 0, icon: Calendar, bg: "bg-purple-100", text: "text-purple-700" },
    { label: "Pending Bookings", value: 0, icon: Clock, bg: "bg-yellow-100", text: "text-yellow-700" },
    { label: "Approved Bookings", value: 0, icon: CheckCircle, bg: "bg-teal-100", text: "text-teal-700" },
    { label: "Completed Bookings", value: 0, icon: ListChecks, bg: "bg-indigo-100", text: "text-indigo-700" },
    { label: "Total Revenue", value: "$0.00", icon: DollarSign, bg: "bg-pink-100", text: "text-pink-700" },
    { label: "Monthly Revenue", value: "$0.00", icon: TrendingUp, bg: "bg-orange-100", text: "text-orange-700" },
  ];

  const activities = [
    {
      message: "New user registered: Admin User",
      time: "2/14/2026, 4:12:52 PM",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className={`${stat.bg} shadow-sm`}>
                <CardHeader className="flex items-center gap-3">
                  <Icon className={`w-6 h-6 ${stat.text}`} />
                  <CardTitle className={`text-sm font-semibold ${stat.text}`}>
                    {stat.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-2xl font-bold ${stat.text}`}>{stat.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-md shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <ul className="space-y-2">
            {activities.map((a, idx) => (
              <li key={idx} className="flex justify-between text-sm">
                <span>{a.message}</span>
                <span className="text-gray-500">{a.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
