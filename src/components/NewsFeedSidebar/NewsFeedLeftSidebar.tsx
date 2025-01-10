import { Button } from "../ui/button";

const NewsFeedLeftSidebar = () => {
  return (
    <div className="flex flex-col space-y-4 h-full overflow-y-auto hide-scrollbar">
      <Button>Left Sidebar Item 1</Button>
      <Button>Left Sidebar Item 2</Button>
      <Button>Left Sidebar Item 3</Button>
    </div>
  );
};

export default NewsFeedLeftSidebar;
