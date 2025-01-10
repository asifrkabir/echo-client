const LoadingSpinner = () => {
  return (
    <div className="h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
    </div>
  );
};

export default LoadingSpinner;
