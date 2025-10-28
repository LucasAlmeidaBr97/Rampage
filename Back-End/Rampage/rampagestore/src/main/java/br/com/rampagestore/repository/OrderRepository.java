package br.com.rampagestore.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.rampagestore.model.Order.Order;

import java.util.List;

@Repository
public interface OrderRepository extends CrudRepository<Order, Long>{

    List<Order> findAllByConsumerIdOrderByIdDesc(Long userId);
}
