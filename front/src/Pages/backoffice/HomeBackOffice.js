import { useNavigate } from "react-router-dom";
import authService from "../../auth/AuthService";

function HomeBackOffice() {
  // Função chamada ao clicar no botão "Listar Usuários"
  const handleListUsers = () => {
    navigate("/back-users-list");
  };

  // Função chamada ao clicar no botão "Listar Produtos"
  const handleListProducts = () => {
    navigate("/back-product-list");
  };

  const handleListOrders = () => {
    navigate("/back-order-list");
  };

  const handleLogout = () => {
    authService.logoutBackoffice();
  };

  // Navegação entre páginas
  const navigate = useNavigate();

  return (
    <div className="home-back-office">
      <h1>Bem-vindo ao Back Office</h1>
      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleListProducts} // Chama a função para listar produtos
        >
          Listar Produtos
        </button>
        {authService.isAdmin() ? (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleListUsers} // Chama a função para listar usuários
          >
            Listar Usuários
          </button>
        ) : (
          ""
        )}
        {!authService.isAdmin() ? (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleListOrders} // Chama a função para listar usuários
          >
            Listar Pedidos
          </button>
        ) : (
          ""
        )}

        <button
          type="button"
          className="btn btn-danger"
          onClick={handleLogout} // Chama a função para listar usuários
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default HomeBackOffice;
