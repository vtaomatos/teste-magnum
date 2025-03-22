import { useState, useEffect } from "react";
import { consultaSaldoUsuarioLogado } from "../../services/consultaSaldoService";
import { useNavigate } from "react-router-dom";

function Home() {
  const [primeiroNome, setPrimeiroNome] = useState("");
  const [saldo, setSaldo] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const contaString = localStorage.getItem("conta");

    if (contaString) {
      try {
        const conta = JSON.parse(contaString);
        if (conta?.primeiroNome) {
          setPrimeiroNome(conta.primeiroNome);
        }
      } catch (error) {
        console.error("Erro ao parsear o valor do localStorage:", error);
      }
    }

    async function fetchSaldo() {
      try {
        const saldoAtual = await consultaSaldoUsuarioLogado();
        setSaldo(saldoAtual);
      } catch (error) {
        console.error("Erro ao buscar saldo:", error);
      }
    }

    fetchSaldo();
  }, []);

  return (
    <div>
      <h1>Bem-Vindo(a), {primeiroNome}!</h1>
      <h2>Saldo: {saldo.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</h2>

      <button onClick={() => navigate("/transferencia")}>Transferência</button>
      <button onClick={() => navigate("/pix")}>Pix</button>
    </div>
  );
}

export default Home;
