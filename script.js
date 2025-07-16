const cursos = [
  {codigo: "MinArtes", nombre: "Mínimo de Artes", creditos: 10, prereq: []},
  {codigo: "MinLetras", nombre: "Mínimo de Letras", creditos: 10, prereq: []},
  {codigo: "IHI0205", nombre: "Historia Mundial Contemporanea", creditos: 10, prereq: []},
  {codigo: "MinFilo", nombre: "Mínimo de Filosofía", creditos: 10, prereq: []},
  {codigo: "MAT0100", nombre: "Razonamiento Cuantitativo", creditos: 10, prereq: []},
  {codigo: "VRA0901", nombre: "Taller de Iniciación", creditos: 5, prereq: []},
  {codigo: "COM101", nombre: "Test de Actualidad I A", creditos: 0, prereq: []},
  {codigo: "EST210A", nombre: "Fundamentos de la Estética", creditos: 10, prereq: []},
  {codigo: "FIL217H", nombre: "Verdad y Belleza", creditos: 10, prereq: []},
  {codigo: "COM110", nombre: "Teoría de la Comunicación", creditos: 10, prereq: []},
  {codigo: "COM113", nombre: "Tecnologías de la Comunicación", creditos: 10, prereq: []},
  {codigo: "COM102", nombre: "Test de Actualidad I B", creditos: 0, prereq: []},
  {codigo: "COM122", nombre: "Narración de Ficción", creditos: 10, prereq: []},
  {codigo: "COM115", nombre: "Lenguaje Visual", creditos: 10, prereq: []},
  {codigo: "COM109", nombre: "Historia de la Comunicación Social", creditos: 10, prereq: []},
  {codigo: "MH", nombre: "Curso Área de Habilidades Comunicativas Orales", creditos: 10, prereq: []},
  {codigo: "OR", nombre: "Teológico", creditos: 10, prereq: []},
  {codigo: "COM103", nombre: "Test de Actualidad II A", creditos: 0, prereq: []},
  {codigo: "MR", nombre: "Metodologías de la Investigación Social", creditos: 10, prereq: []},
  {codigo: "COM705", nombre: "Espectáculo Audiovisual", creditos: 10, prereq: []},
  {codigo: "COM706", nombre: "Herramientas de Gestión Audiovisual", creditos: 10, prereq: []},
  {codigo: "COM120", nombre: "Narración de No Ficción", creditos: 10, prereq: []},
  {codigo: "FIL183", nombre: "¿Filosofía Para Qué?", creditos: 10, prereq: []},
  {codigo: "COM104", nombre: "Test de Actualidad II B", creditos: 0, prereq: []},
  {codigo: "COM100", nombre: "Desafíos de la Comunicación", creditos: 10, prereq: []},
  {codigo: "COM718", nombre: "Taller de Lenguaje Audiovisual", creditos: 10, prereq: ["COM115"]},
  {codigo: "COM708", nombre: "Fundamentos Dramáticos de lo Audiovisual", creditos: 10, prereq: ["COM705"]},
  {codigo: "COM116", nombre: "Audiencias", creditos: 10, prereq: []},
  {codigo: "COM3500", nombre: "Economía de las Comunicaciones", creditos: 10, prereq: []},
  {codigo: "COM105", nombre: "Test de Actualidad III A", creditos: 0, prereq: []},
  {codigo: "COM704", nombre: "Seminario de Cine", creditos: 10, prereq: ["COM110","COM115"]},
  {codigo: "COM719", nombre: "Taller de Realización Audiovisual", creditos: 10, prereq: ["COM718"]},
  {codigo: "COM177", nombre: "Narración Interactiva", creditos: 10, prereq: []},
  {codigo: "COM121", nombre: "Semiología", creditos: 10, prereq: []},
  {codigo: "COM709", nombre: "Generación y Desarrollo de Proyectos Audiovisual", creditos: 10, prereq: ["COM706","COM790"]},
  {codigo: "COM106", nombre: "Test de Actualidad III B", creditos: 0, prereq: []},
  {codigo: "COM711", nombre: "Seminario de Televisión", creditos: 10, prereq: ["COM115"]},
  {codigo: "COM710", nombre: "Taller de Televisión", creditos: 10, prereq: ["COM719"]},
  {codigo: "COM720", nombre: "Seminario de Documental", creditos: 10, prereq: []},
  {codigo: "COM712", nombre: "Géneros y Formatos del Guión Audiovisual", creditos: 10, prereq: ["COM705"]},
  {codigo: "COM1000", nombre: "Práctica Interna", creditos: 0, prereq: []},
  {codigo: "COM713", nombre: "Taller de Documental", creditos: 10, prereq: ["COM719"]},
  {codigo: "DEL307", nombre: "Derecho de la Comunicación", creditos: 10, prereq: []},
  {codigo: "COM200", nombre: "Éticas de las Comunicaciones", creditos: 10, prereq: ["FIL183"]},
  {codigo: "COM714", nombre: "Seminario de Nuevas Tendencias", creditos: 10, prereq: []},
  {codigo: "COM716", nombre: "Taller de Ficción", creditos: 10, prereq: ["COM719"]},
  {codigo: "COM715", nombre: "Escritura del Relato Audiovisual", creditos: 10, prereq: ["COM708"]},
  {codigo: "Optativo1", nombre: "Optativo de Profundización 1", creditos: 10, prereq: []},
  {codigo: "COM790", nombre: "Práctica Profesional I", creditos: 0, prereq: []},
  {codigo: "COM3500B", nombre: "Economía de las Comunicaciones (2)", creditos: 10, prereq: []},
  {codigo: "COM721", nombre: "Taller Avanzado de Realización Audiovisual", creditos: 10, prereq: ["COM710","COM713","COM716"]},
  {codigo: "COM3504", nombre: "Industria Audiovisual", creditos: 10, prereq: ["COM709"]},
  {codigo: "Optativo2", nombre: "Optativo de Profundización 2", creditos: 10, prereq: []},
  {codigo: "Optativo3", nombre: "Optativo de Profundización 3", creditos: 10, prereq: []},
  {codigo: "COM791", nombre: "Práctica Profesional II", creditos: 0, prereq: []}
];

const cursosDiv = document.getElementById('cursos');

function renderCursos() {
  cursosDiv.innerHTML = "";
  cursos.forEach(curso => {
    const div = document.createElement('div');
    div.classList.add('curso');
    div.textContent = `${curso.codigo} - ${curso.nombre} (${curso.creditos} cr)`;
    div.setAttribute('data-curso', curso.codigo);
    
    if (curso.prereq.length > 0) {
      div.classList.add('locked');
    }

    cursosDiv.appendChild(div);
  });
}

renderCursos();

// Interact.js drag & drop
interact('.curso').draggable({
  inertia: true,
  autoScroll: true,
  listeners: {
    move (event) {
      const target = event.target;
      if (target.classList.contains('locked')) return;

      const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      target.style.transform = `translate(${x}px, ${y}px)`;
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    },
    end (event) {
      event.target.style.transform = 'none';
      event.target.removeAttribute('data-x');
      event.target.removeAttribute('data-y');
    }
  }
});

interact('.dropzone').dropzone({
  accept: '.curso:not(.locked)',
  overlap: 0.75,
  ondrop: function (event) {
    const dropSemestre = parseInt(event.target.dataset.semestre);
    event.target.appendChild(event.relatedTarget);
    event.relatedTarget.classList.add('completed');
    event.relatedTarget.classList.remove('locked');

    const codigo = event.relatedTarget.getAttribute('data-curso');
    desbloquearCursos(codigo, dropSemestre);
  }
});

function desbloquearCursos(codigoCumplido, semestreCumplido) {
  cursos.forEach(curso => {
    if (curso.prereq.includes(codigoCumplido)) {
      const prereqsCompletos = curso.prereq.every(pr => {
        const colocado = document.querySelector(`.dropzone .curso[data-curso="${pr}"]`);
        if (!colocado) return false;
        const semestre = parseInt(colocado.closest('.dropzone').dataset.semestre);
        return semestre <= semestreCumplido;
      });
      if (prereqsCompletos) {
        const cursoDiv = document.querySelector(`.curso[data-curso="${curso.codigo}"]`);
        if (cursoDiv) cursoDiv.classList.remove('locked');
      }
    }
  });
}
