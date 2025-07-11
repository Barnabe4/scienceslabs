import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Doughnut, Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const SalesChart = () => {
  const data = {
    labels: ['Équipement Chimie', 'Réactifs', 'Équipement Physique', 'Équipement SVT'],
    datasets: [{
      data: [34, 27, 22, 17],
      backgroundColor: ['#3498db', '#2ecc71', '#f1c40f', '#e67e22'],
      borderWidth: 0,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        }
      }
    }
  };

  return <Doughnut data={data} options={options} />;
};

export const ProfitChart = () => {
  const data = {
    labels: ['Marge brute', 'Autres'],
    datasets: [{
      data: [65, 35],
      backgroundColor: ['#f39c12', '#ecf0f1'],
      borderWidth: 0,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        }
      }
    }
  };

  return <Doughnut data={data} options={options} />;
};

export const ConversionChart = () => {
  const data = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'],
    datasets: [{
      label: 'Clients acquis',
      data: [120, 180, 130, 145, 90, 155, 120],
      backgroundColor: 'rgba(52, 152, 219, 0.2)',
      borderColor: '#2980b9',
      fill: true,
      tension: 0.4,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f0f0f0'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return <Line data={data} options={options} />;
};

export const CartAbandonChart = () => {
  const data = {
    labels: ['Équipements', 'Réactifs'],
    datasets: [{
      label: 'Abandon de panier %',
      data: [76, 65],
      backgroundColor: ['#f1c40f', '#3498db'],
      borderWidth: 0,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: '#f0f0f0'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export const OrderSizeChart = () => {
  const data = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'],
    datasets: [{
      label: 'Commandes',
      data: [100, 150, 200, 180, 120, 250, 240],
      borderColor: '#8e44ad',
      backgroundColor: 'transparent',
      fill: false,
      tension: 0.4,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f0f0f0'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return <Line data={data} options={options} />;
};

export const SiteTrafficChart = () => {
  const data = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'],
    datasets: [{
      label: 'Visites',
      data: [100, 180, 150, 160, 170, 250, 300],
      borderColor: '#27ae60',
      backgroundColor: 'rgba(39, 174, 96, 0.2)',
      fill: true,
      tension: 0.4,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f0f0f0'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return <Line data={data} options={options} />;
};

export const TransactionsChart = () => {
  const data = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Équipements',
        data: [80, 100, 60, 130, 90, 120],
        backgroundColor: '#3498db'
      },
      {
        label: 'Réactifs',
        data: [40, 60, 30, 90, 60, 100],
        backgroundColor: '#2ecc71'
      },
      {
        label: 'Autres',
        data: [30, 50, 20, 70, 40, 80],
        backgroundColor: '#f1c40f'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f0f0f0'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
};

// Composant conteneur par défaut
const DashboardCharts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Ventes par Catégorie</h3>
        <div className="h-64">
          <SalesChart />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Marge de Profit</h3>
        <div className="h-64">
          <ProfitChart />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Conversion Client</h3>
        <div className="h-64">
          <ConversionChart />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Abandon de Panier</h3>
        <div className="h-64">
          <CartAbandonChart />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Taille des Commandes</h3>
        <div className="h-64">
          <OrderSizeChart />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Trafic du Site</h3>
        <div className="h-64">
          <SiteTrafficChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;