'use client';

import { useState } from 'react';
import MessageGenerator from '@/components/MessageGenerator';
import TemplateList from '@/components/TemplateList';
import TemplateForm from '@/components/TemplateForm';
import { Template } from '@/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'generator' | 'templates'>('generator');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTemplateCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-whatsapp shadow-lg">
        <div className="max-w-lg mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-white text-center">
            💬 Mensajes WhatsApp
          </h1>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="sticky top-16 z-30 bg-white shadow">
        <div className="max-w-lg mx-auto px-4 flex gap-4">
          <button
            onClick={() => setActiveTab('generator')}
            className={`flex-1 py-3 font-medium transition-colors ${
              activeTab === 'generator'
                ? 'text-whatsapp border-b-2 border-whatsapp'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Generador
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex-1 py-3 font-medium transition-colors ${
              activeTab === 'templates'
                ? 'text-whatsapp border-b-2 border-whatsapp'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Plantillas
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 pb-8">
        {activeTab === 'generator' && (
          <MessageGenerator key={refreshTrigger} />
        )}
        {activeTab === 'templates' && (
          <div className="space-y-6 py-6">
            <TemplateForm onTemplateCreated={handleTemplateCreated} />
            <TemplateList key={refreshTrigger} onRefresh={handleTemplateCreated} />
          </div>
        )}
      </div>
    </main>
  );
}
