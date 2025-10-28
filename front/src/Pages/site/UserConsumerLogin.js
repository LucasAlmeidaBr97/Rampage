import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useCheckoutService from "../../Services/CheckoutService";
import authService from "../../auth/AuthService";

const UserConsumerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { realizaCheckout } = useCheckoutService();

  const handleLogin = async () => {
    setLoading(true);
    setLoginError("");

    const formData = { email, password }; // Cria o objeto de dados a ser enviado

    try {
      const error = await authService.loginConsumer(formData);
      console.log(error);

      if (!error) {
        const consumer = await authService.validaLoginConsumer();
        if (!consumer){
          await authService.notAllowedLogin();
          return
        }
        const logado =await authService.isAuthenticated();
        if (logado) {
          const hasCheckout = location.pathname === "/checkout/login";
          if (hasCheckout) realizaCheckout();
          else navigate("/pagina-principal");
        } else {
          setLoginError("Falha no login. Verifique suas credenciais.");
        }
      } else {
        setLoginError(error || "Falha no login.");
      }
    } catch (error) {
      setLoginError("Erro ao conectar com o servidor.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEmail("");
    setPassword("");
    navigate('/pagina-principal');
  };
 

  return (
    <div style={{textAlign: "center"}}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Email"
            className="form-control"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Senha"
            className="form-control"
            required
          />
        </div>
        {loginError && <div className="error">{loginError}</div>}
        <div>
          <input
            type="submit"
            value={loading ? "Carregando..." : "Login"}
            className="btn btn-primary"
            disabled={loading} // Desabilita o botão enquanto está carregando
          />
          <input
            type="button"
            value="Cancelar"
            onClick={handleCancel}
            className="btn btn-secondary"
          />
        </div>
      </form>
      <div>
        <Link to={"/user-cadastrar"}>
          <button className="btn">
            Não tem conta? Cadastre-se aqui
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserConsumerLogin;
