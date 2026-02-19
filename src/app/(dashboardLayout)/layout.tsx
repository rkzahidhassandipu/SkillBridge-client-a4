import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ROLES } from "@/constants/roles";
import { userService } from "@/services/user.service";

export default async function Layout({
  ADMIN,
  USER,
  TUTOR,
}: {
  ADMIN: React.ReactNode;
  USER: React.ReactNode;
  TUTOR: React.ReactNode;
}) {
  const { data } = await userService.getSession();

  if (!data) return null; // or redirect("/login")

  const userInfo = data.user;

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4">
          {userInfo.role === ROLES.ADMIN && ADMIN}
          {userInfo.role === ROLES.USER && USER}
          {userInfo.role === ROLES.TUTOR && TUTOR}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
