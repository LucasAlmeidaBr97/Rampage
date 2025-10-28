package br.com.rampagestore.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import br.com.rampagestore.model.*;
import br.com.rampagestore.model.enums.ImageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.com.rampagestore.repository.ImageRepository;
import br.com.rampagestore.repository.ProductRepository;

//Classe service Responsável por lidar com as regras de negocio
@Service
public class ProductService {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ProductRepository productAction;

    @Autowired
    private ModelMessage message;

    @Autowired
    private ImageService imageService;

    //Método usado para colocar produtos no landingPage
    public ResponseEntity<?> selectAllProductsAndImgs(){
        List<ProductObj> productObjs = productAction.findAllByStatusTrue();
        List<ProductResponse> productResponses = new ArrayList<>(); 
        for(ProductObj product : productObjs){
            ImageModel image = imageService.listMainImageBase64(product);
            List<byte[]> imagesDirections = new ArrayList<>();
            imagesDirections.add(image.getImageBase64());
            ProductResponse productResponse = new ProductResponse(product, imagesDirections, ImageType.BASE64);
            productResponses.add(productResponse);
        }
        return new ResponseEntity<>(productResponses, HttpStatus.OK);
    }

     //Método de selecionar produto usado na ladingPage quando cliente clicar no produto
     public ResponseEntity<?> selectProductByUser(Long id) {
        Optional<ProductObj> productObjOptional = productAction.findById(id);
        Optional<ImageModel> mainImage = imageRepository.findByIdProdutoAndMainImageTrue(id);
        if (productObjOptional.isPresent() && mainImage.isPresent()) {
            ProductObj productObj = productObjOptional.get();
            List<String> imagesDirections = new ArrayList<>();
            imagesDirections.add(mainImage.get().getDirection());
            List<ImageModel> productImages = imageRepository.findByIdProdutoAndMainImageFalse(id);
            for(ImageModel image : productImages){
                imagesDirections.add(image.getDirection());
            }
            return new ResponseEntity<>(new ProductResponse(productObj, imagesDirections, ImageType.STRING), HttpStatus.OK);
        } else {
            message.setMessage("Produto ou imagem principal não encontrada para o ID: " + id);
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
    }    
    
    //Método de selecionar produto usado no modal (visualizar do Back-office)
    public ResponseEntity<?> selectProduct(Long id) {
        Optional<ProductObj> productObjOptional = productAction.findById(id);
        Optional<ImageModel> imageModelOptional = imageRepository.findByIdProdutoAndMainImageTrue(id);
        if (productObjOptional.isPresent() && imageModelOptional.isPresent()) {
            ProductObj productObj = productObjOptional.get();
            List<String> imagesDirections = new ArrayList<>();
            imagesDirections.add(imageModelOptional.get().getDirection());
            return new ResponseEntity<>(new ProductResponse(productObj, imagesDirections, ImageType.STRING), HttpStatus.OK);
        } else {
            message.setMessage("Produto ou imagem principal não encontrada para o ID: " + id);
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
    }

    //Método para listar todos os produtos
    public ResponseEntity<?> listingProducts() {
        List<ProductObj> prod = productAction.findAll();
        return new ResponseEntity<>(prod, HttpStatus.OK);
    }

    //Método para listar todos os produtos ordenando do mais recente
    public ResponseEntity<?> listingRecentsProducts() {
        List<ProductObj> prod = productAction.findAllByOrderByCreatedAtDesc();
        return new ResponseEntity<>(prod, HttpStatus.OK);
    }

    //Método para listar o produto pelo id
    public ResponseEntity<?> listingProductById(Long id) throws IOException {
        ProductObj prod = productAction.findById(id).orElse(null);
        if (prod == null)
            return ResponseEntity.notFound().build();

        List<ImageModel> images = imageService.getImagesByProdutoId(prod.getId());
        return new ResponseEntity<>(new ProductEditDTO(prod, images), HttpStatus.OK);
    }

    //Método para cadastrar Produtos
    public ResponseEntity<?> registerNewProduct(ProductObj obj, List<MultipartFile> images) {
        ProductObj existingProduct = productAction.findByProductName(obj.getProductName());

        if (existingProduct != null) {
            message.setMessage("Tentativa de cadastro invalida. " +
                    "O produto: " + obj.getProductName() + ", já está cadastrado. " +
                    "Verifique a Lista de Produtos e/ou as informações fornecidas e tente novamente.");
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        } else {
            if (!images.isEmpty()) {

                ProductObj productObj = new ProductObj(obj.getProductName(), obj.getProductDetai(),
                        obj.getProductPrice(), obj.getAvaliation(), true, obj.getAmount());

                productAction.save(productObj);
                Long productId = productObj.getId();

                try {
                    saveImages(productId, images);
                } catch (IOException e) {
                    message.setMessage("Erro ao salvar imagens: " + e.getMessage());
                    return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
                }
                message.setMessage("Produto: " + productObj.getProductName() + ", Cadastrado com sucesso! " +
                        "Verifique a lista de produtos.");
                return new ResponseEntity<>(message, HttpStatus.CREATED);
            }
            message.setMessage("Selecione imagens do produtor para realizar o cadastro");
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);

        }

    }

    // Método para iterar e colocar as imagens no diretorio e banco de dados
    public void saveImages(long productId, List<MultipartFile> images) throws IOException {
        String directionMainImg = imageService.saveImage(images.get(0));
        ImageModel mainImageModel = new ImageModel(productId, images.get(0).getOriginalFilename(), directionMainImg,
                true, true);
        imageRepository.save(mainImageModel);
        for (int i = 1; i < images.size(); i++) {
            String directionImgs = imageService.saveImage(images.get(i));
            ImageModel imageModel = new ImageModel(productId, images.get(i).getOriginalFilename(), directionImgs, false,
                    true);
            imageRepository.save(imageModel);
        }
    }

    // Método para atualizar Produtos
    public ResponseEntity<?> updateProduct(ProductObj obj, List<MultipartFile> images) {
        // Verifica se o produto existe pelo ID
        ProductObj existingProduct = productAction.findById(obj.getId());
        if (existingProduct != null) {
            // Verifica se existe outro produto com o mesmo nome e ID diferente
            ProductObj productByName = productAction.findByProductName(obj.getProductName());

            // Se o produto com o mesmo nome for encontrado, mas com ID diferente, não
            // permite a atualização
            if (productByName != null && productByName.getId() != obj.getId()) {
                message.setMessage("Já existe um produto cadastrado com este nome.");
                return new ResponseEntity<>(message, HttpStatus.NOT_MODIFIED);
            }

            // Se não houver produto com o mesmo nome e ID diferente, atualiza o produto
            ProductObj updatedProduct = new ProductObj(
                    existingProduct.getId(),
                    obj.getProductName(),
                    obj.getProductDetai(),
                    obj.getProductPrice(),
                    obj.getAvaliation(),
                    true,
                    obj.getAmount(),
                    LocalDateTime.now());

            message.setMessage("Produto atualizado De: " + existingProduct + ". Para: " + updatedProduct);
            productAction.save(updatedProduct);

            // Se houver imagens, deleta as antigas e salva as novas
            if (images != null && !images.isEmpty()) {
                Long productId = obj.getId();
                imageRepository.deleteByIdProduto(productId);
                try {
                    saveImages(productId, images);
                } catch (IOException e) {
                    message.setMessage("Erro ao salvar imagens: " + e.getMessage());
                    return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

            return new ResponseEntity<>(message, HttpStatus.OK);
        } else {
            // Produto não encontrado, retorna uma mensagem apropriada
            message.setMessage(
                    "Tentativa de Atualização inválida. Produto: " + obj.getProductName() + ", não cadastrado.");
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
    }

    // Método para aumentar a quantidade de produtos
    public ResponseEntity<?> upAmount(ProductObj productObj, int increment) {
        ProductObj productUp = productAction.findById(productObj.getId());
        productUp.setAmount(productObj.getAmount() + increment);
        productAction.save(productUp);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Método para diminuir a quantidade de produtos
    public ResponseEntity<?> downAmount(ProductObj productObj, int decrement) {
        ProductObj productDown = productAction.findById(productObj.getId());
        if (productDown.getAmount() <= 0) {
            message.setMessage("Quantidade solicitada indisponível no estoque." +
                    " Por favor, ajuste a quantidade e tente novamente.");
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        } else {
            int newAmount = productDown.getAmount() - decrement;
            if (newAmount < 0) {
                message.setMessage("Temos apenas " + productDown.getAmount()
                        + " unidades de " + productDown.getProductName()
                        + " em estoque. Por favor, ajuste a quantidade para prosseguir.");
                return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
            }
            productDown.setAmount(newAmount);
            productAction.save(productDown);
            message.setMessage("Quantidade atualizada com sucesso.");
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
    }

    // Método para mudar o status do produto
    public ResponseEntity<?> changeStatus(Long id) {
        ProductObj changeProductObj = productAction.findById(id).orElse(null);

        if (changeProductObj == null)
            return ResponseEntity.notFound().build();

        changeProductObj.setStatus(!changeProductObj.isStatus());
        productAction.save(changeProductObj);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
