import { useState } from "react";
import type { FormState, PatrimonioTipo } from "../types/patrimonio";

const EMPTY_FORM: FormState = { tipo: "", nome: "", valor: "" };

const formatCurrency = (raw: string): string => {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  const num = parseFloat(digits) / 100;
  return num.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export function usePatrimonioForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const isValid =
    form.tipo !== "" && form.nome.trim() !== "" && form.valor !== "";

  const handleTipoChange = (v: PatrimonioTipo) =>
    setForm((f) => ({ ...f, tipo: v }));

  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, nome: e.target.value }));

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, valor: formatCurrency(e.target.value) }));

  const handleSubmit = () => {
    if (!isValid) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm(EMPTY_FORM);
    }, 2500);
  };

  return {
    form,
    submitted,
    isValid,
    handleTipoChange,
    handleNomeChange,
    handleValorChange,
    handleSubmit,
  };
}
