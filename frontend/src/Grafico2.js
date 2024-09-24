
import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Grafico2 = () => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [dados, setDados] = useState([]);
  const itemsPorPagina = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/estoquebaixo');
        const data = await response.json();
        console.log('Dados recebidos:', data);
        setDados(data);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (dados.length === 0) return; 

    if (chartRef.current) {
      chartRef.current.destroy(); 
    }

    const dadosFiltrados = dados.filter(item => item.quantidadeestoque > 0);


    const dadosAleatorios = [];
    while (dadosAleatorios.length < itemsPorPagina && dadosFiltrados.length > 0) {
      const randomIndex = Math.floor(Math.random() * dadosFiltrados.length);
      dadosAleatorios.push(dadosFiltrados[randomIndex]);
      dadosFiltrados.splice(randomIndex, 1); 
    }

    console.log('Dados para exibir:', dadosAleatorios); 

    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'bar', 
      data: {
        labels: dadosAleatorios.map(item => item.nome), 
        datasets: [{
          label: 'Quantidade em Estoque',
          data: dadosAleatorios.map(item => item.quantidadeestoque), 
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          barThickness: 30, 
          maxBarThickness: 50, 
        }],
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10, 
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false, // Permitir que o gráfico se ajuste ao tamanho do container
        barPercentage: 0.6, // Ajustar espaçamento
        categoryPercentage: 0.6, 
      },
    });
  }, [dados]);

  useEffect(() => {
    const interval = setInterval(() => {
      // A cada 5 segundos, forçar a atualização do gráfico
      setDados(prevDados => [...prevDados]); // Isso só reinicia o gráfico
    }, 7000); // Mudar a cada 5 segundos

    return () => clearInterval(interval); // Limpar o intervalo ao desmontar
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '600px', zIndex: 10 }}>
            <h2>Gráfico Horizontal - Estoque Baixo</h2>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Grafico2;
