import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
   <>
     <main className="min-h-screen container">
      <Header/>
      <Outlet/>
    </main>
    {/* Footer */}
    <div className="p-10 text-white text-center mt-10">
    Made with ❤️ by &copy; <span className="font-semibold">DeepDiveDevs</span>
    </div>
    

   </>
  );
};

export default AppLayout;
