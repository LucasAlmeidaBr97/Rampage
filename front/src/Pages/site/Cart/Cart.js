import { useEffect, useState } from "react";
import Footer from "../../../Components/Footer/footer";
import Barra from "../../../Components/Navbar/Navbar";
import cartService from "../../../Services/CartService/CartService";
import siteService from "../../../Services/SiteService/SiteService";
import "./Cart.css";
import CheckoutService from "../../../Services/CheckoutService";

const Cart = () => {
  const [products, setProducts] = useState([{}]);
  const [freight, setFreight] = useState({});
  const [freightCart, setFreightCart] = useState({});
  const [subtotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [cep, setCep] = useState("");
  const [enderecoCep, setEnderecoCep] = useState();

  const freightOptions = [
    {
      price: 7,
      deliveryTime: "2 dias úteis.",
    },
    {
      price: 15,
      deliveryTime: "4 dias úteis.",
    },
    {
      price: 20,
      deliveryTime: "7 dias úteis.",
    },
  ];

  useEffect(() => {
    const cart = cartService.getCart();
    setProducts(cart.products);
    setFreightCart(cart.freight);
    setSubTotal(cartService.getSubTotalPrice());
    setTotal(cartService.getTotalPrice());
    console.log(cart);
    console.log("prods ", products[0]);
  }, []);

  useEffect(() => {
    // Recalcula o total sempre que o frete é alterado
    attValuesPrice();
  }, [freight]);

  const attQuantity = async (product, event) => {
    const qtd = Number(event.target.value);

    if (qtd >= 0) {
      cartService.attQuantity(product, qtd);
      setTotal(cartService.getTotalPrice());
      setSubTotal(cartService.getSubTotalPrice());
    } else {
      deleteItem(product);
    }
    setProducts(await cartService.getItems());
  };

  const attValuesPrice = () => {
    const subtotalValue = cartService.getSubTotalPrice();
    setSubTotal(subtotalValue);
    setFreight(cartService.getFreight());
    setTotal(cartService.getTotalPrice());
  };

  const handleBlur = async () => {
    const data = await siteService.getViaCepApi(cep);
    if (data) {
      setEnderecoCep(data);
    }
  };

  const handleFreightChange = (e) => {
    setFreight(freightOptions[e.target.value]);
    cartService.setFreight(freightOptions[e.target.value]);
  };

  const precoFormatado = (price) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const { realizaCheckout } = CheckoutService();
  const iniciaCheckout = () => {
    if (freightCart.price || freight.price) {
      realizaCheckout();
      return;
    }

    alert("Selecione um frete.");
  };

  const deleteItem = async (product) => {
    await cartService.removeItem(product);
    setProducts(await cartService.getItems());
    attValuesPrice();
  };

  const showAdress = () => {
    return (
      <div className="row address">
        <div className="row address-cep mt-3 pb-3 ps-4">
          <p>Cep: {enderecoCep.cep}</p>
          <p>Logradouro: {enderecoCep.logradouro}</p>
          <p>Bairro: {enderecoCep.bairro}</p>
          <p>Estado: {enderecoCep.estado}</p>
          <p>Cidade: {enderecoCep.localidade}</p>
        </div>
        <div className="row address-options mt-3 ps-4">
          {freightOptions.map((option, index) => (
            <div className="row" key={index}>
              <input
                className="col-1"
                type="radio"
                name="freteOptions"
                id={`frete-${index}`}
                value={index}
                onChange={handleFreightChange}
              />
              <label className="col-10" htmlFor={`frete-${index}`}>
                <p>Prazo: {option.deliveryTime}</p>
                <p>Preço: R$ {precoFormatado(option.price)}</p>
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const mainPage = () => {
    return (
      <main>
        <div className="main">
          <div className="content row carrinho p-2">
            <div className="col-8" style={{ border: "solid blue" }}>
              <div className="row titulo">
                <h2>Produtos</h2>
              </div>
              <div className="row products">
                {products.map((prod, index) => {
                  return (
                    <div key={index} className="row product mb-3 mt-3 ms-2">
                      <div className="col-7">
                        <p>Produto: {prod.productName}</p>
                        <p>Quantidade: {prod.quantityOrdered}</p>
                        <p>Estoque: {prod.amount}</p>
                        <p>
                          Valor unitário: R${" "}
                          {prod?.productPrice
                            ? precoFormatado(prod.productPrice)
                            : "0,00"}
                        </p>
                        <p>Detalhes: {prod.productDetai}</p>
                      </div>
                      <div className="col-3">
                        <div className="imageCart">
                          {prod.image64 ? (
                            <img
                              alt={`Imagem ${prod.productName}`}
                              src={`data:image/jpeg;base64, ${prod.image64.imageBase64}`}
                            />
                          ) : (
                            <p>Carregando imagens ...</p>
                          )}
                        </div>
                      </div>
                      <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                        <div className="mb-3">
                          <label htmlFor="quantity">Quantidade: </label>
                          <input
                            max={prod.amount} // Máximo definido como o estoque disponível
                            value={prod.quantityOrdered || ""}
                            id="quantity"
                            name="quantity"
                            type="number"
                            placeholder="Quantity"
                            onInput={(event) => attQuantity(prod, event)} // Função chamada ao alterar o valor
                          />
                        </div>
                        <div className="button-delete col-12">
                          <button
                            onClick={() => deleteItem(prod)}
                            className="btn btn-danger w-100"
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="row w-100 price mt-5">
                <div className="row w-100">
                  <p>Subtotal: R$ {precoFormatado(subtotal)}</p>
                  <p>
                    Frete: R${" "}
                    {freight.price
                      ? precoFormatado(freight.price)
                      : freightCart.price
                      ? precoFormatado(freightCart.price)
                      : "0,00"}
                  </p>
                  <p>Total: R$ {precoFormatado(total)}</p>
                </div>
              </div>
            </div>

            <div className="col-4" style={{ border: "solid orange" }}>
              <div className="row titulo">
                <h2>Frete</h2>
                <div className="row w-100 h-25 p-2">
                  <div className="row ms-2">
                    <label id="cep">Cep</label>
                  </div>
                  <div className="row ms-auto">
                    <input
                      className="form-control"
                      id="cep"
                      type="text"
                      maxLength={8}
                      placeholder="_____-___"
                      onBlur={handleBlur}
                      onChange={(e) => setCep(e.target.value)}
                    ></input>
                  </div>
                  {enderecoCep ? showAdress() : ""}
                </div>
              </div>
            </div>

            <div className="row button w-100 mt-4 d-flex justify-content-center">
              <button
                onClick={() =>
                  (window.location.href =
                    "http://localhost:3000/pagina-principal")
                }
                className="btn w-50 btn-cart-off"
              >
                Continuar Comprando
              </button>
              <button
                onClick={() => iniciaCheckout()}
                className="btn w-50 btn-compra"
                disabled={products.length === 0}
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  };

  return (
    <>
      <header>
        <Barra />
      </header>
      {products ? (
        mainPage()
      ) : (
        <main>
          <p className="main">Carregando...</p>
        </main>
      )}
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Cart;
