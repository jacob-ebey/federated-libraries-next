import React from 'react';
import AppShell from '../../components/app-shell';
import navItems from "../../nav-items";

export default function GetStartedRedirect(props) {
  return (
    <AppShell
      menuItems={navItems.menuItems}
      secondaryMenuItems={navItems.secondaryMenuItems}
      heading={() => (<h1>videos</h1>)}
    >
      <p>testing testing</p>

    </AppShell>
  );
}
