document.addEventListener('DOMContentLoaded', () => {
  const courseBank = document.getElementById('course-bank');
  const semestersGrid = document.getElementById('semesters-grid');
  const additionalReqsContainer = document.getElementById('additional-requirements');

  const courseData = [
    { code: 'MIN-ART', name: 'Mínimo de Artes', credits: 10, prerequisites: [] },
    { code: 'MIN-LET', name: 'Mínimo de Letras', credits: 10, prerequisites: [] },
    { code: 'IHI0205', name: 'Historia Mundial Contemporanea', credits: 10, prerequisites: [] },
    { code: 'MIN-FIL', name: 'Mínimo de Filosofía', credits: 10, prerequisites: [] },
    { code: 'MAT0100', name: 'Razonamiento Cuantitativo', credits: 10, prerequisites: [] },
    { code: 'VRA0901', name: 'Taller de Iniciación', credits: 5, prerequisites: [] },
    { code: 'COM101', name: 'Test de Actualidad I A', credits: 0, prerequisites: [] },
    { code: 'EST210A', name: 'Fundamentos de la Estética', credits: 10, prerequisites: [] },
    { code: 'FIL217H', name: 'Verdad y Belleza', credits: 10, prerequisites: [] },
    { code: 'COM110', name: 'Teoría de la Comunicación', credits: 10, prerequisites: [] },
    { code: 'COM113', name: 'Tecnologías de la Comunicación', credits: 10, prerequisites: [] },
    { code: 'COM102', name: 'Test de Actualidad I B', credits: 0, prerequisites: ['COM101'] },
    { code: 'COM122', name: 'Narración de Ficción', credits: 10, prerequisites: [] },
    { code: 'COM115', name: 'Lenguaje Visual', credits: 10, prerequisites: [] },
    { code: 'COM109', name: 'Historia de la Comunicación Social', credits: 10, prerequisites: [] },
    { code: 'MIN-HCO', name: 'Mínimo Hab. Comunicativas Orales', credits: 10, prerequisites: [] },
    { code: 'OR-TEO', name: 'OR Teológico', credits: 10, prerequisites: [] },
    { code: 'COM103', name: 'Test de Actualidad II A', credits: 0, prerequisites: ['COM102'] },
    { code: 'MIN-MIS', name: 'MR Metodologías de la Inv. Social', credits: 10, prerequisites: [] },
    { code: 'COM705', name: 'Espectáculo Audiovisual', credits: 10, prerequisites: ['EST210A'] },
    { code: 'COM706', name: 'Herramientas de Gestión Audiovisual', credits: 10, prerequisites: [] },
    { code: 'COM120', name: 'Narración de No Ficción', credits: 10, prerequisites: [] },
    { code: 'FIL183', name: '¿Filosofía Para Qué?', credits: 10, prerequisites: [] },
    { code: 'COM104', name: 'Test de Actualidad II B', credits: 0, prerequisites: ['COM103'] },
    { code: 'COM100', name: 'Desafíos de la Comunicación', credits: 10, prerequisites: [] },
    { code: 'COM718', name: 'Taller de Lenguaje Audiovisual', credits: 10, prerequisites: ['COM115', 'VRA0901'] },
    { code: 'COM708', name: 'Fundamentos Dramaticos de lo Audiovisual', credits: 10, prerequisites: ['COM122'] },
    { code: 'COM116', name: 'Audiencias', credits: 10, prerequisites: ['COM110'] },
    { code: 'COM3500', name: 'Economía de las Comunicaciones', credits: 10, prerequisites: [] },
    { code: 'COM105', name: 'Test de Actualidad III A', credits: 0, prerequisites: ['COM104'] },
    { code: 'COM704', name: 'Seminario de Cine', credits: 10, prerequisites: ['COM705'] },
    { code: 'COM719', name: 'Taller de Realización Audiovisual', credits: 10, prerequisites: ['COM718'] },
    { code: 'COM177', name: 'Narración Interactiva', credits: 10, prerequisites: ['COM113'] },
    { code: 'COM121', name: 'Semiología', credits: 10, prerequisites: ['COM110'] },
    { code: 'COM709', name: 'Generación y Desarrollo de Proyectos', credits: 10, prerequisites: ['COM706'] },
    { code: 'COM106', name: 'Test de Actualidad III B', credits: 0, prerequisites: ['COM105'] },
    { code: 'COM711', name: 'Seminario de Televisión', credits: 10, prerequisites: ['COM704'] },
    { code: 'COM710', name: 'Taller de Televisión', credits: 10, prerequisites: ['COM719'] },
    { code: 'COM720', name: 'Seminario de Documental', credits: 10, prerequisites: ['COM120'] },
    { code: 'COM712', name: 'Géneros y Formatos del Guión', credits: 10, prerequisites: ['COM708'] },
    { code: 'COM1000', name: 'Práctica Interna (20 hrs)', credits: 0, prerequisites: ['COM719'] },
    { code: 'COM713', name: 'Taller de Documental', credits: 10, prerequisites: ['COM719', 'COM720'] },
    { code: 'DEL307', name: 'Derecho de la Comunicación', credits: 10, prerequisites: [] },
    { code: 'COM200', name: 'Éticas de las Comunicaciones', credits: 10, prerequisites: [] },
    { code: 'COM714', name: 'Seminario de Nuevas Tendencias', credits: 10, prerequisites: ['COM711'] },
    { code: 'COM716', name: 'Taller de Ficción', credits: 10, prerequisites: ['COM710', 'COM712'] },
    { code: 'COM715', name: 'Escritura del Relato Audiovisual', credits: 10, prerequisites: ['COM712'] },
    { code: 'OP1', name: 'Optativo de Profundización I', credits: 10, prerequisites: [] },
    { code: 'COM790', name: 'Práctica Profesional I', credits: 0, prerequisites: ['COM1000'] },
    { code: 'COM721', name: 'Taller Avanzado de Realización', credits: 10, prerequisites: ['COM716', 'COM713'] },
    { code: 'COM3504', name: 'Industria Audiovisual', credits: 10, prerequisites: ['COM3500'] },
    { code: 'OP2', name: 'Optativo de Profundización II', credits: 10, prerequisites: [] },
    { code: 'OP3', name: 'Optativo de Profundización III', credits: 10, prerequisites: [] },
    { code: 'COM791', name: 'Práctica Profesional II', credits: 0, prerequisites: ['COM790'] },
  ];

  const additionalReqsData = [
    { id: 'req-com-escrita', name: 'Examen de Comunicación Escrita (VRA100C)' },
    { id: 'req-english', name: 'English Test Alte 2 (VRA2000)' },
    { id: 'req-iniciacion', name: 'Taller de Iniciación Aprobado' }
  ];

  // Renderizar semestres
  for (let i = 1; i <= 10; i++) {
    const semesterCol = document.createElement('div');
    semesterCol.classList.add('semester-column');
    semesterCol.dataset.semester = i;
    semesterCol.innerHTML = `<h3>Semestre ${i}</h3>`;
    semestersGrid.appendChild(semesterCol);
  }

  // Renderizar cursos
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

  // Renderizar requisitos adicionales
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

  // Drag & Drop
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
        if (courseEl && !courseEl.classList.contains('locked')) {
          zone.appendChild(courseEl);
          courseEl.classList.toggle('approved', zone.classList.contains('semester-column'));
          updatePrerequisites();
          saveState();
        }
      });
    });
  }

  // Actualizar prerrequisitos
  function updatePrerequisites() {
    const approved = new Set(
      Array.from(document.querySelectorAll('.semester-column .course')).map(c => c.dataset.code)
    );

    document.querySelectorAll('.course').forEach(course => {
      const prereqs = JSON.parse(course.dataset.prerequisites);
      const met = prereqs.every(p => approved.has(p));
      if (!met && !course.classList.contains('approved')) {
        course.classList.add('locked');
        course.draggable = false;
      } else {
        course.classList.remove('locked');
        course.draggable = true;
      }
    });
  }

  // Local Storage
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

  function loadState() {
    const state = JSON.parse(localStorage.getItem('mallaState'));
    if (!state) return;

    const allCourses = new Map();
    document.querySelectorAll('.course').forEach(c => allCourses.set(c.id, c));

    document.querySelectorAll('.semester-column').forEach(col => col.innerHTML = `<h3>${col.querySelector('h3').textContent}</h3>`);
    courseBank.innerHTML = '';

    // Bank
    state.bank.forEach(id => {
      const el = allCourses.get(id);
      if (el) courseBank.appendChild(el);
    });

    // Semesters
    Object.keys(state.semesters).forEach((semKey, i) => {
      const col = document.querySelector(`[data-semester="${i + 1}"]`);
      if (col) {
        state.semesters[semKey].forEach(id => {
          const el = allCourses.get(id);
          if (el) {
            col.appendChild(el);
            el.classList.add('approved');
          }
        });
      }
    });

    // Requirements
    Object.keys(state.requirements).forEach(reqId => {
      const reqEl = document.getElementById(reqId);
      if (reqEl && state.requirements[reqId]) {
        reqEl.classList.add('completed');
      }
    });
  }

  // Inicializar
  enableDragAndDrop();
  loadState();
  updatePrerequisites();
});
