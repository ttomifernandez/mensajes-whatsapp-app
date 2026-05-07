import { Template } from '@/types';

export interface MessageFilters {
  name?: string;
  children: 'sin_hijos' | 'con_hijos_1' | 'con_hijos_2plus';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  healthPlan: 'plan_a' | 'plan_b' | 'plan_c' | 'no_plan';
}

export const generateMessage = (
  baseTemplates: Template[],
  filters: MessageFilters
): string => {
  // Group templates by category for better message generation
  const templatesByCategory: Record<string, Template[]> = {};

  baseTemplates.forEach((template) => {
    if (!templatesByCategory[template.category]) {
      templatesByCategory[template.category] = [];
    }
    templatesByCategory[template.category].push(template);
  });

  // Build the message with personalization
  let message = '';

  // Add greeting with name
  if (filters.name?.trim()) {
    message += `¡Hola ${filters.name}!\n\n`;
  } else {
    message += '¡Hola!\n\n';
  }

  // Select template based on family status
  const familyPart = selectByFamily(templatesByCategory, filters.children);
  if (familyPart) message += familyPart + '\n';

  // Select template based on marital status
  const maritalPart = selectByMaritalStatus(templatesByCategory, filters.maritalStatus);
  if (maritalPart) message += maritalPart + '\n';

  // Select template based on health plan
  const healthPart = selectByHealthPlan(templatesByCategory, filters.healthPlan);
  if (healthPart) message += healthPart + '\n';

  // Add closing
  message += '\n¡Esperamos poder ayudarte pronto!';

  return message.trim();
};

const selectByFamily = (
  templates: Record<string, Template[]>,
  children: string
): string => {
  const familyTemplates = templates['familia'] || [];
  if (familyTemplates.length === 0) return '';

  const childrenMap: Record<string, number> = {
    sin_hijos: 0,
    con_hijos_1: 1,
    con_hijos_2plus: 2,
  };

  const childCount = childrenMap[children] || 0;
  const filteredTemplates = familyTemplates.filter((t) => {
    if (childCount === 0 && t.content.includes('hijo')) return false;
    if (childCount === 1 && !t.content.includes('hijo')) return false;
    if (childCount >= 2 && !t.content.includes('hijo')) return false;
    return true;
  });

  return filteredTemplates.length > 0
    ? filteredTemplates[0].content
    : familyTemplates[0].content;
};

const selectByMaritalStatus = (
  templates: Record<string, Template[]>,
  status: string
): string => {
  const maritalTemplates = templates['estado_civil'] || [];
  if (maritalTemplates.length === 0) return '';

  const statusMap: Record<string, string> = {
    single: 'soltero',
    married: 'casado',
    divorced: 'divorciado',
    widowed: 'viudo',
  };

  const statusKeyword = statusMap[status];
  const filteredTemplates = maritalTemplates.filter((t) =>
    t.content.toLowerCase().includes(statusKeyword)
  );

  return filteredTemplates.length > 0
    ? filteredTemplates[0].content
    : maritalTemplates[0].content;
};

const selectByHealthPlan = (
  templates: Record<string, Template[]>,
  plan: string
): string => {
  const healthTemplates = templates['plan_medicina'] || [];
  if (healthTemplates.length === 0) return '';

  const planMap: Record<string, string> = {
    plan_a: 'Plan A',
    plan_b: 'Plan B',
    plan_c: 'Plan C',
    no_plan: 'sin plan',
  };

  const planKeyword = planMap[plan];
  const filteredTemplates = healthTemplates.filter((t) =>
    t.content.includes(planKeyword)
  );

  return filteredTemplates.length > 0
    ? filteredTemplates[0].content
    : healthTemplates[0].content;
};

// Copy text to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
};

// Open WhatsApp with pre-filled message
export const openWhatsApp = (message: string): void => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};

// Get default templates for new setup
export const getDefaultTemplates = (): Array<Omit<Template, 'id' | 'createdAt' | 'updatedAt'>> => {
  return [
    {
      name: 'Sin hijos',
      content: 'Te ofrecemos planes especiales para personas sin dependientes.',
      category: 'familia',
    },
    {
      name: 'Con 1 hijo',
      content: 'Tenemos opciones para familias con un hijo con cobertura completa.',
      category: 'familia',
    },
    {
      name: 'Con 2+ hijos',
      content: 'Descuentos especiales para familias con múltiples hijos.',
      category: 'familia',
    },
    {
      name: 'Soltero',
      content: 'Como persona soltera, puedes acceder a nuestros planes más económicos.',
      category: 'estado_civil',
    },
    {
      name: 'Casado',
      content: 'Para parejas casadas ofrecemos planes familiares con excelentes beneficios.',
      category: 'estado_civil',
    },
    {
      name: 'Plan A',
      content: 'Con el Plan A obtienes cobertura básica con buenos precios.',
      category: 'plan_medicina',
    },
    {
      name: 'Plan B',
      content: 'Plan B incluye más prestaciones y especialistas.',
      category: 'plan_medicina',
    },
    {
      name: 'Plan C',
      content: 'Plan C es nuestro plan premium con cobertura completa.',
      category: 'plan_medicina',
    },
    {
      name: 'Sin plan actual',
      content: 'Es el momento perfecto para contratar un plan de medicina prepaga con nosotros.',
      category: 'plan_medicina',
    },
  ];
};
