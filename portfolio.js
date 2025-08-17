// year

    document.getElementById('year').textContent = new Date().getFullYear();

// intersection reveal

const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ 
        if(e.isIntersecting){
            e.target.classList.add('in'); io.unobserve(e.target);}});
        },{ threshold: 0.75 });
    document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

// 3D tilt on cards

const strength = 15;
    function tilt(e){
      const card = e.currentTarget; const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const rx = ((y / r.height) - .2) * -strength;
      const ry = ((x / r.width)  - .2) * strength;
      card.style.transform = `perspective(777px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
    function untilt(e){ e.currentTarget.style.transform = 'perspective(777px) rotateX(0) rotateY(0)'; }
    document.querySelectorAll('.tilt').forEach(c=>{
      c.addEventListener('mousemove', tilt);
      c.addEventListener('mouseleave', untilt);
      c.addEventListener('blur', untilt);
    });

// bg particles

(function prts(){
        const canvas = document.getElementById('prt');
        if (!canvas) return;
        const dpr = window.devicePixelRatio || 1;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let w = window.innerWidth, h = window.innerHeight;
        function resize(){
          w = window.innerWidth;
          h = window.innerHeight;
          canvas.width = w * dpr;
          canvas.height = h * dpr;
          canvas.style.width = w + 'px';
          canvas.style.height = h + 'px';
        }
        resize();
        window.addEventListener('resize', resize);
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        const N = prefersReduced ? 25 : 75;
        const pts = new Array(N).fill(0).map(() => ({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.75 + 0.5,
          vx: (Math.random() - .5) * 0.25 * dpr,
          vy: (Math.random() - .5) * 0.25 * dpr
        }));
        function step(){
          ctx.clearRect(0, 0, w, h);
          for(const p of pts){
            p.x += p.vx; p.y += p.vy;
            if(p.x < 0 || p.x > w) p.vx *= -1;
            if(p.y < 0 || p.y > h) p.vy *= -1;
// glow
            const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 11);
            g.addColorStop(0, 'rgba(0,255,165,.25)');
            g.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 12, 0, Math.PI * 7); ctx.fill();
// core
            ctx.fillStyle = 'rgba(0,255,165,.75)';
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 7); ctx.fill();
          }
          requestAnimationFrame(step);
        }
        if(!prefersReduced){ step(); }
    })();

// game

    (function(){
      const dot = document.getElementById('dot');
      const area = document.getElementById('game-area');
      const scoreEl = document.getElementById('score');
      let score = 0;
      if(dot && area && scoreEl){
        dot.addEventListener('click', ()=>{
          score++;
          scoreEl.textContent = 'Score : ' + score;
          // Move dot to random position
          const maxX = area.offsetWidth - dot.offsetWidth;
          const maxY = area.offsetHeight - dot.offsetHeight;
          dot.style.left = Math.floor(Math.random()*maxX) + 'px';
          dot.style.top = Math.floor(Math.random()*maxY) + 'px';
        });
      }
    })();