package br.com.rampagestore.service.Order;

import br.com.rampagestore.model.Order.Order;
import br.com.rampagestore.model.Order.OrderItem;
import br.com.rampagestore.model.OrderResponse;
import br.com.rampagestore.model.ProductObj;
import br.com.rampagestore.model.ProductResponse;
import br.com.rampagestore.model.enums.ImageType;
import br.com.rampagestore.repository.OrderItemRepository;
import br.com.rampagestore.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class OrderItemService {
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private ImageService imageService;

    public ResponseEntity<?> getProductsByIdOrder(Long idOrder) {
        List<OrderItem> ordersItems = orderItemRepository.findByOrderId(idOrder);
        List<OrderResponse> responses = new ArrayList<>();

        for (OrderItem item : ordersItems) {
            List<byte[]> image64 = Collections.singletonList(imageService.listMainImageBase64(item.getProductObj()).getImageBase64());
            OrderResponse response = new OrderResponse(item, image64);
            responses.add(response);
        }
        return ResponseEntity.ok(responses);
    }

    public void save(Order order) {
        List<OrderItem> items = order.getOrderItems();
        items.forEach(item -> {
            item.setOrderId(order.getId());
            orderItemRepository.save(item);
        });
    }


}
