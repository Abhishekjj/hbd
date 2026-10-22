// ==========================================
// 🎂 HAPPY BIRTHDAY SURPRISE ENGINE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Load Configurations & URL Parameter Overrides
  const config = window.BIRTHDAY_CONFIG || {
    name: "Alex",
    nickname: "Rockstar 🌟",
    pic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    hbdMsg: "Wishing you a wonderful year filled with boundless joy, great health, and huge success!",
    scrollMsg: "Happy Birthday! May your day be filled with lots of love and happiness!",
    showScrollMessage: true,
    scrollDurationSeconds: 8
  };

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("name")) config.name = urlParams.get("name");
  if (urlParams.get("nickname")) config.nickname = urlParams.get("nickname");
  if (urlParams.get("pic")) config.pic = urlParams.get("pic");
  if (urlParams.get("msg")) config.hbdMsg = urlParams.get("msg");
  if (urlParams.get("scroll")) config.scrollMsg = urlParams.get("scroll");

  // Update DOM with Config Data
  document.querySelectorAll(".recipient-name").forEach(el => el.textContent = config.name);
  const nicknameEl = document.getElementById("recipient-nickname");
  if (nicknameEl) nicknameEl.textContent = config.nickname;
  const customMsgEl = document.getElementById("custom-hbd-msg");
  if (customMsgEl) customMsgEl.textContent = config.hbdMsg;
  const picEl = document.getElementById("recipient-pic");
  if (picEl) picEl.src = config.pic;
  const scrollTextEl = document.getElementById("scroll-message-text");
  if (scrollTextEl) scrollTextEl.innerHTML = config.scrollMsg.replace(/\n/g, "<br>");

  // 2. Audio System with Synthesizer Fallback
  const audioSwitch = document.getElementById("audio-switch");
  const audioDoor = document.getElementById("audio-door");
  const audioHaunt = document.getElementById("audio-haunt");
  const audioBlast = document.getElementById("audio-blast");
  const audioHbd = document.getElementById("audio-hbd");
  const audioToggle = document.getElementById("audio-toggle");

  let isMuted = false;
  let audioCtx = null;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  function playSynthTone(freq, type, duration) {
    try {
      initAudioContext();
      if (!audioCtx || isMuted) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Synth tone error:", e);
    }
  }

  function playSound(audioEl, synthFallback) {
    initAudioContext();
    if (isMuted) return;
    if (audioEl) {
      audioEl.currentTime = 0;
      audioEl.play().catch(() => {
        if (synthFallback) synthFallback();
      });
    } else if (synthFallback) {
      synthFallback();
    }
  }

  // Audio Toggle Button
  audioToggle.addEventListener("click", () => {
    isMuted = !isMuted;
    audioToggle.textContent = isMuted ? "🔇" : "🔊";
    if (audioHbd) {
      if (isMuted) audioHbd.pause();
      else audioHbd.play().catch(() => {});
    }
    if (audioHaunt) {
      if (isMuted) audioHaunt.pause();
      else if (!sceneHallway.classList.contains("hidden")) audioHaunt.play().catch(() => {});
    }
  });

  // 3. Scene Management
  const sceneDarkroom = document.getElementById("scene-darkroom");
  const sceneEmptyroom = document.getElementById("scene-emptyroom");
  const sceneHallway = document.getElementById("scene-hallway");
  const sceneGiftroom = document.getElementById("scene-giftroom");
  const sceneCelebration = document.getElementById("scene-celebration");

  const actionBtn = document.getElementById("action-btn");
  const btnRef = document.getElementById("btn-ref");
  const flashOverlay = document.getElementById("flash-overlay");
  const scrollFrame = document.getElementById("scroll-frame");
  const cardFrame = document.getElementById("card-frame");

  let currentStage = 0; // 0: Darkroom, 1: EmptyRoom, 2: Hallway, 3: GiftRoom, 4: Celebration
  let textTimeouts = [];

  function clearAllTimeouts() {
    textTimeouts.forEach(t => clearTimeout(t));
    textTimeouts = [];
  }

  function displaySequentialTexts(textElements, onComplete) {
    clearAllTimeouts();
    textElements.forEach((el, index) => {
      const showTimer = setTimeout(() => {
        textElements.forEach(t => t.classList.remove("active"));
        el.classList.add("active");
        if (index === textElements.length - 1 && onComplete) {
          const btnTimer = setTimeout(() => {
            onComplete();
          }, 1500);
          textTimeouts.push(btnTimer);
        }
      }, index * 2600);
      textTimeouts.push(showTimer);
    });
  }

  // Stage 0: Enter Dark Room
  function startDarkroomScene() {
    currentStage = 0;
    actionBtn.className = "action-btn switch-btn hidden";
    btnRef.classList.add("hidden");
    const texts = sceneDarkroom.querySelectorAll(".bb-text");
    displaySequentialTexts(texts, () => {
      actionBtn.className = "action-btn switch-btn";
      btnRef.textContent = "Click the Light Bulb.";
      actionBtn.classList.remove("hidden");
      btnRef.classList.remove("hidden");
    });
  }

  // Stage 1: Empty Room
  function goToEmptyRoom() {
    currentStage = 1;
    playSound(audioSwitch, () => playSynthTone(800, "triangle", 0.15));

    actionBtn.classList.add("hidden");
    btnRef.classList.add("hidden");
    sceneDarkroom.classList.add("hidden");
    sceneEmptyroom.classList.remove("hidden");

    const texts = sceneEmptyroom.querySelectorAll(".room-text");
    displaySequentialTexts(texts, () => {
      actionBtn.className = "action-btn door-btn";
      btnRef.textContent = "Click the Door.";
      actionBtn.classList.remove("hidden");
      btnRef.classList.remove("hidden");
    });
  }

  // Stage 2: Hallway
  function goToHallway() {
    currentStage = 2;
    playSound(audioDoor, () => playSynthTone(220, "sawtooth", 0.5));
    playSound(audioHaunt, () => playSynthTone(110, "sine", 2.0));

    actionBtn.classList.add("hidden");
    btnRef.classList.add("hidden");
    sceneEmptyroom.classList.add("hidden");
    sceneHallway.classList.remove("hidden");

    const texts = sceneHallway.querySelectorAll(".hall-text");
    displaySequentialTexts(texts, () => {
      actionBtn.className = "action-btn door-btn";
      btnRef.textContent = "Click the Door.";
      actionBtn.classList.remove("hidden");
      btnRef.classList.remove("hidden");
    });
  }

  // Stage 3: Gift Room
  function goToGiftRoom() {
    currentStage = 3;
    if (audioHaunt) audioHaunt.pause();
    playSound(audioDoor, () => playSynthTone(220, "sawtooth", 0.5));

    actionBtn.classList.add("hidden");
    btnRef.classList.add("hidden");
    sceneHallway.classList.add("hidden");
    sceneGiftroom.classList.remove("hidden");

    const texts = sceneGiftroom.querySelectorAll(".gift-text");
    displaySequentialTexts(texts, () => {
      actionBtn.className = "action-btn gift-btn";
      btnRef.textContent = "Click the Gift Box.";
      actionBtn.classList.remove("hidden");
      btnRef.classList.remove("hidden");
    });
  }

  // Stage 4: Celebration Surprise
  function triggerCelebration() {
    currentStage = 4;
    actionBtn.classList.add("hidden");
    btnRef.classList.add("hidden");
    sceneGiftroom.classList.add("hidden");

    // Blast sound & White Flash Explosion
    playSound(audioBlast, () => playSynthTone(150, "square", 0.8));
    flashOverlay.classList.remove("hidden");

    setTimeout(() => {
      flashOverlay.classList.add("hidden");
    }, 1600);

    // Show celebration scene
    sceneCelebration.classList.remove("hidden");
    audioToggle.classList.remove("hidden");

    // Start celebration music
    if (audioHbd && !isMuted) {
      audioHbd.currentTime = 0;
      audioHbd.play().catch(() => {});
    }

    // Launch initial burst of confetti
    launchConfettiBurst(160);
    startContinuousConfetti();

    // Check scroll message preference
    if (config.showScrollMessage) {
      scrollFrame.classList.remove("hidden");
      cardFrame.classList.add("hidden");

      const autoShowCard = setTimeout(() => {
        revealCard();
      }, config.scrollDurationSeconds * 1000);

      document.getElementById("skip-scroll-btn").onclick = () => {
        clearTimeout(autoShowCard);
        revealCard();
      };
    } else {
      revealCard();
    }
  }

  function revealCard() {
    scrollFrame.classList.add("hidden");
    cardFrame.classList.remove("hidden");
    launchConfettiBurst(80);
  }

  // Interactive Action Button Click Router
  actionBtn.addEventListener("click", () => {
    initAudioContext();
    if (currentStage === 0) {
      goToEmptyRoom();
    } else if (currentStage === 1) {
      goToHallway();
    } else if (currentStage === 2) {
      goToGiftRoom();
    } else if (currentStage === 3) {
      triggerCelebration();
    }
  });

  // Card Controls: Blow Candles
  const blowBtn = document.getElementById("blow-candles-btn");
  blowBtn.addEventListener("click", () => {
    const flames = document.querySelectorAll(".flame");
    flames.forEach(f => f.classList.toggle("blown-out"));
    const isBlown = flames[0] && flames[0].classList.contains("blown-out");
    blowBtn.textContent = isBlown ? "🔥 Relight Candles" : "🎂 Blow Candles";
    if (isBlown) {
      launchConfettiBurst(100);
      playSynthTone(587, "sine", 0.4);
    }
  });

  // Card Controls: More Confetti
  document.getElementById("confetti-btn").addEventListener("click", () => {
    launchConfettiBurst(120);
    playSynthTone(784, "triangle", 0.2);
  });

  // Card Controls: Replay Story
  document.getElementById("replay-btn").addEventListener("click", () => {
    if (audioHbd) audioHbd.pause();
    sceneCelebration.classList.add("hidden");
    cardFrame.classList.remove("hidden");
    scrollFrame.classList.add("hidden");
    sceneDarkroom.classList.remove("hidden");
    startDarkroomScene();
  });

  // 4. Confetti Physics Engine
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let confettiAnimationId = null;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  const colors = ["#ff4081", "#ffd700", "#00e5ff", "#76ff03", "#e040fb", "#ff9100", "#ffffff"];

  class ConfettiParticle {
    constructor(x, y, isBurst = false) {
      this.x = x || Math.random() * canvas.width;
      this.y = y || (isBurst ? canvas.height * 0.6 : -10);
      this.size = Math.random() * 8 + 5;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.speedY = isBurst ? (Math.random() * -14 - 4) : (Math.random() * 3 + 2);
      this.speedX = isBurst ? (Math.random() * 12 - 6) : (Math.random() * 2 - 1);
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 10 - 5;
      this.wobble = Math.random() * 10;
      this.gravity = isBurst ? 0.35 : 0.05;
      this.shape = Math.random() > 0.3 ? "rect" : "circle";
    }

    update() {
      this.speedY += this.gravity;
      this.x += this.speedX + Math.sin(this.wobble) * 0.5;
      this.y += this.speedY;
      this.wobble += 0.05;
      this.rotation += this.rotationSpeed;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.fillStyle = this.color;
      if (this.shape === "rect") {
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function launchConfettiBurst(count) {
    for (let i = 0; i < count; i++) {
      particles.push(new ConfettiParticle(canvas.width / 2, canvas.height * 0.55, true));
    }
  }

  function startContinuousConfetti() {
    if (confettiAnimationId) return;

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (currentStage === 4 && particles.length < 90 && Math.random() < 0.3) {
        particles.push(new ConfettiParticle());
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        if (p.y > canvas.height + 20) {
          particles.splice(i, 1);
        }
      }

      confettiAnimationId = requestAnimationFrame(loop);
    }
    loop();
  }

  // Start the experience!
  startDarkroomScene();
});
