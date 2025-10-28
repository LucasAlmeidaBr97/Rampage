import React, { useState } from "react";
import Footer from "../../../Components/Footer/footer";
import Barra from "../../../Components/Navbar/Navbar";

function UpdateUserData({ handleUpdate, handleCancel, currentUser }) {
  const [formData, setFormData] = useState({
    id: currentUser.id,
    name: currentUser.name,
    birthDate: currentUser.birthDate,
    gender: currentUser.gender,
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica se as senhas são iguais
    if (formData.password) {
      if (formData.password !== formData.confirmPassword) {
        setError("As senhas não coincidem.");
        return;
      }
    }

    // Reseta a mensagem de erro se a validação for bem-sucedida
    setError("");

    // Chamando a função handleUpdate e passando o formData
    handleUpdate(formData);
  };

  return (
    <>
      <header>
        <Barra />
      </header>
      <main>
        <div className="main"></div>
        <h2>Editar dados</h2>
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
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            placeholder="Nascimento"
            className="form-control"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="form-control"
            required
          >
            <option value="MASCULINO">Masculino</option>
            <option value="FEMININO">Feminino</option>
          </select>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Senha"
            className="form-control"
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirmar Senha"
            className="form-control"
          />

          {/* Exibe a mensagem de erro se houver */}
          {error && <div className="alert alert-danger">{error}</div>}

          <div>
            <button type="submit" className="btn btn-primary">
              Atualizar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default UpdateUserData;
