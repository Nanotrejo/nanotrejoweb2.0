# Guía para Agentes de IA - nanotrejoweb2.0 🌟

Este documento proporciona información esencial para trabajar eficientemente en este proyecto Angular. El proyecto es un portfolio personal con características avanzadas como PWA, integración con Notion, y animaciones fluidas.

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una arquitectura modular y escalable, con énfasis en la separación de responsabilidades y reutilización de código.

### Estructura Principal
```
src/
├── app/
│   ├── core/           # Servicios e interfaces fundamentales
│   │   ├── interface/  # Definiciones de tipos (*.ts)
│   │   └── service/    # Servicios singleton
│   ├── screens/        # Componentes de página
│   └── shared/         # Componentes reutilizables
├── assets/
│   ├── css/           # Estilos globales y animaciones
│   ├── themes/        # Temas claro/oscuro
│   └── images/        # Recursos estáticos
```

### Patrones Arquitectónicos
1. **Gestión de Estado**:
   - Servicios singleton en `root` (`@Injectable({ providedIn: 'root' })`)
   - Ejemplo: `ThemeService` para temas, `NotionService` para datos
   - Persistencia local vía `StorageService` (`localStorage`)

2. **Integración con APIs**:
   - Backend Notion API (`notion_api` en `environment.ts`)
   - Interceptor global para manejo de errores HTTP
   - Caché de respuestas en localStorage

3. **Navegación y Routing**:
   - Barra de comandos global (Cmd/Ctrl + K)
   - View Transitions API para animaciones entre rutas
   - Lazy loading de módulos por característica

### SEO y Metadatos
- Servicio `MetaService` para gestión dinámica de meta tags
- Optimización para redes sociales (Open Graph, Twitter Cards)
- PWA con configuración en `ngsw-config.json`

## 🛠️ Flujos de Desarrollo

### Setup Inicial
```bash
# Instalar dependencias (usar bun según angular.json)
bun install

# Desarrollo local
bun start

# Build producción
bun run build-prod
```

### Comandos Esenciales
```bash
npm start          # Desarrollo local
npm run build-prod # Build de producción
npm test          # Pruebas unitarias
npm run deploy    # Despliegue a Netlify
```

### Convenciones de Código
1. **Componentes**:
   - Uso de standalone components cuando sea posible
   - Animaciones definidas en `assets/css/animation.ts`
   - Ejemplos: `HomeComponent`, `ProjectComponent`

2. **Estilos**:
   - TailwindCSS para layout y estilos base
   - CSS personalizado para animaciones y temas
   - Variables CSS para temas en `assets/themes/*.css`

3. **Testing**:
   - Tests unitarios con Jasmine/Karma
   - E2E testing pendiente de implementación

## 🔌 Integraciones y Dependencias

1. **Notion API**:
   ```typescript
   // Ejemplo de uso en NotionService
   async getProject(): Promise<iProject[]> {
     return await this.http.get<iProject[]>(`${this.url}/project`).toPromise();
   }
   ```

2. **PWA y Service Worker**:
   - Estrategias de caché en `ngsw-config.json`
   - Actualización automática de versiones
   - Assets precargados para modo offline

## 🚀 Mejores Prácticas

1. **Performance**:
   - Imágenes WebP con fallbacks
   - Lazy loading de módulos y assets
   - Caché de respuestas API

2. **Accesibilidad**:
   - Atributos ARIA en componentes interactivos
   - Alto contraste en temas
   - Soporte para navegación por teclado

3. **Seguridad**:
   - Sanitización de contenido Markdown
   - CSP configurado en `index.html`
   - HTTP Interceptors para tokens

¿Necesitas ayuda para entender alguna sección específica o hay algo que deba agregarse?
