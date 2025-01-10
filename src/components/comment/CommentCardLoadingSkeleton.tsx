const CommentCardLoadingSkeleton = () => (
  <div className="animate-pulse bg-gray-200 p-4 rounded-lg shadow-md w-full">
    <div className="flex items-center mb-2">
      <div className="bg-gray-300 w-8 h-8 rounded-full mr-3"></div>
      <div className="flex-1 space-y-1">
        <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
        <div className="bg-gray-300 h-3 w-1/2 rounded"></div>
      </div>
    </div>
    <div className="bg-gray-300 h-3 w-full rounded mb-1"></div>
    <div className="bg-gray-300 h-3 w-5/6 rounded"></div>
  </div>
);

export default CommentCardLoadingSkeleton;
