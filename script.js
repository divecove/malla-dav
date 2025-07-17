document.addEventListener('DOMContentLoaded', () => {
    const courseBank = document.getElementById('course-bank');
    const semestersGrid = document.getElementById('semesters-grid');
    const additionalReqsContainer = document.getElementById('additional-requirements');

    const courseData = [
        { code: 'MAT0100', name: 'Razonamiento Cuantitativo', credits: 10, prerequisites: [] },
        { code: 'COM110', name: 'Teoría de la Comunicación', credits: 10, prerequisites: [] },
        { code: 'FIL217H', name: 'Verdad y Belleza', credits: 10, prerequisites: [] },
    ];

    const additionalReqsData = [
        { id: 'req-com-escrita', name: 'Examen de Comunicación Escrita (VRA100C)' },
        { id: 'req-english', name: 'English Test Alte 2 (VRA2000)' },
        { id: 'req-iniciacion', name: 'Taller de Iniciación Aprobado' }
    ];

    for (let i = 1; i <= 10; i++) {
        const semesterCol = document.createElement('div');
        semesterCol.classList.add('semester-column');
        semesterCol.dataset.semester = i;
        semesterCol.innerHTML = `<h3>Semestre ${i}</h3>`;
        semestersGrid.appendChild(semesterCol);
    }

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

    function updatePrerequisites() {
        const approved = new Set(
            Array.from(document.querySelectorAll('.semester-column .course'))
                .map(c => c.dataset.code)
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
