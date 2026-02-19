import { getAllUsers } from "@/actions/user.actions";
import UsersTableClient from "@/components/dashboard/users/UsersTableClient";
import { User } from "@/types/user";

// This is a Server Component
export default async function UsersManagementServer() {
  // Fetch data on the server
  const response = await getAllUsers();

  if (response.error) {
    return <div className="text-red-500">Error: {response.error.message}</div>;
  }

  const users: User[] = response.data;

  return (
    <div className="w-full min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Users Management</h1>

        {/* Server components can't use useState directly */}
        {/* We can hydrate client-side components for filters/table */}
        <UsersTableClient initialUsers={response.data || []} />
      </div>
    </div>
  );
}
