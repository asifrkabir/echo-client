import { Metadata } from "next";
import { Suspense } from "react";
import { ForgotPasswordForm } from "./_components/ForgotPasswordForm";
import LoadingSpinner from "../../../components/ui/LoadingSpinner/LoadingSpinner";

export const metadata: Metadata = {
  title: "Forgot Password",
};

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Suspense fallback={<LoadingSpinner />}>
        <ForgotPasswordForm />
      </Suspense>
    </div>
  );
};

export default ForgotPasswordPage;
