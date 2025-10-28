import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../auth/AuthService";
import LoginForm from "../../../Components/LoginForm/LoginForm";

function App() {
  // Estado para dados do formulário de login
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Função para lidar com mudanças nos campos de entrada
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Função para realizar o login
  const handleLogin = () => {
    authService.login(formData).then(async(error) => {
      console.log(error.length);

      if (error.length !== 0) setLoginError(error);
      else {
        const consumer = await authService.validaLoginConsumer();
        if (consumer){
          await authService.notAllowedLogin();
          return;
        }
        setIsAuthenticated(authService.isAuthenticated());
      }
    });
  };

  // Função para limpar os dados do formulário
  const handleCancel = () => {
    setFormData({ email: "", password: "" });
    setLoginError("");
  };

  // Navegação entre páginas
  const navigate = useNavigate();

  return (
    <div>
      {isAuthenticated ? (
        navigate("/back-home")
      ) : (
        <LoginForm
          handleLogin={handleLogin}
          handleCancel={handleCancel}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}
      {loginError && <p className="error">{loginError}</p>}
    </div>
  );
}

export default App;
