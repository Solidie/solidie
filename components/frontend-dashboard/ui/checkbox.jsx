import React from "react"
import { Root as CheckboxRoot, Indicator } from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "../../utilities/helpers.jsx"

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxRoot
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </Indicator>
  </CheckboxRoot>
))

export default Checkbox;