import * as React from "react";
import { Controller, Control, ControllerRenderProps, ControllerFieldState, UseFormStateReturn } from "react-hook-form";

type RenderProps = {
  field: ControllerRenderProps<any, any>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<any>;
};

export function Form(props: React.PropsWithChildren<{}>) {
  return <>{props.children}</>;
}

export function FormField({
  name,
  control,
  render,
}: {
  name: string;
  control: Control<any>;
  render: (props: RenderProps) => React.ReactElement;
}) {
  return <Controller name={name} control={control} render={render} />;
}

export function FormItem(props: React.PropsWithChildren<{}>) {
  return <div className="space-y-1">{props.children}</div>;
}

export function FormLabel(props: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium">{props.children}</label>;
}

export function FormControl(props: React.PropsWithChildren<{}>) {
  return <>{props.children}</>;
}

export function FormMessage({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return <p className="text-red-500 text-sm">{children}</p>;
}
