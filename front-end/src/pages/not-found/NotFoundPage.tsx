import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-8 text-center">
        <h1 className="text-2xl font-bold mb-2">404</h1>
        <p className="text-gray-300 mb-6">
          Página não encontrada.
        </p>
        <Link
          to="/"
          className="rounded-xl bg-blue-600 px-4 py-3 font-semibold hover:bg-blue-500 transition inline-block"
        >
          Voltar para Home
        </Link>
      </div>
    </div>
  )
}

