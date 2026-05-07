# ⚡ Quick Start (5 minutos)

## 1️⃣ Firebase Setup (3 minutos)

```
1. Ve a https://console.firebase.google.com
2. Clic "Create Project" → nombre "mensajes-whatsapp-app"
3. Build → Firestore Database → Create → Región: sudamérica
4. Build → Authentication → Anonymous → Enable
5. Project Settings → copia credenciales
6. Abre .env.local y pega las variables
```

**Credenciales necesarias:**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

## 2️⃣ Desarrollo Local (2 minutos)

```bash
cd mensajes-whatsapp-app
npm install
npm run dev
```

Abre **http://localhost:3000** 🎉

## 3️⃣ Deploy en Vercel (1 minuto)

```bash
# Push a GitHub (si aún no lo hiciste)
git remote add origin https://github.com/tu-usuario/mensajes-whatsapp-app.git
git branch -M main
git push -u origin main

# Deploy en Vercel
npm i -g vercel
vercel --prod
```

**O desde Vercel Dashboard:**
1. https://vercel.com/new
2. Importa repo
3. Añade Environment Variables
4. Deploy

## ✨ Lista de Chequeo

- [ ] Firebase credentials en `.env.local`
- [ ] `npm install` completado
- [ ] `npm run dev` funciona en localhost
- [ ] Generador de mensajes funciona
- [ ] CRUD de plantillas funciona
- [ ] Copiar al portapapeles funciona
- [ ] Botón WhatsApp funciona
- [ ] Deploy en Vercel listo

## 🆘 Troubleshooting

| Problema | Solución |
|----------|----------|
| Firebase error | Verifica `.env.local` y Firebase Console |
| npm install falla | `rm -rf node_modules && npm install` |
| Puerto 3000 ocupado | `npm run dev -- -p 3001` |
| Build falla en Vercel | Chequea Environment Variables |

## 📚 Documentación Completa

- **README.md** - Descripción general
- **DEPLOYMENT.md** - Guía detallada de deploy
- **PROJECT_SUMMARY.md** - Detalles técnicos

## 🎯 Listo

Tu app está lista. ¡A compartir! 🚀

