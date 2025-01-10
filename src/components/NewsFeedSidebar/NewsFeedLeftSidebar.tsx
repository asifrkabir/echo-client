import ProfileSidebarCard from "../user/ProfileSidebarCard";

const NewsFeedLeftSidebar = () => {
  return (
    <div className="flex flex-col space-y-4 h-full overflow-y-auto hide-scrollbar">
      <ProfileSidebarCard />
    </div>
  );
};

export default NewsFeedLeftSidebar;
