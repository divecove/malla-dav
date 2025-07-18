document.addEventListener('DOMContentLoaded', () => {

  const courseBank = document.getElementById('course-bank');
  const semestersGrid = document.getElementById('semesters-grid');
  const additionalReqsContainer = document.getElementById('additional-requirements');

  // === DATOS DE CURSOS COMPLETOS ===
  const courseData = [
    { code: 'ART-MIN', name: 'Mínimo de Artes', credits: 10, prerequisites: [] },
    { code: 'LET-MIN', name: 'Mínimo de Letras', credits: 10, prerequisites: [] },
    { code: 'IHI0205', name: 'Historia Mundial Contemporánea', credits: 10, prerequisites: [] },
    { code: 'FIL-MIN', name: 'Mínimo de Filosofía', credits: 10, prerequisites: [] },
    { code: 'MAT0100', name: 'Razonamiento Cuantitativo', credits: 10, prerequisites: [] },
    { code: 'VRA0901', name: 'Taller de Iniciación', credits: 5, prerequisites: [] },
    { code: 'COM101', name: 'Test de Actualidad I A', credits: 0, prerequisites: [] },
    { code: 'EST210A', name: 'Fundamentos de la Estética', credits: 10, prerequisites: [] },
    { code: 'FIL217H', name: 'Verdad y Belleza', credits: 10, prerequisites: [] },
    { code: 'COM110', name: 'Teoría de la Comunicación', credits: 10, prerequisites: [] },
    { code: 'COM113', name: 'Tecnologías de la Comunicación', credits: 10, prerequisites: [] },
    { code: 'COM102', name: 'Test de Actualidad I B', credits: 0, prerequisites: [] },
    { code: 'COM122', name: 'Narración de Ficción', credits: 10, prerequisites: [] },
    { code: 'COM115', name: 'Lenguaje Visual', credits: 10, prerequisites: [] },
    { code: 'COM109', name: 'Historia de la Comunicación Social', credits: 10, prerequisites: [] },
    { code: 'MH', name: 'Curso Área de Habilidades Comunicativas Orales', credits: 10, prerequisites: [] },
    { code: 'OR-TEO', name: 'Teológico', credits: 10, prerequisites: [] },
    { code: 'COM103', name: 'Test de Actualidad II A', credits: 0, prerequisites: [] },
    { code: 'MR', name: 'Metodologías de la Investigación Social', credits: 10, prerequisites: [] },
    { code: 'COM705', name: 'Espectáculo Audiovisual', credits: 10, prerequisites: [] },
    { code: 'COM706', name: 'Herramientas de Gestión Audiovisual', credits: 10, prerequisites: [] },
    { code: 'COM120', name: 'Narración de No Ficción', credits: 10, prerequisites: [] },
    { code: 'FIL183', name: '¿Filosofía Para Qué?', credits: 10, prerequisites: [] },
    { code: 'COM104', name: 'Test de Actualidad II B', credits: 0, prerequisites: [] },
    { code: 'COM100', name: 'Desafíos de la Comunicación', credits: 10, prerequisites: [] },
    { code: 'COM718', name: 'Taller de Lenguaje Audiovisual', credits: 10, prerequisites: [] },
    { code: 'COM708', name: 'Fundamentos Dramáticos de lo Audiovisual', credits: 10, prerequisites: [] },
    { code: 'COM116', name: 'Audiencias', credits: 10, prerequisites: [] },
    { code: 'COM3500', name: 'Economía de las Comunicaciones', credits: 10, prerequisites: [] },
    { code: 'COM105', name: 'Test de Actualidad III A', credits: 0, prerequisites: [] },
    { code: 'COM704', name: 'Seminario de Cine', credits: 10, prerequisites: [] },
    { code: 'COM719', name: 'Taller de Realización Audiovisual', credits: 10, prerequisites: [] },
    { code: 'COM177', name: 'Narración Interactiva', credits: 10, prerequisites: [] },
    { code: 'COM121', name: 'Semiología', credits: 10, prerequisites: [] },
    { code: 'COM709', name: 'Generación y Desarrollo de Proyectos Audiovisual', credits: 10, prerequisites: [] },
    { code: 'COM106', name: 'Test de Actualidad III B', credits: 0, prerequisites: [] },
    { code: 'COM711', name: 'Seminario de Televisión', credits: 10, prerequisites: [] },
    { code: 'COM710', name: 'Taller de Televisión', credits: 10, prerequisites: [] },
    { code: 'COM720', name: 'Seminario de Documental', credits: 10, prerequisites: [] },
    { code: 'COM712', name: 'Géneros y Formatos del Guión Audiovisual', credits: 10, prerequisites: [] },
    { code: 'COM1000', name: 'Práctica Interna (20 hrs.)', credits: 0, prerequisites: [] },
    { code: 'COM713', name: 'Taller de Documental', credits: 10, prerequisites: [] },
    { code: 'DEL307', name: 'Derecho de la Comunicación', credits: 10, prerequisites: [] },
    { code: 'COM200', name: 'Éticas de las Comunicaciones', credits: 10, prerequisites: [] },
    { code: 'COM714', name: 'Seminario de Nuevas Tendencias', credits: 10, prerequisites: [] },
    { code: 'COM716', name: 'Taller de Ficción', credits: 10, prerequisites: [] },
    { code: 'COM715', name: 'Escritura del Relato Audiovisual', credits: 10, prerequisites: [] },
    { code: 'OPT-PROF1', name: 'Optativo de Profundización 1', credits: 10, prerequisites: [] },
    { code: 'COM790', name: 'Práctica Profesional I', credits: 0, prerequisites: [] },
    { code: 'COM721', name: 'Taller Avanzado de Realización Audiovisual', credits: 10, prerequisites: [] },
    { code: 'COM3504', name: 'Industria Audiovisual', credits: 10, prerequisites: [] },
    { code: 'OPT-PROF2', name: 'Optativo de Profundización 2', credits: 10, prerequisites: [] },
    { code: 'OPT-PROF3', name: 'Optativo de Profundización 3', credits: 10, prerequisites: [] },
    { code: 'COM791', name: 'Práctica Profesional II', credits: 0, prerequisites: [] },
  ];

  const additionalReqsData = [
    { id: 'req-com-escrita', name: 'Examen de Comunicación Escrita (VRA100C)' },
    { id: 'req-english', name: 'English Test Alte 2 (VRA2000)' },
    { id: 'req-iniciacion', name: 'Taller de Iniciación Aprobado' }
  ];

  // === RENDERIZAR SEMESTRES ===
  for (let i = 1; i <= 10; i++) {
    const semesterCol = document.createElement('div');
    semesterCol.classList.add('semester-column');
    semesterCol.dataset.semester = i;
    semesterCol.innerHTML = `<h3>Semestre ${i}</h3>`;
    semestersGrid.appendChild(semesterCol);
  }

  // === RENDERIZAR CURSOS ===
  courseData.forEach(course => {
    const courseEl = document.createElement('div');
    courseEl.className = 'course';
    courseEl.id = course.code;
    courseEl.draggable = true;
    courseEl.dataset.code = course.code;
    courseEl.dataset.prerequisites = JSON.stringify(course.prerequisites);
    courseEl.innerHTML = `
      <span class="course-code">${course.code}</span>
      <span class="course-name">${course.name}</span>
      <span class="course-credits">${course.credits} créditos</span>
    `;
    courseBank.appendChild(courseEl);
  });

  // === RENDERIZAR REQUISITOS ADICIONALES ===
  additionalReqsData.forEach(req => {
    const reqEl = document.createElement('div');
    reqEl.classList.add('req-item');
    reqEl.id = req.id;
    reqEl.textContent = req.name;
    reqEl.addEventListener('click', () => {
      reqEl.classList.toggle('completed');
      saveState();
    });
    additionalReqsContainer.appendChild(reqEl);
  });

  // === DRAG & DROP ===
  enableDragAndDrop();

  function enableDragAndDrop() {
    const courses = document.querySelectorAll('.course');
    const dropzones = [...document.querySelectorAll('.semester-column'), courseBank];

    courses.forEach(course => {
      course.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', course.id);
        setTimeout(() => { course.style.opacity = '0.5'; }, 0);
      });
      course.addEventListener('dragend', () => {
        course.style.opacity = '1';
      });
    });

    dropzones.forEach(zone => {
      zone.addEventListener('dragover', e => {
        e.preventDefault();
        zone.classList.add('drag-over');
      });
      zone.addEventListener('dragleave', () => {
        zone.classList.remove('drag-over');
      });
      zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        const courseId = e.dataTransfer.getData('text/plain');
        const courseEl = document.getElementById(courseId);
        if (courseEl) {
          zone.appendChild(courseEl);
          courseEl.classList.toggle('approved', zone.classList.contains('semester-column'));
          saveState();
        }
      });
    });
  }

  // === GUARDAR ESTADO EN LOCALSTORAGE ===
  function saveState() {
    const state = {
      semesters: {},
      bank: [],
      requirements: {}
    };

    document.querySelectorAll('.semester-column').forEach((col, i) => {
      state.semesters[`semester-${i + 1}`] = Array.from(col.querySelectorAll('.course')).map(c => c.id);
    });
    state.bank = Array.from(courseBank.querySelectorAll('.course')).map(c => c.id);
    document.querySelectorAll('.req-item').forEach(req => {
      state.requirements[req.id] = req.classList.contains('completed');
    });

    localStorage.setItem('mallaState', JSON.stringify(state));
  }

  // === CARGAR ESTADO ===
  function loadState() {
    const state = JSON.parse(localStorage.getItem('mallaState'));
    if (!state) return;

    const allCourses = new Map();
    document.querySelectorAll('.course').forEach(c => allCourses.set(c.id, c));

    document.querySelectorAll('.semester-column').forEach(col => col.innerHTML = `<h3>${col.querySelector('h3').textContent}</h3>`);
    courseBank.innerHTML = '';

    state.bank.forEach(id => {
      const el = allCourses.get(id);
      if (el) courseBank.appendChild(el);
    });

    Object.keys(state.semesters).forEach((semKey, i) => {
      const col = document.querySelector(`[data-semester="${i + 1}"]`);
      if (col) {
        state.semesters[semKey].forEach(id => {
          const el = allCourses.get(id);
          if (el) col.appendChild(el);
        });
      }
    });

    Object.entries(state.requirements).forEach(([id, completed]) => {
      const el = document.getElementById(id);
      if (el && completed) el.classList.add('completed');
    });

    enableDragAndDrop();
  }

  loadState();

});
