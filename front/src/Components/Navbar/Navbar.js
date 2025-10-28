import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { BiCart, BiUser } from "react-icons/bi";
import { useEffect, useState } from "react";
import authService from "../../auth/AuthService";

// Menu dropdown separado em um componente funcional
const AccountDropdown = ({ showMenu, onClose, navigate, userLogado }) => {
  if (!showMenu) return null;

  const logado = () => (
    <>
      <li style={{ padding: "8px 0", cursor: "pointer" }} onClick={() => {
        navigate("/my-account");
        onClose();
      }}>
        <button>Minha Conta</button>
      </li>
      <li style={{ padding: "8px 0", cursor: "pointer" }} onClick={() => {
        navigate("/my-orders");
        onClose();
      }}>
        <button>Meus Pedidos</button>
      </li>
      <li style={{ padding: "8px 0", cursor: "pointer" }} onClick={async () => {
        await authService.logout();
        alert("Deslogado com sucesso.");
        onClose();
      }}>
        <button style={{ color: "red" }}>Logout</button>
      </li>
    </>
  );

  const naoLogado = () => (
    <>
      <li style={{ padding: "8px 0", cursor: "pointer" }} onClick={onClose}>
        <Link to={"/login_consumer"}>
          <button>Login</button>
        </Link>
      </li>
      <li style={{ padding: "8px 0", cursor: "pointer" }} onClick={onClose}>
        <Link to={"/user-cadastrar"}>
          <button>Registrar</button>
        </Link>
      </li>
    </>
  );

  return (
    <div style={{
      position: "absolute",
      top: "100%",
      left: 0,
      backgroundColor: "white",
      border: "1px solid #ccc",
      borderRadius: "5px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      padding: "10px",
      width: "150px",
      zIndex: 10,
    }}>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {userLogado ? logado() : naoLogado()}
      </ul>
    </div>
  );
};

const Barra = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [userLogado, setUserLogado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserStatus = async () => {
      const isAuthenticated = await authService.isAuthenticated();
      setUserLogado(isAuthenticated);
    };

    fetchUserStatus();
  }, []); // Aqui você está chamando o fetch uma vez, no momento da montagem do componente

  const toggleMenu = () => {
    setShowMenu(prevShowMenu => !prevShowMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <nav className="navbar section-content">
      <Link to={"/pagina-principal"}>
        <button className="nav-logo">
          <h2 className="logo-text">Rampage Store</h2>
        </button>
      </Link>
      <ul className="nav-menu">
        <button id="menu-close-button" className="fas fa-times" />
        <li className="nav-item">
          <Link to={"/pagina-principal"}>
            <button className="nav-link">HOME</button>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/pagina-principal"}>
            <button className="nav-link">SNEAKERS</button>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/pagina-principal"}>
            <button className="nav-link">ROUPAS</button>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/pagina-principal"}>
            <button className="nav-link">CONTATO</button>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/pagina-principal"}>
            <button className="nav-link">SOBRE NÓS</button>
          </Link>
        </li>
        <li className="nav-item" style={{ position: "relative" }}>
          <button className="nav-link" onClick={toggleMenu}>
            <BiUser />
            CONTA
          </button>

          <AccountDropdown
            showMenu={showMenu}
            onClose={closeMenu}
            navigate={navigate}
            userLogado={userLogado}
          />
        </li>
        <li className="nav-item">
          <Link to={"/cart"}>
            <button className="nav-link">
              <BiCart />
              CARRINHO
            </button>
          </Link>
        </li>
      </ul>
      <button id="menu-open-button" className="fas fa-bars" />
    </nav>
  );
};

export default Barra;
