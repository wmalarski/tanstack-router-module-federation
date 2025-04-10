import { Outlet } from "@tanstack/react-router";
import { TopNavbar } from "@trmf/shared-layout-feature/top-navbar";

export const ProtectedLayout = () => {
  return (
    <>
      Protected
      <TopNavbar />
      <Outlet />
    </>
  );
};
