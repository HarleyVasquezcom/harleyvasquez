import type { CSSProperties, ReactNode } from 'react';
import type { ProjectConfig, ProjectTone } from '@/lib/config';

const PROJECT_COLORS: Record<string, { main: string; deep: string; soft: string; bright: string }> = {
  'aurora-sky': { main: '#34d399', deep: '#10b981', soft: '#22d3ee', bright: '#f472b6' },
  'crypto-dashboard': { main: '#22d3ee', deep: '#0891b2', soft: '#34d399', bright: '#a78bfa' },
  'json-launder': { main: '#10b981', deep: '#059669', soft: '#6ee7b7', bright: '#f87171' },
  'neural-glow': { main: '#22d3ee', deep: '#0891b2', soft: '#34d399', bright: '#a78bfa' },
  'palette-loom': { main: '#d946ef', deep: '#a21caf', soft: '#f0abfc', bright: '#fafafa' },
  'pomodoro-ember': { main: '#f97316', deep: '#ea580c', soft: '#fdba74', bright: '#fafafa' },
  'type-racer': { main: '#22d3ee', deep: '#0891b2', soft: '#34d399', bright: '#f87171' },
  'kanban-board': { main: '#22d3ee', deep: '#0891b2', soft: '#e879f9', bright: '#fbbf24' },
  'ledger-app': { main: '#0b9e86', deep: '#7c5cd6', soft: '#0ea47a', bright: '#f1f5f9' },
  'notes-vault': { main: '#8e2f3b', deep: '#7a2730', soft: '#23201c', bright: '#faf7f0' },
  'audio-spectrum': { main: '#00f0ff', deep: '#7b2bff', soft: '#ff2ec4', bright: '#e0e7ff' },
  'message-threads': { main: '#c4633a', deep: '#8a6b4e', soft: '#3b3226', bright: '#fbf8f1' },
  'recipe-book': { main: '#c4633a', deep: '#b5651d', soft: '#4a332b', bright: '#fbf6ee' },
  'travel-planner': { main: '#ffc107', deep: '#111111', soft: '#9ca3af', bright: '#ffffff' },
  'corporate-site': { main: '#38bdf8', deep: '#0369a1', soft: '#7dd3fc', bright: '#f0f9ff' },
  'online-store': { main: '#fbbf24', deep: '#b45309', soft: '#fde68a', bright: '#fffbeb' },
  'tech-blog': { main: '#10b981', deep: '#065f46', soft: '#6ee7b7', bright: '#ecfdf5' },
  'artist-portfolio': { main: '#f472b6', deep: '#be185d', soft: '#fbcfe8', bright: '#fdf2f8' },
  'landing-page': { main: '#a78bfa', deep: '#6d28d9', soft: '#c4b5fd', bright: '#f5f3ff' },
  'microsite': { main: '#fb923c', deep: '#c2410c', soft: '#fdba74', bright: '#fff7ed' },
  'web-app': { main: '#22d3ee', deep: '#0e7490', soft: '#a5f3fc', bright: '#ecfeff' },
  'sentinel-systems': { main: '#38bdf8', deep: '#0369a1', soft: '#7dd3fc', bright: '#f0f9ff' },
  'vigil-store': { main: '#fbbf24', deep: '#b45309', soft: '#fde68a', bright: '#fffbeb' },
  'cctv-blog': { main: '#10b981', deep: '#065f46', soft: '#6ee7b7', bright: '#ecfdf5' },
  'cams-portfolio': { main: '#f472b6', deep: '#be185d', soft: '#fbcfe8', bright: '#fdf2f8' },
  'security-audit': { main: '#a78bfa', deep: '#6d28d9', soft: '#c4b5fd', bright: '#f5f3ff' },
  'cam-launch': { main: '#fb923c', deep: '#c2410c', soft: '#fdba74', bright: '#fff7ed' },
  'cam-command': { main: '#22d3ee', deep: '#0e7490', soft: '#a5f3fc', bright: '#ecfeff' },
  'barker-modern': { main: '#f8a438', deep: '#d97706', soft: '#fcd34d', bright: '#fff7ed' },
  'vettaz': { main: '#22d3ee', deep: '#0891b2', soft: '#67e8f9', bright: '#f0f9ff' },
};

const TONE_COLORS: Record<ProjectTone, { main: string; deep: string; soft: string; bright: string }> = {
  emerald: { main: '#34d399', deep: '#10b981', soft: '#a7f3d0', bright: '#ecfdf5' },
  cyan: { main: '#22d3ee', deep: '#06b6d4', soft: '#a5f3fc', bright: '#f0fdff' },
  metal: { main: '#e4e4e7', deep: '#a1a1aa', soft: '#fafafa', bright: '#ffffff' },
};

type SceneProps = { c: { main: string; deep: string; soft: string; bright: string } };

function auroraSky({ c }: SceneProps) {
  const stars: Array<[number, number, number]> = [
    [36, 22, 1.6], [96, 14, 1], [142, 38, 1.2], [206, 18, 1], [262, 30, 1.6],
    [318, 12, 1], [372, 26, 1.2], [58, 54, 1], [230, 52, 1.4], [330, 48, 1],
    [122, 66, 1.2], [286, 64, 1], [404, 20, 1.4],
  ];
  return (
    <g>
      {stars.map(([x, y, r], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={r}
          fill={i % 4 === 0 ? c.bright : c.soft}
          style={{ animation: `pca-star ${1.7 + (i % 4) * 0.4}s ease-in-out ${i * 0.25}s infinite` }}
        />
      ))}
      <g style={{ animation: 'pca-drift 6.5s ease-in-out infinite' }}>
        <path d="M-20 96 C 60 40, 140 116, 220 78 C 300 42, 360 100, 430 84 L430 140 L-20 140 Z" fill={c.main} opacity={0.6} />
      </g>
      <g style={{ animation: 'pca-drift 8.4s ease-in-out 1s infinite' }}>
        <path d="M-20 112 C 70 60, 160 128, 250 96 C 320 72, 380 116, 430 104 L430 140 L-20 140 Z" fill={c.soft} opacity={0.45} />
      </g>
      <g style={{ animation: 'pca-drift 7s ease-in-out 2.1s infinite' }}>
        <path d="M-20 124 C 90 86, 170 134, 260 110 C 330 90, 390 122, 430 116 L430 140 L-20 140 Z" fill={c.deep} opacity={0.75} />
      </g>
    </g>
  );
}

function cryptoDashboard({ c }: SceneProps) {
  const candles: Array<[number, number, number, boolean]> = [
    [58, 44, 18, true], [92, 56, 14, false], [126, 38, 20, true],
    [160, 62, 12, false], [194, 46, 18, true], [228, 52, 16, false],
    [262, 34, 22, true],
  ];
  return (
    <g>
      <g stroke={c.deep} strokeWidth={1} opacity={0.4}>
        {[20, 34, 48, 62, 76, 90, 104].map((y) => (
          <line key={y} x1={40} y1={y} x2={368} y2={y} />
        ))}
      </g>
      {candles.map(([x, y, h, up], i) => (
        <g key={i} style={{ animation: `pca-fade ${2.1 + (i % 3) * 0.5}s ease-in-out ${i * 0.2}s infinite` }}>
          <rect x={x + 8} y={y} width={2} height={h} fill={c.deep} opacity={0.9} />
          <rect x={x} y={up ? y + h - 10 : y} width={16} height={10} rx={2} fill={up ? c.soft : c.deep} />
        </g>
      ))}
      <path
        d="M46 86 L70 74 L96 80 L122 60 L150 66 L176 46 L202 54 L228 36 L254 48 L282 30 L308 40 L334 24 L364 34"
        fill="none"
        stroke={c.main}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={100}
        strokeDasharray={100}
        style={{ animation: 'pca-draw 3.5s ease-in-out infinite' }}
      />
      <circle cx={364} cy={34} r={4} fill={c.bright} style={{ animation: 'pca-fade 1.1s ease-in-out infinite' }} />
    </g>
  );
}

function jsonLaunder({ c }: SceneProps) {
  return (
    <g>
      <path d="M52 30 q-14 0 -14 14 q0 12 -10 16 q10 4 10 16 q0 14 14 14" fill="none" stroke={c.bright} strokeWidth={4} strokeLinecap="round" />
      <path d="M70 34 q14 0 14 14 q0 12 10 16 q-10 4 -10 16 q0 14 -14 14" fill="none" stroke={c.main} strokeWidth={4} strokeLinecap="round" />
      {[
        [120, 44, 150, c.main], [122, 60, 210, c.bright], [118, 76, 130, c.deep], [124, 92, 180, c.soft],
      ].map(([x, y, w, fill], i) => (
        <rect key={i} x={x as number} y={y as number} width={w as number} height={8} rx={4} fill={fill as string} opacity={0.9} style={{ animation: `pca-line ${2.1 + i * 0.35}s ease-in-out ${i * 0.3}s infinite` }} />
      ))}
      <rect x={330} y={36} width={14} height={6} rx={2} fill={c.deep} style={{ animation: 'pca-float 1.7s ease-in-out infinite' }} />
      <rect x={330} y={50} width={14} height={6} rx={2} fill={c.main} opacity={0.8} style={{ animation: 'pca-float 1.7s ease-in-out 0.15s infinite' }} />
      <rect x={330} y={64} width={14} height={6} rx={2} fill={c.soft} opacity={0.6} style={{ animation: 'pca-float 1.7s ease-in-out 0.3s infinite' }} />
      <rect x={318} y={88} width={3} height={16} rx={1.5} fill={c.bright} style={{ animation: 'pca-caret 0.8s steps(1) infinite' }} />
    </g>
  );
}

function neuralGlow({ c }: SceneProps) {
  const nodes: Array<[number, number]> = [[64, 44], [128, 74], [196, 38], [248, 82], [316, 52], [164, 100]];
  const edges: Array<[number, number]> = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [1, 5], [2, 5], [3, 5]];
  return (
    <g>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke={i % 3 === 0 ? c.soft : c.main}
          strokeWidth={1.5}
          opacity={0.6}
          style={{ animation: `pca-fade ${1.9 + (i % 2) * 0.5}s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={11} fill="none" stroke={c.bright} strokeWidth={2} style={{ animation: `pca-pulse ${2 + i * 0.2}s ease-out ${i * 0.3}s infinite`, transformBox: 'fill-box', transformOrigin: 'center' }} />
          <circle cx={x} cy={y} r={4.5} fill={i % 2 === 0 ? c.main : c.soft} />
          <circle cx={x} cy={y} r={1.8} fill={c.bright} />
        </g>
      ))}
    </g>
  );
}

function paletteLoom({ c }: SceneProps) {
  const swatches: Array<{ x: number; anim: string }> = [
    { x: 56, anim: 'pca-sw1 2.2s ease-in-out infinite' },
    { x: 122, anim: 'pca-sw2 2.5s ease-in-out 0.3s infinite' },
    { x: 188, anim: 'pca-sw3 2.1s ease-in-out 0.6s infinite' },
    { x: 254, anim: 'pca-sw4 2.4s ease-in-out 0.9s infinite' },
    { x: 320, anim: 'pca-sw5 2.7s ease-in-out 1.1s infinite' },
  ];
  return (
    <g>
      {swatches.map(({ x, anim }, i) => (
        <g key={i}>
          <rect x={x} y={30} width={28} height={58} rx={6} style={{ animation: anim }} />
          <rect x={x} y={30} width={28} height={58} rx={6} fill="none" stroke={c.bright} strokeWidth={1.5} opacity={0.8} />
          <circle cx={x + 14} cy={44} r={2.5} fill={c.bright} style={{ animation: `pca-caret 1.4s steps(1) ${i * 0.2}s infinite` }} />
        </g>
      ))}
      <rect x={38} y={26} width={326} height={66} rx={10} fill="none" stroke={c.soft} strokeWidth={1.5} opacity={0.6} strokeDasharray="4 5" />
    </g>
  );
}

function pomodoroEmber({ c }: SceneProps) {
  const embers: Array<[number, number]> = [[186, 104], [200, 106], [214, 103], [194, 108], [206, 105]];
  return (
    <g>
      <circle cx={200} cy={56} r={34} fill="none" stroke={c.deep} strokeWidth={7} opacity={0.6} />
      <circle
        cx={200}
        cy={56}
        r={34}
        fill="none"
        stroke={c.main}
        strokeWidth={7}
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray="72 28"
        style={{ animation: 'pca-progress 5.6s linear infinite' }}
      />
      <text x={200} y={62} textAnchor="middle" fontSize={16} fontFamily="monospace" fill={c.bright} style={{ animation: 'pca-caret 1.4s steps(1) infinite' }}>
        25:00
      </text>
      {embers.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2.4} fill={i % 2 === 0 ? c.main : c.bright} style={{ animation: `pca-rise ${1.8 + i * 0.35}s ease-out ${i * 0.3}s infinite` }} />
      ))}
    </g>
  );
}

function typeRacer({ c }: SceneProps) {
  const chars = [
    ['t', c.soft], ['h', c.soft], ['e', c.main], [' ', c.deep], ['q', c.main], ['u', c.main],
    ['i', c.soft], ['c', c.main], ['k', c.bright], [' ', c.deep], ['b', c.main], ['r', c.main],
    ['o', c.soft], ['w', c.main], ['n', c.soft], [' ', c.deep], ['f', c.soft], ['o', c.soft],
    ['x', c.deep], [' ', c.deep], ['j', c.main], ['u', c.main], ['m', c.bright], ['p', c.soft],
  ];
  return (
    <g>
      <rect x={44} y={30} width={316} height={52} rx={10} fill="rgba(0,0,0,0.45)" />
      <rect x={44} y={30} width={316} height={52} rx={10} fill="none" stroke={c.main} strokeWidth={1.5} opacity={0.7} />
      <text x={60} y={62} fontSize={19} fontFamily="monospace" fill={c.bright} letterSpacing={2}>
        {chars.map(([ch, fill], i) => (
          <tspan key={i} fill={fill}>{ch}</tspan>
        ))}
      </text>
      <rect x={60} y={70} width={2.5} height={20} fill={c.bright} style={{ animation: 'pca-caret 0.65s steps(1) infinite' }} />
      <rect x={60} y={96} width={180} height={5} rx={2.5} fill={c.deep} opacity={0.7} />
      <rect x={60} y={96} width={180} height={5} rx={2.5} fill={c.main} opacity={0.95} style={{ animation: 'pca-progress 4.2s linear infinite' }} />
    </g>
  );
}

function kanbanBoard({ c }: SceneProps) {
  const cols = [60, 176, 292];
  return (
    <g>
      {cols.map((x, i) => (
        <g key={i}>
          <rect x={x} y={24} width={96} height={86} rx={9} fill="rgba(0,0,0,0.45)" />
          <rect x={x} y={24} width={96} height={86} rx={9} fill="none" stroke={c.deep} strokeWidth={1.5} opacity={0.7} />
          <rect x={x + 10} y={34} width={34} height={6} rx={3} fill={i === 0 ? c.main : c.deep} opacity={0.9} />
        </g>
      ))}
      <g style={{ animation: 'pca-float 2.4s ease-in-out infinite' }}>
        <rect x={70} y={50} width={76} height={16} rx={4} fill={c.main} opacity={0.9} />
        <rect x={70} y={72} width={76} height={12} rx={4} fill={c.deep} opacity={0.7} />
      </g>
      <g style={{ animation: 'pca-sway 2.9s ease-in-out 0.4s infinite' }}>
        <rect x={186} y={52} width={76} height={16} rx={4} fill={c.bright} opacity={0.85} />
        <rect x={186} y={74} width={76} height={12} rx={4} fill={c.main} opacity={0.7} />
      </g>
      <rect x={302} y={54} width={76} height={16} rx={4} fill={c.deep} opacity={0.85} style={{ animation: 'pca-fade 2.1s ease-in-out 0.8s infinite' }} />
      <rect x={302} y={76} width={76} height={12} rx={4} fill={c.soft} opacity={0.6} />
    </g>
  );
}

function ledgerApp({ c }: SceneProps) {
  const bars: Array<[number, number]> = [[136, 46], [158, 64], [180, 38], [202, 56], [224, 30], [246, 50]];
  return (
    <g>
      <circle cx={96} cy={66} r={34} fill="none" stroke={c.deep} strokeWidth={9} opacity={0.6} />
      <circle
        cx={96}
        cy={66}
        r={34}
        fill="none"
        stroke={c.main}
        strokeWidth={9}
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray="62 38"
        transform="rotate(-90 96 66)"
        style={{ animation: 'pca-progress 4.2s ease-in-out infinite' }}
      />
      <text x={96} y={71} textAnchor="middle" fontSize={13} fontFamily="monospace" fill={c.bright}>$4.2k</text>
      {bars.map(([x, h], i) => (
        <rect
          key={i}
          x={x}
          y={40}
          width={15}
          height={h}
          rx={3}
          fill={i % 3 === 0 ? c.bright : c.main}
          opacity={0.95}
          style={{ animation: `pca-bar ${1.7 + (i % 3) * 0.35}s ease-in-out ${i * 0.16}s infinite`, transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      ))}
      <line x1={120} y1={100} x2={276} y2={100} stroke={c.deep} strokeWidth={1.5} opacity={0.6} />
    </g>
  );
}

function notesVault({ c }: SceneProps) {
  return (
    <g>
      <rect x={96} y={24} width={212} height={88} rx={10} fill={c.bright} />
      <rect x={96} y={24} width={212} height={88} rx={10} fill="none" stroke={c.main} strokeWidth={2} />
      <rect x={108} y={38} width={72} height={7} rx={3.5} fill={c.main} opacity={0.95} />
      {[54, 66, 78, 90].map((y, i) => (
        <rect key={i} x={108} y={y} width={132 - i * 26} height={5} rx={2.5} fill={c.deep} opacity={0.55} />
      ))}
      <rect x={292} y={26} width={14} height={30} rx={4} fill={c.deep} opacity={0.9} />
      <rect x={300} y={50} width={2.5} height={14} rx={1.25} fill={c.deep} opacity={0.7} />
      <rect x={254} y={70} width={3} height={16} rx={1.5} fill={c.soft} style={{ animation: 'pca-caret 0.8s steps(1) infinite' }} />
      <circle cx={150} cy={32} r={5} fill={c.main} opacity={0.5} style={{ animation: 'pca-pulse 1.7s ease-out infinite', transformBox: 'fill-box', transformOrigin: 'center' }} />
    </g>
  );
}

function audioSpectrum({ c }: SceneProps) {
  const bars = [42, 58, 74, 90, 106, 122, 138, 154, 170, 186, 202, 218, 234, 250, 266, 282, 298, 314, 330, 346];
  return (
    <g>
      {bars.map((x, i) => (
        <rect
          key={i}
          x={x}
          y={34}
          width={9}
          height={52}
          rx={4}
          fill={i % 5 === 0 ? c.bright : i % 3 === 0 ? c.deep : c.main}
          opacity={0.95}
          style={{ animation: `pca-bar ${0.8 + (i % 4) * 0.18}s ease-in-out ${i * 0.06}s infinite`, transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      ))}
      <rect x={32} y={30} width={12} height={60} rx={6} fill="none" stroke={c.deep} strokeWidth={2} opacity={0.7} />
      <rect x={358} y={30} width={12} height={60} rx={6} fill="none" stroke={c.deep} strokeWidth={2} opacity={0.7} />
    </g>
  );
}

function messageThreads({ c }: SceneProps) {
  const bubbles: Array<[number, number, number, boolean, number]> = [
    [60, 34, 120, false, 0],
    [216, 52, 140, true, 0.35],
    [60, 72, 96, false, 0.7],
    [226, 92, 120, true, 1.05],
  ];
  return (
    <g>
      {bubbles.map(([x, y, w, right, delay], i) => (
        <g key={i} style={{ animation: `pca-line ${3.1 + (i % 2) * 0.6}s ease-in-out ${delay}s infinite` }}>
          <rect x={x} y={y} width={w} height={26} rx={13} fill={right ? c.main : c.bright} />
          <path d={right ? `M${x} ${y + 20} l-8 0 l4 8 z` : `M${x + w} ${y + 20} l8 0 l-4 8 z`} fill={right ? c.main : c.bright} />
          <circle cx={x + (right ? w - 16 : 16)} cy={y + 13} r={4} fill={right ? c.soft : c.deep} />
        </g>
      ))}
      <rect x={60} y={102} width={66} height={18} rx={9} fill={c.deep} opacity={0.5} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={80 + i * 14} cy={111} r={3} fill={c.bright} style={{ animation: `pca-fade ${1 + i * 0.25}s ease-in-out ${i * 0.2}s infinite` }} />
      ))}
    </g>
  );
}

function recipeBook({ c }: SceneProps) {
  const steam: Array<[number, number, number]> = [[168, 0, 0], [192, 0, 0.42], [216, 0, 0.77], [180, 1, 0.21], [204, -1, 0.63]];
  return (
    <g>
      <ellipse cx={204} cy={104} rx={96} ry={22} fill={c.deep} opacity={0.95} />
      <ellipse cx={204} cy={96} rx={80} ry={16} fill={c.bright} />
      <ellipse cx={204} cy={96} rx={64} ry={11} fill={c.soft} opacity={0.9} />
      {steam.map(([x, dir, delay], i) => (
        <g key={i} style={{ animation: `pca-rise ${2.1 + (i % 2) * 0.5}s ease-out ${delay}s infinite` }}>
          <path d={`M${x} 84 q${8 * dir} -10 0 -20 q${-8 * dir} -10 0 -20`} fill="none" stroke={c.bright} strokeWidth={3} strokeLinecap="round" />
        </g>
      ))}
      <circle cx={182} cy={94} r={5} fill={c.main} style={{ animation: 'pca-fade 1.4s ease-in-out infinite' }} />
      <circle cx={212} cy={90} r={3.5} fill={c.deep} style={{ animation: 'pca-fade 1.7s ease-in-out 0.35s infinite' }} />
      <circle cx={196} cy={102} r={3} fill={c.main} opacity={0.9} />
    </g>
  );
}

function travelPlanner({ c }: SceneProps) {
  return (
    <g>
      <path
        d="M40 92 C 110 84, 150 58, 220 56 C 280 54, 320 66, 372 46"
        fill="none"
        stroke={c.soft}
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray="10 8"
        pathLength={100}
        style={{ animation: 'pca-draw 5s linear infinite' }}
      />
      <g style={{ animation: 'pca-plane 5s linear infinite' }}>
        <polygon points="0,0 20,3 0,7 4,3.5" fill={c.bright} transform="rotate(12 10 3.5)" />
      </g>
      <g style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
        <circle cx={40} cy={92} r={12} fill="none" stroke={c.main} strokeWidth={2} style={{ animation: 'pca-pulse 1.9s ease-out infinite', transformBox: 'fill-box', transformOrigin: 'center' }} />
        <circle cx={40} cy={92} r={5} fill={c.main} />
      </g>
      <circle cx={372} cy={46} r={5} fill={c.bright} style={{ animation: 'pca-fade 1.3s ease-in-out infinite' }} />
      {[120, 200, 280].map((x, i) => (
        <g key={i} style={{ animation: `pca-fade ${2 + i * 0.7}s ease-in-out ${i * 0.35}s infinite` }}>
          <line x1={x} y1={116} x2={x} y2={106} stroke={c.deep} strokeWidth={2} />
          <rect x={x - 7} y={108} width={14} height={8} rx={2} fill={i % 2 === 0 ? c.deep : c.main} opacity={0.9} />
        </g>
      ))}
    </g>
  );
}

function corporateSite({ c }: SceneProps) {
  const cols = [52, 86, 120, 154, 188, 222, 256, 290, 324];
  const rows = [36, 56, 76, 96];
  return (
    <g>
      <rect x={40} y={26} width={320} height={86} rx={8} fill="rgba(0,0,0,0.45)" />
      <rect x={40} y={26} width={320} height={86} rx={8} fill="none" stroke={c.deep} strokeWidth={1.5} opacity={0.8} />
      <rect x={52} y={34} width={44} height={12} rx={3} fill={c.main} />
      <rect x={70} y={30} width={3} height={3} rx={1.5} fill={c.bright} />
      {cols.map((x) =>
        rows.map((y, r) => (
          <rect
            key={`${x}-${r}`}
            x={x}
            y={y}
            width={14}
            height={9}
            rx={2}
            fill={(x + r) % 4 === 0 ? c.main : (x + r) % 4 === 1 ? c.deep : 'rgba(255,255,255,0.08)'}
            style={{ animation: (x + r) % 5 === 0 ? `pca-fade ${2 + (x % 3) * 0.5}s ease-in-out ${(x + r) * 0.07}s infinite` : undefined }}
          />
        ))
      )}
      <rect x={172} y={102} width={32} height={10} rx={3} fill={c.deep} opacity={0.9} />
      <g style={{ animation: 'pca-sway 3.4s ease-in-out infinite', transformBox: 'fill-box', transformOrigin: 'center' }}>
        <line x1={316} y1={92} x2={316} y2={112} stroke={c.bright} strokeWidth={2.5} />
        <circle cx={316} cy={92} r={3.5} fill={c.bright} style={{ animation: 'pca-fade 1.2s ease-in-out infinite' }} />
      </g>
    </g>
  );
}

function onlineStore({ c }: SceneProps) {
  return (
    <g>
      <g style={{ animation: 'pca-float 2.6s ease-in-out infinite' }}>
        <rect x={96} y={40} width={56} height={44} rx={6} fill="none" stroke={c.main} strokeWidth={2.5} />
        <rect x={120} y={40} width={10} height={44} fill={c.deep} opacity={0.85} />
        <rect x={130} y={40} width={10} height={44} fill={c.main} opacity={0.5} />
      </g>
      <g style={{ animation: 'pca-sway 3s ease-in-out 0.5s infinite', transformBox: 'fill-box', transformOrigin: 'top center' }}>
        <rect x={170} y={58} width={42} height={16} rx={3} fill={c.bright} />
        <rect x={178} y={64} width={8} height={4} rx={2} fill={c.deep} />
        <rect x={192} y={64} width={8} height={4} rx={2} fill={c.deep} />
        <rect x={170} y={76} width={42} height={2.5} rx={1.25} fill={c.deep} opacity={0.6} />
      </g>
      <g style={{ animation: 'pca-float 2.9s ease-in-out 1s infinite' }}>
        <rect x={228} y={44} width={48} height={40} rx={6} fill="none" stroke={c.soft} strokeWidth={2.5} />
        <rect x={240} y={60} width={24} height={2.5} rx={1.25} fill={c.soft} />
        <rect x={240} y={68} width={18} height={2.5} rx={1.25} fill={c.deep} opacity={0.8} />
      </g>
      <path d="M66 92 q-6 0 -6 6 l10 18 q2 4 7 4 h78 q5 0 7 -4 l10 -18 q2 -6 -4 -6 z" fill={c.main} opacity={0.95} />
      <circle cx={118} cy={96} r={3} fill={c.bright} style={{ animation: 'pca-fade 1.4s ease-in-out infinite' }} />
      <circle cx={150} cy={96} r={3} fill={c.bright} style={{ animation: 'pca-fade 1.6s ease-in-out 0.4s infinite' }} />
      <circle cx={286} cy={78} r={5} fill={c.bright} style={{ animation: 'pca-fade 1.3s ease-in-out infinite' }} />
    </g>
  );
}

function techBlog({ c }: SceneProps) {
  const lines = [44, 56, 68, 80, 92];
  return (
    <g>
      <rect x={44} y={24} width={312} height={88} rx={10} fill="rgba(0,0,0,0.45)" />
      <rect x={44} y={24} width={312} height={88} rx={10} fill="none" stroke={c.deep} strokeWidth={1.5} opacity={0.7} />
      <circle cx={62} cy={40} r={4} fill={c.main} style={{ animation: 'pca-fade 1.5s ease-in-out infinite' }} />
      <rect x={76} y={34} width={120} height={9} rx={4.5} fill={c.main} />
      <rect x={248} y={36} width={64} height={14} rx={7} fill={c.deep} opacity={0.8} />
      <rect x={320} y={38} width={22} height={10} rx={5} fill={c.soft} opacity={0.7} />
      {lines.map((y, i) => (
        <rect key={y} x={60} y={y} width={[180, 240, 140, 200, 100][i]} height={5} rx={2.5} fill={i % 2 === 0 ? c.bright : c.deep} opacity={0.5} />
      ))}
      <rect x={60} y={104} width={3} height={5} rx={1.5} fill={c.main} style={{ animation: 'pca-caret 0.9s steps(1) infinite' }} />
      <g style={{ animation: 'pca-drift 7s ease-in-out infinite' }}>
        <path d="M230 44 q20 -18 46 -8 q-14 10 -6 26 q-22 -4 -40 -18 z" fill={c.soft} opacity={0.5} />
      </g>
    </g>
  );
}

function artistPortfolio({ c }: SceneProps) {
  const frames: Array<[number, number, number, number]> = [[52, 88, 40, 26], [136, 82, 30, 32], [206, 88, 44, 26], [278, 84, 26, 30], [336, 90, 30, 24]];
  return (
    <g>
      <g style={{ animation: 'pca-sway 5s ease-in-out infinite', transformBox: 'fill-box', transformOrigin: 'center' }}>
        <polygon points="200,30 240,54 220,94 180,94 160,54" fill="none" stroke={c.main} strokeWidth={2.5} />
        <polygon points="200,38 232,54 216,84 184,84 168,54" fill={c.deep} opacity={0.55} />
        <circle cx={200} cy={62} r={10} fill="none" stroke={c.bright} strokeWidth={2} />
        <circle cx={200} cy={62} r={3.5} fill={c.bright} style={{ animation: 'pca-pulse 2.2s ease-out infinite', transformBox: 'fill-box', transformOrigin: 'center' }} />
      </g>
      {frames.map(([x, y, w, h], i) => (
        <g key={i} style={{ animation: `pca-fade ${2.3 + (i % 2) * 0.6}s ease-in-out ${i * 0.22}s infinite` }}>
          <rect x={x} y={y} width={w} height={h} rx={3} fill={i % 2 === 0 ? c.deep : 'rgba(255,255,255,0.06)'} />
          <rect x={x} y={y} width={w} height={h} rx={3} fill="none" stroke={c.main} strokeWidth={1.2} opacity={0.85} />
          <circle cx={x + w / 2} cy={y + h / 2} r={3.5} fill={c.bright} opacity={0.9} />
        </g>
      ))}
    </g>
  );
}

function landingPage({ c }: SceneProps) {
  const dots: Array<[number, number, number]> = [[160, 0, 0], [200, 0, 0.4], [240, 0, 0.75], [180, 1, 0.2], [220, -1, 0.55]];
  return (
    <g>
      <path d="M148 34 L252 34 L266 58 L134 58 Z" fill={c.deep} opacity={0.85} />
      <path d="M134 58 L266 58 L246 88 L154 88 Z" fill={c.main} opacity={0.6} />
      <path d="M154 88 L246 88 L234 104 L166 104 Z" fill={c.bright} opacity={0.9} />
      <rect x={172} y={98} width={56} height={12} rx={4} fill={c.bright} style={{ animation: 'pca-fade 1.6s ease-in-out infinite' }} />
      {dots.map(([x, dir, delay], i) => (
        <g key={i} style={{ animation: `pca-rise ${1.6 + (i % 2) * 0.5}s ease-out ${delay}s infinite` }}>
          <circle cx={x} cy={18} r={3} fill={i % 2 === 0 ? c.soft : c.bright} />
          <path d={`M${x} 30 q${6 * dir} -8 0 -16 q${-6 * dir} -8 0 -16`} fill="none" stroke={c.soft} strokeWidth={1.5} opacity={0.4} />
        </g>
      ))}
      <g style={{ animation: 'pca-float 2.4s ease-in-out infinite' }}>
        <circle cx={300} cy={48} r={16} fill={c.deep} opacity={0.9} />
        <path d="M294 48 l4.5 5 l8 -9" fill="none" stroke={c.bright} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
}

function microsite({ c }: SceneProps) {
  const confetti: Array<[number, number, string, number]> = [
    [52, 40, c.main, 0], [76, 26, c.bright, 0.4], [104, 42, c.soft, 0.15], [128, 28, c.main, 0.7],
    [268, 34, c.soft, 0.3], [296, 46, c.bright, 0.55], [322, 30, c.main, 0.1], [348, 42, c.soft, 0.85],
  ];
  return (
    <g>
      <g style={{ animation: 'pca-float 3s ease-in-out infinite' }}>
        <rect x={128} y={34} width={144} height={62} rx={12} fill={c.bright} />
        <rect x={128} y={34} width={144} height={62} rx={12} fill="none" stroke={c.main} strokeWidth={2} />
        <line x1={128} y1={52} x2={272} y2={52} stroke={c.main} strokeWidth={2} />
        <rect x={146} y={60} width={60} height={7} rx={3.5} fill={c.deep} />
        <rect x={146} y={74} width={88} height={5} rx={2.5} fill={c.deep} opacity={0.55} />
        <circle cx={252} cy={80} r={9} fill={c.deep} opacity={0.9} />
        <path d="M248.5 80 l3 3.5 l6 -7" fill="none" stroke={c.bright} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <line x1={200} y1={34} x2={200} y2={96} stroke={c.main} strokeWidth={1.5} strokeDasharray="3 4" />
      </g>
      {confetti.map(([x, y, fill, delay], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width={6}
          height={9}
          rx={2}
          fill={fill}
          style={{ animation: `pca-rise ${2 + (i % 3) * 0.5}s ease-out ${delay}s infinite` }}
        />
      ))}
    </g>
  );
}

function webApp({ c }: SceneProps) {
  const cols = [48, 176, 304];
  const rows = [44, 58, 74];
  return (
    <g>
      {cols.map((x, i) => (
        <g key={i}>
          <rect x={x} y={26} width={106} height={88} rx={9} fill="rgba(0,0,0,0.45)" />
          <rect x={x} y={26} width={106} height={88} rx={9} fill="none" stroke={c.deep} strokeWidth={1.5} opacity={0.7} />
          <rect x={x + 10} y={34} width={40} height={6} rx={3} fill={c.deep} opacity={0.9} />
          {rows.map((y, r) => (
            <rect
              key={r}
              x={x + 10}
              y={y}
              width={86}
              height={10}
              rx={4}
              fill={i === 1 && r === 1 ? c.main : 'rgba(255,255,255,0.07)'}
              opacity={i === 1 && r === 1 ? 0.95 : 1}
              style={i === 1 && r === 1 ? { animation: 'pca-fade 2.1s ease-in-out infinite' } : undefined}
            />
          ))}
        </g>
      ))}
      <g style={{ animation: 'pca-float 2.7s ease-in-out infinite' }}>
        <circle cx={368} cy={42} r={12} fill={c.main} opacity={0.95} />
        <path d="M363.5 42 l3.5 4 l6 -8" fill="none" stroke={c.bright} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
}

function sentinelSystems({ c }: SceneProps) {
  return (
    <g>
      <g fill="rgba(0,0,0,0.45)">
        <rect x={24} y={58} width={56} height={44} rx={3} />
        <rect x={32} y={44} width={40} height={14} rx={2} />
        <rect x={96} y={66} width={64} height={36} rx={3} />
        <rect x={104} y={30} width={48} height={36} rx={2} />
        <rect x={176} y={52} width={52} height={50} rx={3} />
      </g>
      {[86, 104, 122].map((y, i) => (
        <rect key={i} x={30 + i * 14} y={y} width={8} height={5} rx={1.5} fill={c.soft} opacity={0.9} />
      ))}
      <line x1={24} y1={102} x2={228} y2={102} stroke={c.deep} strokeWidth={2} />
      <g>
        <rect x={286} y={52} width={10} height={44} fill={c.deep} />
        <rect x={276} y={30} width={30} height={22} rx={5} fill={c.main} />
        <rect x={276} y={30} width={30} height={22} rx={5} fill="none" stroke={c.deep} strokeWidth={1.5} />
        <circle cx={291} cy={41} r={7} fill={c.bright} />
        <circle cx={291} cy={41} r={3.5} fill={c.deep} />
      </g>
      <path d="M232 96 L274 60" stroke={c.deep} strokeWidth={1.5} strokeDasharray="3 4" />
      <path d="M232 96 L316 60" stroke={c.soft} strokeWidth={1.5} strokeDasharray="3 4" />
      <g style={{ animation: 'pca-pulse 2.4s ease-in-out infinite' }}>
        <circle cx={232} cy={96} r={5} fill={c.main} />
        <circle cx={232} cy={96} r={10} fill="none" stroke={c.main} strokeWidth={1.5} />
      </g>
    </g>
  );
}

function vigilStore({ c }: SceneProps) {
  return (
    <g>
      <g fill="rgba(0,0,0,0.45)">
        <rect x={24} y={66} width={70} height={36} rx={4} />
        <rect x={104} y={66} width={70} height={36} rx={4} />
        <rect x={184} y={66} width={70} height={36} rx={4} />
      </g>
      {[36, 116, 196].map((x, i) => (
        <g key={i}>
          <rect x={x + 8} y={76} width={18} height={16} rx={3} fill={i === 1 ? c.main : c.soft} />
          <circle cx={x + 17} cy={84} r={4} fill="none" stroke={c.deep} strokeWidth={2.5} />
          <circle cx={x + 17} cy={84} r={1.5} fill={c.deep} />
          <rect x={x + 32} y={76} width={26} height={16} rx={3} fill={c.deep} opacity={0.85} />
        </g>
      ))}
      <g style={{ animation: 'pca-float 3s ease-in-out infinite' }}>
        <rect x={276} y={34} width={96} height={50} rx={8} fill={c.bright} />
        <rect x={276} y={34} width={96} height={50} rx={8} fill="none" stroke={c.main} strokeWidth={2} />
        <circle cx={300} cy={56} r={16} fill="none" stroke={c.deep} strokeWidth={6} />
        <circle cx={300} cy={56} r={6} fill={c.deep} />
        <rect x={326} y={46} width={36} height={6} rx={3} fill={c.deep} opacity={0.85} />
        <rect x={326} y={58} width={26} height={6} rx={3} fill={c.deep} opacity={0.5} />
        <circle cx={360} cy={42} r={4} fill={c.deep} />
      </g>
      <g style={{ animation: 'pca-sway 3.4s ease-in-out infinite', transformOrigin: '346px 30px' }}>
        <path d="M330 30 l12 -10 l8 0 l0 8 l-10 12 z" fill={c.main} />
        <circle cx={346} cy={30} r={3} fill={c.bright} />
      </g>
    </g>
  );
}

function cctvBlog({ c }: SceneProps) {
  return (
    <g>
      <rect x={30} y={22} width={240} height={76} rx={10} fill="rgba(0,0,0,0.45)" />
      <rect x={30} y={22} width={240} height={76} rx={10} fill="none" stroke={c.deep} strokeWidth={1.5} opacity={0.7} />
      <rect x={46} y={36} width={120} height={8} rx={4} fill={c.main} />
      <rect x={46} y={52} width={180} height={6} rx={3} fill={c.soft} opacity={0.9} />
      <rect x={46} y={64} width={160} height={6} rx={3} fill={c.soft} opacity={0.6} />
      <rect x={46} y={78} width={90} height={6} rx={3} fill={c.deep} opacity={0.8} style={{ animation: 'pca-fade 1.8s ease-in-out infinite' }} />
      <rect x={234} y={36} width={3} height={8} fill={c.bright} style={{ animation: 'pca-caret 1.1s steps(2) infinite' }} />
      <g>
        <rect x={292} y={40} width={80} height={40} rx={6} fill={c.deep} opacity={0.9} />
        <circle cx={332} cy={60} r={11} fill="none" stroke={c.bright} strokeWidth={4} />
        <circle cx={332} cy={60} r={4} fill={c.bright} />
        <circle cx={358} cy={46} r={3.5} fill={c.main} style={{ animation: 'pca-pulse 2s ease-in-out infinite' }} />
      </g>
    </g>
  );
}

function camsPortfolio({ c }: SceneProps) {
  const tiles: Array<[number, number]> = [[24, 22], [108, 22], [192, 22], [276, 22]];
  return (
    <g>
      {tiles.map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width={76} height={40} rx={4} fill="rgba(0,0,0,0.45)" />
          <rect x={x} y={y} width={76} height={40} rx={4} fill="none" stroke={c.deep} strokeWidth={1.2} opacity={0.75} />
          <path d={`M${x + 6} ${y + 34} L${x + 20} ${y + 12} L${x + 34} ${y + 34} Z`} fill={i % 2 ? c.soft : c.main} opacity={0.9} />
          <rect x={x + 40} y={y + 8} width={14} height={10} rx={3} fill={c.deep} opacity={0.95} />
        </g>
      ))}
      <g style={{ animation: 'pca-pulse 2.2s ease-in-out infinite' }}>
        <rect x={104} y={70} width={72} height={24} rx={5} fill={c.main} opacity={0.95} />
        <path d="M118 82 l8 8 l14 -16" fill="none" stroke={c.bright} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <circle cx={366} cy={28} r={10} fill={c.deep} opacity={0.95} />
      <path d="M360.5 22.5 l11 11 M371.5 22.5 l-11 11" stroke={c.bright} strokeWidth={2.5} strokeLinecap="round" />
    </g>
  );
}

function securityAudit({ c }: SceneProps) {
  return (
    <g>
      <g style={{ animation: 'pca-float 3.2s ease-in-out infinite' }}>
        <path d="M292 26 l40 0 l0 26 l-40 34 z" fill={c.main} opacity={0.95} />
        <path d="M292 26 l40 0 l0 26 l-40 34 z" fill="none" stroke={c.deep} strokeWidth={2} />
        <path d="M306 44 l6 8 l14 -16" fill="none" stroke={c.bright} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <rect x={30} y={30} width={210} height={60} rx={8} fill="rgba(0,0,0,0.45)" />
      <rect x={30} y={30} width={210} height={60} rx={8} fill="none" stroke={c.deep} strokeWidth={1.5} opacity={0.7} />
      <rect x={46} y={42} width={140} height={7} rx={3.5} fill={c.main} />
      <rect x={46} y={56} width={100} height={7} rx={3.5} fill={c.soft} opacity={0.8} />
      <g>
        <rect x={46} y={72} width={170} height={8} rx={4} fill={c.deep} opacity={0.9} />
        <rect x={46} y={72} width={92} height={8} rx={4} fill={c.main} opacity={0.9} style={{ animation: 'pca-progress 2.6s ease-in-out infinite' }} />
      </g>
      <circle cx={30} cy={96} r={14} fill="none" stroke={c.main} strokeWidth={1.5} strokeDasharray="4 5" style={{ animation: 'pca-fade 2.4s ease-in-out infinite' }} />
      <circle cx={30} cy={96} r={22} fill="none" stroke={c.soft} strokeWidth={1} strokeDasharray="3 6" />
    </g>
  );
}

function camLaunch({ c }: SceneProps) {
  const confetti: Array<[number, number, string, number]> = [
    [54, 34, c.main, 0], [82, 22, c.bright, 0.35], [118, 36, c.soft, 0.2], [148, 24, c.main, 0.6],
    [252, 30, c.soft, 0.15], [286, 42, c.bright, 0.5], [318, 26, c.main, 0.1], [348, 38, c.soft, 0.8],
  ];
  return (
    <g>
      <rect x={36} y={26} width={328} height={68} rx={10} fill="rgba(0,0,0,0.45)" />
      <rect x={36} y={26} width={328} height={68} rx={10} fill="none" stroke={c.main} strokeWidth={2} />
      <line x1={36} y1={44} x2={364} y2={44} stroke={c.main} strokeWidth={1.5} />
      <rect x={56} y={54} width={80} height={7} rx={3.5} fill={c.deep} opacity={0.9} />
      <rect x={56} y={66} width={60} height={5} rx={2.5} fill={c.deep} opacity={0.5} />
      {[164, 198, 232, 266].map((x, i) => (
        <g key={i}>
          <rect x={x} y={50} width={26} height={30} rx={4} fill={c.deep} opacity={0.95} />
          <rect x={x + 7} y={57} width={5} height={8} rx={2} fill={c.bright} />
          <rect x={x + 15} y={57} width={5} height={8} rx={2} fill={c.bright} />
          <rect x={x + 7} y={68} width={5} height={8} rx={2} fill={c.soft} />
          <rect x={x + 15} y={68} width={5} height={8} rx={2} fill={c.soft} />
        </g>
      ))}
      {confetti.map(([x, y, fill, delay], i) => (
        <rect key={i} x={x} y={y} width={6} height={9} rx={2} fill={fill} style={{ animation: `pca-rise ${2 + (i % 3) * 0.5}s ease-out ${delay}s infinite` }} />
      ))}
    </g>
  );
}

function barkerModern({ c }: SceneProps) {
  return (
    <g>
      <rect x={24} y={28} width={352} height={9} rx={2} fill={c.main} opacity={0.95} />
      <rect x={24} y={28} width={352} height={9} rx={2} fill="none" stroke={c.deep} strokeWidth={1} opacity={0.6} />
      <g fill="rgba(0,0,0,0.45)">
        <rect x={24} y={37} width={116} height={65} rx={3} />
        <rect x={148} y={37} width={116} height={65} rx={3} />
        <rect x={272} y={28} width={104} height={74} rx={3} />
      </g>
      {[24, 148].map((x) => (
        <g key={x}>
          <rect x={x + 8} y={45} width={100} height={13} rx={2} fill={c.deep} opacity={0.9} />
          <rect x={x + 8} y={62} width={100} height={13} rx={2} fill={c.soft} opacity={0.9} />
          <rect x={x + 40} y={48.5} width={16} height={4} rx={2} fill={c.bright} opacity={0.9} />
          <rect x={x + 40} y={65.5} width={16} height={4} rx={2} fill={c.bright} opacity={0.9} />
          <rect x={x + 8} y={82} width={100} height={17} rx={2} fill={c.main} opacity={0.9} />
          <circle cx={x + 92} cy={90.5} r={3.5} fill={c.bright} />
        </g>
      ))}
      <g>
        <rect x={280} y={36} width={40} height={58} rx={2} fill={c.deep} opacity={0.9} />
        <rect x={328} y={36} width={40} height={58} rx={2} fill={c.main} opacity={0.9} />
        <rect x={292} y={60} width={16} height={4} rx={2} fill={c.bright} opacity={0.9} />
        <rect x={340} y={60} width={16} height={4} rx={2} fill={c.bright} opacity={0.9} />
      </g>
      <g style={{ animation: 'pca-float 3s ease-in-out infinite' }}>
        <rect x={190} y={8} width={26} height={18} rx={3} fill={c.bright} />
        <rect x={190} y={8} width={26} height={18} rx={3} fill="none" stroke={c.deep} strokeWidth={1.5} />
        <path d="M192 10 q6 7 12 0" fill="none" stroke={c.deep} strokeWidth={1.5} opacity={0.6} />
      </g>
      <g style={{ animation: 'pca-fade 2.2s ease-in-out infinite' }}>
        <path d="M200 0 l3 6 l-3 4 l-3 -4 z" fill={c.soft} />
        <line x1={200} y1={10} x2={200} y2={22} stroke={c.deep} strokeWidth={1.5} />
      </g>
    </g>
  );
}

function vettazScene({ c }: SceneProps) {
  return (
    <g>
      <rect x={24} y={26} width={352} height={8} rx={2} fill={c.main} opacity={0.95} />
      <g fill="rgba(0,0,0,0.45)">
        <rect x={24} y={34} width={112} height={62} rx={3} />
        <rect x={144} y={34} width={112} height={62} rx={3} />
        <rect x={264} y={34} width={112} height={62} rx={3} />
      </g>
      {[24, 144, 264].map((x) => (
        <g key={x}>
          <rect x={x + 8} y={42} width={96} height={11} rx={2} fill={c.deep} opacity={0.9} />
          <rect x={x + 8} y={57} width={96} height={11} rx={2} fill={c.soft} opacity={0.9} />
          <rect x={x + 40} y={45} width={15} height={4} rx={2} fill={c.bright} opacity={0.9} />
          <rect x={x + 40} y={60} width={15} height={4} rx={2} fill={c.bright} opacity={0.9} />
          <rect x={x + 8} y={72} width={96} height={21} rx={2} fill={c.main} opacity={0.9} />
          <circle cx={x + 88} cy={82.5} r={3.5} fill={c.bright} />
        </g>
      ))}
      <g style={{ animation: 'pca-float 3s ease-in-out infinite' }}>
        <ellipse cx={200} cy={8} rx={16} ry={3.5} fill={c.deep} opacity={0.35} />
        <path d="M184 4 h32 v6 a16 16 0 0 1 -32 0 z" fill={c.bright} />
        <rect x={200} y={-2} width={4} height={7} rx={2} fill={c.deep} opacity={0.8} />
      </g>
      <path d="M196 6 q4 6 8 0" fill="none" stroke={c.soft} strokeWidth={1.5} style={{ animation: 'pca-fade 2.2s ease-in-out infinite' }} />
      <circle cx={308} cy={15} r={7} fill="none" stroke={c.main} strokeWidth={1.5} style={{ animation: 'pca-float 2.4s ease-in-out infinite' }} />
    </g>
  );
}

function camCommand({ c }: SceneProps) {
  const tiles: Array<[number, number]> = [[24, 22], [108, 22], [192, 22], [276, 22]];
  return (
    <g>
      {tiles.map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width={76} height={40} rx={4} fill="rgba(0,0,0,0.45)" />
          <rect x={x} y={y} width={76} height={40} rx={4} fill="none" stroke={c.deep} strokeWidth={1.2} opacity={0.75} />
          <path d={`M${x + 10} ${y + 34} L${x + 24} ${y + 12} L${x + 38} ${y + 34} Z`} fill={i % 2 ? c.soft : c.main} opacity={0.85} />
          <circle cx={x + 66} cy={y + 8} r={3.5} fill={i === 1 ? '#f87171' : c.deep} opacity={0.95} style={i === 1 ? { animation: 'pca-fade 1.4s ease-in-out infinite' } : undefined} />
        </g>
      ))}
      <rect x={276} y={22} width={76} height={40} rx={4} fill="none" stroke={c.bright} strokeWidth={2} />
      <rect x={24} y={70} width={328} height={28} rx={5} fill="rgba(0,0,0,0.45)" />
      <rect x={24} y={70} width={328} height={28} rx={5} fill="none" stroke={c.deep} strokeWidth={1.2} opacity={0.75} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={40 + i * 52} y={80} width={36} height={7} rx={3.5} fill={i === 2 ? c.main : 'rgba(255,255,255,0.08)'} opacity={i === 2 ? 0.95 : 1} />
      ))}
      <circle cx={338} cy={84} r={5} fill={c.main} style={{ animation: 'pca-float 2s ease-in-out infinite' }} />
    </g>
  );
}

const SCENES: Record<string, (props: SceneProps) => ReactNode> = {  'aurora-sky': auroraSky,
  'crypto-dashboard': cryptoDashboard,
  'json-launder': jsonLaunder,
  'neural-glow': neuralGlow,
  'palette-loom': paletteLoom,
  'pomodoro-ember': pomodoroEmber,
  'type-racer': typeRacer,
  'kanban-board': kanbanBoard,
  'ledger-app': ledgerApp,
  'notes-vault': notesVault,
  'audio-spectrum': audioSpectrum,
  'message-threads': messageThreads,
  'recipe-book': recipeBook,
  'travel-planner': travelPlanner,
  'corporate-site': corporateSite,
  'online-store': onlineStore,
  'tech-blog': techBlog,
  'artist-portfolio': artistPortfolio,
  'landing-page': landingPage,
  'microsite': microsite,
  'web-app': webApp,
  'sentinel-systems': sentinelSystems,
  'vigil-store': vigilStore,
  'cctv-blog': cctvBlog,
  'cams-portfolio': camsPortfolio,
  'security-audit': securityAudit,
  'cam-launch': camLaunch,
  'cam-command': camCommand,
  'barker-modern': barkerModern,
  'vettaz': vettazScene,
};

export const coverClasses: Record<ProjectTone, string> = {
  emerald: 'project-cover-emerald',
  cyan: 'project-cover-cyan',
  metal: 'project-cover-metal',
};

// Projects whose cover reads dark: the metal tone paints near-black gradients
// in dark mode and never paints a large cream/light filling, so the whole
// card displays a black/gray backdrop (pomodoro, type-racer, kanban, notes,
// travel, online-store and microsite use the `metal` tone; the rest use the
// lighter emerald/cyan tones).
const DARK_BG_IDS: ReadonlySet<string> = new Set([
  'pomodoro-ember',
  'type-racer',
  'kanban-board',
  'notes-vault',
  'travel-planner',
  'online-store',
  'microsite',
  'cams-portfolio',
  'cam-launch',
  'barker-modern',
  'vettaz',
]);

export function hasDarkBackground(projectId: string): boolean {
  return DARK_BG_IDS.has(projectId);
}

export function ProjectCoverArt({
  project,
  className = '',
}: {
  project: ProjectConfig;
  className?: string;
}) {
  const scene = (SCENES as Record<string, ((props: SceneProps) => ReactNode) | undefined>)[project.id];
  const c = PROJECT_COLORS[project.id] ?? TONE_COLORS[project.tone];
  const sceneStyle: CSSProperties | undefined = scene
    ? undefined
    : { display: 'none' };

  return (
    <div className={`project-cover ${coverClasses[project.tone]} ${className}`} aria-hidden="true">
      <svg
        className="project-cover-art"
        viewBox="0 0 400 120"
        preserveAspectRatio="xMidYMid slice"
        style={sceneStyle}
      >
        {scene ? scene({ c }) : null}
      </svg>
    </div>
  );
}
