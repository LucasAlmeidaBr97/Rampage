import Barra from "../../../Components/Navbar/Navbar"
import Footer from "../../../Components/Footer/footer"
import { useEffect, useState } from "react";
import orderService from "../../../Services/OrderService";
import authService from "../../../auth/AuthService";
import { useNavigate } from "react-router-dom";

const OrderList = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetch = async() => {
            const idUser = authService.getIdUser();
            const data = await orderService.doGetById("/get-my-orders", idUser);
            if (data) {
                if (data.status === 403){
                    alert("Erro ao buscar pedidos.");
                    return;
                }

                setOrders(data);

            }

        }

        fetch();
    }, []);

    const navigate = new useNavigate();

    const precoFormatado = (price) => {
        return price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      };

    const getOrders = () => {
        return (
            <div>
                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <div key={index} className="mb-3">
                            <p>Código: {order.id}</p>
                            <p>Status do Pedido: {order.orderStatus}</p>
                            <p>Método de pagamento: {order.paymentMethods}</p>
                            <p>Total da compra: {precoFormatado(order.total)}</p>
                            <p>Data da compra: {order.dateOrdered}</p>
                            <button className="btn btn-primary mt-1" onClick={() => navigate(`/order-details?order=${order.id}`)}>Mais detalhes</button>
                        </div>
                    ))
                ) : (
                    <p>Sem pedidos para exibir.</p>
                )}
            </div>
        );
    }

    return (
        <>
            <header>
                <Barra />
            </header>
            <main>
        	    <div className="main">
                    <div className="container pt-3 pb-3">
                        <div className="row">
                            <h2>Meus Pedidos</h2>
                        </div>
                        <div className="container mt-3">
                            {orders ? getOrders() : <div><p>Carregadno pedidos ...</p></div>}
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    );

}

export default OrderList;