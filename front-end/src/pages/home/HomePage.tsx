
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>

      <div className='bg-[#2D815D]'>
        <img src="" alt="Logo do site" />
      </div>
      <div>
        <Link className='bg-blue-100' to=''>Home</Link>
      </div>
      <h2>Olá pessoal</h2>

    </div>


  )
}

