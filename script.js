// إنشاء النجوم (بنفس الكود السابق)
const starCount = window.devicePixelRatio > 1.5 ? 200 : 120;
const starsContainer = document.getElementById('stars');
for (let i = 0; i < starCount; i++) {
  const star = document.createElement('div');
  star.style.position = 'absolute';
  star.style.width = Math.random() * 1.8 + 'px';
  star.style.height = star.style.width;
  star.style.backgroundColor = 'white';
  star.style.borderRadius = '50%';
  star.style.left = Math.random() * 100 + '%';
  star.style.top = Math.random() * 100 + '%';
  star.style.opacity = Math.random() * 0.8 + 0.2;
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    star.style.animation = `twinkle ${Math.random() * 8 + 4}s infinite alternate`;
  }
  starsContainer.appendChild(star);
}

const style = document.createElement('style');
style.textContent = `
  @keyframes twinkle {
    0% { opacity: 0.2; transform: scale(1); }
    100% { opacity: 1; transform: scale(1.15); }
  }
`;
document.head.appendChild(style);

// ====== التشغيل شبه التلقائي للصوت ======
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');

bgMusic.volume = 0.45;
let audioStarted = false;

// محاولة التشغيل التلقائي (قد تنجح على بعض المتصفحات أو في الملفات المحلية)
function tryPlayAudio() {
  if (audioStarted) return;
  const playPromise = bgMusic.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        audioStarted = true;
        musicToggle.textContent = '🔊 إيقاف الموسيقى';
        musicToggle.style.display = 'inline-block';
      })
      .catch(() => {
        // فشل التشغيل التلقائي → نبقي الزر ظاهرًا للمستخدم
        musicToggle.style.display = 'inline-block';
      });
  } else {
    // متصفح قديم
    audioStarted = true;
    musicToggle.style.display = 'none';
  }
}

// محاولة أولية عند التحميل
tryPlayAudio();

// عند أول تفاعل (نقر، لمس، مفتاح...) → ابدأ الصوت واملأ "نوايا المستخدم"
const userGestureHandler = () => {
  if (!audioStarted) {
    tryPlayAudio();
  }
  // بعد أول تفاعل، لا نحتاج الزر إذا نجح التشغيل
  if (audioStarted) {
    musicToggle.style.display = 'inline-block';
  }
  // إزالة المستمع بعد أول تفاعل لتحسين الأداء
  window.removeEventListener('click', userGestureHandler);
  window.removeEventListener('touchstart', userGestureHandler);
  window.removeEventListener('keydown', userGestureHandler);
};

window.addEventListener('click', userGestureHandler);
window.addEventListener('touchstart', userGestureHandler);
window.addEventListener('keydown', userGestureHandler);

// التحكم اليدوي بالزر (للتشغيل/الإيقاف بعد بدء الصوت)
musicToggle.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.textContent = '🔊 إيقاف الموسيقى';
  } else {
    bgMusic.pause();
    musicToggle.textContent = '🔈 تشغيل الموسيقى';
  }
});

// === باقي التفاعل مع الأزهار ===
document.querySelectorAll('.flower').forEach(flower => {
  const handleClick = () => {
    const name = flower.getAttribute('data-name');
    const msg = flower.getAttribute('data-msg');
    document.getElementById('friend-name').textContent = name;
    document.getElementById('message-text').textContent = msg;
    document.getElementById('modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  flower.addEventListener('click', handleClick);
  flower.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') handleClick();
  });
});

const closeModal = () => {
  document.getElementById('modal').style.display = 'none';
  document.body.style.overflow = '';
};

document.getElementById('close').addEventListener('click', closeModal);
document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target.id === 'modal') closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.getElementById('modal').style.display === 'flex') {
    closeModal();
  }
});