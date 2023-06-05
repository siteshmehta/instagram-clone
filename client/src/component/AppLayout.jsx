import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools"
import { Outlet } from "react-router-dom";
import Home from "./pages/home/Home";
import LeftSideNav from "./LeftSideNav";
import React from "react";


export default function AppLayout () {
    const queryClient = new QueryClient({
      defaultOptions : {
        queries : {
          cacheTime : 1000 * 60 // 60 sec.,
        }
      }
    });
    return (
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <div className="grid grid-cols-12 h-screen select-none">
            <section className="h-full col-span-2 border-1 border-r-slate-300">
              <LeftSideNav />
            </section>
            <section className="border-2 col-span-10 h-full max-h-screen overflow-y-scroll">
              <Home />
              <Outlet />
            </section>
          </div>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-left"/>
        </QueryClientProvider>
      </React.StrictMode>
    );
};