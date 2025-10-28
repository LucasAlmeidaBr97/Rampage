package br.com.rampagestore.service;

import br.com.rampagestore.model.ImageModel;
import br.com.rampagestore.model.ProductObj;
import br.com.rampagestore.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    public String saveImage(MultipartFile image) {
        if (!image.isEmpty()) {
            String imageName = image.getOriginalFilename();
            String fileExtension = "";
            if (imageName != null && imageName.contains(".")) {
                fileExtension = imageName.substring(imageName.lastIndexOf("."));
            }
            String uniqueImageName = UUID.randomUUID().toString() + fileExtension;
            try {
                //Criando pasta de uplogad
                String imagesFolder = "Rampage/rampagestore/images";
                File dir = new File(imagesFolder);
                if (!dir.exists()) {
                    dir.mkdirs();
                }

                //Criar arquivo no diretorio
                File serverFile = new File(dir.getAbsolutePath() + File.separator + uniqueImageName);
                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
                stream.write(image.getBytes());
                stream.close();
                return serverFile.getAbsolutePath();
            } catch (Exception e) {
                System.out.println("Erro ao carregar arquivo: " + imageName + " =>" + e.getMessage());
            }
        } else {
            System.out.println("Erro ao carregar arquivo. Arquivo enviado Vazaio");
        }
        return null;
    }


    // LISTAR IMAGENS
    public ImageModel listMainImageBase64(ProductObj product) {
        Optional<ImageModel> image = imageRepository.findByIdProdutoAndMainImageTrue(product.getId());

        if (image.isEmpty()) {
            return null;
        }

        ImageModel imageObj = image.get();
        String imagePath = imageObj.getDirection();

        try {

            byte[] conteudoImagem = getImageContent(imagePath);
            imageObj.setImageBase64(conteudoImagem);

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

        return imageObj;
    }

    // LISTAR IMAGENS
    public List<ImageModel> getImagesByProdutoId(Long idProduct) throws IOException {

        List<ImageModel> images = imageRepository.findByIdProdutoOrderByMainImageDesc(idProduct);
        for (ImageModel img : images) {
            img.setImageBase64(this.getImageContent(img.getDirection()));
        }

        return images;

    }

    private byte[] getImageContent(String imagePath) throws IOException {
        Path caminho = Paths.get(imagePath);
        return Files.readAllBytes(caminho);
    }

    public ResponseEntity<?> removeImage(Long idImageModel) {
        ImageModel image = imageRepository.findById(idImageModel).orElse(null);
        if (image != null) {
            imageRepository.delete(image);
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
