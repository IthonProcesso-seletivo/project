import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import famigestaoLogo from "./assets/famigestao-logo.png";

export default function RegisterPage() {
  // Estados para as duas senhas independentes
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
   const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F2F6F2] flex flex-col items-center font-sans pb-12 relative">
      
      {/* HEADER */}
      <header className="w-full bg-[#2D815D] h-32 relative flex justify-center mb-24">
        
        {/* LOGO CONTAINER */}
        <div className="absolute top-full -translate-y-1/2 w-40 h-36 bg-[#2D815D] rounded-b-[36px] shadow-md overflow-hidden flex items-center justify-center">
          <img
            src={famigestaoLogo}
            alt="Famigestão"
            className="w-full h-full object-cover"
          />
        </div>
        
      </header>

      {/* CONTAINER RESPONSIVO DO BOTÃO DE VOLTAR */}
      <div className="w-full max-w-5xl px-6 md:px-12 absolute top-36 left-0 right-0 mx-auto pointer-events-none">
        <Link 
          to="/" 
          className="pointer-events-auto inline-flex bg-[#2D815D] w-10 h-10 rounded-full text-white hover:bg-[#2D815D] hover:opacity-90 transition shadow-md items-center justify-center"
          aria-label="Voltar para o login"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
      </div>

      {/* CONTEÚDO DO REGISTRO */}
      <div className="max-w-md w-full px-6 flex flex-col">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Registre-se
        </h1>

        <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
          
          {/* NOME */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-semibold text-sm ml-2">
              Nome:
            </label>
            <input
              className="w-full rounded-full bg-white px-6 py-3 shadow-sm outline-none border border-transparent focus:border-[#2D815D] transition-all text-gray-700"
              type="text"
              placeholder="Digite seu nome..."
            />
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-semibold text-sm ml-2">
              Email:
            </label>
            <input
              className="w-full rounded-full bg-white px-6 py-3 shadow-sm outline-none border border-transparent focus:border-[#2D815D] transition-all text-gray-700"
              type="email"
              placeholder="Digite seu email..."
            />
          </div>

          {/* SENHA */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-semibold text-sm ml-2">
              Senha:
            </label>
            <div className="relative">
              <input
                className="w-full rounded-full bg-white px-6 py-3 shadow-sm outline-none border border-transparent focus:border-[#2D815D] transition-all text-gray-700 pr-12"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha..."
              />
              {/* Botão do Olho */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-black/30 focus:outline-none hover:text-black/50 transition-colors"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644M12 4.945c-4.406 0-8.02 3.17-9.964 7.378a1.022 1.022 0 000 .846c1.944 4.208 5.558 7.378 9.964 7.378 4.406 0 8.02-3.17 9.964-7.378a1.022 1.022 0 000-.846c-1.944-4.208-5.558-7.378-9.964-7.378z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* CONFIRMAR SENHA */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-semibold text-sm ml-2">
              Confirmar Senha:
            </label>
            <div className="relative">
              <input
                className="w-full rounded-full bg-white px-6 py-3 shadow-sm outline-none border border-transparent focus:border-[#2D815D] transition-all text-gray-700 pr-12"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirme sua senha..."
              />
              {/* Botão do Olho */}
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-black/30 focus:outline-none hover:text-black/50 transition-colors"
              >
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644M12 4.945c-4.406 0-8.02 3.17-9.964 7.378a1.022 1.022 0 000 .846c1.944 4.208 5.558 7.378 9.964 7.378 4.406 0 8.02-3.17 9.964-7.378a1.022 1.022 0 000-.846c-1.944-4.208-5.558-7.378-9.964-7.378z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* BOTÃO CONCLUIR */}
          <div className="flex justify-center mt-4">
            <button 
            type="submit" 
            onClick={() => navigate("/home")}
            className="rounded-full bg-[#2D815D] text-white px-12 py-3 font-bold text-md hover:bg-[#2D815D] hover:opacity-90 transition shadow-md">
              Concluir Registro
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}