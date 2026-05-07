# 🚀 Guía de Deploy

Esta guía te ayudará a desplegar la aplicación a Vercel de forma rápida y segura.

## Paso 1: Preparar Firebase

### 1.1 Crear proyecto en Firebase

1. Abre [Firebase Console](https://console.firebase.google.com)
2. Clic en "Create Project"
3. Nombre: `mensajes-whatsapp-app`
4. Acepta las condiciones
5. Crea el proyecto

### 1.2 Habilitar Firestore

1. En el panel izquierdo, ve a **Build → Firestore Database**
2. Clic en **Create Database**
3. Selecciona región más cercana (ej: `southamerica-east1` para Argentina)
4. Modo: **Start in test mode** (cambiaremos después)
5. Clic en **Create**

### 1.3 Habilitar Anonymous Auth

1. Ve a **Build → Authentication**
2. Clic en **Get started**
3. En "Sign-in method", busca **Anonymous**
4. Habilita el toggle
5. Clic en **Save**

### 1.4 Obtener credenciales

1. Ve a **Project Settings** (⚙️ en la esquina)
2. Ve a la pestaña **Service Accounts**
3. En "SDK Admin" clic en **Realtime Database**
4. Copia el objeto JSON con las credenciales
5. Busca la sección "Web" y copia el objeto `firebaseConfig`

Debería verse así:
```javascript
{
  "apiKey": "AIzaSyD...",
  "authDomain": "proyecto.firebaseapp.com",
  "projectId": "proyecto",
  "storageBucket": "proyecto.appspot.com",
  "messagingSenderId": "123456789",
  "appId": "1:123456789:web:abc123..."
}
```

## Paso 2: Preparar GitHub

### 2.1 Crear repositorio

```bash
cd mensajes-whatsapp-app
git init
git add .
git commit -m "Initial commit: WhatsApp message generator app"
git branch -M main
git remote add origin https://github.com/ttomifernandez/mensajes-whatsapp-app.git
git push -u origin main
```

## Paso 3: Deploy en Vercel

### Opción A: Desde Dashboard de Vercel (Recomendado)

1. Abre [vercel.com](https://vercel.com)
2. Inicia sesión con GitHub
3. Clic en **New Project**
4. Conecta tu repositorio `mensajes-whatsapp-app`
5. En **Environment Variables**, añade:

```
NEXT_PUBLIC_FIREBASE_API_KEY = tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = tu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID = tu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = tu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = tu_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID = tu_app_id
```

6. Clic en **Deploy**
7. Espera a que termine (~3-5 minutos)

### Opción B: Desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Vercel te pedirá ingresar las env vars interactivamente
```

## Paso 4: Verificar Deploy

1. Abre el link de tu app (ej: `https://mensajes-whatsapp-app.vercel.app`)
2. Prueba el generador de mensajes
3. Intenta crear una plantilla

### Si ves error de Firestore:

1. Verifica las Environment Variables en Vercel
2. Asegúrate de que Firebase está bien configurado
3. Chequea que Anonymous Auth esté habilitada

## Paso 5: Configurar Firestore (Seguridad)

En producción, NO uses "Test Mode". Configura reglas de seguridad:

1. En Firebase Console → Firestore → Rules
2. Reemplaza con:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /templates/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Clic en **Publish**

## 🎉 ¡Listo!

Tu app está viva en internet. Comparte el link con otros.

## 📊 Monitoreo

- **Vercel Dashboard**: Logs, performance, analytics
- **Firebase Console**: Uso de Firestore, estadísticas

## 🔄 Deploy Futuro

Cada vez que hagas `git push` a `main`, Vercel auto-despliega.

```bash
git add .
git commit -m "Descripción del cambio"
git push origin main
# Vercel se encarga del resto
```

## ❓ Troubleshooting

### "Firebase initialization error"
- Verifica que las env vars sean exactas (copy-paste desde Firebase Console)
- Redeploy después de cambiarlas

### "No templates appear"
- Abre Firestore Console y verifica que la colección `templates` existe
- Si no existe, presiona "Generar Mensaje" para que se creen los defaults

### "Cannot copy to clipboard"
- Solo funciona en HTTPS (Vercel ya lo tiene)
- No funciona en HTTP (desarrollo local está bien)

### "WhatsApp link no abre"
- Asegúrate de tener WhatsApp Web abierto o la app instalada
- El mensaje será más de 10 caracteres

## 📧 Soporte

¿Problemas? Crea un issue en GitHub o contacta a [tu-email]@[tu-dominio]

---

**Última actualización:** 2024-01-01
