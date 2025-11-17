import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import SubEdit from "@/components/pages/SubEdit";
import Loader from "@/components/loader";

export default function EditorWithId() {
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

  return <SubEdit />;
}
