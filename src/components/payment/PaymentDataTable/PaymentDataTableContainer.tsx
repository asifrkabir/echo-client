"use client";

import LoadingSpinner from "@/components/ui/LoadingSpinner/LoadingSpinner";
import { useGetAllPayments } from "@/hooks/payment.hook";
import PaymentDataTable from "./PaymentDataTable";

const PaymentDataTableContainer = () => {
  const { data: paymentData, isLoading } = useGetAllPayments();

  if (!paymentData?.data || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full">
      <PaymentDataTable payments={paymentData.data} />
    </div>
  );
};

export default PaymentDataTableContainer;
