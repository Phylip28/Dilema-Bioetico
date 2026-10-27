# Micrositio Bioético: Sesgos Algorítmicos en el Triaje Médico
## ¿Eficiencia automatizada o discriminación codificada?

> **Fase 2: Proyecto Integrador de Bioética — Micrositio Web Fundamentado**  
> **Autor:** Juan Felipe Rendón Herrera  
> **Programa Académico:** Ingeniería de Sistemas  
> **Publicación / Hosting:** GitHub Pages  
> **Repositorio:** [https://github.com/Phylip28/Dilema-Bioetico](https://github.com/Phylip28/Dilema-Bioetico)

---

## 📌 1. Fundamentación de la Elección Técnica (Ingeniería de Sistemas)

Para el desarrollo del micrositio web solicitado en la actividad, se descartaron plataformas comerciales cerradas de plantillas (como Wix, Canva o Google Sites) en favor de una **implementación nativa en código estático (HTML5 semántico, Tailwind CSS y JavaScript ES6)**. 

Como estudiante de **Ingeniería de Sistemas**, esta decisión se fundamenta en los siguientes criterios técnicos y epistemológicos:

1. **Coherencia entre el objeto de estudio y el artefacto:** El dilema investigado aborda la opacidad de los sistemas informáticos (*cajas negras*). Un ingeniero de sistemas no puede reflexionar sobre la transparencia algorítmica utilizando una plataforma de arrastrar y soltar que oculta su propio código y arquitectura.
2. **Soberanía y reproducibilidad:** El proyecto se aloja directamente en Git y se sirve mediante **GitHub Pages**, garantizando control de versiones inmutable, trazabilidad del código fuente, cero costo de mantenimiento y auditoría abierta por pares.
3. **Interactividad dinámica sin dependencias:** Permitió integrar un **Simulador Interactivo de Decisiones Médicas (Eficiencia vs. Igualdad)** y un **Checklist interactivo de auditoría algorítmica**, demostrando en tiempo real cómo los hiperparámetros técnicos impactan los principios de Justicia y No Maleficencia.
4. **Accesibilidad y rendimiento:** Cumplimiento de estándares WCAG AA, paleta visual oscura de alto contraste y hoja de estilos optimizada para impresión/exportación académica en PDF.

---

## 🧭 2. Estructura del Micrositio y Cobertura de Requerimientos

El sitio web está estructurado rigurosamente conforme a las 6 secciones exigidas en la guía de la actividad (`actividadPaginaWeb.md`):

```
├── index.html                           # Documento principal del micrositio (Secciones 1 a 6)
├── assets/
│   ├── css/
│   │   └── styles.css                   # Estilos personalizados, glassmorphism, animaciones y print
│   └── js/
│       └── main.js                      # Lógica interactiva: simulador, reproductores, filtros APA, auditoría
├── actividadPaginaWeb.md                # Guía de requerimientos de la Fase 2
├── actividadDilemaBioetico.md           # Guía de requerimientos de la Fase 1
├── RespuestaActividadDilemaBioetico.md  # Respuestas y batería de preguntas previas del estudiante
└── README.md                            # Documentación técnica y académica del proyecto
```

### Secciones Integradas:

* **Portada y Sección 1: Presentación del Dilema Bioético**
  * Nombres del integrante y programa académico (*Juan Felipe Rendón Herrera - Ingeniería de Sistemas*).
  * Contextualización sobre la automatización de asignación de camas UCI y triaje de urgencias.
  * Descripción del problema técnico: entrenamiento con registros históricos sesgados y el uso de variables proxy económicas (estudio seminal de *Obermeyer et al., Science, 2019*).
  * Actores involucrados (pacientes vulnerables, médicos, desarrolladores de software, directivos, comités de bioética y reguladores).
  * Contextos multidimensionales: social, científico-tecnológico, jurídico y ambiental.
  * Justificación de la relevancia del tema para el ejercicio de la ingeniería.

* **Sección 2: Análisis Interdisciplinario**
  * **Perspectiva Ética:** Análisis de valores en pugna y confrontación de los cuatro principios bioéticos de Beauchamp y Childress (Beneficencia macro vs. Justicia distributiva, No Maleficencia y Autonomía). Diálogo con las teorías éticas: Utilitarismo (Bentham/Mill), Deontología Kantiana y Ética de la Responsabilidad de Hans Jonas.
  * **Perspectiva Disciplinar:** Convergencia entre Ingeniería de Sistemas (métricas de equidad matemática, Teorema de Imposibilidad de Kleinberg, XAI con SHAP), Medicina (protocolos de triaje ESI y sesgo de automatización) y Derecho (AI Act de la UE 2024, RGPD Art. 22 y Ley Estatutaria de Salud 1751 en Colombia).

* **Sección 3: La Voz de la Experiencia (Entrevista Profesional)**
  * Presentación del entrevistado: **Ing. David Ricardo Morales Peña**, Magíster en Inteligencia Artificial Biomédica y Líder de MLOps en salud.
  * Justificación de su elección técnica y deontológica.
  * Ficha y enlace de verificación de registro audiovisual bilateral (4:35 min con entrevistador y entrevistado debidamente registrados).
  * Transcripción analítica y citas en profundidad de las **cinco preguntas diseñadas en el foro**:
    1. *Trade-off* entre limpieza de sesgos y precisión estadística general.
    2. Explicabilidad clínica y justificación ante el paciente (XAI y Model Cards).
    3. Trazado de líneas de responsabilidad profesional y legal ante un error fatal.
    4. El dilema utilitarista: +15% de supervivencia global vs. 5% de sesgo contra minorías (criterio de desconexión inmediata).
    5. Estrategias de MLOps y monitoreo continuo de *drift* de sesgo con *circuit breakers*.
  * Síntesis de los principales aportes obtenidos.

* **Sección 4: Deliberación Ética & Recursos Multimedia**
  * Identificación y ponderación de los principales conflictos bioéticos.
  * Análisis comparativo de tres posiciones (Tecnocéntrica Utilitarista, Bioconservadora y Socio-técnica Responsable).
  * Sustentación argumentada de la postura individual adoptada, fundamentada en la primacía de la dignidad humana y el modelo *Human-in-the-loop*.
  * **Infografía Narrada Interactiva:** Recorrido visual guiado estación por estación (conflicto, principialismo, mecanismo del proxy y salvaguardas vinculantes) con modo de lectura guiada.
  * **Simulador Interactivo de Decisiones Médicas:** Widget en tiempo real para visualizar cómo la regularización matemática de equidad protege a las poblaciones desfavorecidas frente a la eficiencia agregada.

* **Sección 5: Conclusiones y Metacognición**
  * Reflexión metacognitiva sobre los aprendizajes obtenidos.
  * Evolución de la comprensión del dilema: de la concepción del sesgo como un "bug de software" a su reconocimiento como cristalización de inequidades históricas.
  * Importancia de la deliberación bioética en el ejercicio profesional del ingeniero de sistemas y la ciudadanía digital.
  * **Checklist interactivo de madurez bioética** para evaluar sistemas de IA clínica.

* **Sección 6: Referencias Bibliográficas (Normas APA 7.ª Edición)**
  * 10 referencias académicas, legales y técnicas de alto impacto (Obermeyer, Beauchamp & Childress, Kleinberg, Floridi, O'Neil, EU AI Act, OMS, Mitchell, Congreso de Colombia y entrevista primaria).
  * Buscador en vivo de citas, filtros por categoría y botón interactivo para **copiar la cita en formato APA 7** al portapapeles.

---

## 🚀 3. Instrucciones de Ejecución y Despliegue

### Visualización Local Inmediata:
Dado que el proyecto utiliza tecnologías web estándar sin compiladores ni entornos de ejecución pesados:
1. Abre directamente el archivo `index.html` en cualquier navegador web moderno (Chrome, Firefox, Safari, Edge).
2. O ejecuta un servidor local liviano mediante Python en la raíz del repositorio:
   ```bash
   python3 -m http.server 8080
   ```
   Luego visita `http://localhost:8080` en tu navegador.

### Publicación en GitHub Pages:
Para que el sitio quede disponible públicamente en internet:
1. Asegúrate de que los archivos estén subidos a la rama principal (`main`) de este repositorio:
   ```bash
   git add .
   git commit -m "feat: micrositio web bioetico completo con simulador interactivo y referencias apa 7"
   git push origin main
   ```
2. En GitHub, dirígete a: **Settings** > **Pages** > **Build and deployment**.
3. En **Source**, selecciona **Deploy from a branch**.
4. En **Branch**, selecciona `main` y la carpeta `/ (root)`. Haz clic en **Save**.
5. En pocos segundos, GitHub generará tu enlace público (por ejemplo: `https://phylip28.github.io/Dilema-Bioetico/`).

---

## 📄 4. Licencia y Atribución Académica
Proyecto desarrollado para el curso de Bioética. Trabajo de carácter académico e investigativo bajo licencia MIT. Todas las fuentes consultadas han sido debidamente acreditadas conforme a los estándares de integridad científica y normas APA 7.

