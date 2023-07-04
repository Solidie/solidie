import * as React from "react";
import { cn } from "../../utilities/helpers.jsx";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex w-full rounded-md border border-input bg-transparent px-5 py-3 items-center text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 Input theme-light",
        className
      )}
      {...props}
      ref={ref}
    />
  );
});

// Input.displayName = "Input";

export default Input;
