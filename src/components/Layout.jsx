// components/Layout.jsx
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, ArrowLeft } from 'lucide-react';

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const Sidebar = styled.aside`
  width: ${({ open }) => (open ? '220px' : '70px')};
  background-color: #5e2a84;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem 1rem;
  transition: width 0.3s;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ open }) => (open ? 'flex-start' : 'center')};
`;

const MenuItem = styled(Link)`
  color: white;
  text-decoration: none;
  margin-bottom: 1.2rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;

  &:hover {
    color: #caa8f5;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 2rem;

  &:hover {
    color: #caa8f5;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: white;
  margin-bottom: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Content = styled.main`
  flex: 1;
  background-color: #f4f6f8;
  padding: 2rem;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const showBackButton = location.pathname !== '/home';

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <Container>
      <Sidebar open={menuOpen}>
        <TopSection>
          {showBackButton && (
            <BackButton onClick={() => navigate(-1)}>
              <ArrowLeft size={20} style={{ marginRight: 8 }} />
              {menuOpen && 'Voltar'}
            </BackButton>
          )}

          <MenuItem to="/home" style={{ marginBottom: '2rem', fontWeight: 'bold', fontSize: '1.5rem' }}>
            Vi Bank
          </MenuItem>

          {menuOpen && (
            <>
              <MenuItem to="/home">🏠 Home</MenuItem>
              <MenuItem to="/extrato">📄 Extrato</MenuItem>
              <MenuItem to="/transferencia">💸 Transferência</MenuItem>
              <MenuItem to="/pix">⚡ PIX</MenuItem>
            </>
          )}
        </TopSection>

        <BottomSection open={menuOpen}>
          {menuOpen && (
            <LogoutButton onClick={handleLogout}>
              🚪 Sair
            </LogoutButton>
          )}
          <ToggleButton onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={24} />
          </ToggleButton>
        </BottomSection>
      </Sidebar>

      <Content>{children}</Content>
    </Container>
  );
}
