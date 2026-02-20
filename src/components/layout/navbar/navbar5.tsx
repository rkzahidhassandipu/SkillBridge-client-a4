// components/Navbar/NavbarServer.tsx
import { userService } from "@/services/user.service";
import { NavbarClient } from "./NavbarClient";

interface NavbarServerProps {
  className?: string;
}

export default async function NavbarServer({ className }: NavbarServerProps) {
    const { data: session } = await userService.getSession();
  

  return <NavbarClient className={className} session={session} />;
}
