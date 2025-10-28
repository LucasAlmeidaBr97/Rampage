package br.com.rampagestore.model;

import java.util.List;

public class ProductEditDTO {
    private ProductObj product;
    private List<ImageModel> images;

    public ProductEditDTO(ProductObj product, List<ImageModel> images) {
        this.product = product;
        this.images = images;
    }

    public ProductObj getProduct() {
        return product;
    }

    public void setProduct(ProductObj product) {
        this.product = product;
    }

    public List<ImageModel> getImages() {
        return images;
    }

    public void setImages(List<ImageModel> images) {
        this.images = images;
    }
}
