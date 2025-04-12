import { Outlet } from "@tanstack/react-router";
import { UserChangeListener } from "@trmf/auth-feature/user-provider";
import { TopNavbar } from "@trmf/shared-layout-feature/top-navbar";

export const ProtectedLayout = () => {
  return (
    <>
      <UserChangeListener />
      Protected
      <TopNavbar />
      <Outlet />
    </>
  );
};
