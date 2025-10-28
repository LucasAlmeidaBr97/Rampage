import { useEffect, useState } from "react";
import Footer from "../../../../Components/Footer/footer";
import Barra from "../../../../Components/Navbar/Navbar";
import cartService from "../../../../Services/CartService/CartService";
import useCheckoutService from "../../../../Services/CheckoutService";
import "./Payment.css";

const Payment = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethods, setSelectedMethods] = useState({});
  const [cartData, setCartData] = useState({
    numero: '',
    codVerificador: '',
    nome: '',  // Nome do titular
    vencimento: ''
  });

  useEffect(() => {
    const fetch = async () => {
      const data = [
        {
          id: 1,
          method: "BOLETO",
        },
        {
          id: 2,
          method: "PIX",
        },
        {
          id: 3,
          method: "CARTAO",
        },
      ];

      if (data) {
        await setPaymentMethods(data);
        setSelectedMethods(data[2]);
        selectMethods(data[2]);
      }
    };

    fetch();
  }, []);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setCartData({
      ...cartData,
      [name]: value,
    });
  };

  const { realizaCheckout, abrirPaginaEndereco } = useCheckoutService();
  const returnTo = () => {
    abrirPaginaEndereco();
  };

  const retomarCheckout = () => {
    if (selectedMethods.id === 3) {
      const isFormComplete = Object.values(cartData).every((field) => field.trim() !== "");

      if (!isFormComplete) {
        alert("Por favor, preencha todos os campos antes de avançar.");
        return;
      }
    }

    realizaCheckout();
  };

  const selectMethods = async (method) => {
    cartService.setPaymentMethod(method);
    setSelectedMethods(method);
  };

  const getFormCartao = () => {
    return (
      <>
        <div className="container d-flex justify-content-center">
          <div className="row w-50">
            <form>
              <h4>Dados do Cartão</h4>
              <div className="row">
              <h5>Número do Cartão</h5>
                <input
                  className="form-control"
                  type="text"
                  name="numero"
                  value={cartData.numero}
                  onChange={handleAddressChange}
                  placeholder="Número do Cartão"
                  maxLength="16"
                  required
                />
              </div>
              <div className="row">
              <h5>Codigo de Segurança</h5>
                <input
                  className="form-control"
                  type="text"
                  name="codVerificador"
                  value={cartData.codVerificador}
                  onChange={handleAddressChange}
                  placeholder="Código Verificador"
                  maxLength="3"
                  required
                />
              </div>
              <div className="row">
              <h5>Nome do Titular</h5>
                <input
                  className="form-control"
                  type="text"
                  name="nome"  // Certifique-se de que o nome está correto aqui
                  value={cartData.nome}  // O valor do campo está sendo controlado por cartData.nome
                  onChange={handleAddressChange}
                  placeholder="Nome do Titular"
                  required
                />
              </div>
              <div className="row">
              <h5>Vencimento</h5>
                <input
                  className="form-control"
                  name="vencimento"
                  value={cartData.vencimento}
                  onChange={handleAddressChange}
                  type="month"
                  required
                />
              </div>
            </form>
          </div>
        </div>
      </>
    );
  };

  const getMethods = () => {
    return (
      <>
        <div>
          {paymentMethods.map((method, index) => {
            return (
              <div key={index} className="row">
                <div>
                  <input
                    className="col-1 m-auto met"
                    type="radio"
                    name="methods"
                    id={`method-${method.id}`}
                    value={method.id}
                    onChange={() => selectMethods(method)}
                    checked={method.id === selectedMethods.id}
                  />
                  <label
                    className="col-10 mb-4 ps-3 border-left met"
                    htmlFor={`method-${method.id}`}
                  >
                    <h4>{method.method}</h4>
                  </label>
                </div>
              </div>
            );
          })}
        </div>
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
            {!paymentMethods ? (
              <div className="row">
                <p>Carregando dados ...</p>
              </div>
            ) : (
              getMethods()
            )}
            {selectedMethods.id === 3 ? getFormCartao() : ""}
            <div className="row mb-5">
              <div className="row d-flex justify-content-center">
                <div className="col-4 d-flex justify-content-center">
                  <button
                    onClick={() => returnTo()}
                    className="btn btn-payment w-50"
                  >
                    Voltar
                  </button>
                </div>
                <div className="col-4  d-flex justify-content-center">
                  <button
                    onClick={() => retomarCheckout()}
                    className="btn btn-payment w-50"
                  >
                    Avançar
                  </button>
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

export default Payment;
