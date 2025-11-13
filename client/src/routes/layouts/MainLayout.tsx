import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { NavSidebar } from "~/components/nav/NavSidebar";
import { ModalProvider } from "~/components/providers/ModalProvider";
import { QueryProvider } from "~/components/providers/QueryProvider";
import { ThemeProvider } from "~/components/providers/ThemeProvider";
import { addAccessTokenInterceptor } from "~/lib/api";
import "@fontsource-variable/manrope";
import { useModal } from "~/hooks/useModalStore";

export const MainLayout = () => {
  const { isLoading, getAccessTokenSilently, user } = useAuth0();
  const { onOpen } = useModal();

  useEffect(() => {
    addAccessTokenInterceptor(getAccessTokenSilently);
  }, [getAccessTokenSilently]);

  useEffect(() => {
    if (
      !isLoading &&
      user?.picture?.startsWith("https://s.gravatar.com/avatar")
    ) {
      onOpen("postRegistration");
    }
  }, [isLoading, onOpen, user]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading ...
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <QueryProvider>
        <div className="h-full">
          <div className="fixed inset-y-0 z-30 hidden h-full w-[72px] flex-col md:flex">
            <NavSidebar />
          </div>
          <main className="h-full bg-secondary md:pl-[72px]">
            <ModalProvider />
            <Outlet />
          </main>
        </div>
      </QueryProvider>
    </ThemeProvider>
  );
};
