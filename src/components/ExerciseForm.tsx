import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Exercise, MuscleGroup, Equipment, ExerciseCategory, ExerciseParameters } from '../types';

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
    if (formData.parameters.hasWeight) parameters.weight = parseFloat(formData.parameterValues.weight) || 0;
    if (formData.parameters.hasRepetitions) parameters.repetitions = parseFloat(formData.parameterValues.repetitions) || 0;
    if (formData.parameters.hasTime) parameters.time = parseFloat(formData.parameterValues.time) || 0;
    if (formData.parameters.hasDistance) parameters.distance = parseFloat(formData.parameterValues.distance) || 0;

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

  const ParameterToggle = ({ name, label, unit }: { 
    name: keyof typeof formData.parameters; 
    label: string;
    unit: string;
  }) => (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => {
          setFormData(prev => ({
            ...prev,
            parameters: {
              ...prev.parameters,
              [name]: !prev.parameters[name]
            },
            parameterValues: {
              ...prev.parameterValues,
              [name.replace('has', '').toLowerCase()]: ''
            }
          }));
        }}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          formData.parameters[name]
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {label}
      </button>
      
      {formData.parameters[name] && (
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={formData.parameterValues[name.replace('has', '').toLowerCase() as keyof typeof formData.parameterValues]}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              parameterValues: {
                ...prev.parameterValues,
                [name.replace('has', '').toLowerCase()]: e.target.value
              }
            }))}
            className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
            step="0.1"
            placeholder="0"
          />
          <span className="text-sm text-gray-500">{unit}</span>
        </div>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Exercise Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Parameters</label>
        <div className="flex flex-wrap gap-4">
          <ParameterToggle name="hasWeight" label="Weight" unit="kg" />
          <ParameterToggle name="hasRepetitions" label="Repetitions" unit="reps" />
          <ParameterToggle name="hasTime" label="Time" unit="min" />
          <ParameterToggle name="hasDistance" label="Distance" unit="km" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value as ExerciseCategory })}
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
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Add Exercise
        </button>
      </div>
    </form>
  );
}