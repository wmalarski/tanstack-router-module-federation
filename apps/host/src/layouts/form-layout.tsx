import { Outlet } from "@tanstack/react-router";
import { UserChangeListener } from "@trmf/auth-feature/user-provider";

export const FormLayout = () => {
  return (
    <>
      <UserChangeListener />
      <main className="host:mx-auto host:max-w-lg host:p-4 host:pt-20">
        <Outlet />
      </main>
    </>
  );
};
