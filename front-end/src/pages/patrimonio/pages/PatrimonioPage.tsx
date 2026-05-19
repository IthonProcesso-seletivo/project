import { useNavigate } from "react-router-dom";
import { COLORS } from "../constants/colors";
import { BackButton } from "../components/layout/BackButton";
import { CardHeader } from "../components/patrimonio/CardHeader";
import { PatrimonioForm } from "../components/patrimonio/PatrimonioForm";
import { usePatrimonioForm } from "../hooks/usePatrimonioForm";
import Header from "../../../components/home/Header/NavBar";

export default function CadastrarPatrimonio() {
  const navigate = useNavigate();
  const {
    form,
    submitted,
    isValid,
    handleTipoChange,
    handleNomeChange,
    handleValorChange,
    handleSubmit,
  } = usePatrimonioForm();

  return (
    <div
      className="min-h-screen flex flex-col font-sans"
      style={{ background: COLORS.primaryLight }}
    >
      <Header />

      <div className="flex-1 flex items-center justify-center px-4 py-10 relative">
        <BackButton onClick={() => navigate(-1)} />

        <div className="bg-white rounded-2xl px-10 py-10 w-full max-w-md shadow-xl">
          <CardHeader />

          <PatrimonioForm
            form={form}
            submitted={submitted}
            isValid={isValid}
            onTipoChange={handleTipoChange}
            onNomeChange={handleNomeChange}
            onValorChange={handleValorChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
