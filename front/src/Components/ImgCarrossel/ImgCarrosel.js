import "./ImgCarrosel.css";

const ImgCarrosel = (image64) => {
  return (
    <img
      className="imagem"
      src={`data:image/jpeg;base64, ${image64.image64}`}
      alt="Imagem Produto"
    />
  );
};

export default ImgCarrosel;
