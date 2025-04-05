import { useState, useEffect } from "react";
import { consultaSaldoUsuarioLogado } from "../../services/consultaSaldoService";
import { useNavigate } from "react-router-dom";

function Home() {
  const [primeiro_nome, setprimeiro_nome] = useState("");
  const [saldo, setSaldo] = useState(0);
  const [ocultarSaldo, setOcultarSaldo] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const contaString = localStorage.getItem("conta");

    if (contaString) {
      try {
        const conta = JSON.parse(contaString);
        if (conta?.primeiro_nome) {
          setprimeiro_nome(conta.primeiro_nome);
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


  const handleOcultarSaldo = () => {
    setOcultarSaldo(!ocultarSaldo);
  }

  return (
    <div>
      <h1>Bem-Vindo(a), {primeiro_nome}!</h1>
      <h2>Saldo: {(ocultarSaldo) ? "*****" : saldo.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</h2>
      <span><button onClick={() => handleOcultarSaldo()}>{ocultarSaldo ? "Mostrar Saldo" : "Ocultar Saldo"}</button></span>

      <button onClick={() => navigate("/transferencia")}>Transferência</button>
      <button onClick={() => navigate("/pix")}>Pix</button>
      <button onClick={() => navigate("/extrato")}>Extrato</button>

    </div>
  );
}

export default Home;
