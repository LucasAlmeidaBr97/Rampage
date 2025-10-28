import React, { useState } from 'react';

function UpdateUserForm({ handleUpdate, handleCancel, currentUser }) {
    const [formData, setFormData] = useState({
        name: currentUser.name || '',
        cpf: currentUser.cpf || '',
        password: '',
        confirmPassword: '',
        role: currentUser.role || 'STOKIST'
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

     //Metodo para formatar o CPF e o input do CPF
     const handleCPFChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value.replace(/\D/g, '');
        if (formattedValue.length > 3) {
            formattedValue = formattedValue.slice(0, 3) + '.' + formattedValue.slice(3);
        }
        if (formattedValue.length > 7) {
            formattedValue = formattedValue.slice(0, 7) + '.' + formattedValue.slice(7);
        }
        if (formattedValue.length > 11) {
            formattedValue = formattedValue.slice(0, 11) + '-' + formattedValue.slice(11, 13);
        }
        setFormData({
            ...formData,
            [name]: formattedValue
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verifica se as senhas são iguais
        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        // Reseta a mensagem de erro se a validação for bem-sucedida
        setError('');

        // Chamando a função handleUpdate e passando o formData
        handleUpdate(formData)
            .then((message) => {
                alert(message);
            })
            .catch((err) => {
                console.error('Erro ao atualizar:', err);
                alert(err.message || 'Erro ao realizar atualização.');
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="Nome" 
                className="form-control" 
                required 
            />
            <input 
                type="text" 
                name="cpf" 
                value={formData.cpf} 
                onChange={handleCPFChange} 
                placeholder="CPF" 
                className="form-control" 
                required 
            />
            <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleInputChange} 
                placeholder="Senha" 
                className="form-control" 
                required 
            />
            <input 
                type="password" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleInputChange} 
                placeholder="Confirmar Senha" 
                className="form-control" 
                required 
            />
            <select 
                name="role" 
                value={formData.role} 
                onChange={handleInputChange} 
                className="form-control" 
                required
                disabled={currentUser.email === formData.email} // Desabilita a alteração de role se for o usuário logado
            >
                <option value="ADMIN">Administrador</option>
                <option value="STOKIST">Estoquista</option>
            </select>

            {/* Exibe a mensagem de erro se houver */}
            {error && <div className="alert alert-danger">{error}</div>}

            <div>
                <button type="submit" className="btn btn-primary">Atualizar</button>
                <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancelar</button>
            </div>
        </form>
    );
}

export default UpdateUserForm;
