import { useEffect, useState } from "react";
import authService from "../../../../auth/AuthService";
import "./SelectAddress.css";
import Barra from "../../../../Components/Navbar/Navbar";
import Footer from "../../../../Components/Footer/footer";
import useCheckoutService from "../../../../Services/CheckoutService";
import addressService from "../../../../Services/Address/AddressService";

const SelectAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const idClient = authService.getIdUser();

      const data = await addressService.doGetById(
        "/indicate-all-delivery-address",
        idClient
      );

      if (data) {
        setAddresses(data);
        data.forEach((address) => {
          if(address.standard) {
            selectAddress(address);
            setSelectedAddress(address);
          }
        });
      }
    };

    fetch();
  }, []);

  const { cadastarEndereco, realizaCheckout } = useCheckoutService();

  const addAdress = () => {
    cadastarEndereco();
  };
  const retomarCheckout = () => {
    realizaCheckout();
  };

  const selectAddress = async (address) => {
    setSelectedAddress(address)    
    addressService.setAddressSelected(address);
  }

  return (
    <>
      <header>
        <Barra />
      </header>
      <main>
        <div className="main h-100 w-100">
          <div className="row mb-4">
            <div>
              <div className="container endderecos">
                {addresses.map((address, index) => {
                  return (
                    <div className="row" key={index}>
                      <div>
                        <input
                          className="col-1 m-auto"
                          type="radio"
                          name="enderecos"
                          id={`endereco-${index}`}
                          value={index}
                          onChange={() => selectAddress(address)}
                          checked={address === selectedAddress}
                        />
                        <label
                          className="col-10 mb-4 ps-3 border-left"
                          htmlFor={`endereco-${index}`}
                        >
                          <div className="row">
                            <p className="col-6">Cep: {address.cep}, </p>
                            <span className="col-1">
                              {address.standard ? "(PADRÃO)" : ""}
                            </span>
                          </div>
                          <p>
                            {address.logradouro} {address.number},
                            {address.complement}
                          </p>
                          <p>
                            {address.neighborhood}, {address.uf}, {address.city}
                          </p>
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="row mb-5">
            <div className="row d-flex justify-content-center">
              <div className="col-4 d-flex justify-content-center">
                <button
                  onClick={() => addAdress()}
                  className="btn btn-address w-50"
                >
                  Adicionar Endereço
                </button>
              </div>
              <div className="col-4  d-flex justify-content-center">
                <button
                  onClick={() => retomarCheckout()}
                  className="btn btn-address w-50"
                >
                  Avançar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SelectAddress;
