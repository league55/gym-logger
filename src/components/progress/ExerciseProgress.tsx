import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Exercise, ExerciseParameters } from '../../types';

interface ExerciseProgressProps {
  history: Array<{ date: string; parameters: ExerciseParameters }>;
  exerciseParameters: Exercise['parameters'];
}

const PARAMETER_LABELS = {
  weight: 'Weight (kg)',
  repetitions: 'Repetitions',
  time: 'Time (min)',
  distance: 'Distance (km)'
} as const;

export function ExerciseProgress({ history, exerciseParameters }: ExerciseProgressProps) {
  const availableParameters = Object.entries(exerciseParameters || {})
    .filter(([_, hasParameter]) => hasParameter)
    .map(([key]) => key.replace('has', '').toLowerCase());

  const [selectedParameter, setSelectedParameter] = useState(availableParameters[0]);

  const chartData = history
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(entry => ({
      date: new Date(entry.date).toLocaleDateString(),
      value: entry.parameters[selectedParameter as keyof ExerciseParameters] || 0
    }));

  if (!exerciseParameters || availableParameters.length === 0) {
    return <div>No progress data available</div>;
  }

  return (
    <div className="space-y-4">
      {availableParameters.length > 1 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Show Progress For:
          </label>
          <select
            value={selectedParameter}
            onChange={(e) => setSelectedParameter(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {availableParameters.map(param => (
              <option key={param} value={param}>
                {PARAMETER_LABELS[param as keyof typeof PARAMETER_LABELS]}
              </option>
            ))}
          </select>
        </div>
      )}
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis 
              label={{ 
                value: PARAMETER_LABELS[selectedParameter as keyof typeof PARAMETER_LABELS],
                angle: -90,
                position: 'insideLeft'
              }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}