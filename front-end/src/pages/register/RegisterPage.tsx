import { Link } from 'react-router-dom'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold mb-2">Cadastro</h1>
        <p className="text-gray-300 mb-6">Tela de cadastro (placeholder).</p>

        <form className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm text-gray-300">Nome</span>
            <input
              className="rounded-xl bg-gray-900 px-4 py-3 outline-none"
              type="text"
              placeholder="Seu nome"
            />
          </label>

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
              placeholder="Crie uma senha"
            />
          </label>

          <button
            type="button"
            className="rounded-xl bg-cyan-600 px-4 py-3 font-semibold hover:bg-cyan-500 transition"
          >
            Criar conta
          </button>
        </form>

        <p className="text-gray-300 text-sm mt-6">
          Já tem conta?{' '}
          <Link className="text-cyan-300 hover:underline" to="/login">
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  )
}

