package br.com.rampagestore.control.Order;

import br.com.rampagestore.model.ProductObj;
import br.com.rampagestore.service.Order.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.rampagestore.model.Order.Order;
import br.com.rampagestore.service.Order.OrderService;

@RestController
@RequestMapping("/rampage/pedido")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderItemService orderItemService;

    @PostMapping("/novo_pedido")
    public ResponseEntity<?> newOrder(@RequestBody Order order){
            return orderService.createOrder(order);
    }

    @GetMapping("/get-my-orders")
    public ResponseEntity<?> selectOrdersByIdClient(@RequestParam(name = "id") Long userId){
        return orderService.selectOrdersByIdClient(userId);
    }

    @GetMapping("/order-details")
    public ResponseEntity<?> selectOrderById(@RequestParam(name = "id") Long id){
        return orderService.selectOrderById(id);
    }

    @GetMapping("/get-products-by-order-id")
    public ResponseEntity<?> getProductsByIdOrder(@RequestParam(name = "id") Long idOrder){
        return orderItemService.getProductsByIdOrder(idOrder);
    }

    @GetMapping("/get-all-orders")
    public ResponseEntity<?> getAll(){
        return orderService.getAll();
    }

    @PutMapping("/change-status")
    public ResponseEntity<?> changeStatus(@RequestBody Order order){
        return orderService.changeStatus(order);
    }
}
