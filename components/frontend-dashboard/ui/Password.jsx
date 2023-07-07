import * as React from "react";
import { cn } from "../../utilities/helpers.jsx";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

const InputPassword = React.forwardRef(({ className, ...props }, ref) => {
  const [type, setType] = React.useState("password");
  return (
    <div
      className={"flex-grow flex items-center w-full"}
    >
      <input
        type={type}
        className={cn(
          " space-x-2 flex w-full rounded-md border border-input bg-transparent px-5 py-3 items-center text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 Input ", className
          )}
        {...props}
        ref={ref}
      />
      {type === "password" ? (
        <EyeClosedIcon className={"cursor-pointer -ml-8".classNames()} onClick={() => setType("text")} />
      ) : (
        <EyeOpenIcon className={"cursor-pointer -ml-8".classNames()} onClick={() => setType("password")} />
      )}
    </div>
  );
});

// Input.displayName = "Input";

export default InputPassword;
