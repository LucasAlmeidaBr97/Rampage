import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../../Components/Footer/footer";
import Barra from "../../../Components/Navbar/Navbar";
import addressService from "../../../Services/Address/AddressService";
import orderService from "../../../Services/OrderService";

const OrderDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("order");

  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      await getOrder();
    };

    fetch();
  }, []);

  const getOrder = async () => {
    const data = await orderService.doGetById("/order-details", orderId);
    console.log(data);

    if (data) {
      console.log("loll");

      setOrder(data);
      await getMethodPayment(data);
      await getOrderAddress(data);
      await getOrderProducts(data);
    } else {
      alert("Erro ao buscar Pedido.");
    }
  };

  const getMethodPayment = async (order) => {
    setPaymentMethod(order.paymentMethods);
  };

  const getOrderAddress = async (order) => {
    const add = await addressService.doGetById("/get-address", order.addressId);
    if (add) {
      setAddress(add);
    } else {
      alert("Erro ao buscar endereço.");
    }
  };

  const getOrderProducts = async (order) => {
    const prods = await orderService.doGetById(
      "/get-products-by-order-id",
      order.id
    );
    console.log(prods);
    if (prods) {
      setProducts(prods);
    } else {
      alert("Erro ao buscar endereço.");
    }
  };

  const precoFormatado = (price) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const returnTo = () => {
    navigate("/my-orders");
  };

  const getPayment = () => {
    return (
      <div className="row mb-3">
        <h4>Método de pagamento</h4>
        <div className="ps-4">
          <p>{paymentMethod} </p>
        </div>
      </div>
    );
  };

  const getAddress = () => {
    return (
      <div className="row mb-3">
        <h4>Endereço de entrega</h4>
        <div className="ps-4">
          <p>Cep: {address.cep}, </p>
          <p>
            {address.logradouro} {address.number},{address.complement}
          </p>
          <p>
            {address.neighborhood}, {address.uf}, {address.city}
          </p>
        </div>
      </div>
    );
  };

  const getProducts = () => {
    return (
      <div className="row mb-3 ">
        <h4>Items do pedido</h4>
        {products.map((prod, index) => {
          return (
            <div key={index} className="row mb-4 ps-4">
              <div className="col-7">
                <p>Produto: {prod.orderItem.productObj.productName}</p>
                <p>Quantidade: {prod.orderItem.amountProducts}</p>
                <p>
                  Valor unitário: R${" "}
                  {prod?.orderItem
                    ? precoFormatado(prod.orderItem.unitValue)
                    : "0,00"}
                </p>
                <p>
                  Valor Total Item: R${" "}
                  {prod?.orderItem
                    ? precoFormatado(
                        prod.orderItem.unitValue * prod.orderItem.amountProducts
                      )
                    : "0,00"}
                </p>
              </div>
              <div className="col-3">
                <div className="imageCart">
                  {prod.imageBase64 ? (
                    <img
                      alt={`Imagem ${prod.orderItem.productObj.productName}`}
                      src={`data:image/jpeg;base64, ${prod.imageBase64[0]}`}
                    />
                  ) : (
                    <p>Carregando imagens ...</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <header>
        <Barra />
      </header>
      {order ? (
        <main>
          <div className="main">
            <div className="container">
              <h2 className="row">Detalhes Pedido</h2>
              <div className="container mt-4">
                <div className="row mb-3">
                  <div className="ps-4">
                    <p>Código do pedido: {order.id}</p>
                  </div>
                </div>
              </div>
              <div className="container mt-4">
                {address ? getAddress() : <p>Carregando Endereço ...</p>}
              </div>
              <div className="container mt-4">
                {paymentMethod ? (
                  getPayment()
                ) : (
                  <p>Carregando Metodo de pagamento ...</p>
                )}
              </div>
              <div className="container mt-4">
                {products.length > 0 ? (
                  getProducts()
                ) : (
                  <p>Carregando Produtos ...</p>
                )}
              </div>
              <div className="row mb-5 ps-2">
                <h5>
                  SubTotal: <span>R$ {precoFormatado(order.subtotal)}</span>
                </h5>
                <h5>
                  Frete: <span>R$ {precoFormatado(order.freight)}</span>
                </h5>
                <h5>
                  Total: <span>R$ {precoFormatado(order.total)}</span>
                </h5>
              </div>
              <div className="row mb-5">
                <div className="row d-flex justify-content-center">
                  <div className="col-9 d-flex justify-content-center">
                    <button
                      onClick={() => returnTo()}
                      className="btn btn-primary w-50"
                    >
                      Voltar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <p>Carregando pedido ...</p>
      )}

      <Footer />
    </>
  );
};

class Order {
  constructor(
    consumerId = 0,
    addressId = 0,
    paymentMethods = "",
    subtotal = 0,
    total = 0,
    freight = 0,
    orderItems = []
  ) {
    this.consumerId = consumerId;
    this.addressId = addressId;
    this.paymentMethods = paymentMethods;
    this.subtotal = subtotal;
    this.total = total;
    this.freight = freight;
    this.orderItems = orderItems;
  }
}

export default OrderDetails;
