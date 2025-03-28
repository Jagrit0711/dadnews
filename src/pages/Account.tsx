
import React from "react";
import { Layout } from "@/components/Layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Account = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-brutalist mb-6">My Account</h1>
        <div className="bg-card p-6 rounded-brutalist border-2 border-brutalist">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="w-24 h-24 border-2 border-brutalist">
              <AvatarFallback className="bg-brutalist text-white text-2xl">UD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-brutalist">User Demo</h2>
              <p className="text-muted-foreground">user@example.com</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-brutalist mb-4">Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-brutalist">
                <span>Receive Dad Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brutalist"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-brutalist">
                <span>Email News Digest</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brutalist"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
