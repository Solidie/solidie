import React from "react"
import { Root } from "@radix-ui/react-separator"

import { cn } from "../../utilities/helpers.jsx"

const Separator = React.forwardRef((
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)

export default Separator