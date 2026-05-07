# 💬 Generador de Mensajes WhatsApp

Una aplicación web mobile-first para crear, gestionar y personalizar mensajes de WhatsApp según criterios específicos.

## ✨ Características

- **📝 Generador inteligente de mensajes**: Crea mensajes personalizados según:
  - Nombre del contacto
  - Situación familiar (sin hijos, con 1 hijo, 2+ hijos)
  - Estado civil (soltero, casado, divorciado, viudo)
  - Plan de medicina prepaga (Plan A, B, C, o sin plan)

- **📋 CRUD de plantillas**: Crea, edita, elimina y gestiona tus plantillas de mensajes
- **📱 Diseño mobile-first**: Optimizado para uso desde celular
- **📊 Firebase Firestore**: Persiste tus datos en la nube
- **📋 Copiar al portapapeles**: Un click para copiar el mensaje
- **🟢 Integración con WhatsApp**: Envía directamente a WhatsApp Web

## 🛠️ Stack Tecnológico

- **Next.js 14** - Framework React moderno
- **React 18** - UI Components
- **TypeScript** - Type safety
- **Tailwind CSS** - Estilos responsive
- **Firebase** - Backend (Firestore + Auth)
- **Vercel** - Hosting

## 📋 Requisitos Previos

- Node.js 18+
- npm o yarn
- Cuenta Firebase con Firestore
- Cuenta Vercel (para deploy)

## 🚀 Instalación y Setup

### 1. Clonar repositorio

```bash
git clone https://github.com/ttomifernandez/mensajes-whatsapp-app.git
cd mensajes-whatsapp-app
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com)
2. Activa Firestore Database
3. Habilita Anonymous Authentication
4. Copia las credenciales de tu proyecto
5. Crea un archivo `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Crear índices en Firestore

Cuando accedas a la pestaña "Plantillas", Firebase te pedirá crear un índice. Simplemente sigue el link y confirma.

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🌐 Deploy en Vercel

### Opción 1: Desde GitHub

1. Sube el repo a GitHub
2. Conecta tu repo a Vercel
3. Añade las variables de entorno (`NEXT_PUBLIC_FIREBASE_*`)
4. ¡Listo! Se deployará automáticamente en cada push

### Opción 2: Desde CLI

```bash
npm i -g vercel
vercel
```

Sigue las instrucciones interactivas.

## 📚 Estructura del Proyecto

```
mensajes-whatsapp-app/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página de inicio
│   ├── globals.css         # Estilos globales
│   └── providers.tsx       # Inicialización de Firebase
├── components/
│   ├── Button.tsx          # Componente botón
│   ├── CopyButton.tsx      # Botón de copiar
│   ├── MessageGenerator.tsx # Generador de mensajes
│   ├── TemplateForm.tsx    # Formulario de plantillas
│   └── TemplateList.tsx    # Listado de plantillas
├── lib/
│   ├── firebase.ts         # Operaciones Firebase CRUD
│   └── messageGenerator.ts # Lógica de generación
├── types/
│   └── index.ts            # Tipos TypeScript
└── public/                 # Assets estáticos
```

## 🎨 Uso

### Generar un Mensaje

1. Abre la pestaña "Generador"
2. Completa los campos opcionales y obligatorios
3. Selecciona las categorías (familia, estado civil, plan)
4. Presiona "Generar Mensaje"
5. Usa los botones para:
   - 📋 Copiar al portapapeles
   - 📱 Enviar directo por WhatsApp

### Gestionar Plantillas

1. Abre la pestaña "Plantillas"
2. Crea nuevas plantillas con "Nueva Plantilla"
3. Edita o elimina plantillas existentes
4. Filtra por categoría

## 🔒 Privacidad y Seguridad

- La autenticación es anónima por defecto
- Los datos se almacenan en Firestore
- Todos los datos son públicos (considera agregarauth real si es necesario)

## 🤝 Contribuir

¿Encontraste un bug o tienes una idea? ¡Abre un issue o envía un PR!

## 📝 Licencia

MIT

## 📧 Contacto

Made with ❤️ by [Tom Fernández](https://github.com/ttomifernandez)

---

**Sugerencias de mejora:**

- [ ] Agregar autenticación con Google/Email
- [ ] Exportar mensajes como PDF
- [ ] Historial de mensajes enviados
- [ ] Plantillas de equipo compartidas
- [ ] Analytics y tracking
- [ ] Dark mode
