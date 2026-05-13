import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-8 text-center">
        <h1 className="text-2xl font-bold mb-3">Home</h1>
        <p className="text-gray-300 mb-6">
          Bem-vindo! Use o menu abaixo para navegar.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            className="rounded-xl bg-blue-600 px-4 py-3 font-semibold hover:bg-blue-500 transition"
            to="/login"
          >
            Ir para Login
          </Link>
          <Link
            className="rounded-xl bg-cyan-600 px-4 py-3 font-semibold hover:bg-cyan-500 transition"
            to="/register"
          >
            Criar conta
          </Link>
          <Link
            className="rounded-xl bg-emerald-600 px-4 py-3 font-semibold hover:bg-emerald-500 transition"
            to="/despesas"
          >
            Ver Despesas
          </Link>
          <Link
            className="rounded-xl bg-indigo-600 px-4 py-3 font-semibold hover:bg-indigo-500 transition"
            to="/patrimonio"
          >
            Ver Patrimônio
          </Link>
        </div>
      </div>
    </div>
  )
}

