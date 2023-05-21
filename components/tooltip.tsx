"use client";

import {
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import {
  type ComponentProps,
  type FC,
  type ReactElement,
  type RefObject,
  useState,
  forwardRef,
} from "react";
import { twMerge } from "tailwind-merge";

export const Tooltip: FC<{
  renderReference: (
    props: ComponentProps<any> & { ref: RefObject<any> }
  ) => ReactElement;
  renderFloating: (
    props: ComponentProps<any> & { ref: RefObject<any> }
  ) => ReactElement;
}> & { Balloon: typeof TooltipBalloon } = ({
  renderReference,
  renderFloating,
}) => {
  const [isOpen, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: (...args) => {
      console.log("onOpenChange", ...args);

      setOpen(...args);
    },
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });
  const hover = useHover(context);
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);
  const { isMounted, styles } = useTransitionStyles(context);

  console.log({ isOpen, isMounted });

  return (
    <>
      {renderReference({ ...getReferenceProps(), ref: refs.setReference })}

      {isMounted
        ? renderFloating({
            ...getFloatingProps(),
            style: { ...floatingStyles, ...styles },
            ref: refs.setFloating,
          })
        : null}
    </>
  );
};
Tooltip.displayName = "Tooltip";

const TooltipBalloon = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return <div className={twMerge("", className)} {...props} ref={ref} />;
  }
);
TooltipBalloon.displayName = "TooltipBalloon";

Tooltip.Balloon = TooltipBalloon;
