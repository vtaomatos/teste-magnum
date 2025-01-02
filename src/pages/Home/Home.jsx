import { useState, useEffect } from "react";

function Home() {
  const [primeiroNome, setPrimeiroNome] = useState("");

  useEffect(() => {
    const contaString = localStorage.getItem("conta");

    if (contaString) {
      try {
        const conta = JSON.parse(contaString);
        if (conta && conta.primeiroNome) {
          setPrimeiroNome(conta.primeiroNome);
        }
      } catch (error) {
        console.error("Erro ao parsear o valor do localStorage:", error);
      }
    }
  }, []);

  return (
    <div>
      <h1>Bem-Vindo(a), {primeiroNome}!</h1>
    </div>
  );
}

export default Home;
