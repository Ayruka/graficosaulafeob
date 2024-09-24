// Grafico3.js
import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // Registrar as escalas do Chart.js

const Grafico3 = () => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pedidos-completos');
        const data = await response.json();
        setDados(data);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy(); // Destruir gráfico anterior
    }

    if (dados.length > 0) {
      // Agrupar dados por status de pedido
      const statusCount = dados.reduce((acc, item) => {
        acc[item.statuspedido] = (acc[item.statuspedido] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(statusCount);
      const data = Object.values(statusCount);

      const ctx = canvasRef.current.getContext('2d');
      chartRef.current = new Chart(ctx, {
        type: 'pie', // Tipo de gráfico
        data: {
          labels: labels, // Status dos pedidos
          datasets: [{
            label: 'Status dos Pedidos',
            data: data, // Contagem de cada status
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [dados]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '600px', zIndex: 10 }}>
        <h2>Gráfico de Setores - Status Pedido</h2>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Grafico3;
