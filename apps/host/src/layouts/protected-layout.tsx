import { Outlet } from "@tanstack/react-router";
import { UserChangeListener } from "@trmf/auth-feature/user-provider";
import { TopNavbar } from "@trmf/shared-layout-feature/top-navbar/top-navbar";
import "@trmf/shared-layout-feature/styles.css";

export const ProtectedLayout = () => {
  return (
    <>
      <UserChangeListener />
      <TopNavbar />
      <div className="host:mx-auto host:max-w-xl host:p-2">
        <Outlet />
      </div>
    </>
  );
};
