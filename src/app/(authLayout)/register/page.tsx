import { RegisterForm } from "@/components/register/RegisterForm";
import LoadingSpinner from "@/components/ui/LoadingSpinner/LoadingSpinner";
import { Suspense } from "react";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Suspense fallback={<LoadingSpinner />}>
        <RegisterForm />
      </Suspense>
    </div>
  );
};

export default RegisterPage;
