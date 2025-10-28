import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Carrosel from "../../../Components/Carousel/Carousel";
import StarRating from "../../../Components/StarsRating/StarRating";
import cartService from "../../../Services/CartService/CartService";
import siteService from "../../../Services/SiteService/SiteService";
import "./ProductDetails.css";
import Barra from "../../../Components/Navbar/Navbar";
import { BiCart } from "react-icons/bi";
import { BiArrowBack } from 'react-icons/bi';
import Footer from "../../../Components/Footer/footer";

const ProductDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("product");

  const [quantityOrdered, setQuantityOrdered] = useState(0);
  const [product, setProduct] = useState({});
  const imageRef = useRef([]);

  const handleChange = (event) => {
    const value = Number(event.target.value);
    if (value <= product.amount) {
      setQuantityOrdered(value);
    } else {
      setQuantityOrdered(product.amount);
    }
  };

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
  }, [productId]);

  const navigate = new useNavigate();

  const saveOnCart = (productOrder) => {
    productOrder.quantityOrdered = quantityOrdered;
    productOrder.image64 = imageRef.current[0];
    cartService.addItem(productOrder);
    navigate("/cart");
  };


  const tela = () => {
    return (
      <>
        <header>
          <Barra />
        </header>
        <main className="w-100 h-100">
          <div className="w-100 product">
            <div className="row">
              <div className="col-6">
                <Carrosel imagens={imageRef.current} />
              </div>

              <div className="col-6">
                
                <div className="product-info">
                  <p><strong>Produto:</strong> {product.productName}</p>
                  <p><strong>Detalhes:</strong> </p>
                  <textarea value={product.productDetai} readOnly></textarea>
                  <p><strong>Preço:</strong> R$ {product.productPrice.toFixed(2)}</p>
                  <p><strong>Quatidade Disponível:</strong> {product.amount}</p>
                  <input
                    className="w-25"
                    type="number"
                    id="numberInput"
                    value={quantityOrdered}
                    max={product.amount}
                    min={1}
                    onChange={handleChange} // Chama a função ao mudar o valor
                  />
                </div>
                <div className="rating">
                  <StarRating avaliacao={product.avaliation} />
                </div>
              </div>
            </div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
            
            <div className="row d-flex justify-content-center">
          


              <button
                className="w-25 mt-4 mb-4 btn btn-product-off"
                onClick={() => window.location.href = 'http://localhost:3000/pagina-principal'}>
                <BiArrowBack> </BiArrowBack> Voltar
              </button>
              
              <button
                className="w-25 mt-4 mb-4 btn btn-product"
                onClick={() => saveOnCart(product)}
              >
               <BiCart></BiCart> Adicionar no carrinho
              </button>
              
            </div>
            
          </div>
          
        </main>
        <Footer />
        
      </>
      
    );
  };

  return (
    <>{imageRef.current.length > 0 ? tela() : <p>Carregando imagens...</p>}</>
  );
};

export default ProductDetails;
