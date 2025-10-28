import React, { useState } from 'react';
import UserTable from './UserTable';

function UsersList(){

    const [loading, setLoading] = useState(false); // Estado para controlar o carregamento dos dados
    const [error, setError] = useState(null); // Estado para armazenar erros, se houver
    const [users, setUsers] = useState([]); // Estado para armazenar os usuários

    // // Função para buscar usuários na API
    // const fetchUsers = async () => {
    //     setLoading(true); // Inicia o estado de carregamento
    //     try {
    //         const response = await fetch('http://localhost:8080/auth/listarUsuarios');
    //         if (!response.ok) {
    //             throw new Error('Erro ao buscar usuários');
    //         }
    //         const data = await response.json();
    //         setUsers(data); // Armazena os usuários recebidos
    //     } catch (error) {
    //         setError('Erro ao buscar usuários.');
    //         console.error('Erro ao buscar usuários:', error);
    //     } finally {
    //         setLoading(false); // Termina o estado de carregamento
    //     }
    // };

    // // Função chamada ao clicar no botão "Listar Usuários"
    // const handleListUsers = () => {
    //     fetchUsers(); // Busca os dados dos usuários
    // };

    return(
        <div>
            <h2>Lista de Usuários</h2>
            {loading && <p>Carregando usuários...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && <UserTable users={users} />} {/* Passa a lista de usuários para UserTable */}
        </div>
    )
}

export default UsersList;