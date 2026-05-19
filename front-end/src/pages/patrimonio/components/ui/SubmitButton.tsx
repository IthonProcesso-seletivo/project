import { COLORS } from "../../constants/colors";
import { CheckIcon } from "../icons";

interface SubmitButtonProps {
  isValid: boolean;
  submitted: boolean;
  onClick: () => void;
}

export const SubmitButton = ({ isValid, submitted, onClick }: SubmitButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={!isValid}
    className="w-full py-4 mt-1 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2.5 tracking-wide border-none transition-all duration-200"
    style={
      isValid
        ? {
            background: `linear-gradient(135deg, ${COLORS.primaryDark}, ${COLORS.primary})`,
            cursor: "pointer",
          }
        : {
            background: "#d1d5db",
            cursor: "not-allowed",
          }
    }
  >
    {submitted ? "Cadastrado com sucesso!" : "Confirmar Cadastro"}
    <CheckIcon />
  </button>
);
