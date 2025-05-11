import { cn } from "../lib/utils";

export const Fieldset = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return <div className={cn("flex flex-col gap-6", className)} {...props} />;
};

export const FieldsetRow = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return <div className={cn("grid gap-2", className)} {...props} />;
};

export const FieldsetLabels = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-2",
        className,
      )}
      {...props}
    />
  );
};
