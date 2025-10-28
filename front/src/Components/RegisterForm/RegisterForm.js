import React, { useState } from 'react';

function RegisterForm({ handleRegister, handleCancel }) {
    const [formData, setFormData] = useState({
        name: '',
        birthDate: '',
        cpf: '',
        email: '',
        password: '',
        gender: '',
        confirmPassword: '', // Novo campo para confirmação de senha
        role: ''
    });

    const [error, setError] = useState(''); // Estado para armazenar mensagens de erro

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    //Metodo para formatar a data e o input da data
    const handleDateChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        if (formattedValue.length > 2) {
            formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
        }
        if (formattedValue.length > 5) {
            formattedValue = formattedValue.slice(0, 5) + '/' + formattedValue.slice(5, 9);
        }
        setFormData({
            ...formData,
            [name]: formattedValue
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

        // Chamando a função handleRegister e passando o formData
        handleRegister(formData)
            .then((message) => {
                alert(message);
            })
            .catch((err) => {
                console.error('Erro ao cadastrar:', err);
                alert(err.message);
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
                name="birthDate" 
                value={formData.birthDate} 
                onChange={handleDateChange} 
                placeholder="Data de Nascimento (dd/mm/aaaa)" 
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
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                placeholder="Email" 
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
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className='form-control'
                required
            >
                 <option value="" disabled>Gênero</option>
                <option value="female">Feminino</option>
                <option value="male">Masculino</option>
                <option value="non-binary">Não-binário</option>
                <option value="other">Outro</option>
                <option value="prefer-not-to-say">Prefiro não dizer</option>
            </select>
            <select 
                name="role" 
                value={formData.role} 
                onChange={handleInputChange} 
                className="form-control" 
                required
            >
                <option value="" disabled>Selecione o grupo deste usuário</option>
                <option value="ADMIN">Administrador</option>
                <option value="STOKIST">Estoquista</option>
            </select>

            {/* Exibe a mensagem de erro se houver */}
            {error && <div className="alert alert-danger">{error}</div>}

            <div>
                <button type="submit" className="btn btn-primary">Registrar</button>
                <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancelar</button>
            </div>
        </form>
    );
}

export default RegisterForm;
