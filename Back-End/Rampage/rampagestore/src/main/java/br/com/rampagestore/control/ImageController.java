package br.com.rampagestore.control;

import java.io.IOException;
import java.util.List;

import br.com.rampagestore.model.ImageModel;
import jakarta.persistence.PostRemove;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import br.com.rampagestore.service.ImageService;

@RestController
@RequestMapping("/rampage/imagen")
public class ImageController {

    @Autowired
    private ImageService imageService;

    private String diretory = "F:/PIStrint2/Back-end/Rampage/rampagestore/images";

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {

        String filePath = imageService.saveImage(file);

        return ResponseEntity.ok("Imagem enviada com sucesso " + filePath);
    }

    @GetMapping("/get-by-product")
    public ResponseEntity<?> getImagesByProdutoId(@RequestParam(name = "idProduct") Long idProduct) throws IOException {
        List<ImageModel> images = imageService.getImagesByProdutoId(idProduct);

        return ResponseEntity.ok(images);
    }

    @DeleteMapping("/remove-by-id")
    public ResponseEntity<?> removeImage (@RequestParam(name = "id") Long idImageModel) {
        return imageService.removeImage(idImageModel);
    }
}
