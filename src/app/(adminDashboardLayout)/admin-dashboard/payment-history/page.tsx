import PaymentDataTableContainer from "@/components/payment/PaymentDataTable/PaymentDataTableContainer";

const PaymentHistoryPage = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Payment History</h1>
      </div>
      <div className="flex flex-1 justify-center rounded-lg border border-dashed shadow-sm">
        <PaymentDataTableContainer />
      </div>
    </main>
  );
};

export default PaymentHistoryPage;
