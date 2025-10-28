import React, { useState } from 'react';

function RegisterProduct({ handleRegisterProd, handleCancel }) {
    // Estados para armazenar os dados do formulário
    const [productName, setProductName] = useState('');
    const [productDetai, setproductDetai] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [avaliation, setAvaliation] = useState('');
    const [amount, setAmount] = useState('');
    const [imgs, setImgs] = useState([]); // Armazena múltiplas imagens
    const [defaultImg, setDefaultImg] = useState(null); // Armazena a imagem padrão selecionada

    // Função para lidar com o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();


        if (productName.length > 200) {
            alert('O nome do produto não pode exceder 200 caracteres');
            return;
        }
        if (productDetai.length > 2000) {
            alert('Os detalhes do produto não podem exceder 2000 caracteres');
            return;
        }
        if (!/^\d+(\.\d{1,2})?$/.test(productPrice)) {
            alert('O preço deve ter no máximo duas casas decimais');
            return;
        }

        if (parseFloat(productPrice) < 0) {
            alert('O preço não pode ser negativo');
            return;
        }
        if (parseInt(amount, 10) < 0) {
            alert('A quantidade não pode ser negativa');
            return;
        }
        if (imgs.length <= 0) {
            alert('Selecione imagens do produto para realizar o cadastro'); // Mensagem de erro
            return; // Encerra a função se não houver imagens
        }
        
        // Cria o objeto de produto
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productDetai', productDetai);
        formData.append('productPrice', parseFloat(productPrice));
        formData.append('avaliation', parseFloat(avaliation));
        formData.append('amount', parseInt(amount, 10));


        // Adiciona a imagem padrão na primeira posição do array
        if (defaultImg) {
            formData.append('img', defaultImg); // Adiciona a imagem padrão
        }

        // Verifica se há imagens selecionadas e adiciona ao formData
        imgs.forEach(img => {
            if (img !== defaultImg) { // Adiciona apenas as imagens que não são a padrão
                formData.append('img', img); // 'imgs' é o nome do campo que será processado no backend
            }
        });

        // Chama a função de registro com os dados do produto
        handleRegisterProd(formData)
        .then((message) => {
            alert(message); // Alerta com a mensagem de sucesso
        })
        .catch((err) => {
            console.error('Erro ao cadastrar:', err);
            alert(err.message); // Alerta com a mensagem de erro
        });

    };

    // Função para definir a imagem padrão
    const handleSetDefaultImg = (img) => {
        setDefaultImg(img);
    };

    return (
        <div className="container">
            <h2>Registrar Produto</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="productName" className="form-label">Nome do Produto</label>
                    <div>
                        <input
                            type="text"
                            className="form-control"
                            id="productName"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="productDetai" className="form-label">Detalhes do Produto</label>
                    <div>
                        <input
                            type="text"
                            className="form-control"
                            id="productDetai"
                            value={productDetai}
                            onChange={(e) => setproductDetai(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Quantidade</label>
                    <div>
                        <input
                            type="number"
                            className="form-control"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="productPrice" className="form-label">Preço</label>
                    <div>
                        <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            id="productPrice"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="avaliation" className="form-label">Avaliação</label>
                    <div>
                        <select
                            className="form-control"
                            id="avaliation"
                            value={avaliation}
                            onChange={(e) => setAvaliation(e.target.value)}
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
                    <label htmlFor="imgs" className="form-label">Imagens do Produto</label>
                    <div>
                        <input
                            type="file"
                            className="form-control"
                            id="imgs"
                            onChange={(e) => setImgs([...e.target.files])} // Armazena múltiplos arquivos de imagem selecionados
                            multiple // Permite seleção de múltiplos arquivos
                        />
                    </div>
                </div>

                {/* Exibe as imagens selecionadas e permite escolher uma como padrão */}
                {imgs.length > 0 && (
                    <div className="mb-3">
                        <h5>Imagens Selecionadas</h5>
                        <div className="d-flex flex-wrap">
                            {Array.from(imgs).map((img, index) => (
                                <div key={index} className="me-3">
                                    <img
                                        src={URL.createObjectURL(img)}
                                        alt={`Imagem ${index + 1}`}
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        onClick={() => handleSetDefaultImg(img)} // Define a imagem como padrão ao clicar
                                    />
                                    {defaultImg === img && <span className="badge bg-success">Padrão</span>} {/* Indica a imagem padrão */}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">Registrar</button>
                    <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterProduct;
