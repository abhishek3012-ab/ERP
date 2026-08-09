import { Toaster as Sonner } from "sonner";

export const Toaster = () => {
  return (
    <Sonner
      theme="system"
      position="top-right"
      richColors
      closeButton
      expand
    />
  );
};
