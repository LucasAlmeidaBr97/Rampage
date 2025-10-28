import { useNavigate, useLocation } from "react-router-dom";
import authService from "../auth/AuthService";

const useCheckoutService = () => {
  const navigate = useNavigate(); // useNavigate substitui useHistory
  const location = useLocation();

  const realizaCheckout = async() => {
    const logado = await authService.isAuthenticated(); 
    console.log(logado);

    if (logado) {
      redireciona();
    } else {
      abrirLogin();
    }
  };

  const redireciona = () => {
    const hasCheckoutEndereco =
      location.pathname === "/checkout/select-address";
    const hasCheckoutPagamento = location.pathname === "/checkout/payment";

    if (hasCheckoutEndereco) {
      abrirPaginaPagamento();
    } else if (hasCheckoutPagamento) {
      finalizaCheckout();
    } else {
      abrirPaginaEndereco();
    }
  };

  const abrirPaginaEndereco = () => {
    navigate("/checkout/select-address"); // Usando navigate para redirecionar
  };

  const abrirPaginaPagamento = () => {
    navigate("/checkout/payment"); // Usando navigate para redirecionar
  };

  const finalizaCheckout = () => {
    navigate("/order-summary"); // Usando navigate para redirecionar
  };

  const abrirLogin = () => {
    navigate("/checkout/login"); // Usando navigate para redirecionar
  };

  const cadastarEndereco = () => {
    navigate("/checkout/register-address"); // Usando navigate para redirecionar
  };

  return { realizaCheckout, cadastarEndereco, abrirPaginaEndereco, abrirPaginaPagamento };
};

export default useCheckoutService;
