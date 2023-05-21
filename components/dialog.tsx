import useMergedRef from "@react-hook/merged-ref";
import {
  ReactNode,
  forwardRef,
  useLayoutEffect,
  useRef,
  ForwardedRef
} from "react";
import { twMerge } from "tailwind-merge";

declare module "react" {
  interface HTMLDialogElement {
    open: boolean;
  }
}

export interface DialogProps<Value> {
  open?: boolean;
  defaultReturnValue?: Value;
  onRequestClose?: (returnValue: Value) => void;
  className?: string;
  children?: ReactNode;
}

const DialogImpl = (
  {
    open,
    defaultReturnValue,
    onRequestClose = () => undefined,
    className,
    children,
    ...props
  }: DialogProps<any>,
  ref: ForwardedRef<HTMLDialogElement>
) => {
  const internalRef = useRef<HTMLDialogElement>(null);
  const mergedRef = useMergedRef(internalRef, ref);

  useLayoutEffect(() => {
    const dialog = internalRef.current;

    const onClose = async () => {
      await Promise.allSettled(dialog!.getAnimations().map((a) => a.finished));
    };

    dialog?.addEventListener("close", onClose);

    return () => dialog?.removeEventListener("close", onClose);
  }, []);

  useLayoutEffect(() => {
    const dialog = internalRef.current;

    if (open && !dialog!.open) {
      dialog!.showModal();
    }

    if (!open && dialog!.open) {
      dialog!.close();
    }
  }, [open]);

  return (
    <dialog
      onClick={(e) => {
        if (e.target === internalRef.current && onRequestClose !== undefined) {
          onRequestClose(defaultReturnValue);
        }
      }}
      className={twMerge(
        'fixed grid inset-0 max-w-[min(50vw,100%)] max-h-[min(50vh,100%)] m-auto p-0 bg-white dark:bg-gray-900 border-none rounded-md drop-shadow text-gray-700 dark:text-gray-200 invisible open:visible transition-all duration-150 animate-out open:animate-in fade-out open:fade-in slide-out-to-bottom-0 open:slide-in-from-bottom-10 zoom-out-90 open:zoom-in-90',
        'backdrop:bg-black/10 backdrop:backdrop-blur-0 open:backdrop:backdrop-blur-sm backdrop:transition-all backdrop:duration-150 backdrop:animate-out open:backdrop:animate-in backdrop:fade-out open:backdrop:fade-in',
        className
      )}
      ref={mergedRef}
      {...props}
    >
      <div>{children}</div>
    </dialog>
  );
};

/**
 * A primitive dialog component. Use this component to extend and make more specific components.
 */
export const Dialog = forwardRef(DialogImpl) as <Value>(
  props: DialogProps<Value> & { ref?: ForwardedRef<HTMLDialogElement> }
) => ReturnType<typeof DialogImpl>;
