import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Grafico4 = () => {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/vendasmensais');
        const data = await response.json();
        setDados(data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchDados();
  }, []);

  const chartData = {
    labels: dados.map(item => `${item.ano}-${item.mes < 10 ? '0' : ''}${item.mes}`),
    datasets: [
      {
        label: 'Total Vendas',
        data: dados.map(item => parseFloat(item.totalvendas)), 
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Data',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Total Vendas',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '580px', margin: '0 auto' }}>
        <h2>Gráfico de Linha - Total Vendas por Data</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Grafico4;
