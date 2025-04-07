import { useState, useEffect } from "react";
import { consultaSaldoUsuarioLogado } from "../../services/consultaSaldoService";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Home() {
  const [primeiro_nome, setprimeiro_nome] = useState("");
  const [saldo, setSaldo] = useState(0);
  const [ocultarSaldo, setOcultarSaldo] = useState(false);

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
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Bem-Vindo(a), {primeiro_nome}!</h1>

      {/* Saldo com ícone de olho */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
        <h2 style={{ margin: 0 }}>
          Saldo: {ocultarSaldo ? "••••••" : saldo.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </h2>
        <button
          onClick={handleOcultarSaldo}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.4rem",
            color: "#6A0DAD" // roxo temático
          }}
          title={ocultarSaldo ? "Mostrar saldo" : "Ocultar saldo"}
        >
          {ocultarSaldo ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>

      <button onClick={() => navigate("/transferencia")}>Transferência</button>
      <button onClick={() => navigate("/pix")}>Pix</button>
      <button onClick={() => navigate("/extrato")}>Extrato</button>
    </div>
  );
}

export default Home;
