import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './pages/home/HomePage'
import LoginPage from './pages/login/LoginPage'
import RegisterPage from './pages/register/RegisterPage'
import DespesasPage from './pages/despesas/DespesasPage'
import PatrimonioPage from './pages/patrimonio/PatrimonioPage'
import NotFoundPage from './pages/not-found/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/despesas" element={<DespesasPage />} />
        <Route path="/patrimonio" element={<PatrimonioPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

