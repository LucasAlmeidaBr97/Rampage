import React, { useEffect, useState } from 'react';
import RegisterForm from '../../../Components/RegisterForm/RegisterForm';
import UpdateUserForm from '../internalUser/UpdateUserForm';
import '../../../Css/UserTable.css'

function UserTable() {
    const [users, setUsers] = useState([]);
    const [showRegisterForm, setShowRegisterForm] = useState(false); // Estado para alternar entre tabela e formulário
    const [showUpdateForm, setShowUpdateForm] = useState(false);// Estado para alternar entre tabela e formulário de atualização
    const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de pesquisa
    const [currentUser, setCurrentUser] = useState(null);// Estado para armazenar o usuário a ser atualizado

    // Função para buscar usuários do backend com base no termo de pesquisa
    const fetchUsers = async (term = '') => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`http://localhost:8080/auth/nomeContem?term=${encodeURIComponent(term)}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    useEffect(() => {
        fetchUsers(); // Busca os usuários quando o componente é montado
    }, []);

    // Função para lidar com o envio do formulário de pesquisa
    const handleSearch = (e) => {
        e.preventDefault();
        fetchUsers(searchTerm); // Busca usuários com o termo de pesquisa
    };

    const handleAddUserClick = () => {
        setShowRegisterForm(true); // Mostra o formulário de registro
    };

    const handleRegister = async (formData) => {
        try {
            const token = localStorage.getItem('authToken')
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                fetchUsers(searchTerm); // Atualiza com base no termo de pesquisa atual
                setShowRegisterForm(false); // Volta para a tabela de usuários
                return data.message;
            } else {
                throw new Error(data.message)
            }
        } catch (error) {
            console.error('Erro ao enviar o formulário:', error);
            throw error;
        }
    };

    const handleCancel = () => {
        setShowRegisterForm(false); // Cancela o registro e retorna à tabela
        setShowUpdateForm(false); // Cancela a atualização e retorna à tabela
    };

    // Função para lidar com mudanças no campo de pesquisa
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Função para mudar o status do usuário
    const handleChangeStatus = async (user) => {
        try {
            const confirmChange = window.confirm(`Você tem certeza que deseja ${user.status ? 'desativar' : 'ativar'} o usuário ${user.name}?`);

        if (!confirmChange) {
            return; // Se o usuário cancelar, não faz nada
        }
            const token = localStorage.getItem('authToken')
            // Envia apenas o email para alterar o status
            const response = await fetch('http://localhost:8080/auth/mudarStatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ email: user.email }), // Envia apenas o email
            });
    
            if (response.ok) {
                fetchUsers(searchTerm); // Atualiza a lista de usuários após a mudança de status
            } else {
                console.error('Erro ao mudar o status do usuário');
            }
        } catch (error) {
            console.error('Erro ao mudar o status:', error);
        }
    };

    const handleUpdateClick = (user) => {
        setCurrentUser(user);
        setShowUpdateForm(true);
    };

    const handleUpdate = async (formData) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`http://localhost:8080/auth/updateUser/${currentUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                fetchUsers(searchTerm);
                setShowUpdateForm(false);
                return data.message;
            } else {
                throw new Error(data.message)
            }
        } catch (error) {
            console.error('Erro ao enviar o formulário:', error);
            throw error;
        }
    };

    if (showRegisterForm) {
        return <RegisterForm handleRegister={handleRegister} handleCancel={handleCancel} />;
    }

    if (showUpdateForm) {
        return <UpdateUserForm handleUpdate={handleUpdate} handleCancel={handleCancel} currentUser={currentUser} />;
    }

    return (
        <div>
            {/* Barra de pesquisa e botão de adicionar */}
            <div className="d-flex justify-content-between mb-3">
                <form onSubmit={handleSearch} className="w-50">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Pesquisar usuário..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button type="submit" className="btn btn-primary mt-2">
                        Pesquisar
                    </button>
                </form>
                <button
                    className="btn btn-primary mybtn"
                    onClick={handleAddUserClick} // Chama o formulário de registro
                >
                    + Adicionar Usuário
                </button>
            </div>

            {/* Tabela de usuários */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Grupo</th>
                        <th>Habilitar/Desabilitar</th>
                        <th>Alterar</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button
                                    onClick={() => handleChangeStatus(user)}
                                    className={user.status ? "btn btn-danger" : "btn btn-success"}
                                >
                                    {user.status ? "Desativar" : "Ativar"}
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleUpdateClick(user)}
                                    className="btn btn-warning"
                                >
                                    Alterar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;
