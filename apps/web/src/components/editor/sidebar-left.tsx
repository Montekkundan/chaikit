import React from 'react'
import { SidebarButton } from '../ui/sidebar-button';
import { Box } from 'lucide-react';
function SidebarLeft() {
  return (
    <div className="flex m-2 p-1 rounded-md bg-black w-64 flex-none flex-col items-start justify-between self-stretch  mobile:h-auto mobile:w-full mobile:flex-none">
    {/* <div className="flex w-full flex-col items-start gap-px bg-neutral-border">
      <div className="flex w-full items-start gap-px">
        <SidebarTile icon="FeatherWebhook" text="Webhook" />
        <SidebarTile icon="FeatherCalendar" text="Event" />
      </div>
      <div className="flex w-full items-start gap-px">
        <SidebarTile icon="FeatherZap" text="Trigger" />
        <SidebarTile icon="FeatherMail" text="Email" />
      </div>
      <div className="flex w-full items-start gap-px">
        <SidebarTile icon="FeatherShare2" text="Integration" />
        <SidebarTile icon="FeatherCode" text="Custom" />
      </div>
      <div className="flex w-full items-start gap-px">
        <SidebarTile icon="FeatherMessageSquare" text="SMS" />
        <SidebarTile icon="FeatherBot" text="AI" />
      </div>
    </div> */}
    <div className="flex w-full flex-col">
      <SidebarButton link="/template" icon={<Box/>} text="Templates" />
    </div>
  </div>
  )
}

export default SidebarLeft