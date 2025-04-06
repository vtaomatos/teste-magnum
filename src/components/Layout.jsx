// components/Layout.jsx
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.aside`
  width: 220px;
  background-color: #002d62;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`;

const MenuItem = styled(Link)`
  color: white;
  text-decoration: none;
  margin-bottom: 1.2rem;
  font-size: 1.1rem;

  &:hover {
    color: #66b2ff;
  }
`;

const Content = styled.main`
  flex: 1;
  background-color: #f4f6f8;
  padding: 2rem;
  overflow-y: auto;
`;

export default function Layout({ children }) {
  return (
    <Container>
      <Sidebar>
        <h2 style={{ marginBottom: '2rem' }}>Meu Banco</h2>
        <MenuItem to="/home">🏠 Home</MenuItem>
        <MenuItem to="/extrato">📄 Extrato</MenuItem>
        <MenuItem to="/transferencia">💸 Transferência</MenuItem>
        <MenuItem to="/pix">⚡ PIX</MenuItem>
        <MenuItem to="/logout">🚪 Sair</MenuItem>
      </Sidebar>
      <Content>{children}</Content>
    </Container>
  );
}
