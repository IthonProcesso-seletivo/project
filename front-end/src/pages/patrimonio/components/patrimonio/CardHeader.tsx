import { COLORS } from "../../constants/colors";
import { BoxIcon } from "../icons";

export const CardHeader = () => (
  <div className="text-center mb-7">
    <div
      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
      style={{
        background: COLORS.primaryLight,
        border: `2px solid ${COLORS.primaryBorder}`,
      }}
    >
      <BoxIcon />
    </div>
    <h1 className="text-xl font-bold text-gray-800 tracking-tight">
      Cadastrar Patrimônio
    </h1>
    <p className="text-sm text-gray-500 mt-2">
      Preencha as informações para adicionar um novo patrimônio.
    </p>
  </div>
);
