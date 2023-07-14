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
        `ScrollAreaRoot w-full h-full min-h-max`.classNames(null, scrollAreaRootClassName ?? "")
      }
    >
      <ScrollArea.Viewport
        className={`ScrollAreaViewport ${scrollAreaViewportClassName ?? ""}`}
      >
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className={"ScrollAreaScrollbar".classNames()}
        orientation="vertical"
      >
        <ScrollArea.Thumb className={"ScrollAreaThumb".classNames()} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className={"ScrollAreaScrollbar".classNames()}
        orientation="horizontal"
      >
        <ScrollArea.Thumb className={"ScrollAreaThumb".classNames()} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className={"ScrollAreaCorner".classNames()} />
    </ScrollArea.Root>
  );
};

export default ScrollAreaDemo;
