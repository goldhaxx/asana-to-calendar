"use client";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { CalendarView } from "@/components/calendar-view";
import { LandingPage } from "@/components/landing-page";
import { useAppContext } from "@/context/app-context";

export default function Home() {
  const { tasks } = useAppContext();

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-muted/40 p-4 md:p-6">
          <div className="mx-auto h-full max-w-7xl">
            {tasks.length === 0 ? (
              <LandingPage />
            ) : (
              <div className="bg-card border rounded-lg shadow-sm h-full p-4">
                <CalendarView />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
