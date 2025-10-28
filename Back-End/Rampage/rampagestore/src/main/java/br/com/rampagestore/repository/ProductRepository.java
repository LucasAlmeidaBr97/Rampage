package br.com.rampagestore.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.rampagestore.model.ProductObj;

@Repository
public interface ProductRepository extends CrudRepository<ProductObj, Long>{
    
    List<ProductObj> findAllByOrderByCreatedAtDesc();

    ProductObj findByProductName(String productName);

    List<ProductObj> findAll();

    ProductObj findById(long id);

    List<ProductObj> findByProductNameContainingIgnoreCase(String kayword);

    List<ProductObj> findAllByStatusTrue();
}
