package br.com.rampagestore.service.Order;

import br.com.rampagestore.model.enums.OrderStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.rampagestore.model.Order.Order;
import br.com.rampagestore.repository.OrderRepository;

import java.time.LocalDate;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemService orderItemService;

    public ResponseEntity<?> createOrder(Order order) {
        order.setOrderStatus(OrderStatus.AGUARDANDO_PAGAMENTO);
        order.setDateOrdered(LocalDate.now());
        Order objReturn = orderRepository.save(order);
        orderItemService.save(objReturn);
        return new ResponseEntity<>(objReturn, HttpStatus.CREATED);
    }

    public ResponseEntity<?> selectOrdersByIdClient(Long userId) {
        List<Order> orders = orderRepository.findAllByConsumerIdOrderByIdDesc(userId);
        return ResponseEntity.ok(orders);
    }

    public ResponseEntity<?> selectOrderById(Long id) {
        Order order = orderRepository.findById(id).orElse(null);
        return ResponseEntity.ok(order);
    }

    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(orderRepository.findAll());
    }

    public ResponseEntity<?> changeStatus(Order order) {
        return ResponseEntity.ok(orderRepository.save(order));
    }
}
