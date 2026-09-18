/* 404devs — notebook opening animation. Continuous composition: one tree, keyed to T. */
import React from 'react';
import { createRoot } from 'react-dom/client';
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const Easing = {
  easeOutCubic: x => 1 - (1-x)**3,
  easeInOutCubic: x => x < .5 ? 4*x*x*x : 1-(-2*x+2)**3/2,
  easeOutBack: x => 1 + 2.70158*(x-1)**3 + 1.70158*(x-1)**2,
  easeOutQuad: x => 1-(1-x)**2
};
const animate = ({from,to,start,end,ease}) => t => from+(to-from)*ease(clamp((t-start)/(end-start),0,1));
const SceneContext = React.createContext(null);
const useComposition = () => React.useContext(SceneContext);

const MOTION = {
  enter: (s, e) => animate({ from: 0, to: 1, start: s, end: e, ease: Easing.easeOutCubic }),
  draw: (s, e) => animate({ from: 0, to: 1, start: s, end: e, ease: Easing.easeInOutCubic }),
  pop: (s, e) => animate({ from: 0, to: 1, start: s, end: e, ease: Easing.easeOutBack }),
};

const FONT = "Plex, Arial, sans-serif";
const INK = '#16181b';
const GREEN = '#17a34a';
const BLUE = '#2f7bf6';

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const BARS = [[5, 3], [11, 4], [7, 3], [6, 2], [9, 3], [8, 4], [13, 4], [10, 5], [9, 6], [12, 5], [16, 6], [21, 5]];
const PROJECTS = [
  ['Plataforma SaaS', 'Em desenvolvimento', GREEN],
  ['App Mobile', 'Em teste', BLUE],
  ['Site Institucional', 'Concluído', GREEN],
];
const TASKS = ['Revisão com o cliente', 'Ajustes no sistema', 'Deploy em produção', 'Revisar documentação'];
const NAV = ['Visão geral', 'Projetos', 'Clientes', 'Financeiro', 'Tarefas', 'Equipe', 'Configurações'];

const brl = (v) => Math.round(v).toLocaleString('pt-BR');

function Spark({ p, color, pts }) {
  return (
    <svg viewBox="0 0 96 30" width="96" height="30" style={{ display: 'block', overflow: 'visible' }}>
      <polyline
        points={pts} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
        pathLength="100" strokeDasharray="100" strokeDashoffset={100 - 100 * p}
      />
    </svg>
  );
}

function Kpi({ label, value, delta, spark, color, r }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 12, border: '1px solid #e7e7e4', padding: '12px 15px 10px',
      display: 'flex', flexDirection: 'column', gap: 5, boxShadow: '0 1px 2px rgba(15,17,20,.04)',
      opacity: r, transform: `translateY(${(1 - r) * 18}px)`,
    }}>
      <div style={{ fontSize: 13.5, color: '#6d7074', letterSpacing: '-0.01em' }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: INK, letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: GREEN, display: 'flex', gap: 3, alignItems: 'center' }}>
          <span style={{ fontSize: 12 }}>↗</span>{delta}
        </div>
        <Spark p={spark} color={color} pts="0,24 14,18 28,21 42,12 56,15 70,7 84,9 96,2" />
      </div>
    </div>
  );
}

function Card({ title, action, r, children, style }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 12, border: '1px solid #e7e7e4', padding: '12px 15px',
      display: 'flex', flexDirection: 'column', gap: 8, boxShadow: '0 1px 2px rgba(15,17,20,.04)',
      opacity: r, transform: `translateY(${(1 - r) * 18}px)`, ...style,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>{title}</div>
        {action ? <div style={{ fontSize: 12.5, color: '#6d7074', display: 'flex', gap: 5, alignItems: 'center' }}>{action}<span>→</span></div> : null}
      </div>
      {children}
    </div>
  );
}

function Dashboard({ T, CUES }) {
  const nav = MOTION.enter(CUES.Interface, CUES.Interface + 0.55)(T);
  const head = MOTION.enter(CUES.Interface + 0.3, CUES.Interface + 0.9)(T);
  const kpi = (i) => MOTION.enter(CUES.Interface + 0.6 + i * 0.14, CUES.Interface + 1.25 + i * 0.14)(T);
  const chart = MOTION.enter(CUES.Interface + 1.1, CUES.Interface + 1.7)(T);
  const lower = (i) => MOTION.enter(CUES.Interface + 1.35 + i * 0.15, CUES.Interface + 1.95 + i * 0.15)(T);

  const count = MOTION.draw(CUES.Dados, CUES.Dados + 1.5)(T);
  const count2 = MOTION.draw(CUES.Dados + 0.12, CUES.Dados + 1.6)(T);
  const count3 = MOTION.draw(CUES.Dados + 0.24, CUES.Dados + 1.7)(T);
  const sparkP = MOTION.draw(CUES.Dados + 0.4, CUES.Dados + 1.6)(T);
  const tip = MOTION.pop(CUES.Dados + 1.75, CUES.Dados + 2.35)(T);
  const tipFloat = Math.sin((T - CUES.Dados) * 1.2) * 2 * clamp(tip, 0, 1);

  const activeNav = 0;

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', background: '#f6f6f4', fontFamily: FONT, color: INK, overflow: 'hidden' }}>
      {/* sidebar */}
      <div style={{
        width: 206, flex: '0 0 206px', background: '#121417', padding: '26px 14px', display: 'flex', flexDirection: 'column', gap: 22,
        transform: `translateX(${(nav - 1) * 60}px)`, opacity: 0.25 + 0.75 * nav,
      }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.04em', padding: '0 10px', display: 'flex', alignItems: 'flex-start' }}>
          404devs<span style={{ fontSize: 9, fontWeight: 600, marginTop: 2 }}>®</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV.map((n, i) => {
            const on = i === activeNav;
            const r = MOTION.enter(CUES.Interface + 0.1 + i * 0.05, CUES.Interface + 0.5 + i * 0.05)(T);
            return (
              <div key={n} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 8,
                background: on ? 'rgba(255,255,255,.1)' : 'transparent', opacity: r,
                color: on ? '#fff' : 'rgba(255,255,255,.62)', fontSize: 13.5, fontWeight: on ? 600 : 500,
              }}>
                <span style={{
                  width: 14, height: 14, flex: '0 0 14px', border: '1.5px solid currentColor', opacity: 0.85,
                  borderRadius: i === 2 || i === 5 ? 7 : 3.5,
                }}></span>
                {n}
              </div>
            );
          })}
        </div>
      </div>

      {/* main */}
      <div style={{ flex: 1, minWidth: 0, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 11 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: head, transform: `translateY(${(1 - head) * 12}px)` }}>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.035em' }}>Visão geral</div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: '1px solid #e2e2df',
            borderRadius: 9, padding: '8px 12px', fontSize: 13, color: '#3d4045', boxShadow: '0 1px 2px rgba(15,17,20,.04)',
          }}>
            <span style={{ width: 13, height: 13, border: '1.5px solid #9a9da1', borderRadius: 3 }}></span>
            Últimos 30 dias
            <span style={{ width: 1, height: 16, background: '#e2e2df', margin: '0 2px' }}></span>
            <span style={{ width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '5px solid #6d7074' }}></span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 11 }}>
          <Kpi label="Receita total" value={`R$ ${brl(12430 * count)}`} delta={`+${Math.round(12 * count)}%`} spark={sparkP} color={GREEN} r={kpi(0)} />
          <Kpi label="Novos clientes" value={brl(24 * count2)} delta={`+${Math.round(33 * count2)}%`} spark={sparkP} color={BLUE} r={kpi(1)} />
          <Kpi label="Projetos ativos" value={brl(8 * count3)} delta={`+${Math.round(14 * count3)}%`} spark={sparkP} color={BLUE} r={kpi(2)} />
        </div>

        {/* chart */}
        <Card title="Receita" r={chart} action={null} style={{ gap: 6 }}>
          <div style={{ position: 'absolute', top: 14, right: 16, display: 'flex', gap: 16, fontSize: 12, color: '#6d7074' }}>
            <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><i style={{ width: 8, height: 8, borderRadius: 4, background: INK, display: 'block' }}></i>Receita</span>
            <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><i style={{ width: 8, height: 8, borderRadius: 4, background: '#d5d6d3', display: 'block' }}></i>Despesas</span>
          </div>
          <div style={{ display: 'flex', gap: 10, height: 138, marginTop: 2 }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: 10.5, color: '#9a9da1', paddingBottom: 18, textAlign: 'right', width: 26 }}>
              <span>30K</span><span>20K</span><span>10K</span><span>0</span>
            </div>
            <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: `${i * (100 / 3) * 0.87}%`, height: 1, background: '#eeeeeb' }}></div>
              ))}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', gap: 'clamp(4px, 1%, 14px)', paddingBottom: 18 }}>
                {BARS.map(([rec, des], i) => {
                  const g = MOTION.draw(CUES.Dados + 0.1 + i * 0.055, CUES.Dados + 0.85 + i * 0.055)(T);
                  const unit = 104 / 30;
                  return (
                    <div key={MONTHS[i]} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: '100%', maxWidth: 22, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: 104 }}>
                        <div style={{ height: des * unit * g, background: '#dcdcd8', borderRadius: '3px 3px 0 0' }}></div>
                        <div style={{ height: rec * unit * g, background: INK }}></div>
                      </div>
                      <div style={{ fontSize: 10.5, color: '#8b8e92', position: 'absolute', bottom: 0 }}>{MONTHS[i]}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{
                position: 'absolute', left: '56%', top: -2, background: '#fff', border: '1px solid #e4e4e1', borderRadius: 9,
                padding: '8px 12px', boxShadow: '0 8px 22px rgba(15,17,20,.12)', opacity: clamp(tip, 0, 1),
                transform: `translate(-50%, ${(1 - clamp(tip, 0, 1)) * 10 + tipFloat}px) scale(${0.9 + 0.1 * tip})`,
              }}>
                <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>R$ 12.430</div>
                <div style={{ fontSize: 11.5, fontWeight: 600, color: GREEN, display: 'flex', gap: 3, alignItems: 'center' }}><span style={{ fontSize: 10 }}>↗</span>+12%</div>
              </div>
            </div>
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11, flex: 1, minHeight: 0 }}>
          <Card title="Últimos projetos" action="Ver todos" r={lower(0)}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {PROJECTS.map(([name, status, color], i) => (
                <div key={name} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0',
                  borderTop: i === 0 ? 'none' : '1px solid #efefec', fontSize: 13.5,
                }}>
                  <span style={{ color: '#3d4045' }}>{name}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#3d4045' }}>
                    <i style={{ width: 8, height: 8, borderRadius: 4, background: color, display: 'block' }}></i>{status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Tarefas do dia" action="Ver todas" r={lower(1)}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {TASKS.map((task, i) => {
                const done = i < 3;
                const c = done ? MOTION.pop(CUES.Dados + 1.15 + i * 0.28, CUES.Dados + 1.5 + i * 0.28)(T) : 0;
                return (
                  <div key={task} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '7px 0', fontSize: 13.5, color: '#3d4045' }}>
                    <span style={{
                      width: 18, height: 18, flex: '0 0 18px', borderRadius: 5, border: '1.5px solid #cfd0cd',
                      background: done ? `rgba(18,20,23,${clamp(c, 0, 1)})` : '#fff', borderColor: done && c > 0.5 ? '#121417' : '#cfd0cd',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {done ? (
                        <span style={{
                          width: 9, height: 5, borderLeft: '2px solid #fff', borderBottom: '2px solid #fff',
                          transform: `rotate(-45deg) scale(${clamp(c, 0, 1)})`, marginTop: -2,
                        }}></span>
                      ) : null}
                    </span>
                    {task}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------- laptop geometry ---------- */
const W = 1180;          // body width
const D = 800;           // base depth
const BH = 42;           // base thickness
const LH = 756;          // lid height
const LT = 11;           // lid thickness

function Keyboard() {
  const rows = [
    { h: 26, keys: new Array(13).fill(1) },
    { h: 42, keys: [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5] },
    { h: 42, keys: [1.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.2] },
    { h: 42, keys: [2.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.9] },
    { h: 42, keys: [2.6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.4] },
    { h: 42, keys: [1, 1, 1.2, 6.4, 1.2, 1, 0.5, 0.5] },
  ];
  return (
    <div style={{
      position: 'absolute', left: 108, right: 108, top: 46, background: 'linear-gradient(#0e0f11, #191b1e)',
      borderRadius: 9, padding: 9, display: 'flex', flexDirection: 'column', gap: 5,
      boxShadow: 'inset 0 3px 9px rgba(0,0,0,.75), 0 1px 0 rgba(255,255,255,.34)',
    }}>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', gap: 5, height: row.h }}>
          {row.keys.map((f, ki) => (
            <div key={ki} style={{
              flex: f, borderRadius: 4,
              background: 'linear-gradient(#34373b 0%, #26292c 42%, #191b1e 100%)',
              boxShadow: '0 1.5px 0 rgba(0,0,0,.85), inset 0 1px 0 rgba(255,255,255,.10), inset 0 -2px 3px rgba(0,0,0,.45)',
            }}></div>
          ))}
        </div>
      ))}
    </div>
  );
}

const CAM_X = -18, CAM_Y = -27, SCALE = 0.80, PERSP = 4200;
const ALIAS = { prata: 'Prata', graphite: 'Grafite', grafite: 'Grafite' };
const FINISH = {
  Prata: {
    body: 'linear-gradient(168deg, #eceff1 0%, #cdd2d7 24%, #b3b8be 52%, #c4c9ce 74%, #dde1e5 100%)',
    lid: 'linear-gradient(200deg, #dfe3e7 0%, #c3c8cd 38%, #a4a9af 100%)',
    rim: 'linear-gradient(#cdd2d7 0%, #b0b5bb 38%, #8d9298 100%)',
    edge: 'rgba(255,255,255,.72)',
    grille: 'rgba(0,0,0,.30)',
  },
  Grafite: {
    body: 'linear-gradient(168deg, #979ca1 0%, #74797e 24%, #5a5f64 52%, #676c71 74%, #83888d 100%)',
    lid: 'linear-gradient(200deg, #7c8186 0%, #5f6469 38%, #42464a 100%)',
    rim: 'linear-gradient(#80858a 0%, #64696e 38%, #494d52 100%)',
    edge: 'rgba(255,255,255,.44)',
    grille: 'rgba(0,0,0,.42)',
  },
};
const rad = (d) => (d * Math.PI) / 180;
// z-component of the lid's front-face normal in camera space -> is the screen facing us?
const screenFacing = (A) =>
  Math.sin(rad(A)) * -Math.sin(rad(CAM_X)) + Math.cos(rad(A)) * Math.cos(rad(CAM_Y)) * Math.cos(rad(CAM_X));

function Piece({ tw }) {
  const { T, CUES } = useComposition();
  const openAt = CUES.Abrindo + 0.2;
  const openEnd = CUES.Abrindo + 2.05;
  const target = tw.openAngle;
  const p = MOTION.draw(openAt, openEnd)(T);
  const wobble = T >= openEnd
    ? animate({ from: 1.7, to: 0, start: openEnd, end: openEnd + 1.0, ease: Easing.easeOutQuad })(T) * Math.sin((T - openEnd) * 13)
    : 0;
  const A = -90 + (target + 90) * p + wobble;

  const shellSheen = MOTION.draw(0.1, CUES.Abrindo + 0.3)(T);
  const backlight = MOTION.enter(openAt + 1.15, openEnd + 0.25)(T);
  const uiOn = MOTION.enter(CUES.Interface - 0.35, CUES.Interface + 0.15)(T);
  const shadowSpread = 0.7 + 0.3 * p;
  const sheenX = 20 + 60 * MOTION.draw(CUES.Respiro, CUES.Respiro + 2.2)(T);

  const faceFront = screenFacing(A) > 0.02;
  const fin = FINISH[tw.shell] || FINISH[ALIAS[tw.shell]] || FINISH.Prata;
  const metalTop = fin.body;
  const metalSide = fin.rim;

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'transparent', overflow: 'visible' }}>
      <div style={{
        position: 'absolute', left: '50%', top: '72%', width: 1580, height: 470, marginLeft: -810,
        transform: `rotate(-8.5deg) scaleY(${0.9 + 0.1 * shadowSpread})`, borderRadius: '50%', filter: 'blur(26px)',
        background: `radial-gradient(50% 50% at 50% 50%, rgba(24,26,29,${0.3 * shadowSpread}) 0%, rgba(24,26,29,.12) 46%, rgba(24,26,29,0) 74%)`,
      }}></div>
      <div style={{
        position: 'absolute', left: '50%', top: '79%', width: 1120, height: 190, marginLeft: -640,
        transform: `rotate(-8.5deg)`, borderRadius: '50%', filter: 'blur(13px)',
        background: `radial-gradient(50% 50% at 50% 50%, rgba(20,22,25,${0.34 * shadowSpread}) 0%, rgba(20,22,25,.14) 52%, rgba(20,22,25,0) 78%)`,
      }}></div>
      <div style={{ position: 'absolute', inset: 0, perspective: PERSP + 'px', perspectiveOrigin: '50% 42%' }}>
        <div style={{ position: 'absolute', left: '54%', top: '62%', width: 0, height: 0, transformStyle: 'preserve-3d', transform: `scale3d(${SCALE},${SCALE},${SCALE}) rotateX(${CAM_X}deg) rotateY(${CAM_Y}deg)` }}>

          {/* base */}
          <div style={{ position: 'absolute', left: -W / 2, top: 0, width: W, height: BH, transformStyle: 'preserve-3d', transform: `translateZ(${D / 2}px)` }}>
            {/* top (palm rest + keyboard) */}
            <div style={{
              position: 'absolute', left: 0, top: '50%', width: W, height: D, marginTop: -D / 2,
              transform: `rotateX(90deg) translateZ(${BH / 2}px)`, background: metalTop,
              borderRadius: '7px 7px 26px 26px', overflow: 'hidden',
              boxShadow: `inset 0 0 0 1px ${fin.edge}`,
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(112deg, rgba(255,255,255,.30) 0%, rgba(255,255,255,0) 34%, rgba(255,255,255,.16) 58%, rgba(255,255,255,0) 84%, rgba(0,0,0,.05) 100%)' }}></div>
              {/* speaker grilles */}
              {[{ left: 30 }, { right: 30 }].map((pos, i) => (
                <div key={i} style={{
                  position: 'absolute', ...pos, top: 52, width: 62, height: 250, borderRadius: 6,
                  backgroundImage: `radial-gradient(${fin.grille} 34%, transparent 36%)`,
                  backgroundSize: '7px 7px', opacity: 0.85,
                }}></div>
              ))}
              <Keyboard />
              {/* trackpad */}
              <div style={{
                position: 'absolute', left: '50%', marginLeft: -228, top: 404, width: 456, height: 304, borderRadius: 14,
                background: 'linear-gradient(170deg, rgba(255,255,255,.26), rgba(255,255,255,.04) 46%, rgba(0,0,0,.07))',
                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.16), inset 0 2px 5px rgba(0,0,0,.10), 0 1px 0 rgba(255,255,255,.55)',
              }}></div>
              <div style={{ position: 'absolute', left: '50%', marginLeft: -70, bottom: 24, width: 140, height: 7, borderRadius: 4, background: 'rgba(0,0,0,.12)', boxShadow: '0 1px 0 rgba(255,255,255,.4)' }}></div>
              {/* ambient occlusion along the hinge + the closing lid's own shadow */}
              <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 120, background: 'linear-gradient(rgba(0,0,0,.30), rgba(0,0,0,0))' }}></div>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.18) 60%, rgba(0,0,0,.05))', opacity: Math.pow(1 - p, 1.4) }}></div>
            </div>
            {/* front rim */}
            <div style={{
              position: 'absolute', inset: 0, transform: `translateZ(${D / 2}px)`, background: metalSide,
              borderRadius: '0 0 14px 14px', boxShadow: `inset 0 1px 0 ${fin.edge}, inset 0 -6px 10px rgba(0,0,0,.28)`,
            }}>
              <div style={{ position: 'absolute', left: '50%', marginLeft: -115, top: 13, width: 230, height: 15, borderRadius: 8, background: 'rgba(0,0,0,.22)', boxShadow: 'inset 0 1px 2px rgba(0,0,0,.4)' }}></div>
            </div>
            {/* back rim + hinge barrel */}
            <div style={{ position: 'absolute', inset: 0, transform: `rotateY(180deg) translateZ(${D / 2}px)`, background: 'linear-gradient(#4b4f53,#2c2f32)' }}></div>
            <div style={{
              position: 'absolute', left: 92, top: '50%', width: W - 184, height: 26, marginTop: -13,
              transform: `rotateX(90deg) translateZ(${BH / 2 + 1}px) translateY(${-D / 2 + 13}px)`,
              background: 'linear-gradient(#0a0b0c, #23262a)', borderRadius: '2px 2px 5px 5px',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,.8)',
            }}></div>
            {/* right side (ports) */}
            <div style={{
              position: 'absolute', left: '50%', top: 0, width: D, height: BH, marginLeft: -D / 2,
              transform: `rotateY(90deg) translateZ(${W / 2}px)`, background: metalSide, boxSizing: 'border-box',
              boxShadow: `inset 0 1px 0 ${fin.edge}, inset 0 -5px 9px rgba(0,0,0,.25)`,
              display: 'flex', alignItems: 'center', gap: 22, paddingLeft: 150,
            }}>
              {[34, 34, 22].map((w, i) => (
                <div key={i} style={{ width: w, height: 12, borderRadius: 3, background: 'rgba(0,0,0,.5)', boxShadow: 'inset 0 1px 2px rgba(0,0,0,.7), 0 1px 0 rgba(255,255,255,.35)' }}></div>
              ))}
            </div>
            {/* left side */}
            <div style={{
              position: 'absolute', left: '50%', top: 0, width: D, height: BH, marginLeft: -D / 2,
              transform: `rotateY(-90deg) translateZ(${W / 2}px)`, background: metalSide,
              boxShadow: `inset 0 1px 0 ${fin.edge}, inset 0 -5px 9px rgba(0,0,0,.3)`,
            }}></div>
          </div>

          {/* lid */}
          <div style={{ position: 'absolute', left: -W / 2, top: -4, width: W, height: 0, transformStyle: 'preserve-3d', transformOrigin: '50% 0', transform: `rotateX(${A}deg)` }}>
            <div style={{ position: 'absolute', left: 0, top: -LH, width: W, height: LH, transformStyle: 'preserve-3d' }}>
              {/* screen side */}
              <div data-probe="screen" style={{
                position: 'absolute', inset: 0, transform: `translateZ(${LT / 2}px)`, background: '#0b0c0d',
                visibility: faceFront ? 'visible' : 'hidden',
                borderRadius: '18px 18px 5px 5px', padding: 18, backfaceVisibility: 'hidden',
                boxShadow: `inset 0 0 0 1.5px rgba(255,255,255,.10), inset 0 0 0 3px rgba(0,0,0,.6)`,
              }}>
                <div style={{
                  position: 'absolute', left: '50%', marginLeft: -4, top: 7, width: 8, height: 8, borderRadius: 4,
                  background: 'radial-gradient(circle at 40% 35%, #3c4044, #15171a 70%)', boxShadow: '0 0 0 1px rgba(255,255,255,.06)',
                }}></div>
                <div style={{ position: 'absolute', left: 18, right: 18, top: 18, bottom: 18, borderRadius: 3, overflow: 'hidden', background: '#0b0c0d', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.9)' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, width: 1029, height: 645, transform: 'scale(1.104)', transformOrigin: '0 0', opacity: uiOn }}>
                    <Dashboard T={T} CUES={CUES} />
                  </div>
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(70% 60% at 50% 45%, rgba(255,255,255,.9), rgba(255,255,255,0) 72%)', opacity: 0.35 * backlight * (1 - uiOn) }}></div>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(104deg, rgba(255,255,255,.20) 0%, rgba(255,255,255,.05) 22%, rgba(255,255,255,0) 40%, rgba(255,255,255,.09) 62%, rgba(255,255,255,0) 82%)', pointerEvents: 'none' }}></div>
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(130% 120% at 18% -10%, rgba(255,255,255,.14), rgba(255,255,255,0) 46%), radial-gradient(90% 80% at 108% 112%, rgba(0,0,0,.22), rgba(0,0,0,0) 58%)', pointerEvents: 'none' }}></div>
                  <div style={{ position: 'absolute', inset: 0, background: '#000', opacity: (1 - backlight) * 0.98 }}></div>
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 2.5, textAlign: 'center', fontFamily: FONT, fontSize: 9, fontWeight: 600, letterSpacing: '.2em', color: 'rgba(255,255,255,.3)' }}>404devs</div>
              </div>
              {/* aluminium back of the lid */}
              <div style={{
                position: 'absolute', inset: 0, transform: `rotateY(180deg) translateZ(${LT / 2}px)`,
                background: fin.lid,
                borderRadius: '18px 18px 5px 5px', backfaceVisibility: 'hidden', overflow: 'hidden',
                visibility: faceFront ? 'hidden' : 'visible',
                boxShadow: `inset 0 0 0 1px ${fin.edge}`,
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(${100 + sheenX * 0.2}deg, rgba(255,255,255,0) ${sheenX - 26}%, rgba(255,255,255,.42) ${sheenX}%, rgba(255,255,255,0) ${sheenX + 26}%)`,
                  opacity: 0.4 + 0.6 * shellSheen,
                }}></div>
                <div style={{ position: 'absolute', left: '50%', top: '46%', width: 150, height: 150, marginLeft: -75, marginTop: -75, borderRadius: 75, background: 'radial-gradient(circle, rgba(255,255,255,.22), rgba(255,255,255,0) 68%)' }}></div>
              </div>
              {/* lid edges (chamfered) */}
              <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: LT, transformOrigin: '50% 0', transform: `rotateX(90deg) translateY(${-LT / 2}px)`, background: metalSide, boxShadow: `inset 0 1px 0 ${fin.edge}` }}></div>
              <div style={{ position: 'absolute', left: '50%', top: 0, width: LT, height: LH, marginLeft: -LT / 2, transform: `rotateY(90deg) translateZ(${W / 2}px)`, background: metalSide, boxShadow: `inset 1px 0 0 ${fin.edge}` }}></div>
              <div style={{ position: 'absolute', left: '50%', top: 0, width: LT, height: LH, marginLeft: -LT / 2, transform: `rotateY(-90deg) translateZ(${W / 2}px)`, background: metalSide, boxShadow: `inset -1px 0 0 ${fin.edge}` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


const CUES = { Abrindo: 1.1, Interface: 3.5, Dados: 4.4, Respiro: 7.6 };
const END = 10;
function NotebookScene() {
  const [time, setTime] = React.useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches ? END : 0);
  const [scale, setScale] = React.useState(0);
  const frame = React.useRef(null);
  React.useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1920));
    observer.observe(frame.current);
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let raf, start, elapsed=0;
    const tick = now => {
      if (document.hidden) { start=undefined; raf=requestAnimationFrame(tick); return; }
      if(start !== undefined) elapsed += (now-start)/1000;
      start=now;
      setTime(Math.min(END,elapsed));
      if(elapsed<END) raf=requestAnimationFrame(tick);
    };
    const onMotion = () => { if(motion.matches){cancelAnimationFrame(raf);setTime(END);} };
    motion.addEventListener('change',onMotion);
    if(!motion.matches) raf=requestAnimationFrame(tick);
    return () => { observer.disconnect(); cancelAnimationFrame(raf); motion.removeEventListener('change',onMotion); };
  }, []);
  return <div ref={frame} style={{position:'absolute',inset:0}}>
    <div style={{position:'absolute',width:1920,height:1080,transform:`scale(${scale})`,transformOrigin:'0 0'}}>
      <SceneContext.Provider value={{T:time,CUES}}><Piece tw={{openAngle:17,shell:'Grafite'}} /></SceneContext.Provider>
    </div>
  </div>;
}
const mount = document.getElementById('notebook-scene');
if (mount) {
  const root = createRoot(mount);
  root.render(<NotebookScene />);
  mount.parentElement.classList.add('scene-mounted');
}
