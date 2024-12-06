# **Simulando o App de um Banco**

## **Objetivo**
Este projeto é uma aplicação web que simula as funcionalidades de um banco financeiro. Foi desenvolvido usando **React** e **JSON Server** para oferecer uma experiência simples e funcional de gerenciamento financeiro.  

O sistema permite que os usuários:  
- Visualizem o saldo da conta.  
- Realizem transações financeiras, como **TED/PIX**.  
- Acompanhem o histórico completo das transações.  

---

## **Recursos e Tecnologias**
- **Frontend**: React.js (Vite)  
- **Backend Fake**: JSON Server  
- **Gerenciador de Pacotes**: npm ou yarn  
- **Controle de Versão**: Git  

---

## **Instruções para Execução Local - Fast Lane**
Se você já está familiarizado com as ferramentas, siga os passos abaixo para executar rapidamente o projeto em sua máquina:  

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/vtaomatos/teste-magnum.git
   ```
   > Caso não tenha o Git instalado, [baixe e instale o Git aqui](https://git-scm.com/downloads).  

2. **Navegue até o diretório do projeto**:
   ```bash
   cd teste-magnum
   ```

3. **Instale as dependências**:
   ```bash
   npm install
   ```
   > Se você não tem o Node.js (e npm) instalado, veja [como instalar o Node.js](https://nodejs.org/) antes de prosseguir.

4. **Inicie o frontend (React)**:
   ```bash
   npm run dev
   ```
   Acesse a aplicação no navegador através do link exibido no terminal (geralmente, `http://localhost:5173`).  

5. **Inicie o backend fake (JSON Server)**:
   Em um terminal separado, rode:
   ```bash
   npm run server
   ```
   O JSON Server será iniciado no endereço `http://localhost:3000`.  

---

## **Passo a Passo Detalhado para Iniciantes**

### **1. Instale as Ferramentas Necessárias**
- **Git**: Ferramenta para clonar o repositório. Baixe e instale pelo link [aqui](https://git-scm.com/downloads).  
- **Node.js**: Inclui o npm, que gerencia as dependências do projeto. Baixe e instale pelo link [aqui](https://nodejs.org/).  

Após instalar, verifique se as ferramentas foram configuradas corretamente:  
```bash
git --version
node -v
npm -v
```

### **2. Clone o Repositório**
Com o Git configurado, execute:  
```bash
git clone https://github.com/vtaomatos/teste-magnum.git
```

Entre no diretório do projeto:  
```bash
cd teste-magnum
```

### **3. Instale as Dependências**
Baixe todas as bibliotecas necessárias com o comando:  
```bash
npm install
```

### **4. Inicie o Projeto**
#### Frontend:
Rode o comando:
```bash
npm run dev
```
O terminal exibirá um link como este:  
```
http://localhost:5173
```
Acesse-o no navegador.

#### Backend Fake:
Em outro terminal, execute:
```bash
npm run server
```
Isso iniciará o **JSON Server** no endereço:  
```
http://localhost:3000
```

---

## **Estrutura do Projeto**
O projeto está organizado da seguinte forma:  

```
/src
  ├── /components       # Componentes reutilizáveis
  ├── /pages            # Páginas principais da aplicação
  ├── /services         # Integração com o JSON Server
  ├── /styles           # Estilos globais e utilitários
  └── App.jsx           # Componente principal
```

---

## **Principais Scripts**
Estes são os comandos disponíveis para facilitar o uso do projeto:  
- **`npm run dev`**: Inicia o servidor de desenvolvimento (React).  
- **`npm run server`**: Inicia o backend fake com JSON Server.  
- **`npm run build`**: Gera os arquivos para produção.  

---

## **Dicas e Solução de Problemas**
1. **Erro: "npm: command not found"**  
   - Certifique-se de que o Node.js está instalado corretamente. Teste com:  
     ```bash
     node -v
     npm -v
     ```

2. **Porta em Uso**  
   - Se o erro indicar que uma porta está ocupada, mude a porta do frontend no arquivo `vite.config.js` ou encerre processos usando o comando:  
     ```bash
     npx kill-port <porta>
     ```

3. **Backend Fake não responde**  
   - Verifique se o JSON Server está rodando no terminal correto e confirme que está na URL `http://localhost:3000`.

---

## **Contribuindo**
Contribuições são bem-vindas! Siga os passos abaixo:  
1. Faça um fork do repositório.  
2. Crie uma branch para sua feature:  
   ```bash
   git checkout -b feature/nova-feature
   ```
3. Envie um pull request explicando sua contribuição.  

---

## **Licença**
Este projeto é de código aberto e está licenciado sob os termos da [MIT License](LICENSE).  

---

Gostou? Dúvidas ou sugestões? Sinta-se à vontade para abrir uma [issue](https://github.com/vtaomatos/teste-magnum/issues)! 🚀  

--- 

Posso ajustar algo para ficar ainda mais com a sua cara?
