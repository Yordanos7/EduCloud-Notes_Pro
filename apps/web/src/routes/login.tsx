import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Login() {
  const [searchParams] = useSearchParams();
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    // Check if signin query param is present
    if (searchParams.get("signin") === "true") {
      setShowSignIn(true);
    }
  }, [searchParams]);

  return showSignIn ? (
    <SignInForm onSwitchToSignUp={() => setShowSignIn(false)} />
  ) : (
    <SignUpForm onSwitchToSignIn={() => setShowSignIn(true)} />
  );
}
