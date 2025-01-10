import { LoginForm } from "@/components/login/LoginForm";
import LoadingSpinner from "@/components/ui/LoadingSpinner/LoadingSpinner";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Suspense fallback={<LoadingSpinner />}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default LoginPage;
