import { Outlet } from "@tanstack/react-router";
import { TopNavbar } from "@trmf/shared-layout-feature/top-navbar";

export const FormLayout = () => {
  return (
    <>
      Form
      <TopNavbar />
      <Outlet />
    </>
  );
};
