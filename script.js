document.addEventListener('DOMContentLoaded', () => {

  const courseData = [
    { code: 'MIN-ART', name: 'Mínimo de Artes', credits: 10 },
    { code: 'MIN-LET', name: 'Mínimo de Letras', credits: 10 },
    { code: 'IHI0205', name: 'Historia Mundial Contemporanea', credits: 10 },
    { code: 'MIN-FIL', name: 'Mínimo de Filosofía', credits: 10 },
    { code: 'MAT0100', name: 'Razonamiento Cuantitativo', credits: 10 },
    { code: 'VRA0901', name: 'Taller de Iniciación', credits: 5 },
    { code: 'COM101', name: 'Test de Actualidad I A', credits: 0 },
    { code: 'EST210A', name: 'Fundamentos de la Estética', credits: 10 },
    { code: 'FIL217H', name: 'Verdad y Belleza', credits: 10 },
    { code: 'COM110', name: 'Teoría de la Comunicación', credits: 10 },
    { code: 'COM113', name: 'Tecnologías de la Comunicación', credits: 10 },
    { code: 'COM102', name: 'Test de Actualidad I B', credits: 0 },
    { code: 'COM122', name: 'Narración de Ficción', credits: 10 },
    { code: 'COM115', name: 'Lenguaje Visual', credits: 10 },
    { code: 'COM109', name: 'Historia de la Comunicación Social', credits: 10 },
    { code: 'MIN-HCO', name: 'Mínimo Hab. Comunicativas Orales', credits: 10 },
    { code: 'OR-TEO', name: 'OR Teológico', credits: 10 },
    { code: 'COM103', name: 'Test de Actualidad II A', credits: 0 },
    { code: 'MIN-MIS', name: 'MR Metodologías de la Inv. Social', credits: 10 },
    { code: 'COM705', name: 'Espectáculo Audiovisual', credits: 10 },
    { code: 'COM706', name: 'Herramientas de Gestión Audiovisual', credits: 10 },
    { code: 'COM120', name: 'Narración de No Ficción', credits: 10 },
    { code: 'FIL183', name: '¿Filosofía Para Qué?', credits: 10 },
    { code: 'COM104', name: 'Test de Actualidad II B', credits: 0 },
    { code: 'COM100', name: 'Desafíos de la Comunicación', credits: 10 },
    { code: 'COM718', name: 'Taller de Lenguaje Audiovisual', credits: 10 },
    { code: 'COM708', name: 'Fundamentos Dramáticos de lo Audiovisual', credits: 10 },
    { code: 'COM116', name: 'Audiencias', credits: 10 },
    { code: 'COM3500', name: 'Economía de las Comunicaciones', credits: 10 },
    { code: 'COM105', name: 'Test de Actualidad III A', credits: 0 },
    { code: 'COM704', name: 'Seminario de Cine', credits: 10 },
    { code: 'COM719', name: 'Taller de Realización Audiovisual', credits: 10 },
    { code: 'COM177', name: 'Narración Interactiva', credits: 10 },
    { code: 'COM121', name: 'Semiología', credits: 10 },
    { code: 'COM709', name: 'Generación y Desarrollo de Proyectos', credits: 10 },
    { code: 'COM106', name: 'Test de Actualidad III B', credits: 0 },
    { code: 'COM711', name: 'Seminario de Televisión', credits: 10 },
    { code: 'COM710', name: 'Taller de Televisión', credits: 10 },
    { code: 'COM720', name: 'Seminario de Documental', credits: 10 },
    { code: 'COM712', name: 'Géneros y Formatos del Guión', credits: 10 },
    { code: 'COM1000', name: 'Práctica Interna (20 hrs)', credits: 0 },
    { code: 'COM713', name: 'Taller de Documental', credits: 10 },
    { code: 'DEL307', name: 'Derecho de la Comunicación', credits: 10 },
    { code: 'COM200', name: 'Éticas de las Comunicaciones', credits: 10 },
    { code: 'COM714', name: 'Seminario de Nuevas Tendencias', credits: 10 },
    { code: 'COM716', name: 'Taller de Ficción', credits: 10 },
    { code: 'COM715', name: 'Escritura del Relato Audiovisual', credits: 10 },
    { code: 'OP1', name: 'Optativo de Profundización I', credits: 10 },
    { code: 'COM790', name: 'Práctica Profesional I', credits: 0 },
    { code: 'COM721', name: 'Taller Avanzado de Realización', credits: 10 },
    { code: 'COM3504', name: 'Industria Audiovisual', credits: 10 },
    { code: 'OP2', name: 'Optativo de Profundización II', credits: 10 },
    { code: 'OP3', name: 'Optativo de Profundización III', credits: 10 },
    { code: 'COM791', name: 'Práctica Profesional II', credits: 0 }
  ];

  const courseBank = document.getElementById('course-bank');
  const semestersGrid = document.getElementById('semesters-grid');

  // Crear columnas de semestres
  for (let i = 1; i <= 10; i++) {
    const semesterCol = document.createElement('div');
    semesterCol.classList.add('semester-column');
    semesterCol.dataset.semester = i;
    semesterCol.innerHTML = `<h3>Semestre ${i}</h3>`;
    semestersGrid.appendChild(semesterCol);
  }

  // Crear cursos
  courseData.forEach(course => {
    const courseEl = document.createElement('div');
    courseEl.classList.add('course');
    courseEl.id = course.code;
    courseEl.draggable = true;
    courseEl.innerHTML = `<span class="course-code">${course.code}</span><span class="course-name">${course.name}</span><span class="course-credits">${course.credits} créditos</span>`;
    courseBank.appendChild(courseEl);
  });

  // Drag & drop
  let draggedCourse = null;

  document.querySelectorAll('.course').forEach(course => {
    course.addEventListener('dragstart', e => {
      draggedCourse = course;
      setTimeout(() => course.style.display = 'none', 0);
    });
    course.addEventListener('dragend', () => {
      draggedCourse.style.display = 'block';
      draggedCourse = null;
      saveState();
    });
  });

  const dropZones = document.querySelectorAll('.semester-column, #course-bank');

  dropZones.forEach(zone => {
    zone.addEventListener('dragover', e => e.preventDefault());
    zone.addEventListener('drop', e => {
      e.preventDefault();
      if (draggedCourse) {
        zone.appendChild(draggedCourse);
        if (zone.classList.contains('semester-column')) {
          draggedCourse.classList.add('approved');
        } else {
          draggedCourse.classList.remove('approved');
        }
        saveState();
      }
    });
  });

  // Guardar estado
  function saveState() {
    const state = {
      semesters: {},
      bank: []
    };

    document.querySelectorAll('.semester-column').forEach((col, i) => {
      state.semesters[i + 1] = Array.from(col.querySelectorAll('.course')).map(c => c.id);
    });

    state.bank = Array.from(courseBank.querySelectorAll('.course')).map(c => c.id);
    localStorage.setItem('mallaState', JSON.stringify(state));
  }

  function loadState() {
    const saved = JSON.parse(localStorage.getItem('mallaState'));
    if (!saved) return;

    // Limpiar
    document.querySelectorAll('.semester-column').forEach(col => col.innerHTML = `<h3>${col.querySelector('h3').textContent}</h3>`);
    courseBank.innerHTML = '';

    const allCourses = {};
    document.querySelectorAll('.course').forEach(c => allCourses[c.id] = c);

    // Banco
    saved.bank.forEach(cid => {
      if (allCourses[cid]) courseBank.appendChild(allCourses[cid]);
    });

    // Semestres
    Object.keys(saved.semesters).forEach(key => {
      const col = document.querySelector(`.semester-column[data-semester="${key}"]`);
      saved.semesters[key].forEach(cid => {
        if (allCourses[cid]) {
          col.appendChild(allCourses[cid]);
          allCourses[cid].classList.add('approved');
        }
      });
    });
  }

  loadState();
});
