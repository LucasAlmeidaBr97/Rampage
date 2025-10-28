package br.com.rampagestore.control.site;

import br.com.rampagestore.model.ViaCepAdress;
import br.com.rampagestore.service.ProductService;
import br.com.rampagestore.service.ViaCepAPI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/site")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SiteController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ViaCepAPI viaCepAPI;

    //EndPoint para mostrar todos os produtos ladingPage
    @GetMapping("/todos_produtos")
    public ResponseEntity<?> selectForLandingPage(){
        return productService.selectAllProductsAndImgs();
    }

    @GetMapping("/product-by-id")
    public ResponseEntity<?> listingProductById(@RequestParam(name = "id") Long id) throws IOException {
        return productService.listingProductById(id);
    }

    @GetMapping("/get-cep")
    public ResponseEntity<?> getCepAPI(@RequestParam(name = "cep")String cep){
        ViaCepAdress adress = viaCepAPI.getCepAPI(cep);
        return ResponseEntity.ok().body(adress);
    }

}
