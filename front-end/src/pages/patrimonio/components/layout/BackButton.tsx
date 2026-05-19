import { COLORS } from "../../constants/colors";
import { ArrowLeftIcon } from "../icons";

interface BackButtonProps {
  onClick: () => void;
}

export const BackButton = ({ onClick }: BackButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute top-8 left-8 w-10 h-10 rounded-xl border bg-white flex items-center justify-center"
    style={{ borderColor: COLORS.primaryBorder }}
  >
    <ArrowLeftIcon />
  </button>
);
