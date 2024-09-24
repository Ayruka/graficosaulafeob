// App.js
import React, { useState } from 'react';
import './App.css';
import logo from './images/unifeob-branco-215.png';
import menuImage from './images/Sem Fundo Logo 02- Black.png';
import MeuGrafico from './Grafico1.js'; // Importe o componente do gráfico 1
import Grafico2 from './Grafico2.js'; // Importe o gráfico 2
import Grafico3 from './Grafico3.js'; // Importe o gráfico 3
import Grafico4 from './Grafico4.js'; // Importe o gráfico 4

const App = () => {
  const [graficoAtivo, setGraficoAtivo] = useState(null); // Estado para o gráfico ativo

  // Dados de exemplo para o primeiro gráfico
  const dadosExemplo = [
    { ano: 2023, mes: 'Janeiro', totalvendas: '100' },
    { ano: 2023, mes: 'Fevereiro', totalvendas: '150' },
    { ano: 2023, mes: 'Março', totalvendas: '200' },
  ];

  // Dados para o segundo gráfico (produtos)
  const dadosProdutos = [
    { produtoid: 652, nome: 'Produto 652', quantidadeestoque: 0 },
    { produtoid: 273, nome: 'Produto 273', quantidadeestoque: 0 },
    { produtoid: 51, nome: 'Produto 51', quantidadeestoque: 0 },
    { produtoid: 951, nome: 'Produto 951', quantidadeestoque: 0 },
    { produtoid: 839, nome: 'Produto 839', quantidadeestoque: 0 },
    { produtoid: 539, nome: 'Produto 539', quantidadeestoque: 0 },
    { produtoid: 874, nome: 'Produto 874', quantidadeestoque: 0 },
    { produtoid: 644, nome: 'Produto 644', quantidadeestoque: 8 },
  ];

  const renderizarGrafico = (grafico) => {
    setGraficoAtivo(grafico); // Atualiza o gráfico ativo
  };

  return (
    <div className="app">
      <div className="sidebar">
        <div className="sidebar-topbar">
          <img src={menuImage} alt="Menu" className="menu-logo" />
        </div>
        <div className="button-container">
          <button className="sidebar-button" onClick={() => renderizarGrafico('grafico1')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dollar-sign">
              <line x1="12" x2="12" y1="2" y2="22"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </button>
          <button className="sidebar-button" onClick={() => renderizarGrafico('grafico2')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-battery-low">
              <rect width="16" height="10" x="2" y="7" rx="2" ry="2"/>
              <line x1="22" x2="22" y1="11" y2="13"/>
              <line x1="6" x2="6" y1="11" y2="13"/>
            </svg>
          </button>
          <button className="sidebar-button" onClick={() => renderizarGrafico('grafico3')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-check">
              <path d="M18 6 7 17l-5-5"/>
              <path d="m22 10-7.5 7.5L13 16"/>
            </svg>
          </button>
          <button className="sidebar-button" onClick={() => renderizarGrafico('grafico4')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-arrow-up">
              <path d="m14 18 4-4 4 4"/>
              <path d="M16 2v4"/>
              <path d="M18 22v-8"/>
              <path d="M21 11.343V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9"/>
              <path d="M3 10h18"/>
              <path d="M8 2v4"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="main-content">
        <div className="topbar">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="content">
          {/* Renderiza o gráfico baseado no botão clicado */}
          {graficoAtivo === 'grafico1' && <MeuGrafico dados={dadosExemplo} />}
          {graficoAtivo === 'grafico2' && <Grafico2 produtos={dadosProdutos} />}
          {graficoAtivo === 'grafico3' && <Grafico3 />} {/* Renderiza o Grafico3 */}
          {graficoAtivo === 'grafico4' && <Grafico4 />} {/* Adicionada a renderização do Grafico4 */}
        </div>
      </div>
    </div>
  );
};

export default App;
