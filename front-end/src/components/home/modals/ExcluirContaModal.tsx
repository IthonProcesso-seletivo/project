import { useState } from "react";
import { COLORS } from "../shared/constants";
import { ExcluirContaMiniModal } from "./ExcluirContaMiniModal";

interface ExcluirContaModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export const ExcluirContaModal = ({ onClose, onConfirm }: ExcluirContaModalProps) => {
  const [showMini, setShowMini] = useState(false);

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(3px)" }}
        onClick={(e) => { if (e.target === e.currentTarget && !showMini) onClose(); }}
      >
        <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
          <div className="px-5 py-4 flex items-center justify-center" style={{ background: COLORS.primary }}>
            <h2 className="text-base font-extrabold text-white tracking-wide uppercase">ATENCAO:</h2>
          </div>
          <div className="px-6 py-6 flex flex-col items-center gap-5">
            <div className="text-center flex flex-col gap-2">
              <p className="text-gray-800 font-semibold text-sm">Excluir conta permanentemente?</p>
              <p className="text-gray-600 text-sm leading-relaxed hidden sm:block">
                Esta acao nao podera ser desfeita. Voce perdera todos os dados vinculados a este arquivo.
              </p>
            </div>
            <div className="flex gap-3 w-full">
              <button type="button" onClick={() => setShowMini(true)}
                className="flex-1 py-3 rounded-xl text-white text-sm font-bold transition-all duration-200 active:scale-95 hover:opacity-90"
                style={{ background: "#dc2626" }}>
                Confirmar
              </button>
              <button type="button" onClick={onClose}
                className="flex-1 py-3 rounded-xl text-white text-sm font-bold transition-all duration-200 active:scale-95 hover:opacity-90"
                style={{ background: COLORS.primary }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
      {showMini && <ExcluirContaMiniModal onClose={() => setShowMini(false)} onConfirm={onConfirm} />}
    </>
  );
};
