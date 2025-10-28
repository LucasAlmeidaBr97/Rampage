import { useState } from "react";
import Footer from "../../../../Components/Footer/footer";
import Barra from "../../../../Components/Navbar/Navbar";
import siteService from "../../../../Services/SiteService/SiteService";
import authService from "../../../../auth/AuthService";
import useCheckoutService from "../../../../Services/CheckoutService";
import addressService from "../../../../Services/Address/AddressService";
import './RegisterAddres.css';
const RegisterAddress = () => {
  const [addressData, setAddressData] = useState({
    idUser: "",
    cep: "",
    uf: "",
    city: "",
    neighborhood: "",
    logradouro: "",
    number: "",
    complement: "",
    billingAddress: false, // Valor predefinido
    deliveryAddress: true, // Valor predefinido
    status: true, // Valor predefinido
    standard: false, // Valor predefinido
  });

  const {realizaCheckout} = useCheckoutService();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      addressData.idUser = authService.getIdUser();

      let newCep = addressData.cep.replace(/\D/g, "");

      // Aplica a máscara XXXXX-XXX
      if (newCep.length > 5) {
        newCep = newCep.replace(/(\d{5})(\d)/, "$1-$2");
      }

      addressData.cep = newCep;

      const data = await addressService.doPost(
        "/register-address",
        addressData
      );
      if (data) {
        if (data.status === 403) {
          alert("Erro ao cadastar.");
          return;
        }

        alert("Endereço cadastrado com sucesso.");

        realizaCheckout();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData({
      ...addressData,
      [name]: value,
    });
  };

  const handleBlur = async () => {
    const data = await siteService.getViaCepApi(addressData.cep);
    if (data) {
      setAddressData({
        cep: addressData.cep,
        uf: data.uf,
        city: data.localidade,
        neighborhood: data.bairro,
        logradouro: data.logradouro,
        number: addressData.number,
        complement: addressData.complement,
        billingAddress: false, // Valor predefinido
        deliveryAddress: true, // Valor predefinido
        status: true, // Valor predefinido
        standard: false, // Valor predefinido
      });
    }
  };

  return (
    <>
      <header>
        <Barra />
      </header>
      <main>
        <div className="main">
          <form onSubmit={handleSubmit}>
            <h2>Dados do Endereço</h2>
            <input
              type="text"
              name="cep"
              value={addressData.cep}
              onChange={handleAddressChange}
              placeholder="CEP"
              required
              onBlur={handleBlur}
            />
            <input
              type="text"
              name="uf"
              value={addressData.uf}
              onChange={handleAddressChange}
              placeholder="UF"
              required
              disabled
            />
            <input
              type="text"
              name="city"
              value={addressData.city}
              onChange={handleAddressChange}
              placeholder="Cidade"
              required
              disabled
            />
            <input
              type="text"
              name="neighborhood"
              value={addressData.neighborhood}
              onChange={handleAddressChange}
              placeholder="Bairro"
              required
              disabled
            />
            <input
              type="text"
              name="logradouro"
              value={addressData.logradouro}
              onChange={handleAddressChange}
              placeholder="Logradouro"
              required
              disabled
            />
            <input
              type="text"
              name="number"
              value={addressData.number}
              onChange={handleAddressChange}
              placeholder="Número"
              required
            />
            <input
              type="text"
              name="complement"
              value={addressData.complement}
              onChange={handleAddressChange}
              placeholder="Complemento"
            />

            <button type="submit" className="btn btn-register">Registrar</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RegisterAddress;
