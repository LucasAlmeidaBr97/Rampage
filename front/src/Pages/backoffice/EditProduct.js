import React, { useEffect, useState } from "react";
import Carrosel from "../../Components/Carousel/Carousel";
import imageService from "../../Services/ImageService";
import authService from "../../auth/AuthService";

function EditProduct({ handleEditProd, handleCancel, productEdit }) {
  const [product, setProduct] = useState({
    id: 0,
    productName: "",
    productDetai: "",
    productPrice: 0,
    avaliation: 0,
    amount: 0,
  });

  const [imgs, setImgs] = useState([]); // Armazena múltiplas imagens
  const [defaultImg, setDefaultImg] = useState(null); // Armazena a imagem padrão selecionada

  useEffect(() => {
    setProduct(productEdit);
    const fetchImages = async () => {
      const data = await imageService.doGet(
        "/get-by-product?idProduct=" + productEdit.id
      );
      if (data) {
        const images = [];
        await data.forEach((data) => {
          const image = new ImageModel();
          image.id = data.id;
          image.originalName = data.originalName;
          image.imageBase64 = data.imageBase64;
          images.push(image);
        });

        console.log(images);

        setImgs(images);
      }
    };

    fetchImages();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    if (product.productName.length > 200) {
      alert("O nome do produto não pode exceder 200 caracteres");
      return;
    }
    if (product.productDetai.length > 2000) {
      alert("Os detalhes do produto não podem exceder 2000 caracteres");
      return;
    }
    if (!/^\d+(\.\d{1,2})?$/.test(product.productPrice)) {
      alert("O preço deve ter no máximo duas casas decimais");
      return;
    }

    if (parseFloat(product.productPrice) < 0) {
      alert("O preço não pode ser negativo");
      return;
    }
    if (parseInt(product.amount, 10) < 0) {
      alert("A quantidade não pode ser negativa");
      return;
    }
    if (imgs.length <= 0) {
      alert("Selecione imagens do produto para realizar o cadastro"); // Mensagem de erro
      return; // Encerra a função se não houver imagens
    }

    // Cria o objeto de produto
    const formData = new FormData();
    formData.append("id", product.id);
    formData.append("productName", product.productName);
    formData.append("productDetai", product.productDetai);
    formData.append("productPrice", parseFloat(product.productPrice));
    formData.append("avaliation", parseFloat(product.avaliation));
    formData.append("amount", parseInt(product.amount, 10));

     // Adiciona a imagem padrão na primeira posição do array
     if (defaultImg) {
        formData.append('img', defaultImg.imageFile); // Adiciona a imagem padrão
    }

    // Verifica se há imagens selecionadas e adiciona ao formData
    imgs.forEach(img => {
        if (img !== defaultImg) { // Adiciona apenas as imagens que não são a padrão
            formData.append('img', img.imageFile); // 'imgs' é o nome do campo que será processado no backend
        }
    });
    
    // Chama a função de registro com os dados do produto
    handleEditProd(formData)
      .then((message) => {
        alert(message); // Alerta com a mensagem de sucesso
      })
      .catch((err) => {
        console.error("Erro ao cadastrar:", err);
        alert(err.message); // Alerta com a mensagem de erro
      });
  };

  // Função para definir a imagem padrão
  const handleSetDefaultImg = (img) => {
    setDefaultImg(img);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(",")[1]; // Remove o prefixo
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const loadImages = async (files) => {
    const images = [];
    for (let index = 0; index < files.length; index++) {
      const file = files[index];

      const imageModel = new ImageModel();
      imageModel.id = 0;
      imageModel.originalName = file.name;
      imageModel.imageFile = file;
      imageModel.imageBase64 = await convertToBase64(file);
      images.push(imageModel);
      console.log(imageModel);
    }

    setImgs((prevImages) => [...prevImages, ...images]);
  };

  const removeImage = async (imagem) => {
    if (imagem.id !== 0) {
      alert("Imagem " + imagem.id);
      const data = await imageService.removeImage(imagem.id);
      if (data) {
        alert("Imagem removida com sucesso.");
      }
    }
    setImgs((prevImagens) => prevImagens.filter((img) => img.id !== imagem.id));
  };

  const getForm = () => {
    return (
      <>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Nome do Produto
          </label>
          <div>
            <input
              type="text"
              className="form-control"
              id="productName"
              name="productName"
              value={product.productName}
              onChange={handleChange}
              disabled={!authService.isAdmin()}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="productDetai" className="form-label">
            Detalhes do Produto
          </label>
          <div>
            <input
              type="text"
              className="form-control"
              id="productDetai"
              name="productDetai"
              value={product.productDetai}
              onChange={handleChange}
              disabled={!authService.isAdmin()}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Quantidade
          </label>
          <div>
            <input
              type="number"
              className="form-control"
              id="amount"
              name="amount"
              value={product.amount}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">
            Preço
          </label>
          <div>
            <input
              type="number"
              step="0.01"
              className="form-control"
              id="productPrice"
              name="productPrice"
              value={product.productPrice}
              onChange={handleChange}
              disabled={!authService.isAdmin()}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="avaliation" className="form-label">
            Avaliação
          </label>
          <div>
            <select
              className="form-control"
              id="avaliation"
              name="avaliation"
              value={product.avaliation}
              onChange={handleChange}
              disabled={!authService.isAdmin()}
              required
            >
              <option value="">Selecione uma avaliação</option>
              <option value="1">1</option>
              <option value="1.5">1.5</option>
              <option value="2">2</option>
              <option value="2.5">2.5</option>
              <option value="3">3</option>
              <option value="3.5">3.5</option>
              <option value="4">4</option>
              <option value="4.5">4.5</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="imgs" className="form-label">
            Imagens do Produto
          </label>
          <div>
            <input
              type="file"
              className="form-control"
              id="imgs"
              onChange={(e) => loadImages([...e.target.files])} // Armazena múltiplos arquivos de imagem selecionados
              multiple // Permite seleção de múltiplos arquivos
              disabled={!authService.isAdmin()}
            />
          </div>
        </div>

        {/* Exibe as imagens selecionadas e permite escolher uma como padrão */}
        {imgs.length > 0 && (
          <div className="mb-3">
            <h5>Imagens Selecionadas</h5>
            <div className="d-flex flex-wrap">
              <Carrosel
                imagens={imgs}
                onRemoveImage={removeImage}
                onDefaultImage={handleSetDefaultImg}
                showIcon={authService.isAdmin()}
              />
            </div>
          </div>
        )}

        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Editar
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="container">
      <h2>Editar Produto</h2>
      <form onSubmit={handleSubmit}>
        {product ? getForm() : <p>Carregando form ...</p>}
      </form>
    </div>
  );
}

class ImageModel {
  id;
  url;
  originalName;
  imageFile;
  imageBase64;
}

export default EditProduct;
