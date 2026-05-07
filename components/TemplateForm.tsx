'use client';

import { useState } from 'react';
import { createTemplate } from '@/lib/firebase';
import Button from './Button';

interface TemplateFormProps {
  onTemplateCreated: () => void;
}

const CATEGORIES = [
  { value: 'familia', label: '👨‍👩‍👧‍👦 Familia' },
  { value: 'estado_civil', label: '💍 Estado Civil' },
  { value: 'plan_medicina', label: '🏥 Plan de Medicina' },
];

export default function TemplateForm({ onTemplateCreated }: TemplateFormProps) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('familia');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim() || !content.trim()) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      await createTemplate({
        name,
        content,
        category,
      });

      setSuccess('Plantilla creada exitosamente');
      setName('');
      setContent('');
      setCategory('familia');

      setTimeout(() => {
        setSuccess('');
        onTemplateCreated();
      }, 1500);
    } catch (err) {
      setError('Error al crear la plantilla. Intenta nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">➕ Nueva Plantilla</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre
          </label>
          <input
            type="text"
            placeholder="Ej: Saludo para padres"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Category Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoría
          </label>
          <select
            className="input-field"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Content Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contenido
          </label>
          <textarea
            placeholder="Escribe el contenido de la plantilla..."
            className="input-field resize-none h-28"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            {content.length} caracteres
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={loading}
        >
          {loading ? '⏳ Guardando...' : '💾 Guardar Plantilla'}
        </Button>
      </form>
    </div>
  );
}
