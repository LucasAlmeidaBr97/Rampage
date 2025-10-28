import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../../../Components/Footer/footer";
import Barra from "../../../../Components/Navbar/Navbar";

const RegisteredOrder = () => {
  const location = useLocation();
  const orderCreated = location.state.data; // Acesse o state passado
console.log(location.state);
  
    useEffect(() => {
      if (orderCreated) {
        console.log("Resultado recebido:", orderCreated);
      } else {
        console.log("Nenhum resultado foi passado.");
      }
    }, [orderCreated]);

    const precoFormatado = (price) => {
        return price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      };

      
  const getHtml = () => {
    return (
      <div className="container">
        <div className="row">
          <h2>Pedido Cadastrado</h2>
        </div>
        <div className="row ps-3 mb-4">
          <p>Código do pedido: {orderCreated.id}</p>
          <p>Status do pedido: {orderCreated.orderStatus}</p>
          <p>Método de pagamento: {orderCreated.paymentMethods}</p>
          <p>Valor do pedido: R$ {precoFormatado(orderCreated.total)}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <header>
        <Barra />
      </header>
      <main>
        <div className="main">
          {orderCreated ? (
            getHtml()
          ) : (
            <div>
              <p>Carreganto pedido ...</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RegisteredOrder;
