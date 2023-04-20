import { Props } from "react-modal";

export interface ModalProps extends Props {
  size?: "ss" | "xs" | "sm" | "md" | "lg" | "xl";
}
