# Country Journey - Documentación de Instalación

## Descripción
Country Journey es una aplicación web desarrollada con Vite y React JS que permite explorar información sobre países utilizando diversas APIs.

## Prerrequisitos

### Node.js
1. Visita [nodejs.org](https://nodejs.org/)
2. Descarga la versión LTS (Long Term Support) recomendada
3. Ejecuta el instalador y sigue las instrucciones
4. Verifica la instalación ejecutando en tu terminal:
   ```bash
   node --version
   npm --version
   ```

## Instalación del Proyecto

1. Clona el repositorio:
   ```bash
   git clone https://github.com/JonatanFD/Country-Journey-React.git
   cd Country-Journey-React
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env.local` en la raíz del proyecto:
   ```plaintext
   # API Key para HERE Maps (reemplaza los asteriscos con tu key)
   VITE_HERE_API_KEY="********************************"

   # API Key para Pixabay (reemplaza los asteriscos con tu key)
   VITE_PIXABAY_API_KEY="********************************"

   # URL de la API de Flask
   # Opción 1 - Servidor de producción:
   VITE_FLASK_API_URL="https://country-journey-api.vercel.app/"
   
   # Opción 2 - Servidor local:
   # VITE_FLASK_API_URL="http://localhost:5000/"
   ```

## Configuración del Entorno

### Variables de Entorno
- Las claves de API para HERE Maps y Pixabay son privadas y debes obtenerlas registrándote en sus respectivas plataformas:
  - HERE Maps: [https://developer.here.com/](https://developer.here.com/)
  - Pixabay: [https://pixabay.com/api/docs/](https://pixabay.com/api/docs/)

- La URL de la API de Flask puede ser:
  1. La URL pública proporcionada: `https://country-journey-api.vercel.app/`
  2. Tu servidor local de Flask: `http://localhost:5000/`

### Configuración del Servidor Local de Flask (Opcional)
Si deseas ejecutar la API localmente:

1. Clona el repositorio de la API
2. Crea un entorno virtual:
   ```bash
   python -m venv venv
   ```

3. Activa el entorno virtual:
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - MacOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```

5. Ejecuta el servidor:
   ```bash
   flask run
   ```

## Ejecutar la Aplicación

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre tu navegador y visita:
   ```
   http://localhost:5173
   ```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Crea la versión de producción
- `npm run preview`: Previsualiza la versión de producción
- `npm run lint`: Ejecuta el linter

## Notas Importantes

- Asegúrate de nunca compartir tus claves de API públicamente
- Mantén tu archivo `.env.local` en el `.gitignore`
- Si trabajas en equipo, proporciona un archivo `.env.local.example` con las variables requeridas pero sin valores sensibles
- La API de Flask en producción está alojada en Vercel y es accesible públicamente
- Para desarrollo local, asegúrate de que tu servidor Flask esté corriendo en el puerto 5000