'use client';

import { useEffect, useState } from 'react';
import { Template } from '@/types';
import { getTemplates, deleteTemplate, updateTemplate } from '@/lib/firebase';
import Button from './Button';

interface TemplateListProps {
  onRefresh: () => void;
}

const CATEGORIES_MAP: Record<string, string> = {
  familia: '👨‍👩‍👧‍👦 Familia',
  estado_civil: '💍 Estado Civil',
  plan_medicina: '🏥 Plan de Medicina',
};

export default function TemplateList({ onRefresh }: TemplateListProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editContent, setEditContent] = useState('');
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    setLoading(true);
    try {
      const loaded = await getTemplates();
      setTemplates(loaded.sort((a, b) => b.updatedAt - a.updatedAt));
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta plantilla?')) {
      try {
        await deleteTemplate(id);
        setTemplates(templates.filter((t) => t.id !== id));
      } catch (error) {
        console.error('Error deleting template:', error);
      }
    }
  };

  const startEditing = (template: Template) => {
    setEditingId(template.id);
    setEditName(template.name);
    setEditContent(template.content);
  };

  const handleUpdate = async (id: string) => {
    if (!editName.trim() || !editContent.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      await updateTemplate(id, {
        name: editName,
        content: editContent,
      } as Partial<Template>);

      setTemplates(
        templates.map((t) =>
          t.id === id
            ? { ...t, name: editName, content: editContent }
            : t
        )
      );
      setEditingId(null);
    } catch (error) {
      console.error('Error updating template:', error);
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
    setEditContent('');
  };

  const filteredTemplates = filterCategory
    ? templates.filter((t) => t.category === filterCategory)
    : templates;

  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-whatsapp mx-auto mb-2"></div>
          <p className="text-gray-600 text-sm">Cargando plantillas...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Category Filter */}
      <div className="card mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Filtrar por:</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterCategory(null)}
            className={`px-3 py-1 rounded-full text-sm transition ${
              filterCategory === null
                ? 'bg-whatsapp text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Todas ({templates.length})
          </button>
          {Object.entries(CATEGORIES_MAP).map(([key, label]) => {
            const count = templates.filter((t) => t.category === key).length;
            return (
              <button
                key={key}
                onClick={() => setFilterCategory(key)}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  filterCategory === key
                    ? 'bg-whatsapp text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Templates List */}
      <div className="space-y-3">
        {filteredTemplates.length === 0 ? (
          <div className="card bg-gray-50 text-center py-8">
            <p className="text-gray-600">No hay plantillas en esta categoría</p>
          </div>
        ) : (
          filteredTemplates.map((template) => (
            <div key={template.id} className="card">
              {editingId === template.id ? (
                // Edit Mode
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="input-field"
                    placeholder="Nombre"
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="input-field resize-none h-24"
                    placeholder="Contenido"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleUpdate(template.id)}
                      variant="primary"
                      className="flex-1"
                    >
                      ✓ Guardar
                    </Button>
                    <Button
                      onClick={cancelEditing}
                      variant="secondary"
                      className="flex-1"
                    >
                      ✕ Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{template.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {CATEGORIES_MAP[template.category]}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {new Date(template.updatedAt).toLocaleDateString('es-AR')}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded mb-3 whitespace-pre-wrap break-words">
                    {template.content}
                  </p>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => startEditing(template)}
                      variant="secondary"
                      className="flex-1 text-sm"
                    >
                      ✏️ Editar
                    </Button>
                    <Button
                      onClick={() => handleDelete(template.id)}
                      variant="danger"
                      className="flex-1 text-sm"
                    >
                      🗑️ Eliminar
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
