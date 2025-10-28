package br.com.rampagestore.model;

import br.com.rampagestore.model.Order.OrderItem;
import br.com.rampagestore.model.enums.ImageType;

import java.util.List;

public class OrderResponse {
    private OrderItem orderItem;
    private List<byte[]> imageBase64;

    public OrderResponse(OrderItem orderItem, List<byte[]> imageBase64) {
        this.orderItem = orderItem;
        this.imageBase64 = imageBase64;
    }

    public OrderItem getOrderItem() {
        return orderItem;
    }

    public void setOrderItem(OrderItem orderItem) {
        this.orderItem = orderItem;
    }

    public List<byte[]> getImageBase64() {
        return imageBase64;
    }

    public void setImageBase64(List<byte[]> imageBase64) {
        this.imageBase64 = imageBase64;
    }
}
