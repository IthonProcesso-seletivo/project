import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './pages/home/pages/HomePage'
import LoginPage from './pages/login/LoginPage'
import RegisterPage from './pages/register/RegisterPage'
import DespesasPage from './pages/despesas/DespesasPage'
import PatrimonioPage from './pages/patrimonio/pages/PatrimonioPage'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/despesas" element={<DespesasPage />} />
        <Route path="/patrimonio" element={<PatrimonioPage />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App

