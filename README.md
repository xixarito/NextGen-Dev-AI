# NextGen-Dev-AI: Sistema RAG para Documentos Empresariales

Este proyecto implementa un sistema de Recuperación y Generación Aumentada (RAG) usando LangChain, OpenAI y ChromaDB para procesar, indexar y consultar documentos empresariales como manuales y políticas.

## Funcionalidad
- **Extracción de texto:** Utiliza PyPDF2 para extraer texto de archivos PDF empresariales.
- **Fragmentación de texto:** Divide el texto en fragmentos optimizados para procesamiento semántico.
- **Embeddings:** Genera vectores de texto usando el modelo `text-embedding-3-small` de OpenAI.
- **Almacenamiento vectorial:** Guarda los embeddings y metadatos en una base ChromaDB persistente.
- **Recuperación semántica:** Permite buscar información relevante en los documentos usando consultas en lenguaje natural.
- **Generación de respuestas:** Integra el modelo GPT-3.5-turbo para responder preguntas basadas en los documentos recuperados.
- **Automatización CI:** Incluye un workflow de GitHub Actions que valida la ejecución completa del sistema y verifica que no haya errores en el notebook principal.

## Estructura principal
- `RETO_RAG.ipynb`: Notebook principal con todo el flujo de procesamiento, indexación y consulta.
- `modulo_uno/`: Carpeta con notebooks, scripts y documentos de prueba.
- `.github/workflows/run_notebook.yml`: Workflow para validación automática en GitHub.

## Requisitos
- Python 3.10+
- Clave API de OpenAI (guardar como secret en GitHub para CI)

## Ejecución local
1. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```
2. Configura tu clave API de OpenAI:
   ```bash
   export OPENAI_API_KEY="sk-..."
   ```
3. Ejecuta el notebook `RETO_RAG.ipynb` para procesar y consultar documentos.

## Automatización CI
Cada push o pull request ejecuta el notebook y valida que no haya errores, asegurando la calidad y funcionalidad del sistema.

## Licencia
Este proyecto se distribuye bajo la licencia MIT.