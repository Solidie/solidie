import React from "react"
import { Root, Image, Fallback } from "@radix-ui/react-avatar"

import { cn } from "../../utilities/helpers.jsx"

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))

export { Avatar, AvatarImage, AvatarFallback }