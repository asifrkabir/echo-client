import { Button } from "../ui/button";
import ProfileSidebarCard from "../user/ProfileSidebarCard";

const NewsFeedLeftSidebar = () => {
  return (
    <div className="flex flex-col space-y-4 h-full overflow-y-auto hide-scrollbar">
      <ProfileSidebarCard />
      <Button>Left Sidebar Item 2</Button>
      <Button>Left Sidebar Item 3</Button>
    </div>
  );
};

export default NewsFeedLeftSidebar;
