package br.com.rampagestore.model;

import br.com.rampagestore.model.enums.ImageType;

import java.util.List;

public class ProductResponse {
    private ProductObj product;
    private List<String> imageDirection;
    private List<byte[]> imageBase64;

    public ProductResponse(ProductObj product,  List<?> imageDirection, ImageType imageType) {
        this.product = product;

        if (imageType.equals(ImageType.STRING))
            this.imageDirection = (List<String>) imageDirection;
        else
            this.imageBase64 = (List<byte[]>) imageDirection;
    }


    // Getters e Setters
    public ProductObj getProduct() {
        return product;
    }

    public List<String> getImageDirection() {
        return imageDirection;
    }

    public List<byte[]> getImageBase64() {
        return imageBase64;
    }
}
