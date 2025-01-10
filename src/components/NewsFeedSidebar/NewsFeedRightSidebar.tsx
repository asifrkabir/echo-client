import PeopleYouMayKnow from "../follow/PeopleYouMayKnow";

const NewsFeedRightSidebar = () => {
  return (
    <div className="flex flex-col space-y-4 h-full overflow-y-auto hide-scrollbar">
      <PeopleYouMayKnow />
    </div>
  );
};

export default NewsFeedRightSidebar;
