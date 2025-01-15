"use client";

import * as React from "react";

import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { UserDashboardSidebarMenu } from "./UserDashboardSidebarMenu";

const UserDashboardSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <UserDashboardSidebarMenu />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export default UserDashboardSidebar;
