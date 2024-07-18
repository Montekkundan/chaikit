"use client";

import { EditorTopBar } from "@/components/ui/editor-top-bar";
import { SidebarButton } from "@/components/ui/sidebar-button";
import { SidebarTile } from "@/components/ui/sidebar-title";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Broswer } from "@/components/browser";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { Box } from "lucide-react";

function FullPageEditor() {
  return (
    <div className="flex h-full w-full flex-col items-start bg-default-background">
      <EditorTopBar heading="slothmdx" />
      <div className="flex w-full grow shrink-0 basis-0 flex-wrap items-start mobile:flex-col mobile:flex-wrap mobile:gap-0">
        <div className="flex w-64 flex-none flex-col items-start justify-between self-stretch border-r border-solid border-neutral-border mobile:h-auto mobile:w-full mobile:flex-none">
          {/* <div className="flex w-full flex-col items-start gap-px border-b border-solid border-neutral-border bg-neutral-border">
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
        <div className="relative flex grow shrink-0 basis-0 flex-col items-center justify-center gap-2 self-stretch bg-neutral-50 mobile:border mobile:border-solid mobile:border-neutral-border mobile:pt-12 mobile:pr-12 mobile:pb-12 mobile:pl-12 overflow-hidden">
          <DotPattern className={cn("absolute inset-0 w-full h-full")} />
          <div className="mt-6 relative flex flex-col items-center justify-center gap-1">
            <Broswer />
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-caption-bold font-caption-bold text-default-font">
                Create your first flow
              </span>
              <span className="text-caption font-caption text-subtext-color">
                Drag-and-drop a step to start
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-80 flex-none flex-col items-start self-stretch border-l border-solid border-neutral-border mobile:h-auto mobile:w-full mobile:flex-none">
          <div className="flex w-full flex-col items-start">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullPageEditor;
