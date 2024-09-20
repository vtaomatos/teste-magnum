import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cadastro from '../Pages/Cadastro/Cadastro';
import Login from '../Pages/Login/Login';
import Home from '../Pages/Home/Home';
import Extrato from '../Pages/Extrato/Extrato';
import Transferencia from '../Pages/Transferencia/Transferencia';
import PaginaNaoEncontrada from '../pages/PaginaNaoEncontrada/PaginaNaoEncontrada';
import Protetor from './Protetor';
import { LoginProvider } from '../context/LoginContext';

function Rotas() {

  return (
    <>
      <LoginProvider>
        <Router>
          <Routes>
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={
              <Protetor>
                <Home />
              </Protetor>
            } />
            <Route path="/extrato" element={<Extrato />} />
            <Route path="/transferencia" element={<Transferencia />} />
            <Route path="/*" element={<PaginaNaoEncontrada />} />
          </Routes>
        </Router>
      </LoginProvider>
    </>
  )
}

export default Rotas
