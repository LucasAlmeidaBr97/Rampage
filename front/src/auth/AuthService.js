import LoginService from "./login";

class AuthService {
  static instance = null;

  constructor() {
    if (AuthService.instance) {
      return AuthService.instance;
    }

    AuthService.instance = this;
    this.authenticated = false;
    this._loginService = new LoginService();
  }

  async validateToken(){
    const token = this.getToken();
    if (token) {
      const data = await this._loginService.validateToken(token);
      return data;
    }

    return false;
  }

  async login(data) {
    const error = await this._loginService.login(data);
    
    if (error.length === 0) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }

    return error;
  }

  async loginConsumer(data) {
    const error = await this._loginService.loginConsumer(data);
    
    if (error.length === 0) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }

    return error;
  }

  async logout() {
    await this._logoutFunc();
    document.location = "/pagina-principal";
  }

  async logoutBackoffice() {
    await this._logoutFunc();
    document.location = "/";
  }

  async _logoutFunc() {
    this.authenticated = false;
    await this._loginService.logout();
  }

  getToken() {
    return localStorage.getItem("authToken");
  }

  getRole() {
    return localStorage.getItem("userRole");
  }

  getIdUser() {
    return localStorage.getItem("idUser");
  }

  async isAuthenticated() {
    const validToken = await authService.validateToken();
    this.authenticated = validToken;
    
    return this.authenticated;
  }

  isAdmin() {
    const role = localStorage.getItem('userRole');
    return role === "ADMIN"; 
  }

  async validaLoginConsumer(){
    const role = localStorage.getItem('userRole');
    return role === "CONSUMER"; 
  }

  async notAllowedLogin(){
    alert("Login não permitido.");
    await this._logoutFunc();
  }
}

const authService = new AuthService();
export default authService;
