import React from 'react';

function LoginForm({ handleLogin, handleCancel, formData, handleInputChange }) {
    
    const handleKeyPress = (event) => {
        // Verifica se a tecla pressionada é "Enter"
        if (event.key === 'Enter') {
            // Simula o clique do botão ao apertar Enter
            document.getElementById("login-btn").click();
        }
    };

    return (
        <form>
            <input 
                type="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                name="email" 
                placeholder="Email" 
                className="form-control" 
                required
                onKeyDown={handleKeyPress}
            />
            <input 
                type="password" 
                value={formData.password} 
                onChange={handleInputChange} 
                name="password" 
                placeholder="Senha" 
                className="form-control" 
                required
                onKeyDown={handleKeyPress}
            />
            
            <div>
                <input 
                    type="button" 
                    value="Login" 
                    onClick={handleLogin} 
                    className="btn btn-primary"
                    id="login-btn"
                />
                <input 
                    type="button" 
                    value="Cancelar" 
                    onClick={handleCancel} 
                    className="btn btn-secondary"
                />
            </div>
        </form>
    );
}

export default LoginForm;
