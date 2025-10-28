import { useEffect, useState } from "react";
import orderService from "../../Services/OrderService";

const BackOfficeOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState({
    status: "",
  });

  useEffect(() => {
    const fetch = async () => {
      await attPage();
    };

    fetch();
  }, []);

  const attPage = async () => {
    const data = await orderService.doGet("/get-all-orders");
    if (data) {
      if (data.status === 403) {
        alert("Erro ao buscar pedidos.");
        return;
      }

      setOrders(data);
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

  const handleChangeStatus = async (order) => {
    const userConfirmed = window.confirm(
      "Confirmar alteração de status?"
    );
    if (userConfirmed) {
      order.orderStatus = orderStatus.status;
      await orderService.doPut("/change-status", order);
      await attPage();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderStatus({
      ...orderStatus,
      [name]: value,
    });
  };

  const getOrders = () => {
    return (
      <div>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              key={index}
              className="mb-3 ps-4 border-left"
              style={{ width: "400px" }}
            >
              <p>Código: {order.id}</p>
              <p>Total da compra: {precoFormatado(order.total)}</p>
              <p>Data da compra: {order.dateOrdered}</p>
              <div className="row">
                <p>Status do Pedido: {order.orderStatus} </p>
                <p className="mt-3">
                  Novo status:
                  <select
                    name="status"
                    className="form-control"
                    value={orderStatus.status}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      Selecione o status
                    </option>
                    <option value={"AGUARDANDO_PAGAMENTO"}>
                      Aguardando pagamento
                    </option>
                    <option value={"PAGAMENTO_REJEITADO"}>
                      Pagamento rejeitado
                    </option>
                    <option value={"PAGAMENTO_COM_SUCESSO"}>
                      Pagamento com sucesso
                    </option>
                    <option value={"AGUARDANDO_RETIRADA"}>
                      Aguardando retirada
                    </option>
                    <option value={"EM_TRANSITO"}>Em transito</option>
                    <option value={"ENTREGUE"}>Entregue</option>
                  </select>
                </p>
              </div>
              <button
                className="btn btn-primary mt-2"
                onClick={() => handleChangeStatus(order)}
              >
                Alterar Status
              </button>
            </div>
          ))
        ) : (
          <p>Sem pedidos para exibir.</p>
        )}
      </div>
    );
  };

  return (
    <>
      <div className=" p-4 pt-3 pb-3">
        <div className="row">
          <h2>Lista de Pedidos</h2>
        </div>
        <div className=" mt-3">
          {orders ? (
            getOrders()
          ) : (
            <div>
              <p>Carregadno pedidos ...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BackOfficeOrderList;
