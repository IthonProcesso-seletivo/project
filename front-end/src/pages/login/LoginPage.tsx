import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold mb-2">Login</h1>
        <p className="text-gray-300 mb-6">Tela de login (placeholder).</p>

        <form className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm text-gray-300">Email</span>
            <input
              className="rounded-xl bg-gray-900 px-4 py-3 outline-none"
              type="email"
              placeholder="seuemail@exemplo.com"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-gray-300">Senha</span>
            <input
              className="rounded-xl bg-gray-900 px-4 py-3 outline-none"
              type="password"
              placeholder="••••••••"
            />
          </label>

          <button
            type="button"
            className="rounded-xl bg-blue-600 px-4 py-3 font-semibold hover:bg-blue-500 transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-gray-300 text-sm mt-6">
          Não tem conta?{' '}
          <Link className="text-blue-300 hover:underline" to="/home">
            Criar agora
          </Link>
        </p>
      </div>
    </div>
  )
}

