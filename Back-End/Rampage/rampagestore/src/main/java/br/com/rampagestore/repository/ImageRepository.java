package br.com.rampagestore.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.rampagestore.model.ImageModel;
import jakarta.transaction.Transactional;

@Repository
public interface ImageRepository extends CrudRepository<ImageModel, Long>{

    @Transactional
    @Modifying
    @Query("DELETE FROM ImageModel i WHERE i.idProduto = :idProduto")
    void deleteByIdProduto(long idProduto);

    Optional<ImageModel> findByIdProdutoAndMainImageTrue(long idProduto);

    List<ImageModel> findByIdProdutoAndMainImageFalse(long idProduto);


    List<ImageModel> findByIdProdutoOrderByMainImageDesc(long idProduto);
}
