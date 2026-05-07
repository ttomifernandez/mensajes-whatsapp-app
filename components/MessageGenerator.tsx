'use client';

import { useEffect, useState } from 'react';
import { Template } from '@/types';
import { getTemplates, createTemplate } from '@/lib/firebase';
import {
  generateMessage,
  copyToClipboard,
  openWhatsApp,
  getDefaultTemplates,
  MessageFilters,
} from '@/lib/messageGenerator';
import Button from './Button';
import CopyButton from './CopyButton';

export default function MessageGenerator() {
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const [filters, setFilters] = useState<MessageFilters>({
    name: '',
    children: 'sin_hijos',
    maritalStatus: 'single',
    healthPlan: 'no_plan',
  });

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    setLoading(true);
    try {
      let loaded = await getTemplates();

      // If no templates exist, create defaults
      if (loaded.length === 0) {
        const defaultTemplates = getDefaultTemplates();
        for (const template of defaultTemplates) {
          await createTemplate(template);
        }
        loaded = await getTemplates();
      }

      setTemplates(loaded);
    } catch (error) {
      console.error('Error loading templates:', error);
      // Use default templates in memory if Firebase fails
      setTemplates([]);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = () => {
    const message = generateMessage(templates, filters);
    setGeneratedMessage(message);
  };

  const handleCopy = async () => {
    if (generatedMessage) {
      const success = await copyToClipboard(generatedMessage);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleWhatsApp = () => {
    if (generatedMessage) {
      openWhatsApp(generatedMessage);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-whatsapp mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando plantillas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6">
      {/* Form Section */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">⚙️ Opciones</h2>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre (opcional)
          </label>
          <input
            type="text"
            placeholder="Ej: Juan"
            className="input-field"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />
        </div>

        {/* Children Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            👨‍👩‍👧‍👦 ¿Cuántos hijos?
          </label>
          <select
            className="input-field"
            value={filters.children}
            onChange={(e) =>
              setFilters({
                ...filters,
                children: e.target.value as MessageFilters['children'],
              })
            }
          >
            <option value="sin_hijos">Sin hijos</option>
            <option value="con_hijos_1">1 hijo</option>
            <option value="con_hijos_2plus">2+ hijos</option>
          </select>
        </div>

        {/* Marital Status Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            💍 Estado civil
          </label>
          <select
            className="input-field"
            value={filters.maritalStatus}
            onChange={(e) =>
              setFilters({
                ...filters,
                maritalStatus: e.target.value as MessageFilters['maritalStatus'],
              })
            }
          >
            <option value="single">Soltero/a</option>
            <option value="married">Casado/a</option>
            <option value="divorced">Divorciado/a</option>
            <option value="widowed">Viudo/a</option>
          </select>
        </div>

        {/* Health Plan Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🏥 Plan de medicina prepaga
          </label>
          <select
            className="input-field"
            value={filters.healthPlan}
            onChange={(e) =>
              setFilters({
                ...filters,
                healthPlan: e.target.value as MessageFilters['healthPlan'],
              })
            }
          >
            <option value="no_plan">Sin plan actual</option>
            <option value="plan_a">Plan A</option>
            <option value="plan_b">Plan B</option>
            <option value="plan_c">Plan C</option>
          </select>
        </div>

        <Button onClick={handleGenerate} variant="primary" className="w-full">
          🎯 Generar Mensaje
        </Button>
      </div>

      {/* Generated Message Section */}
      {generatedMessage && (
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">📝 Tu Mensaje</h2>
          <div className="bg-gray-50 p-4 rounded-lg mb-4 border-l-4 border-whatsapp">
            <p className="text-gray-800 whitespace-pre-wrap break-words">
              {generatedMessage}
            </p>
          </div>

          <div className="flex gap-3">
            <CopyButton
              text={generatedMessage}
              copied={copied}
              className="flex-1"
            />
            <Button
              onClick={handleWhatsApp}
              variant="primary"
              className="flex-1 flex items-center justify-center gap-2"
            >
              📱 Enviar por WhatsApp
            </Button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!generatedMessage && (
        <div className="card bg-gradient-to-br from-gray-50 to-gray-100 text-center py-8">
          <div className="text-3xl mb-3">📨</div>
          <p className="text-gray-600">
            Completa las opciones y presiona "Generar Mensaje" para ver el resultado aquí
          </p>
        </div>
      )}
    </div>
  );
}
