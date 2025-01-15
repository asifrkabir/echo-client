import PeopleYouMayKnow from "../follow/PeopleYouMayKnow";
import RecommendedGroupsSidebarCard from "../Group/RecommendedGroupsSidebarCard";

const NewsFeedRightSidebar = () => {
  return (
    <div className="flex flex-col space-y-4 h-full overflow-y-auto hide-scrollbar">
      <PeopleYouMayKnow />
      <RecommendedGroupsSidebarCard />
    </div>
  );
};

export default NewsFeedRightSidebar;
