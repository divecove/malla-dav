// Lista de cursos
const cursos = [
  {codigo: "Artes", nombre: "Mínimo de Artes", creditos: 10},
  {codigo: "Letras", nombre: "Mínimo de Letras", creditos: 10},
  {codigo: "IHI0205", nombre: "Historia Mundial Contemporánea", creditos: 10},
  {codigo: "Filosofía", nombre: "Mínimo de Filosofía", creditos: 10},
  {codigo: "MAT0100", nombre: "Razonamiento Cuantitativo", creditos: 10},
  {codigo: "VRA0901", nombre: "Taller de Iniciación", creditos: 5},
  // agrega los demás cursos aquí siguiendo este formato
];

// Renderizar cursos
const cursosDiv = document.getElementById('cursos');
cursos.forEach(curso => {
  const div = document.createElement('div');
  div.classList.add('curso');
  div.textContent = `${curso.codigo} - ${curso.nombre} (${curso.creditos} cr)`;
  div.setAttribute('data-curso', curso.codigo);
  cursosDiv.appendChild(div);
});

// Interact.js drag and drop
interact('.curso')
  .draggable({
    inertia: true,
    autoScroll: true,
    listeners: {
      move (event) {
        const target = event.target;
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
  accept: '.curso',
  overlap: 0.75,
  ondrop: function (event) {
    event.target.appendChild(event.relatedTarget);
  }
});
