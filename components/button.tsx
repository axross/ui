import { ComponentProps, FC, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const Button = forwardRef<
  HTMLButtonElement,
  ComponentProps<"button"> & {
    intent?: "neutral" | "positive" | "danger";
    importance?: "primary" | "secondary" | "tertiary";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
  }
>(
  (
    {
      className,
      intent = "neutral",
      importance = "primary",
      size = "md",
      disabled,
      loading = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        aria-busy={loading ? "true" : undefined}
        disabled={disabled || loading}
        className={twMerge(
          "dark:focus-visible:outline-offset-slate-900 inline-flex items-center justify-center rounded-md text-sm font-medium outline-none transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
          intent === "neutral" && importance === "primary" && "bg-blue-500",
          // variant === "neutral" &&
          //   "bg-slate-800 text-white hover:bg-slate-900 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-50",
          // variant === "destructive" && "bg-red-500 text-white hover:bg-red-600",
          // variant === "outline" &&
          //   "border border-slate-200 bg-transparent hover:bg-slate-500/5 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-500/10",
          // variant === "ghost" &&
          //   "bg-transparent text-slate-800 hover:bg-slate-500/[.15] dark:text-slate-100 dark:hover:bg-slate-500/20",
          size === "sm" && "h-8 px-3 text-xs",
          size === "md" && "h-10 px-4",
          size === "lg" && "h-11 px-8"
        )}
        ref={ref}
        {...props}
      >
        {loading ? <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" /> : null}

        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

const SpinnerIcon: FC<ComponentProps<"svg">> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};
