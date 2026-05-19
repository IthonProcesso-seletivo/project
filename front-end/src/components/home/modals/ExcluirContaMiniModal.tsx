import { COLORS } from "../shared/constants";

interface ExcluirContaMiniModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export const ExcluirContaMiniModal = ({ onClose, onConfirm }: ExcluirContaMiniModalProps) => (
  <div
    className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(3px)" }}
    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
  >
    <div className="bg-white rounded-2xl w-full max-w-xs shadow-2xl overflow-hidden">
      <div className="px-5 py-3.5 flex items-center justify-center" style={{ background: COLORS.primary }}>
        <h2 className="text-sm font-extrabold text-white tracking-wide uppercase">ATENCAO:</h2>
      </div>
      <div className="px-5 py-5 flex flex-col items-center gap-4">
        <p className="text-gray-800 font-semibold text-sm text-center">Excluir conta permanentemente?</p>
        <div className="flex gap-3 w-full">
          <button type="button" onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold transition-all duration-200 active:scale-95 hover:opacity-90"
            style={{ background: "#dc2626" }}>
            Confirmar
          </button>
          <button type="button" onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold transition-all duration-200 active:scale-95 hover:opacity-90"
            style={{ background: COLORS.primary }}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
);
