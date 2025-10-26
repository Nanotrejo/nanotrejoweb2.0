# Nanotrejoweb 🌟

## 📝 Descripción

Bienvenido a mi sitio web personal. Este proyecto representa mi presencia digital en la web, construido con Angular y las últimas tecnologías web modernas.

Visita el sitio en vivo: [nanotrejo.es](https://nanotrejo.es)

## 🚀 Características

- 🎨 Diseño moderno y responsivo
- ⚡ Optimizado para rendimiento
- 💫 Interfaz de usuario intuitiva
- 🌐 Compatible con todos los navegadores modernos
- 📱 Soporte para PWA (Progressive Web App)
- ✨ Animaciones fluidas
- 📝 Soporte para Markdown
- 🌓 Tema claro/oscuro
- 🔍 Barra de comandos rápida (Ctrl/Cmd + K) para navegación instantánea

## 🛠️ Stack Tecnológico

- **Framework principal:** Angular
- **UI:** Angular Material
- **Estilos:**
  - TailwindCSS
  - CSS3
- **Lenguajes:**
  - TypeScript
  - HTML5
- **Herramientas de desarrollo:**
  - Angular CLI
  - Bun (gestor de paquetes alternativo a npm/yarn)
  - Prettier (formateo de código)
  - Netlify CLI (despliegue)
  - Compodoc (documentación automática)
  - Karma & Jasmine (testing unitario)
  - Chrome Headless (testing en CI/headless)
- **Testing y calidad:**
  - Karma, Jasmine, @types/jasmine
  - Cobertura de código integrada
- **Documentación:**
  - Compodoc
- **Otras librerías:**
  - RxJS (programación reactiva)
  - PrismJS (resaltado de sintaxis)
  - ngx-markdown (soporte Markdown)
  - Axios (peticiones HTTP)
  - Service Worker (PWA)
  - Material Icons

## 🎯 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Nanotrejo/nanotrejoweb2.0.git

# Navegar al directorio
cd nanotrejoweb

# Instalar dependencias (elige uno)
npm install
# o
bun install

# Iniciar el servidor de desarrollo
npm start
# o
bun run start
```



## 📦 Scripts Disponibles

- 🚀 `npm start` / `bun run start`: Inicia el servidor de desarrollo
- 🏗️ `npm run build` / `bun run build`: Construye la aplicación
- 🏭 `npm run build-prod` / `bun run build-prod`: Construye la versión de producción
- 🚢 `npm run deploy` / `bun run deploy`: Despliega en Netlify
- 🧪 `npm test` / `bun run test`: Ejecuta las pruebas unitarias en modo interactivo (abre navegador)
- 🧪 `npm run test -- --watch=false --browsers=ChromeHeadless` / `bun run test --watch=false --browsers=ChromeHeadless`: Ejecuta los tests en modo headless (sin abrir navegador)
- 📖 `npm run build:compodoc` / `bun run build:compodoc`: Genera la documentación con Compodoc
- 📖 `npm run serve:compodoc` / `bun run serve:compodoc`: Sirve la documentación generada en local

## 🧪 Testing y Cobertura

- Ejecuta los tests en modo headless (ideal para CI):
  ```bash
  npm test -- --watch=false --browsers=ChromeHeadless
  # o
  bun run test --watch=false --browsers=ChromeHeadless
  ```
- El reporte de cobertura se genera automáticamente en `/coverage/nanotrejoweb`.

## 📖 Documentación automática (Compodoc)

- Genera la documentación:
  ```bash
  npm run build:compodoc
  # o
  bun run build:compodoc
  ```
- Sirve la documentación en local:
  ```bash
  npm run serve:compodoc
  # o
  bun run serve:compodoc
  ```
- La cobertura de documentación se muestra en la home de Compodoc.

## 🚢 Despliegue

- Despliega en Netlify con:
  ```bash
  npm run deploy
  # o
  bun run deploy
  ```

⭐️ Si te gusta este proyecto, ¡no olvides darle una estrella!
