<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { TresCanvas } from '@tresjs/core';

type GameState = 'PLAYING' | 'JUMPING_UP' | 'WAITING_FOR_INPUT' | 'GAME_OVER';

interface Position {
  x: number;
  y: number;
  height: number;
}

// --- CONFIG ---
const boardSize = 20;
const platformHeight = 5;
const moveIntervalSec = 0.18;
const cameraSmoothFactor = 0.05;

// --- STATE JEU ---
const gameState = ref<GameState>('GAME_OVER');
const snake = ref<Position[]>([]);
let prevSnake: Position[] = [];
const moveProgress = ref(0);

const food = ref<{ x: number; y: number, h: number }>({ x: 5, y: 5, h: 0 });
const direction = ref({ x: 0, y: -1 });
const queuedDir = ref<{ x: number; y: number } | null>(null);
const score = ref(0);
const highScore = ref(0);

const advancedMode = computed(() => score.value >= 50);

// --- BOUCLE ---
let frameLoopId: number | null = null;
let lastFrameTime = performance.now();
let moveAccumulator = 0;

// --- STATE CAMERA ---
const cameraPosition = ref<[number, number, number]>([10, 55, 55]);
const cameraTarget = ref<[number, number, number]>([10, 0, 10]);

// --- AUDIO ---
let audioCtx: AudioContext | null = null;
const initAudio = () => {
  if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  else if (audioCtx.state === 'suspended') audioCtx.resume();
};

const playSound = (type: 'laser' | 'jump_up' | 'jump_land' | 'dead') => {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain); gain.connect(audioCtx.destination);

  if (type === 'jump_up') {
    osc.type = 'triangle'; osc.frequency.setValueAtTime(200, audioCtx.currentTime); osc.frequency.linearRampToValueAtTime(600, audioCtx.currentTime + 0.4);
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime); gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
    osc.start(); osc.stop(audioCtx.currentTime + 0.4);
  } else if (type === 'jump_land') {
    osc.type = 'square'; osc.frequency.setValueAtTime(500, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.4, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
    osc.start(); osc.stop(audioCtx.currentTime + 0.15);
  } else if (type === 'dead') {
    osc.type = 'sawtooth'; osc.frequency.setValueAtTime(200, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.5);
    gain.gain.setValueAtTime(0.6, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
    osc.start(); osc.stop(audioCtx.currentTime + 0.5);
  } else {
    osc.type = 'square'; osc.frequency.setValueAtTime(700, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(1400, audioCtx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.25, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    osc.start(); osc.stop(audioCtx.currentTime + 0.1);
  }
};

// --- HIGH SCORE ---
const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};
const setCookie = (name: string, value: string, days: number) => {
  const d = new Date(); d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = name + "=" + value + ";" + "expires=" + d.toUTCString() + ";path=/";
};
const updateHighScore = () => {
  if (score.value > highScore.value) {
    highScore.value = score.value;
    setCookie('highestScore', highScore.value.toString(), 365);
  }
};

// --- MAP ---
const generateLShapes = () => {
  const blocks: { x: number; y: number }[] = [];
  for (let x = -3; x <= -1; x++) for (let y = -3; y <= 5; y++) blocks.push({ x, y });
  for (let x = 0; x <= 5; x++) for (let y = -3; y <= -1; y++) blocks.push({ x, y });
  for (let x = 20; x <= 22; x++) for (let y = -3; y <= 5; y++) blocks.push({ x, y });
  for (let x = 14; x <= 19; x++) for (let y = -3; y <= -1; y++) blocks.push({ x, y });
  for (let x = -3; x <= -1; x++) for (let y = 14; y <= 22; y++) blocks.push({ x, y });
  for (let x = 0; x <= 5; x++) for (let y = 20; y <= 22; y++) blocks.push({ x, y });
  for (let x = 20; x <= 22; x++) for (let y = 14; y <= 22; y++) blocks.push({ x, y });
  for (let x = 14; x <= 19; x++) for (let y = 20; y <= 22; y++) blocks.push({ x, y });
  return blocks;
};
const lShapePlatforms = generateLShapes();
const visualLShapes = computed(() => lShapePlatforms);
const isPlatform = (x: number, y: number) => lShapePlatforms.some((p) => p.x === x && p.y === y);
const isMainBoard = (x: number, y: number) => x >= 0 && x < boardSize && y >= 0 && y < boardSize;
const getGroundHeightAt = (x: number, y: number) => {
  if (advancedMode.value && isPlatform(x, y)) return platformHeight;
  if (isMainBoard(x, y)) return 0;
  return -999;
};

// --- SNAKE RENDU ---
const renderSnake = computed(() => {
  const t = moveProgress.value;
  return snake.value.map((seg, i) => {
    const prev = prevSnake[i] ?? seg;
    return {
      x: prev.x + (seg.x - prev.x) * t,
      y: prev.y + (seg.y - prev.y) * t,
      height: prev.height + (seg.height - prev.height) * t,
    };
  });
});
const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

const updateCameraSmooth = (forceSnap = false) => {
  const rs = renderSnake.value;
  if (!rs.length) return;
  const followIndex = Math.min(2, rs.length - 1);
  const followSeg = rs[followIndex];
  const head = rs[0];
  const baseX = followSeg.x + 0.5;
  const baseZ = followSeg.y + 0.5;
  const baseY = followSeg.height + 1.0;
  const dirX = direction.value.x;
  const dirY = direction.value.y;
  const targetCamX = baseX - dirX * 6;
  const targetCamY = baseY + 4;
  const targetCamZ = baseZ - dirY * 6;
  const targetLookX = head.x + 0.5;
  const targetLookY = head.height + 0.5;
  const targetLookZ = head.y + 0.5;

  if (forceSnap) {
    cameraPosition.value = [targetCamX, targetCamY, targetCamZ];
    cameraTarget.value = [targetLookX, targetLookY, targetLookZ];
  } else {
    cameraPosition.value = [
      lerp(cameraPosition.value[0], targetCamX, cameraSmoothFactor),
      lerp(cameraPosition.value[1], targetCamY, cameraSmoothFactor),
      lerp(cameraPosition.value[2], targetCamZ, cameraSmoothFactor),
    ];
    cameraTarget.value = [
      lerp(cameraTarget.value[0], targetLookX, cameraSmoothFactor),
      lerp(cameraTarget.value[1], targetLookY, cameraSmoothFactor),
      lerp(cameraTarget.value[2], targetLookZ, cameraSmoothFactor),
    ];
  }
};

// --- GAME LOGIC ---
const setGameOver = () => {
  if (gameState.value === 'GAME_OVER') return;
  playSound('dead');
  gameState.value = 'GAME_OVER';
  updateHighScore();
  if (frameLoopId !== null) window.clearInterval(frameLoopId);
  frameLoopId = null;
};

const spawnFood = () => {
  while (true) {
    const x = Math.floor(Math.random() * 30) - 5;
    const y = Math.floor(Math.random() * 30) - 5;
    const onMainBoard = isMainBoard(x, y);
    const onPlatform = isPlatform(x, y);
    let isValidSpot = false;
    let spawnH = 0;
    if (onMainBoard) { isValidSpot = true; spawnH = 0; }
    else if (advancedMode.value && onPlatform) { isValidSpot = true; spawnH = platformHeight; }

    if (isValidSpot) {
      const isJumper = (x===0&&y===0)||(x===19&&y===0)||(x===0&&y===19)||(x===19&&y===19);
      const onSnake = snake.value.some((s) => s.x === x && s.y === y && Math.abs(s.height - spawnH) < 0.5);
      if (!isJumper && !onSnake) { food.value = { x, y, h: spawnH }; return; }
    }
  }
};

// MODIFICATION ICI : RELOAD PAGE AU LIEU DE RESET
const startGame = () => {
  if (gameState.value === 'GAME_OVER' && snake.value.length > 0) {
    window.location.reload();
    return;
  }

  initAudio();
  snake.value = [
    { x: 10, y: 10, height: 0 },
    { x: 10, y: 11, height: 0 },
    { x: 10, y: 12, height: 0 },
  ];
  prevSnake = snake.value.map((s) => ({ ...s }));
  direction.value = { x: 0, y: -1 };
  queuedDir.value = null;
  score.value = 0;
  gameState.value = 'PLAYING';
  spawnFood();
  lastFrameTime = performance.now();
  moveAccumulator = 0;
  moveProgress.value = 0;
  updateCameraSmooth(true);
  if (frameLoopId !== null) window.clearInterval(frameLoopId);
  frameLoopId = window.setInterval(frameLoop, 1000 / 60);
};

const advanceOneStep = () => {
  if (gameState.value !== 'PLAYING') return;
  const head = snake.value[0];
  if (queuedDir.value) {
    direction.value = queuedDir.value;
    queuedDir.value = null;
  }
  prevSnake = snake.value.map((s) => ({ ...s }));
  let nextX = head.x + direction.value.x;
  let nextY = head.y + direction.value.y;
  let nextH = head.height;
  const groundH = getGroundHeightAt(nextX, nextY);

  if (groundH > nextH + 0.5) return setGameOver();

  if (nextH > groundH) {
    const potentialH = nextH - 1.5;
    if (potentialH <= groundH) {
      nextH = groundH;
      if (advancedMode.value && groundH === 0) {
        const isJumper = (nextX===0&&nextY===0)||(nextX===19&&nextY===0)||(nextX===0&&nextY===19)||(nextX===19&&nextY===19);
        if (isJumper) return setGameOver();
      }
    } else {
      nextH = potentialH;
    }
  } else if (nextH < groundH) {
    nextH = groundH;
  }

  if (nextH < -15) return setGameOver();
  if (head.height < -2) { nextX = head.x; nextY = head.y; }

  if (advancedMode.value && Math.abs(nextH) < 0.1 && isMainBoard(nextX, nextY)) {
    const isJumper = (nextX===0&&nextY===0)||(nextX===19&&nextY===0)||(nextX===0&&nextY===19)||(nextX===19&&nextY===19);
    if (isJumper) {
      playSound('jump_up');
      gameState.value = 'JUMPING_UP';
      snake.value.unshift({ x: nextX, y: nextY, height: 0 });
      snake.value.pop();
      moveProgress.value = 0;
      prevSnake = snake.value.map((s) => ({ ...s }));
      return;
    }
  }

  if (snake.value.some(s => s.x === nextX && s.y === nextY && Math.abs(s.height - nextH) < 0.5)) {
    return setGameOver();
  }

  const newHead = { x: nextX, y: nextY, height: nextH };
  snake.value.unshift(newHead);

  if (nextX === food.value.x && nextY === food.value.y && Math.abs(nextH - food.value.h) < 0.5) {
    score.value += 10;
    spawnFood();
    playSound('laser');
  } else {
    snake.value.pop();
  }
};

const frameLoop = () => {
  const now = performance.now();
  const delta = (now - lastFrameTime) / 1000;
  lastFrameTime = now;
  if (gameState.value === 'JUMPING_UP') {
    const head = snake.value[0];
    const step = (platformHeight / 0.25) * delta;
    const nh = { ...head, height: head.height + step };
    if (nh.height >= platformHeight) {
      nh.height = platformHeight;
      snake.value[0] = nh;
      gameState.value = 'WAITING_FOR_INPUT';
      playSound('jump_land');
    } else {
      snake.value[0] = nh;
    }
  }
  if (gameState.value === 'PLAYING') {
    moveAccumulator += delta;
    while (moveAccumulator >= moveIntervalSec) {
      moveAccumulator -= moveIntervalSec;
      advanceOneStep();
    }
    moveProgress.value = moveAccumulator / moveIntervalSec;
  } else {
    moveProgress.value = 0;
  }
  updateCameraSmooth(false);
};

const handleKeydown = (e: KeyboardEvent) => {
  const key = e.key;
  const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  if (!keys.includes(key)) return;
  e.preventDefault();
  if (gameState.value === 'GAME_OVER') return;
  const currentDir = direction.value;
  const turnLeft = (d: { x: number; y: number }) => ({ x: d.y, y: -d.x });
  const turnRight = (d: { x: number; y: number }) => ({ x: -d.y, y: d.x });
  let wantedDir = { ...currentDir };
  if (key === 'ArrowLeft') wantedDir = turnLeft(currentDir);
  else if (key === 'ArrowRight') wantedDir = turnRight(currentDir);
  else if (key === 'ArrowUp') wantedDir = currentDir;
  else if (key === 'ArrowDown') return;
  if (gameState.value === 'WAITING_FOR_INPUT') {
    const head = snake.value[0];
    const landX = head.x + wantedDir.x * 2;
    const landY = head.y + wantedDir.y * 2;
    prevSnake = snake.value.map((s) => ({ ...s }));
    snake.value[0] = { x: landX, y: landY, height: platformHeight };
    direction.value = wantedDir;
    gameState.value = 'PLAYING';
    moveAccumulator = 0;
    moveProgress.value = 0;
    playSound('jump_land');
    return;
  }
  if (gameState.value === 'PLAYING') {
    if (wantedDir.x === -direction.value.x && wantedDir.y === -direction.value.y) return;
    queuedDir.value = wantedDir;
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  const savedScore = getCookie('highestScore');
  if (savedScore) {
    highScore.value = parseInt(savedScore, 10);
  } else {
    setCookie('highestScore', '0', 365);
    highScore.value = 0;
  }
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  if (frameLoopId !== null) window.clearInterval(frameLoopId);
});
</script>

<template>
  <div class="game-wrapper">
    <div class="ui-layer">
      <h2>Snake 3D: Force Reload</h2>
      <div class="score-board">
        <div class="score">Score: {{ score }}</div>
        <div class="high-score">Best: {{ highScore }}</div>
      </div>
      <div v-if="gameState === 'WAITING_FOR_INPUT'" class="status jump">
        Choisis ta direction ! ⬅️➡️⬆️
      </div>
      <div v-if="gameState === 'GAME_OVER'" class="status lost">
        GAME OVER
      </div>
      <button @click="startGame">
        {{ gameState === 'GAME_OVER' ? 'Rejouer' : 'Restart' }}
      </button>
      <div class="controls-hint">
        ⬆️ tout droit • ⬅️ / ➡️ tournent par rapport à la tête
      </div>
    </div>

    <TresCanvas window-size clear-color="#111" shadows>
      <TresPerspectiveCamera :position="cameraPosition" :look-at="cameraTarget" />
      <TresAmbientLight :intensity="0.7" />
      <TresDirectionalLight :position="[5, 20, 5]" :intensity="1.5" cast-shadow />

      <TresMesh
        v-for="n in boardSize * boardSize"
        :key="`floor-${n}`"
        :position="[((n-1)%boardSize)+0.5, -0.55, Math.floor((n-1)/boardSize)+0.5]"
        receive-shadow
      >
        <TresBoxGeometry :args="[0.95, 1, 0.95]" />
        <TresMeshStandardMaterial
          :color="((((n-1)%boardSize)+Math.floor((n-1)/boardSize))%2===0)?'#222':'#333'"
        />
      </TresMesh>

      <template v-if="advancedMode">
        <TresMesh :position="[0.5, -0.4, 0.5]"><TresBoxGeometry :args="[0.9, 1.2, 0.9]" /><TresMeshStandardMaterial color="#0f0" emissive="#0f0" /></TresMesh>
        <TresMesh :position="[19.5, -0.4, 0.5]"><TresBoxGeometry :args="[0.9, 1.2, 0.9]" /><TresMeshStandardMaterial color="#0f0" emissive="#0f0" /></TresMesh>
        <TresMesh :position="[0.5, -0.4, 19.5]"><TresBoxGeometry :args="[0.9, 1.2, 0.9]" /><TresMeshStandardMaterial color="#0f0" emissive="#0f0" /></TresMesh>
        <TresMesh :position="[19.5, -0.4, 19.5]"><TresBoxGeometry :args="[0.9, 1.2, 0.9]" /><TresMeshStandardMaterial color="#0f0" emissive="#0f0" /></TresMesh>
      </template>

      <TresMesh
        v-for="(b, i) in visualLShapes"
        v-if="advancedMode"
        :key="`plat-${i}`"
        :position="[b.x+0.5, (platformHeight/2)-0.5, b.y+0.5]"
        receive-shadow
      >
        <TresBoxGeometry :args="[0.95, platformHeight, 0.95]" />
        <TresMeshStandardMaterial color="#555" />
      </TresMesh>

      <TresMesh
        v-for="(segment, i) in renderSnake"
        :key="`snake-${i}`"
        :position="[segment.x+0.5, 0.45 + segment.height, segment.y+0.5]"
        cast-shadow
      >
        <TresBoxGeometry :args="[0.9, 0.9, 0.9]" />
        <TresMeshStandardMaterial :color="i === 0 ? '#42b883' : '#35495e'" />
      </TresMesh>

      <TresMesh :position="[food.x+0.5, 0.45 + food.h, food.y+0.5]" cast-shadow>
        <TresSphereGeometry :args="[0.4]" />
        <TresMeshStandardMaterial color="#e74c3c" emissive="#f00" :emissive-intensity="0.6" />
      </TresMesh>
    </TresCanvas>
  </div>
</template>

<style scoped>
.game-wrapper {
  width: 100%;
  height: 100vh;
  background: #000;
  overflow: hidden;
  font-family: "Courier New", monospace;
}
.ui-layer {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 100;
  color: white;
  background: rgba(0, 0, 0, 0.85);
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #444;
  min-width: 240px;
}
.score-board { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.score { font-size: 1.3em; color: #0ff; }
.high-score { font-size: 1.1em; color: #fb0; font-weight: bold; }
.status { font-weight: bold; margin: 10px 0; font-size: 1.4em; text-align: center; }
.status.lost { color: #ff3bff; text-shadow: 0 0 10px #ff3bff; }
.status.jump { color: #00ffff; animation: pulse 0.5s infinite alternate; }
.controls-hint { margin-top: 15px; font-size: 0.9em; color: #ccc; text-align: center; border-top: 1px solid #666; padding-top: 10px; }
button { width: 100%; background: #42b883; border: none; padding: 10px 20px; color: white; font-weight: bold; cursor: pointer; font-size: 1.1em; margin-top: 8px; }
button:hover { filter: brightness(1.15); }
@keyframes pulse { from { opacity: 1; transform: scale(1); } to { opacity: 0.7; transform: scale(1.05); } }
</style>
