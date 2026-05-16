import { Link } from 'react-router-dom'


export default function PatrimonioPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Patrimônio</h1>
          <Link
            className="rounded-xl bg-gray-800 px-4 py-2 font-semibold hover:bg-gray-700 transition"
            to="/"
          >
            Voltar
          </Link>
        </div>

        <div className="bg-gray-800 rounded-2xl shadow p-6">
          <p className="text-gray-300">
            Visão/painel de patrimônio (placeholder).
          </p>
        </div>
      </div>
    </div>
  )
}

