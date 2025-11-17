import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Collaborate from "@/components/pages/Collaborate";
import Loader from "@/components/loader";

export default function CollaboratePage() {
  const { data: session, isPending } = authClient.useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session && !isPending) {
      navigate("/login");
    }
  }, [session, isPending, navigate]);

  if (isPending) {
    return <Loader />;
  }

  if (!session) {
    return null;
  }

  return <Collaborate />;
}
