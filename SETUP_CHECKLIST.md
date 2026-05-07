# ✅ Setup Checklist - Paso a Paso

Sigue esta checklist para tener la app 100% funcional en producción.

## 🔐 Paso 1: Firebase Setup

### 1.1 Crear Proyecto
- [ ] Ir a https://console.firebase.google.com
- [ ] Clic "Create Project"
- [ ] Nombre: `mensajes-whatsapp-app`
- [ ] Aceptar términos
- [ ] Crear proyecto (esperar ~1 minuto)

### 1.2 Firestore Database
- [ ] En panel izquierdo: **Build > Firestore Database**
- [ ] Clic **Create Database**
- [ ] Región: **southamerica-east1** (para Argentina)
  - O la más cercana a tu ubicación
- [ ] Modo: **Start in test mode** (cambiaremos después)
- [ ] Clic **Create**
- [ ] ✅ Esperar a que se cree (puede tomar 2-3 minutos)

### 1.3 Autenticación Anónima
- [ ] En panel izquierdo: **Build > Authentication**
- [ ] Clic **Get started**
- [ ] En "Sign-in method" busca **Anonymous**
- [ ] Habilitar toggle (debe estar azul)
- [ ] Clic **Save**

### 1.4 Obtener Credenciales
- [ ] Clic en engranaje ⚙️ **Project Settings**
- [ ] Ir a pestaña **General**
- [ ] Bajear hasta "Your apps"
- [ ] Busca la sección "Web" (dice `</>`  si no existe clicka "Create app")
- [ ] Copiar el objeto `firebaseConfig`:

```javascript
{
  apiKey: "AIzaSyD...",
  authDomain: "proyecto.firebaseapp.com",
  projectId: "proyecto",
  storageBucket: "proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
}
```

### 1.5 Crear `.env.local`
- [ ] En la carpeta raíz del proyecto (`mensajes-whatsapp-app/`)
- [ ] Crear archivo `.env.local`
- [ ] Copiar contenido de `.env.example`
- [ ] Reemplazar valores con los de Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=proyecto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123...
```

**⚠️ Importante:**
- No compartir `.env.local` en GitHub
- Ya está en `.gitignore`
- Verificar que no haya espacios ni comillas extra

---

## 💻 Paso 2: Desarrollo Local

### 2.1 Instalar Dependencias
```bash
cd mensajes-whatsapp-app
npm install
```
- [ ] Esperar a que termine (~2-3 minutos)
- [ ] Si hay advertencias, ignorar (son normales)

### 2.2 Ejecutar en Local
```bash
npm run dev
```
- [ ] Esperar mensaje: `ready - started server on 0.0.0.0:3000`
- [ ] Abrir http://localhost:3000 en navegador
- [ ] ✅ Debes ver la app con el header verde

### 2.3 Probar Funcionalidades
- [ ] Página carga sin errores
- [ ] Pestaña "Generador" funciona
- [ ] Pestaña "Plantillas" funciona
- [ ] Llenar campos y generar mensaje funciona
- [ ] Botón "Copiar" funciona (copia al portapapeles)
- [ ] Crear plantilla nueva funciona
- [ ] Listar plantillas funciona
- [ ] Editar plantilla funciona
- [ ] Eliminar plantilla funciona

**Si algo no funciona:**
1. Verificar `.env.local` está correctamente configurado
2. Verificar Firebase está habilitado (Firestore + Auth)
3. Abrir consola del navegador (F12) y buscar errores
4. Checar que Firebase credentials sean exactas

---

## 🌍 Paso 3: Preparar para GitHub

### 3.1 Verificar Git
```bash
cd mensajes-whatsapp-app
git status
```
- [ ] Debería mostrar "nothing to commit, working tree clean"

### 3.2 Crear Repo en GitHub
- [ ] Ir a https://github.com/new
- [ ] Nombre: `mensajes-whatsapp-app`
- [ ] Descripción: "App para generar mensajes WhatsApp personalizados"
- [ ] Público o Privado (tu elección)
- [ ] NO inicializar con README/gitignore (ya los tenemos)
- [ ] Clic **Create repository**

### 3.3 Conectar Local con GitHub
```bash
git remote add origin https://github.com/tu-usuario/mensajes-whatsapp-app.git
git branch -M main
git push -u origin main
```
- [ ] Esperar a que termine
- [ ] Verificar en https://github.com/tu-usuario/mensajes-whatsapp-app que los archivos estén

---

## 🚀 Paso 4: Deploy en Vercel

### 4.1 Crear Cuenta Vercel (si no tienes)
- [ ] Ir a https://vercel.com
- [ ] Clic "Sign Up"
- [ ] Conectar con GitHub (recomendado)

### 4.2 Deploy Automático
- [ ] Ir a https://vercel.com/new
- [ ] Seleccionar tu repo `mensajes-whatsapp-app`
- [ ] Clic **Import**
- [ ] En "Environment Variables" clickear **Add New**
- [ ] Agregar todas las variables de `.env.local`:

**NEXT_PUBLIC_FIREBASE_API_KEY** = AIzaSyD...
**NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN** = proyecto.firebaseapp.com
**NEXT_PUBLIC_FIREBASE_PROJECT_ID** = proyecto
**NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET** = proyecto.appspot.com
**NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID** = 123456789
**NEXT_PUBLIC_FIREBASE_APP_ID** = 1:123456789:web:abc123...

- [ ] Clic **Deploy**
- [ ] Esperar a que termine (~3-5 minutos)
- [ ] ✅ Debería ver "Deployment successful!"

### 4.3 Verificar Deploy
- [ ] Clic en el link que aparece (ej: mensajes-whatsapp-app.vercel.app)
- [ ] Prueba todas las funcionalidades nuevamente
- [ ] Prueba desde móvil también

---

## 🔒 Paso 5: Firestore Security Rules (Producción)

### 5.1 Cambiar a Modo Seguro
- [ ] Ir a https://console.firebase.google.com
- [ ] Firestore Database > Rules
- [ ] Reemplazar todo con:

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

- [ ] Clic **Publish**
- [ ] ✅ Listo

---

## 🧪 Paso 6: Verificación Final

- [ ] App local funciona en http://localhost:3000
- [ ] App en Vercel funciona y muestra datos
- [ ] Puedes crear/editar/eliminar plantillas
- [ ] Copiar al portapapeles funciona
- [ ] WhatsApp link abre WhatsApp Web
- [ ] Repository en GitHub sincronizado
- [ ] Variables de entorno en Vercel correctas
- [ ] Firebase rules son restrictivas

---

## 📋 Resumen de URLs

Guarda estas URLs importantes:

| Servicio | URL |
|----------|-----|
| App Local | http://localhost:3000 |
| App Producción | https://mensajes-whatsapp-app.vercel.app |
| GitHub | https://github.com/tu-usuario/mensajes-whatsapp-app |
| Firebase Console | https://console.firebase.google.com |
| Vercel Dashboard | https://vercel.com |

---

## ❓ Troubleshooting

### "Firebase initialization error"
**Causa:** Variables de entorno incorrectas
**Solución:** 
1. Verificar `.env.local` palabra por palabra
2. No poner espacios ni comillas
3. Reiniciar `npm run dev`

### "Permission denied" en Firestore
**Causa:** No iniciaste sesión anónimamente
**Solución:** Verifica que Anonymous Auth esté habilitada en Firebase Console

### "Cannot read property of undefined"
**Causa:** Firebase no está inicializado
**Solución:** Espera a que Firebase se cargue, o recarga la página

### El generador no muestra mensajes
**Causa:** No hay plantillas en la base de datos
**Solución:** Crea algunas plantillas en la pestaña "Plantillas"

### Deploy en Vercel falla
**Causa:** Variables de entorno faltantes
**Solución:** 
1. Ve a Vercel Settings > Environment Variables
2. Añade todas las variables NEXT_PUBLIC_FIREBASE_*
3. Redeploy

---

## ✨ ¡Completado!

Felicitaciones! Tu app está:
- ✅ Funcional localmente
- ✅ Deployada en Vercel
- ✅ Con datos en Firebase
- ✅ Lista para producción
- ✅ Código en GitHub

**Próximos pasos:**
1. Comparte el link https://mensajes-whatsapp-app.vercel.app con usuarios
2. Recibe feedback
3. Haz mejoras (la app se actualiza automáticamente al hacer push)

---

**Última actualización:** 2024-01-01
**Tiempo estimado:** 20-30 minutos
