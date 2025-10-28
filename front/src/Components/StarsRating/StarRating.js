import React from 'react';

const StarRating = ({ avaliacao }) => {
    const renderStars = (avaliacao) => {
        const fullStars = Math.floor(avaliacao); // Número de estrelas cheias
        const hasHalfStar = avaliacao % 1 !== 0; // Verifica se há meia estrela
        const totalStars = 5; // Total de estrelas que você quer mostrar

        // Cria um array com as classes das estrelas
        let stars = Array(totalStars).fill('bi-star-fill'); // Estrelas cheias

        // Ajusta o último item se houver uma meia estrela
        if (hasHalfStar) {
            stars[fullStars] = 'bi-star-half'; // Meia estrela
        }

        // Ajusta as estrelas restantes para estrela vazia
        if (fullStars < totalStars) {
            stars.fill('bi-star', fullStars + (hasHalfStar ? 1 : 0)); // Estrela vazia
        }
        return stars;
    };

    // Renderiza as estrelas
    const stars = renderStars(avaliacao);

    return (
        <div>
            {stars.map((starClass, index) => (
                <i key={index} className={`bi ${starClass}`}></i> // Renderiza o ícone da estrela
            ))}
        </div>
    );
};

export default StarRating;