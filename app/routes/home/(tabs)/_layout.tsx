import React from "react";

import TabLayoutComponent from "@/app/ui/layouts/tab-layout/TabLayoutComponent";
import { TabBarVisibilityProvider } from "@/app/ui/layouts/tab-layout/contexts/TabBarVisibilityContext";

export default function TabLayout() {
  return (
    <TabBarVisibilityProvider>
      <TabLayoutComponent />
    </TabBarVisibilityProvider>
  );
}
