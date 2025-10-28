import React from "react";
import Carousel from "react-bootstrap/Carousel";
import ImgCarrosel from "../ImgCarrossel/ImgCarrosel";
import { FaTrashAlt } from 'react-icons/fa'; // Importando ícone de lixeira

const Carrosel = React.memo(({ imagens, onRemoveImage, showIcon=false, onDefaultImage }) => {
  console.log(imagens);
  
  if (!Array.isArray(imagens)) {
    return <p>Sem imagens disponíveis.</p>;
  }

  return (
    <div className="carrossel">
      <Carousel data-bs-theme="dark">
        {imagens.map((imagem, index) => (
          <Carousel.Item key={index} onClick={() => showIcon ? onDefaultImage(imagem) : ''}>
            <ImgCarrosel image64={imagem.imageBase64} />
            <Carousel.Caption>
              {showIcon ?
              <div className="acoes">
              <div className="itens">
                {/* Ícone de lixeira */}
                <i
                  onClick={() => onRemoveImage(imagem)} // Chama a função passada via props com o objeto da imagem
                  className="icon-trash"
                >
                  <FaTrashAlt />
                </i>
              </div>
            </div>
            : ""}
              
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
});

export default Carrosel;
