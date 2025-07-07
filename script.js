document.addEventListener('DOMContentLoaded', () => {
  const secciones = ['fan', 'player', 'retro', 'ninos'];
  const camisetasPorPestana = 25;

  // Configuración total y extensión por sección
  const config = {
    fan: { total: 100, ext: 'jpg' },
    player: { total: 100, ext: 'jpeg' },
    retro: { total: 50, ext: 'jpeg' },  // Por defecto jpeg, pero algunas cambian
    ninos: { total: 75, ext: 'jpg' }
  };

  // Lista camisetas retro con extensión .jpg
  const retroJPG = [1, 29, 30, 34, 35, 36, 39, 40, 41, 42, 44, 46, 48, 50];


  function crearCamisetas(seccion) {
    const { total, ext } = config[seccion];
    const numPestanas = Math.ceil(total / camisetasPorPestana);

    for (let pestaña = 1; pestaña <= numPestanas; pestaña++) {
      const contenedor = document.querySelector(`#tab-${seccion}-${pestaña} .camisetas-grid`);
      if (!contenedor) continue;
      contenedor.innerHTML = '';

      let inicio = (pestaña - 1) * camisetasPorPestana + 1;
      let fin = Math.min(pestaña * camisetasPorPestana, total);

      for (let i = inicio; i <= fin; i++) {
        const div = document.createElement('div');
        div.className = 'camiseta-card';

        // Para retro, usa jpg si está en la lista, sino la extensión por defecto
        let extensionReal = ext;
        if (seccion === 'retro' && retroJPG.includes(i)) {
          extensionReal = 'jpg';
        }

        const img = document.createElement('img');
        img.src = `${seccion}/camiseta${i}.${extensionReal}`;
        img.alt = `${seccion} camiseta ${i}`;

        // Ampliar imagen al click
        img.addEventListener('click', () => {
          abrirModal(img.src);
        });

        div.appendChild(img);

        // Botón ME INTERESA que abre Instagram
        const boton = document.createElement('button');
        boton.textContent = 'ME INTERESA';
        boton.className = 'btn-interesa btn-animate';
        boton.addEventListener('click', () => {
          window.open('https://instagram.com/sportkit__', '_blank');
        });

        div.appendChild(boton);
        contenedor.appendChild(div);
      }
    }
  }

  secciones.forEach(crearCamisetas);

  // Manejo de pestañas igual que antes
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const parent = button.closest('.seccion');
      const seccion = parent.id;
      const tab = button.getAttribute('data-tab');

      parent.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      parent.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
      parent.querySelector(`#tab-${tab}`).classList.add('active');
    });
  });

  // Modal para ampliar imágenes (igual que antes)
  const modal = document.createElement('div');
  modal.id = 'modal';
  modal.style.display = 'none';
  modal.innerHTML = `
    <div id="modal-content">
      <span id="modal-cerrar">&times;</span>
      <img id="modal-img" src="" alt="Imagen ampliada" />
    </div>
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector('#modal-img');
  const modalCerrar = modal.querySelector('#modal-cerrar');

  function abrirModal(src) {
    modal.style.display = 'block';
    modalImg.src = src;
  }

  modalCerrar.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('futbol-fondo');
  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  resize();
  window.addEventListener('resize', resize);

  // Carga imagen balón pequeño (usa este enlace o cambia por local)
  const ballImg = new Image();
  ballImg.src = ballImg.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Soccerball.svg/120px-Soccerball.svg.png';


  // Partículas balón
  const balls = [];
  const numBalls = 20;

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  ballImg.onload = () => {
    for (let i = 0; i < numBalls; i++) {
      balls.push({
        x: random(0, width),
        y: random(0, height),
        vx: random(-0.2, 0.2),
        vy: random(-0.2, 0.2),
        size: random(30, 50)
      });
    }
    animate();
  };

  function animate() {
    ctx.clearRect(0, 0, width, height);
    balls.forEach(ball => {
      ball.x += ball.vx;
      ball.y += ball.vy;

      if (ball.x < 0 || ball.x > width) ball.vx *= -1;
      if (ball.y < 0 || ball.y > height) ball.vy *= -1;

      ctx.drawImage(ballImg, ball.x, ball.y, ball.size, ball.size);
    });
    requestAnimationFrame(animate);
  }
});

