import { Button } from "../ui/button";

const NewsFeedRightSidebar = () => {
  return (
    <div className="flex flex-col space-y-4 h-full overflow-y-auto hide-scrollbar">
      <Button>Right Sidebar Item 1</Button>
      <Button>Right Sidebar Item 2</Button>
      <Button>Right Sidebar Item 3</Button>
    </div>
  );
};

export default NewsFeedRightSidebar;
