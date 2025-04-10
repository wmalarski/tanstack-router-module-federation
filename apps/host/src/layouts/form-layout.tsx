import { Outlet } from "@tanstack/react-router";

export const FormLayout = () => {
  return (
    <main className="host:mx-auto host:max-w-lg host:p-4 host:pt-20">
      <Outlet />
    </main>
  );
};
