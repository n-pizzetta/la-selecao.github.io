import React from 'react';
import { ScatterChart as RechartsScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ZAxis } from 'recharts';

interface ScatterPlotProps {
  data: any[];
  xAxisDataKey: string;
  yAxisDataKey: string;
  zAxisDataKey?: string;
  name: string;
  fill?: string;
  height?: number;
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({ 
  data, 
  xAxisDataKey, 
  yAxisDataKey,
  zAxisDataKey,
  name,
  fill = '#009739', // Couleur verte de La Bagunça par défaut
  height = 350 
}) => {
  // Formatter personnalisé pour les tooltips
  const formatValue = (value: any) => {
    if (typeof value === 'number') {
      // Formater les nombres avec maximum 2 décimales
      return new Intl.NumberFormat('fr-FR', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 0
      }).format(value);
    }
    return value;
  };

  // Composant personnalisé pour le tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      // Récupérer les données du point
      const data = payload[0].payload;
      
      // Propriétés à afficher, avec le nom du produit en premier
      const propertiesToShow = ['price', 'rating', 'shippingCost'];
      
      return (
        <div className="custom-tooltip" style={{
          backgroundColor: '#fff',
          border: '1px solid #f0f0f0',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          padding: '10px',
          fontSize: '13px',
          color: '#333' // Couleur de texte foncée pour assurer la visibilité sur fond blanc
        }}>
          {/* Afficher le nom du produit en premier et en gras */}
          {data.name && (
            <p style={{ 
              margin: '0 0 8px 0', 
              fontWeight: 'bold', 
              borderBottom: '1px solid #eee',
              paddingBottom: '4px',
              fontSize: '14px',
              color: '#012169' // Couleur bagunca-navy
            }}>
              {data.name}
            </p>
          )}
          
          {propertiesToShow.map((key) => (
            data[key] !== undefined && (
              <p key={key} style={{ margin: '2px 0', color: '#333' }}>
                <span style={{ fontWeight: 'bold', color: '#000' }}>{key} : </span>
                {formatValue(data[key])}
              </p>
            )
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey={xAxisDataKey} 
          name={xAxisDataKey} 
          type="number"
          label={xAxisDataKey === 'deliveryTime' ? { value: 'Délai', position: 'insideBottom', offset: -5 } : undefined}
        />
        <YAxis 
          dataKey={yAxisDataKey} 
          name={yAxisDataKey} 
          type="number"
          domain={yAxisDataKey === 'rating' ? [1, 5] : undefined}
          label={yAxisDataKey === 'rating' ? { value: 'Note', angle: -90, position: 'insideLeft', offset: 10 } : undefined}
        />
        {zAxisDataKey && (
          <ZAxis 
            dataKey={zAxisDataKey} 
            range={[50, 400]} 
            name={zAxisDataKey} 
          />
        )}
        <Tooltip 
          content={<CustomTooltip />}
          cursor={{ strokeDasharray: '3 3' }}
        />
        <Scatter 
          name={name} 
          data={data} 
          fill={fill}
        />
      </RechartsScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterPlot;
