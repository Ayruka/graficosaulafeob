// MeuGrafico.js
import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // Registrar as escalas do Chart.js

const MeuGrafico = ({ dados }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy(); // Destruir gráfico anterior
    }

    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'bar', // Tipo de gráfico
      data: {
        labels: dados.map(item => `${item.ano}-${item.mes}`), // Ajustar conforme os dados
        datasets: [{
          label: 'Total Vendas',
          data: dados.map(item => parseFloat(item.totalvendas)), // Converter para número
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          x: {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10, // Limitar o número de ticks no eixo x
            },
          },
          y: {
            beginAtZero: true,
          },
        },
        responsive: true,
        maintainAspectRatio: false, // Permitir que o gráfico se ajuste ao tamanho do container
      },
    });
  }, [dados]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '600px', zIndex: 10}}>
      <h2>Gráfico Vertical - Total de Vendas Atual</h2>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default MeuGrafico;
