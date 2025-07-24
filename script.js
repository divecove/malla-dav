/* --- General Styles & Color Palette --- */
:root {
    --color-bg: #f0f8ff;
    --color-container-bg: #ffffff;
    --color-header: #003366;
    --color-text: #333333;
    --color-available: #b3d9ff;
    --color-approved: #3385ff;
    --color-approved-text: #ffffff;
    --color-locked: #e0e0e0;
    --color-locked-text: #888888;
    --color-semester-border: #cce6ff;
    --color-drag-over: #a3c2e0;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: var(--color-bg);
    color: var(--color-text);
    margin: 0;
    padding: 20px;
    user-select: none;
}

h1, h2, h3 {
    color: var(--color-header);
    text-align: center;
}

h1 { margin-top: 0; }
h2 { font-size: 1.2em; }

p {
    text-align: center;
    font-size: 0.9em;
    color: #666;
    margin-top: -10px;
    margin-bottom: 20px;
}

/* --- Estructura Principal del Layout --- */
.main-container {
    display: flex;
    gap: 20px;
    align-items: flex-start;
}

.courses-sidebar {
    flex: 0 0 280px;
    position: sticky;
    top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.semesters-main-content {
    flex: 1;
}

/* --- Estilos de Curso Individual --- */
.course {
    position: relative; 
    padding: 10px;
    min-height: 65px; 
    border-radius: 8px;
    cursor: grab;
    transition: background-color 0.3s, color 0.3s, box-shadow 0.2s;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    background-color: var(--color-available);
}

.course-details {
    padding-right: 70px; 
}

.course:active { cursor: grabbing; }

.course-code { font-weight: bold; font-size: 0.9em; display: block; }
.course-name { font-size: 0.85em; margin: 4px 0; display: block; }
.course-credits { font-size: 0.8em; font-style: italic; display: block; text-align: left; }

/* Estados de los cursos */
.course.locked {
    background-color: var(--color-locked);
    color: var(--color-locked-text);
    cursor: not-allowed;
    pointer-events: none;
}
.course.locked .course-details { pointer-events: auto; }
.course.approved {
    background-color: var(--color-approved);
    color: var(--color-approved-text);
}
.course.approved .course-grade {
    color: var(--color-approved-text);
    border-bottom-color: var(--color-approved-text);
}
.course.approved .course-grade::placeholder { color: rgba(255, 255, 255, 0.7); }

/* --- Grilla de Semestres --- */
#semesters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 15px;
}

.semester-column {
    background-color: var(--color-container-bg);
    padding: 15px;
    border-radius: 12px;
    min-height: 250px;
    border: 2px dashed var(--color-semester-border);
    transition: background-color 0.3s, border-color 0.3s;
}
.semester-column.drag-over {
    background-color: var(--color-drag-over);
    border-color: var(--color-header);
}
.semester-column h3 { margin-top: 0; font-size: 1em; padding-bottom: 10px; border-bottom: 1px solid var(--color-semester-border); }
.semester-column .course { margin-bottom: 10px; }

/* --- Requisitos Adicionales --- */
.additional-requirements-container {
    padding: 20px;
    background-color: var(--color-container-bg);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
#additional-requirements { display: flex; flex-direction: column; gap: 10px; }
.req-item {
    padding: 12px 20px;
    border-radius: 8px;
    cursor: pointer;
    background-color: var(--color-locked);
    color: var(--color-locked-text);
    font-weight: 500;
    transition: background-color 0.3s, color 0.3s;
    text-align: center;
}
.req-item.completed {
    background-color: var(--color-approved);
    color: var(--color-approved-text);
}

/* --- Input de nota --- */
.course-grade-wrapper {
    position: absolute;
    bottom: 8px;
    right: 10px;
}

.course-grade {
    width: 60px;
    font-family: inherit;
    font-size: 0.9em;
    padding: 2px 4px;
    border: none;
    border-bottom: 1px solid var(--color-header);
    background-color: transparent;
    color: var(--color-text);
    text-align: center;
    outline: none;
    transition: border-color 0.3s;
    -moz-appearance: textfield;
}

.course-grade::placeholder { color: #999; font-style: italic; font-size: 0.9em; }
.course-grade:focus { border-bottom: 1px solid var(--color-approved); }
.course-grade::-webkit-outer-spin-button,
.course-grade::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* --- Contenedor de Resumen Académico --- */
.summary-container {
    padding: 20px;
    background-color: var(--color-container-bg);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
#summary-output p {
    display: flex;
    justify-content: space-between;
    font-size: 1em;
    color: var(--color-text);
    text-align: left;
    margin: 10px 0;
}
#summary-output strong {
    color: var(--color-header);
    font-size: 1.1em;
}

.add-semester-wrapper {
    text-align: center;
    margin-top: 20px;
}

#add-semester-btn {
    font-family: inherit;
    font-size: 1em;
    font-weight: 500;
    padding: 10px 20px;
    background-color: var(--color-available);
    color: var(--color-header);
    border: 2px solid var(--color-header);
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
}

#add-semester-btn:hover {
    background-color: var(--color-header);
    color: var(--color-approved-text);
}
