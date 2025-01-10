import PostDataTableContainer from "@/components/post/PostDataTable/PostDataTableContainer";

const ContentManagementPage = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">
          Content Management
        </h1>
      </div>
      <div className="flex flex-1 justify-center rounded-lg border border-dashed shadow-sm">
        <PostDataTableContainer />
      </div>
    </main>
  );
};

export default ContentManagementPage;
