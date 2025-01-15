import JoinedGroupsSidebarCard from "../Group/JoinedGroupsSidebarCard";
import MyGroupsSidebarCard from "../Group/MyGroupsSidebarCard";
import ProfileSidebarCard from "../user/ProfileSidebarCard";

const NewsFeedLeftSidebar = () => {
  return (
    <div className="flex flex-col space-y-4 h-full overflow-y-auto hide-scrollbar">
      <ProfileSidebarCard />
      <MyGroupsSidebarCard />
      <JoinedGroupsSidebarCard />
    </div>
  );
};

export default NewsFeedLeftSidebar;
