import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SubDashboard from "@/components/pages/DashBoard";
export default function Dashboard() {
  const { data: session, isPending } = authClient.useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session && !isPending) {
      navigate("/login");
    }
  }, [session, isPending, navigate]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return <SubDashboard />;
}
