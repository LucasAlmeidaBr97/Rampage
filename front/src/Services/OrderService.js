import CrudService from "./CRUDService";

class OrderService extends CrudService {
    static _instance = null;
    constructor(){
        super("/rampage/pedido")

        if(OrderService._instance)
            return OrderService._instance;

        OrderService._instance = this;
    }

    finalizarPedido = (order) => {
        return this.doPost("/novo_pedido", order);
    }
}

const orderService = new OrderService();
export default orderService;