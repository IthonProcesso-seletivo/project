import { PlusCircle } from "lucide-react";

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ title, children, className = "" }: CardProps) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3 ${className}`}>
    <div className="flex justify-center">
      <span className="bg-green-700 text-white text-sm font-semibold px-6 py-2 rounded-xl tracking-wide shadow-sm w-full text-center">
        {title}
      </span>
    </div>
    {children}
  </div>
);

interface AddButtonProps {
  label: string;
  onClick?: () => void;
}

export const AddButton = ({ label, onClick }: AddButtonProps) => (
  <button
    onClick={onClick}
    className="mt-auto flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 active:scale-95 text-white text-sm font-semibold py-2.5 rounded-xl w-full transition-all duration-150 shadow-sm"
  >
    {label} <PlusCircle size={16} />
  </button>
);
