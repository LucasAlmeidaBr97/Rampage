import React, { useEffect, useState } from "react";
import authService from "../../../auth/AuthService";
import Footer from "../../../Components/Footer/footer";
import Barra from "../../../Components/Navbar/Navbar";
import addressService from "../../../Services/Address/AddressService";
import userService from "../../../Services/UserService";
import RegisterNewAddress from "./RegisterNewAddress";
import UpdateUserData from "./UpdateUserData";

const MyAccount = () => {
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false); // Estado para alternar entre tabela e formulário de atualização
  const [addAddress, setAddAddress] = useState(false); // Estado para alternar entre tabela e formulário de atualização

  useEffect(() => {
    const fetch = async () => {
      await attPage();
    };
    fetch();
  }, []);

  const attPage = async () => {
    await attUser();
    await attAddress();
  };

  const attUser = async () => {
    const userGet = await userService.getUserById(authService.getIdUser());
    if (userGet) setUser(userGet);
    else alert("Erro ao pegar dados do usuario.");
  };

  const attAddress = async () => {
    const addressGet = await addressService.getAddressByIdUser(
      authService.getIdUser()
    );
    if (addressGet) setAddress(addressGet);
    else alert("Erro ao pegar endereços do usuario.");
  };

  const handleCancel = () => {
    setShowUpdateForm(false);
    setAddAddress(false);
  };

  const handleUpdate = async (formData) => {
    try {
      const data = await userService.editUser(formData);

      if (!data) {
        setShowUpdateForm(false);
        alert("Dados alterados com sucesso!");
        attPage();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      throw error;
    }
  };

  const handleNewAddress = () => {
    setAddAddress(false);
    attPage();
  };

  if (showUpdateForm) {
    return (
      <UpdateUserData
        handleUpdate={handleUpdate}
        handleCancel={handleCancel}
        currentUser={user}
      />
    );
  }

  if (addAddress) {
    return (
      <RegisterNewAddress
        handleAddAddress={handleNewAddress}
        handleCancel={handleCancel}
      />
    );
  }

  const handleDefinirPadrao = async (address) => {
    await addressService.definirPadrao(address);
    alert("Endereço padrão redefinido com sucesso!");
    attPage();
  };

  const getAddresses = () => {
    return (
      <>
        {address.map((add) => {
          return (
            <div key={add.id} className="row mb-4 border-left">
              <div className="d-flex">
                <p className="col-9">
                  {add.logradouro}, {add.number}, {add.complement}
                </p>
                <span className="col-3">
                  {add.standard ? (
                    "(PADRÃO)"
                  ) : (
                    <a
                      href="#"
                      onClick={() => handleDefinirPadrao(add)}
                      className=""
                    >
                      definir padrão
                    </a>
                  )}
                </span>
              </div>
              <div className="d-flex">
                <p className="col-9">
                  {add.neighborhood}, {add.uf}, {add.city}
                </p>
                <span className="col-3">
                  {add.billingAddress ? "(FATURAMENTO)" : ""}
                </span>
              </div>
              <div className="d-flex">
                <p>{add.cep}</p>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <header>
        <Barra />
      </header>
      <main>
        <div className="main">
          <div className="container">
            <div className="row">
              <div
                className="col-12 col-sm-12 col-lg-6 col-xl-6"
                style={{ height: "600px" }}
              >
                <div className="row">
                  <h4>Minha conta</h4>
                </div>

                {user ? (
                  <div className="p-2" style={{ height: "400px" }}>
                    <div className="row">
                      <div className="form-control border-0">
                        <label>Nome</label>
                        <input
                          className="form-control"
                          type="text"
                          value={user.name}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-control border-0">
                        <label>CPF</label>
                        <input
                          className="form-control"
                          type="text"
                          value={user.cpf}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-control border-0">
                        <label>Email</label>
                        <input
                          className="form-control"
                          type="text"
                          value={user.email}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-control border-0">
                        <label>Gênero</label>
                        <input
                          className="form-control"
                          type="text"
                          value={user.gender}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-control border-0">
                        <label>Nascimento</label>
                        <input
                          className="form-control"
                          type="date"
                          value={user.birthDate}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>Carregando usuario ...</p>
                )}

                <div className="row mt-3 mb-3">
                  <div className="form-control border-0 d-flex justify-content-center">
                    <button
                      className="btn btn-primary col-9"
                      onClick={() => {
                        setShowUpdateForm(true);
                      }}
                    >
                      Editar Dados
                    </button>
                  </div>
                </div>
              </div>

              <div
                className="col-12 col-sm-12 col-lg-6 col-xl-6"
                style={{ height: "600px" }}
              >
                <div className="row">
                  <h4>Meus Endereços</h4>
                </div>
                <div
                  className="container p-2 w-100 overflow-y-auto overflow-x-hidden"
                  style={{ height: "400px" }}
                >
                  {address.length === 0 ? (
                    <p>Nenhum endereço adicionado.</p>
                  ) : (
                    getAddresses()
                  )}
                </div>
                <div className="row mt-3 mb-3">
                  <div className="form-control border-0 d-flex justify-content-center">
                    <button
                      className="btn btn-primary col-9"
                      onClick={() => {
                        setAddAddress(true);
                      }}
                    >
                      Adicionar Endereço
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default MyAccount;
