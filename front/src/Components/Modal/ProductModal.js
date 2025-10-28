import React, { useEffect, useRef, useState } from "react";
import { BiArrowBack, BiCart } from "react-icons/bi";
import siteService from "../../Services/SiteService/SiteService";
import Carrosel from "../Carousel/Carousel";
import StarRating from "../StarsRating/StarRating";
import "./ProductModal.css";

const ProductModal = ({ productId, handleCancel }) => {
  const [product, setProduct] = useState(null);
  const imageRef = useRef([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await siteService.getProductByID(productId);

        if (data?.product) setProduct(data.product);

        if (data?.images) imageRef.current = data.images;
        console.log("data", imageRef.current);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, []);

  return (
    <>
      {product ? (
        <main className="modal-prod d-flex justify-content-center align-items-center">
          <div className="container div-principal">
            <div className="row infos mt-2" onClick={() => handleCancel()}>
              <p>
                <BiArrowBack /> Vizualização do produto
              </p>
            </div>
            <div className="row">
              <div className="w-100 product">
                <div className="row">
                  <div className="col-6">
                    <Carrosel imagens={imageRef.current} />
                  </div>

                  <div className="col-6">
                    <div className="product-info">
                      <p>
                        <strong>Produto:</strong> {product.productName}
                      </p>
                      <p>
                        <strong>Detalhes:</strong>{" "}
                      </p>
                      <textarea
                        value={product.productDetai}
                        readOnly
                        style={{ maxHeight: "100px" }}
                      ></textarea>
                      <p>
                        <strong>Preço:</strong> R${" "}
                        {product.productPrice.toFixed(2)}
                      </p>
                      <p>
                        <strong>Quatidade Disponível:</strong> {product.amount}
                      </p>
                      <input
                        className="w-25"
                        type="number"
                        id="numberInput"
                        max={product.amount}
                        min={0}
                      />
                    </div>
                    <div className="rating">
                      <StarRating avaliacao={product.avaliation} />
                    </div>
                  </div>
                </div>

                <div className="row d-flex justify-content-center">
                  <button className="w-25 mt-4 mb-4 btn btn-primary">
                    <BiCart></BiCart> Adicionar no carrinho
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <p>Carregando Produto ...</p>
      )}
    </>
  );
};

export default ProductModal;
