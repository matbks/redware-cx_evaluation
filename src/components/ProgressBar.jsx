// CustomProgressBar.jsx
import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

const getGradientForRatings = (ratings) => {
    const colors = ratings.map(rating => {
      switch (rating) {
        case 1: return '#00A99D';
        case 2: return '#00A99D';
        case 3: return '#00A99D';
        case 4: return '#00A99D';
        case 5: return '#00A99D';
        default: return 'white';
      }
    });
    const step = 100 / colors.length;
    const gradient = colors.map((color, index) => `${color} ${index * step}%`).join(', ');
    return `linear-gradient(90deg, ${gradient})`;
  };
const CustomProgressBar = ({ ratings }) => {
  // Defina as cores para cada classificação de estrela
  const starColors = {
    1: '#FF4500', // Vermelho
    2: '#FF4500', // Laranja
    3: '#FF4500', // Amarelo
    4: '#FF4500', // Verde
    5: '#FF4500', // Azul
  };
//   const starColors = {
//     1: '#F15A29', // Cor vibrante laranja-avermelhada
//     2: '#F7931E', // Cor laranja brilhante
//     3: '#FBB03B', // Cor amarela alaranjada
//     4: '#00A99D', // Cor turquesa médio
//     5: '#0071BC', // Cor azul royal
// };

 
  // Crie um gradiente com base nas classificações
  const gradientColors = ratings.map(rating => starColors[rating]).join(',');

  // Calcule a porcentagem com base na média das avaliações
  const averageRating = ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length;
  const percentage = (averageRating / 5) * 100;

  // Estilize a barra de progresso com o gradiente de cores
  // const progressBarStyle = {
  //   background: `linear-gradient(to right, ${gradientColors})`,
  //   width: '100%'
  // };

  return (
    <ProgressBar style={{ width: '100%', background: getGradientForRatings(ratings) }}>
    <ProgressBar
      // now={percentage}
      variant="transparent" // Define a variante como transparente para mostrar o gradiente
    //   striped
      // label={`${percentage.toFixed(0)}%`}
    />
  </ProgressBar>
  );
};

export default CustomProgressBar;
