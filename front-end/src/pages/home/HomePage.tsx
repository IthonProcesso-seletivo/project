
import DespesasPage from './../despesas/DespesasPage';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>

      <div className='bg-[#2D815D]'>
        <img src="" alt="Logo do site" />
      </div>
      <div>
        <Link to={HomePage}>Home</Link>
        <a href="HomePage">Home</a>
        <a href="DespesasPage">Despesas</a>
      </div>
      <h2>Olá pessoal</h2>

    </div>


  )
}

