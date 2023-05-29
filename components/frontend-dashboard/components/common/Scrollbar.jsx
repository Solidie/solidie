import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";

const ScrollAreaDemo = ({
  children,
  scrollAreaRootClassName,
  scrollAreaViewportClassName,
}) => {
  return (
    <ScrollArea.Root
      className={
        `ScrollAreaRoot w-full h-full min-h-max ${scrollAreaRootClassName ?? ""}` 
      }
    >
      <ScrollArea.Viewport
        className={`ScrollAreaViewport ${scrollAreaViewportClassName ?? ""}`}
      >
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="ScrollAreaScrollbar"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className="ScrollAreaScrollbar"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="ScrollAreaCorner" />
    </ScrollArea.Root>
  );
};

export default ScrollAreaDemo;
