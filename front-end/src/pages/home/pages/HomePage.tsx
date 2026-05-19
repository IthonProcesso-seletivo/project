import { useState } from "react";
import { Trash2 , Wallet} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../../../components/home/Header/NavBar";

import type {GastoFixo , GastoVariavel , PatrimonioItem}  from "../components/shared/types";

import { GastosFixosModal } from "../components/modals/GastosFixosModal";
import { GastosVariaveisModal } from "../components/modals/GastosVariaveisModal";
import { ExcluirContaModal } from "../components/modals/ExcluirContaModal";
import { InserirSaldoModal } from "../components/modals/InserirSaldoModal";
import type { SaldoFamiliar } from "../components/modals/InserirSaldoModal";

import { Card, AddButton } from "../components/cards/Card";
import { GastosFixosContent } from "../components/cards/GastosFixosContent";
import { GastosVariaveisContent } from "../components/cards/GastosVariaveisContent";
import { PatrimonioContent } from "../components/cards/PatrimonioContent";
import { SalarioGastoContent } from "../components/cards/SalarioGastoContent";

import { SaldoDonutChart } from "../components/charts/SaldoDonutChart";

import { COLORS } from "../components/shared/constants";

const parseBRL = (valor: string): number =>
  parseFloat(valor.replace(/[R$\s.]/g, "").replace(",", ".")) || 0;

export default function FamigestaoHome() {
  const patrimonio: PatrimonioItem[] = [
    { valor: "R$1.000.000,00", tipo: "Casa", nome: "Helena" },
    { valor: "R$100.000,00", tipo: "Carro", nome: "Ricardo" },
  ];

  const [gastosFixos, setGastosFixos] = useState<GastoFixo[]>([
    { nome: "Ricardo", categoria: "Telefone", valor: "R$400,00", parcelas: "3 / 12" },
    { nome: "Lucas", categoria: "Faculdade", valor: "R$900,00", parcelas: "2 / 6" },
  ]);

  const [gastosVariaveis, setGastosVariaveis] = useState<GastoVariavel[]>([
    { nome: "Zilma", categoria: "Almoco", valor: "R$400,00" },
    { nome: "Helena", categoria: "Shopping", valor: "R$900,00" },
  ]);

  // Saldos por familiar — começa vazio, usuário insere via modal
  const [saldos, setSaldos] = useState<SaldoFamiliar[]>([]);

  const [showModalFixos, setShowModalFixos] = useState(false);
  const [showModalVariaveis, setShowModalVariaveis] = useState(false);
  const [showModalExcluir, setShowModalExcluir] = useState(false);
  const [showModalSaldo, setShowModalSaldo] = useState(false);

  // Soma de todos os saldos inseridos como total disponível
  const totalSalario = saldos.reduce((s, f) => s + f.saldo, 0);

  const totalGasto =
    [...gastosFixos, ...gastosVariaveis].reduce((s, g) => s + parseBRL(g.valor), 0);

  const handleSwitchToVariavel = () => {
    setShowModalFixos(false);
    setShowModalVariaveis(true);
  };

  const handleSwitchToFixo = () => {
    setShowModalVariaveis(false);
    setShowModalFixos(true);
  };

  const handleConfirmarExclusao = () => {
    setShowModalExcluir(false);
    console.log("Conta excluida");
  };

  const handleAddSaldo = (s: SaldoFamiliar) => {
    setSaldos((prev) => {
      // Se já existe o familiar, atualiza o saldo; senão adiciona
      const exists = prev.findIndex((f) => f.nome === s.nome);
      if (exists >= 0) {
        const updated = [...prev];
        updated[exists] = s;
        return updated;
      }
      return [...prev, s];
    });
  };

  // Botão "Inserir Saldo" — reutilizado em mobile e desktop
  const BotaoSaldo = () => (
    <button
      onClick={() => setShowModalSaldo(true)}
      className="flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5  bg-green-700 rounded-xl shadow transition-all duration-200 active:scale-95 hover:opacity-90"
    >
      <Wallet size={15} /> Inserir Saldo
    </button>
  );

  return (
    <div className="min-h-screen bg-[#e8f0ea] font-['DM_Sans',sans-serif]">
      <Link to="/"><Header /></Link>

      {showModalFixos && (
        <GastosFixosModal
          onClose={() => setShowModalFixos(false)}
          onAdd={(g) => setGastosFixos((prev) => [...prev, g])}
          onSwitchToVariavel={handleSwitchToVariavel}
        />
      )}
      {showModalVariaveis && (
        <GastosVariaveisModal
          onClose={() => setShowModalVariaveis(false)}
          onAdd={(g) => setGastosVariaveis((prev) => [...prev, g])}
          onSwitchToFixo={handleSwitchToFixo}
        />
      )}
      {showModalExcluir && (
        <ExcluirContaModal
          onClose={() => setShowModalExcluir(false)}
          onConfirm={handleConfirmarExclusao}
        />
      )}
      {showModalSaldo && (
        <InserirSaldoModal
          onClose={() => setShowModalSaldo(false)}
          onAdd={handleAddSaldo}
        />
      )}

      {/* MOBILE */}
      <main className="lg:hidden p-4 flex flex-col gap-4 max-w-md mx-auto">
        <Card title="Salário Restante">
          <SaldoDonutChart total={totalSalario} gasto={totalGasto} />
            <BotaoSaldo />
        </Card>
        <Card title="Salário Gasto">
          <SalarioGastoContent
            gastosFixos={gastosFixos}
            gastosVariaveis={gastosVariaveis}
            totalSalario={totalSalario}
          />
        </Card>
        <Card title="Gastos Fixos">
          <GastosFixosContent gastosFixos={gastosFixos} />
          <AddButton label="Adicionar Gastos Fixos" onClick={() => setShowModalFixos(true)} />
        </Card>
        <Card title="Gastos Variáveis">
          <GastosVariaveisContent gastosVariaveis={gastosVariaveis} />
          <AddButton label="Adicionar Gastos Variáveis" onClick={() => setShowModalVariaveis(true)} />
        </Card>
        <Card title="Patrimônio">
          <PatrimonioContent patrimonio={patrimonio} />
          <Link to="/patrimonio"><AddButton label="Adicionar Patrimônio" /></Link>
        </Card>
        <div className="flex justify-between pb-2">
          <button
            onClick={() => setShowModalExcluir(true)}
            className="flex items-center gap-2 bg-green-700 hover:bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow transition-all duration-200 active:scale-95"
          >
            <Trash2 size={15} /> Excluir Conta
          </button>
        </div>
      </main>

      {/* DESKTOP */}
      <main
        className="hidden lg:grid p-5 gap-4 max-w-5xl mx-auto"
        style={{ gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "auto auto" }}
      >
        <Card title="Patrimônio" className="row-span-2">
          <PatrimonioContent patrimonio={patrimonio} />
          <Link to="/patrimonio"><AddButton label="Adicionar Patrimônio" /></Link>
        </Card>
        <Card title="Gastos Fixos">
          <GastosFixosContent gastosFixos={gastosFixos} />
          <AddButton label="Adicionar Gastos Fixos" onClick={() => setShowModalFixos(true)} />
        </Card>
        <Card title="Salário Restante">
          <SaldoDonutChart total={totalSalario} gasto={totalGasto} />
          <BotaoSaldo />
        </Card>
        <Card title="Gastos Variáveis">
          <GastosVariaveisContent gastosVariaveis={gastosVariaveis} />
          <AddButton label="Adicionar Gastos Variáveis" onClick={() => setShowModalVariaveis(true)} />
        </Card>
        <Card title="Salário Gasto">
          <SalarioGastoContent
            gastosFixos={gastosFixos}
            gastosVariaveis={gastosVariaveis}
            totalSalario={totalSalario}
          />
        </Card>
      </main>

      <div className="hidden lg:flex justify-between px-5 pb-5 max-w-5xl mx-auto">
      
        <button
          onClick={() => setShowModalExcluir(true)}
          className="flex items-center gap-2 bg-green-700 hover:bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow transition-all duration-200 active:scale-95"
        >
          <Trash2 size={15} /> Excluir Conta
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}
