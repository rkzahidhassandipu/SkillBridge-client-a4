import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { ROLES } from "./constants/roles";
import { getTutor } from "./actions/profile.actions";

export const proxy = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  const { data } = await userService.getSession();

  const tutorRes = await getTutor();
  const TutorData = tutorRes.data?.profile;
  const userId  = TutorData?.userId;

  const id  = data.user.id;

  if (!data || !data.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = data.user;
  const role = user.role;


  const isTutorOwner =
    userId && id && String(id) === String(userId);

  // 🔒 3. Block specific tutor routes
  if (
    pathname.startsWith("/tutor-dashboard/availability") ||
    pathname.startsWith("/tutor-dashboard/bookings")
  ) {
    if (!isTutorOwner) {
      return NextResponse.redirect(
        new URL("/tutor-dashboard/profile?toast=profile-required", request.url)
      );
    }
  }


  
  if (role === ROLES.ADMIN) {
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/tutor-dashboard")
    ) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (role === ROLES.USER) {
    if (
      pathname.startsWith("/admin-dashboard") ||
      pathname.startsWith("/tutor-dashboard")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (role === ROLES.TUTOR) {
    if (
      pathname.startsWith("/admin-dashboard") ||
      pathname.startsWith("/dashboard")
    ) {
      return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/tutor-dashboard",
    "/tutor-dashboard/:path*",
  ],
};
