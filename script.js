document.addEventListener('DOMContentLoaded', () => {
  const courseBank = document.getElementById('course-bank');
  const semestersGrid = document.getElementById('semesters-grid');
  const additionalReqsContainer = document.getElementById('additional-requirements');

  const courseData = [
    { code: 'MIN-ART', name: 'Mínimo de Artes', credits: 10, prerequisites: [] },
    { code: 'IHI0205', name: 'Historia Mundial Contemporanea', credits: 10, prerequisites: [] },
    { code: 'MAT0100', name: 'Razonamiento Cuantitativo', credits: 10, prerequisites: [] },
    { code: 'COM110', name: 'Teoría de la Comunicación', credits: 10, prerequisites: [] },
    { code: 'COM122', name: 'Narración de Ficción', credits: 10, prerequisites: [] },
    { code: 'COM115', name: 'Lenguaje Visual', credits: 10, prerequisites: [] },
    { code: 'COM109', name: 'Historia de la Comunicación Social', credits: 10, prerequisites: [] },
    { code: 'COM705', name: 'Espectáculo Audiovisual', credits: 10, prerequisites: [] },
    { code: 'COM706', name: 'Herramientas de Gestión Audiovisual', credits: 10, prerequisites: [] },
    { code: 'COM120', name: 'Narración de No Ficción', credits: 10, prerequisites: [] },
    { code: 'COM718', name: 'Taller de Lenguaje Audiovisual', credits: 10, prerequisites: ['COM115'] },
    { code: 'COM708', name: 'Fundamentos Dramaticos de lo Audiovisual', credits: 10, prerequisites: ['COM122'] },
    { code: 'COM719', name: 'Taller de Realización Audiovisual', credits: 10, prerequisites: ['COM718'] },
    { code: 'COM710', name: 'Taller de Televisión', credits: 10, prerequisites: ['COM719'] },
    { code: 'COM713', name: 'Taller de Documental', credits: 10, prerequisites: ['COM719'] },
    { code: 'COM716', name: 'Taller de Ficción', credits: 10, prerequisites: ['COM710'] },
    { code: 'COM721', name: 'Taller Avanzado de Realización', credits: 10, prerequisites: ['COM716', 'COM713'] },
  ];

  const additionalReqsData = [
    { id: 'req-com-escrita', name: 'Examen de Comunicación Escrita' },
    { id: 'req-english', name: 'English Test Alte 2' },
    { id: 'req-iniciacion', name: 'Taller de Iniciación Aprobado' }
  ];

  // Crear semestres
  for (let i = 1; i <= 10; i++) {
    const col = document.createElement('div');
    col.className = 'semester-column';
    col.dataset.semester = i;
    col.innerHTML = `<h3>Semestre ${i}</h3>`;
    semestersGrid.appendChild(col);
  }

  // Renderizar cursos
  courseData.forEach(course => {
    const c = document.createElement('div');
    c.className = 'course';
    c.id = course.code;
    c.draggable = true;
    c.dataset.code = course.code;
    c.dataset.prerequisites = JSON.stringify(course.prerequisites);
    c.innerHTML = `<span class="course-code">${course.code}</span> - ${course.name} (${course.credits} créditos)`;
    courseBank.appendChild(c);
  });

  // Renderizar requisitos adicionales
  additionalReqsData.forEach(req => {
    const r = document.createElement('div');
    r.className = 'req-item';
    r.id = req.id;
    r.textContent = req.name;
    r.addEventListener('click', () => {
      r.classList.toggle('completed');
      saveState();
    });
    additionalReqsContainer.appendChild(r);
  });

  // Drag & Drop
  function enableDragAndDrop() {
    const courses = document.querySelectorAll('.course');
    const dropzones = [...document.querySelectorAll('.semester-column'), courseBank];

    courses.forEach(course => {
      course.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', course.id);
        setTimeout(() => (course.style.opacity = '0.5'), 0);
      });
      course.addEventListener('dragend', () => (course.style.opacity = '1'));
    });

    dropzones.forEach(zone => {
      zone.addEventListener('dragover', e => {
        e.preventDefault();
        zone.classList.add('drag-over');
      });
      zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
      zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        const id = e.dataTransfer.getData('text/plain');
        const el = document.getElementById(id);
        if (el) {
          zone.appendChild(el);
          el.classList.toggle('approved', zone.classList.contains('semester-column'));
          updatePrerequisites();
          saveState();
        }
      });
    });
  }

  function updatePrerequisites() {
    const approved = new Set(
      Array.from(document.querySelectorAll('.semester-column .course')).map(c => c.dataset.code)
    );

    document.querySelectorAll('.course').forEach(c => {
      const prereqs = JSON.parse(c.dataset.prerequisites);
      const met = prereqs.every(p => approved.has(p));
      c.classList.toggle('locked', !met && !c.classList.contains('approved'));
      c.draggable = met || c.classList.contains('approved');
    });
  }

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

    document.querySelectorAll('.semester-column').forEach(col => {
      col.innerHTML = `<h3>${col.querySelector('h3').textContent}</h3>`;
    });
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
          if (el) {
            col.appendChild(el);
            el.classList.add('approved');
          }
        });
      }
    });

    Object.keys(state.requirements).forEach(reqId => {
      const reqEl = document.getElementById(reqId);
      if (reqEl && state.requirements[reqId]) {
        reqEl.classList.add('completed');
      }
    });
  }

  enableDragAndDrop();
  loadState();
  updatePrerequisites();
});
