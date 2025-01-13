import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Exercise, MuscleGroup, Equipment, ExerciseCategory, ExerciseParameters } from '../../types';
import { Button } from '../common/Button';
import { ParameterToggle } from './ParameterToggle';

interface ExerciseFormProps {
  onSubmit: (exercise: Omit<Exercise, 'id'>) => void;
  onCancel: () => void;
}

export function ExerciseForm({ onSubmit, onCancel }: ExerciseFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    notes: '',
    muscleGroups: [] as MuscleGroup[],
    equipment: [] as Equipment[],
    parameters: {
      hasWeight: false,
      hasRepetitions: false,
      hasTime: false,
      hasDistance: false,
    },
    parameterValues: {
      weight: '',
      repetitions: '',
      time: '',
      distance: '',
    },
    category: 'strength' as ExerciseCategory,
    formGuide: {
      instructions: '',
      imageUrl: '',
      videoUrl: ''
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parameters: ExerciseParameters = {};
    
    Object.entries(formData.parameters).forEach(([key, enabled]) => {
      if (enabled) {
        const paramName = key.replace('has', '').toLowerCase();
        parameters[paramName as keyof ExerciseParameters] = 
          parseFloat(formData.parameterValues[paramName as keyof typeof formData.parameterValues]) || 0;
      }
    });

    onSubmit({
      ...formData,
      sets: [{
        id: crypto.randomUUID(),
        parameters,
        restTime: 60,
        isPersonalRecord: false
      }]
    });
  };

  const handleParameterToggle = (paramName: keyof typeof formData.parameters) => {
    setFormData(prev => ({
      ...prev,
      parameters: {
        ...prev.parameters,
        [paramName]: !prev.parameters[paramName]
      },
      parameterValues: {
        ...prev.parameterValues,
        [paramName.replace('has', '').toLowerCase()]: ''
      }
    }));
  };

  const handleParameterValueChange = (paramName: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      parameterValues: {
        ...prev.parameterValues,
        [paramName]: value
      }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Exercise Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Parameters</label>
        <div className="flex flex-wrap gap-4">
          <ParameterToggle
            name="weight"
            label="Weight"
            unit="kg"
            value={formData.parameterValues.weight}
            isEnabled={formData.parameters.hasWeight}
            onToggle={() => handleParameterToggle('hasWeight')}
            onChange={(value) => handleParameterValueChange('weight', value)}
          />
          <ParameterToggle
            name="repetitions"
            label="Repetitions"
            unit="reps"
            value={formData.parameterValues.repetitions}
            isEnabled={formData.parameters.hasRepetitions}
            onToggle={() => handleParameterToggle('hasRepetitions')}
            onChange={(value) => handleParameterValueChange('repetitions', value)}
          />
          <ParameterToggle
            name="time"
            label="Time"
            unit="min"
            value={formData.parameterValues.time}
            isEnabled={formData.parameters.hasTime}
            onToggle={() => handleParameterToggle('hasTime')}
            onChange={(value) => handleParameterValueChange('time', value)}
          />
          <ParameterToggle
            name="distance"
            label="Distance"
            unit="km"
            value={formData.parameterValues.distance}
            isEnabled={formData.parameters.hasDistance}
            onToggle={() => handleParameterToggle('hasDistance')}
            onChange={(value) => handleParameterValueChange('distance', value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            category: e.target.value as ExerciseCategory 
          }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="strength">Strength</option>
          <option value="cardio">Cardio</option>
          <option value="flexibility">Flexibility</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" icon={Plus}>
          Add Exercise
        </Button>
      </div>
    </form>
  );
}