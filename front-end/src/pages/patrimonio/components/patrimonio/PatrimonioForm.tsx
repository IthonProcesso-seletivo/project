import React from "react";
import { FormField } from "../ui/FormField";
import { TextInput } from "../ui/TextInput";
import { CurrencyInput } from "../ui/CurrencyInput";
import { SubmitButton } from "../ui/SubmitButton";
import { Dropdown } from "../ui/Dropdown";
import { TypeIcon, NameIcon, ValueIcon } from "../icons";
import type { FormState, PatrimonioTipo } from "../../types/patrimonio";

interface PatrimonioFormProps {
  form: FormState;
  submitted: boolean;
  isValid: boolean;
  onTipoChange: (v: PatrimonioTipo) => void;
  onNomeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export const PatrimonioForm = ({
  form,
  submitted,
  isValid,
  onTipoChange,
  onNomeChange,
  onValorChange,
  onSubmit,
}: PatrimonioFormProps) => (
  <div className="flex flex-col gap-5">
    <FormField label="Tipo" icon={<TypeIcon />}>
      <Dropdown value={form.tipo} onChange={onTipoChange} />
    </FormField>

    <FormField label="Nome" icon={<NameIcon />}>
      <TextInput
        value={form.nome}
        onChange={onNomeChange}
        placeholder="Digite o nome do patrimônio"
      />
    </FormField>

    <FormField label="Valor" icon={<ValueIcon />}>
      <CurrencyInput value={form.valor} onChange={onValorChange} />
    </FormField>

    <SubmitButton isValid={isValid} submitted={submitted} onClick={onSubmit} />
  </div>
);
