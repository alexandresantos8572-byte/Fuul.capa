import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const devices = [
  {brand:'Samsung', model:'Galaxy A05', refresh:60, tier:'entry'}, {brand:'Samsung', model:'Galaxy A06', refresh:60, tier:'entry'},
  {brand:'Samsung', model:'Galaxy A15', refresh:90, tier:'mid'}, {brand:'Samsung', model:'Galaxy A16', refresh:90, tier:'mid'},
  {brand:'Samsung', model:'Galaxy A24', refresh:90, tier:'mid'}, {brand:'Samsung', model:'Galaxy A25', refresh:120, tier:'mid'},
  {brand:'Samsung', model:'Galaxy A34', refresh:120, tier:'mid'}, {brand:'Samsung', model:'Galaxy A35', refresh:120, tier:'mid'},
  {brand:'Samsung', model:'Galaxy A54', refresh:120, tier:'mid'}, {brand:'Samsung', model:'Galaxy A55', refresh:120, tier:'mid'},
  {brand:'Samsung', model:'Galaxy A56', refresh:120, tier:'mid'}, {brand:'Samsung', model:'Galaxy S21', refresh:120, tier:'high'},
  {brand:'Samsung', model:'Galaxy S22', refresh:120, tier:'high'}, {brand:'Samsung', model:'Galaxy S23', refresh:120, tier:'high'},
  {brand:'Samsung', model:'Galaxy S24', refresh:120, tier:'high'}, {brand:'Samsung', model:'Galaxy S25', refresh:120, tier:'high'},
  {brand:'Motorola', model:'Moto E13', refresh:60, tier:'entry'}, {brand:'Motorola', model:'Moto E14', refresh:60, tier:'entry'},
  {brand:'Motorola', model:'Moto G04', refresh:90, tier:'entry'}, {brand:'Motorola', model:'Moto G24', refresh:90, tier:'entry'},
  {brand:'Motorola', model:'Moto G34', refresh:120, tier:'mid'}, {brand:'Motorola', model:'Moto G54', refresh:120, tier:'mid'},
  {brand:'Motorola', model:'Moto G55', refresh:120, tier:'mid'}, {brand:'Motorola', model:'Moto G84', refresh:120, tier:'mid'},
  {brand:'Motorola', model:'Moto G85', refresh:120, tier:'mid'}, {brand:'Motorola', model:'Edge 40', refresh:144, tier:'high'},
  {brand:'Motorola', model:'Edge 50', refresh:144, tier:'high'},
  {brand:'Xiaomi', model:'Redmi 12', refresh:90, tier:'mid'}, {brand:'Xiaomi', model:'Redmi 13', refresh:90, tier:'mid'},
  {brand:'Xiaomi', model:'Redmi Note 12', refresh:120, tier:'mid'}, {brand:'Xiaomi', model:'Redmi Note 13', refresh:120, tier:'mid'},
  {brand:'Xiaomi', model:'Redmi Note 13 Pro', refresh:120, tier:'high'}, {brand:'Xiaomi', model:'Redmi Note 14', refresh:120, tier:'mid'},
  {brand:'Xiaomi', model:'POCO M6', refresh:90, tier:'mid'}, {brand:'Xiaomi', model:'POCO X5', refresh:120, tier:'mid'},
  {brand:'Xiaomi', model:'POCO X6', refresh:120, tier:'high'}, {brand:'Xiaomi', model:'POCO X7', refresh:120, tier:'high'},
  {brand:'Xiaomi', model:'POCO F5', refresh:120, tier:'high'}, {brand:'Xiaomi', model:'POCO F6', refresh:120, tier:'high'},
  {brand:'Realme', model:'C55', refresh:90, tier:'entry'}, {brand:'Realme', model:'C65', refresh:90, tier:'mid'},
  {brand:'Realme', model:'C75', refresh:90, tier:'mid'}, {brand:'Realme', model:'11', refresh:120, tier:'mid'},
  {brand:'Realme', model:'12', refresh:120, tier:'mid'}, {brand:'Realme', model:'13', refresh:120, tier:'mid'},
  {brand:'Infinix', model:'Hot 40', refresh:90, tier:'entry'}, {brand:'Infinix', model:'Hot 50', refresh:120, tier:'mid'},
  {brand:'Infinix', model:'Note 40', refresh:120, tier:'mid'}, {brand:'Infinix', model:'Pova 5', refresh:120, tier:'mid'},
  {brand:'Tecno', model:'Spark 20', refresh:90, tier:'entry'}, {brand:'Tecno', model:'Spark 30', refresh:90, tier:'mid'},
  {brand:'Tecno', model:'Pova 6', refresh:120, tier:'mid'},
  {brand:'Apple', model:'iPhone 11', refresh:60, tier:'high'}, {brand:'Apple', model:'iPhone 12', refresh:60, tier:'high'},
  {brand:'Apple', model:'iPhone 13', refresh:60, tier:'high'}, {brand:'Apple', model:'iPhone 14', refresh:60, tier:'high'},
  {brand:'Apple', model:'iPhone 15', refresh:60, tier:'high'}, {brand:'Apple', model:'iPhone 16', refresh:60, tier:'high'},
  {brand:'ASUS', model:'ROG Phone 6', refresh:165, tier:'high'}, {brand:'ASUS', model:'ROG Phone 7', refresh:165, tier:'high'},
];
const base = {entry:{s:[178,166,154,138,78,145], dpi:440, button:48},mid:{s:[184,172,160,146,82,150],dpi:520,button:50},high:{s:[190,178,164,150,86,155],dpi:600,button:48}};
const labels=['Geral','Ponto vermelho','Mira 2x','Mira 4x','Mira AWM','Olhadinha'];
function App(){
 const [brand,setBrand]=useState(''); const [model,setModel]=useState(''); const [style,setStyle]=useState('balanced'); const [fingers,setFingers]=useState('2'); const [generated,setGenerated]=useState(null); const [optimized,setOptimized]=useState(false); const [feedback,setFeedback]=useState(''); const [saved,setSaved]=useState(()=>JSON.parse(localStorage.getItem('sfc-saved')||'[]'));
 const models=useMemo(()=>devices.filter(d=>d.brand===brand),[brand]);
 useEffect(()=>{setModel('');setGenerated(null);setOptimized(false)},[brand]);
 function generate(){ if(!model){alert('Escolha o modelo do celular primeiro.');return;} const d=devices.find(x=>x.model===model&&x.brand===brand); let vals=[...base[d.tier].s], dpi=base[d.tier].dpi, btn=base[d.tier].button;
 if(style==='fast'){vals=vals.map((v,i)=>Math.min(200,v+[5,6,5,4,2,4][i]));dpi+=40;btn+=2;}
 if(style==='control'){vals=vals.map((v,i)=>Math.max(0,v-[8,8,7,6,3,6][i]));dpi-=40;btn-=2;}
 if(fingers==='3'){vals[0]-=2; vals[1]-=1;btn+=1;} if(fingers==='4'){vals[0]-=4;vals[1]-=2;btn+=2;}
 const result={device:`${brand} ${model}`,values:vals,dpi,button:Math.max(35,Math.min(70,btn)),refresh:d.refresh,style,fingers,created:new Date().toISOString()};setGenerated(result);setOptimized(false);setFeedback('');}
 function tune(){if(!generated)return;let vals=[...generated.values], dpi=generated.dpi; if(feedback==='overshoot'){vals=vals.map(v=>Math.max(0,v-6));dpi=Math.max(320,dpi-30);} if(feedback==='short'){vals=vals.map((v,i)=>Math.min(200,v+[7,6,5,4,2,4][i]));dpi=Math.min(900,dpi+30);} if(feedback==='shake'){vals=vals.map((v,i)=>Math.max(0,v-[10,8,7,5,3,7][i]));dpi=Math.max(320,dpi-50);} setGenerated({...generated,values:vals,dpi});setFeedback('');setOptimized(false);}
 function save(){if(!generated)return;const next=[generated,...saved].slice(0,12);setSaved(next);localStorage.setItem('sfc-saved',JSON.stringify(next));}
 function copy(){if(!generated)return;const txt=`SENSI FULL CAPA\n${generated.device}\n${labels.map((l,i)=>`${l}: ${generated.values[i]}`).join('\n')}\nDPI sugerida: ${generated.dpi}\nBotão de tiro: ${generated.button}%`;navigator.clipboard?.writeText(txt).then(()=>alert('Configuração copiada!')).catch(()=>alert(txt));}
 return <div className="app"><header><div className="brand"><span className="crown">♛</span><div>SENSI <b>FULL CAPA</b><small>CONFIGURAÇÃO GAMER</small></div></div><span className="version">V1.0</span></header>
 <section className="hero"><div className="hero-art"><img src="/sensi-full-capa.png" alt="Logo Sensi Full Capa"/><div className="hero-copy"><h1>SUBA CAPA.<br/><em>NO SEU RITMO.</em></h1><p>Perfil de sensibilidade para o seu aparelho</p></div></div></section>
 <main><section className="panel"><div className="step">01 / APARELHO</div><h2>Qual celular você usa?</h2><p className="sub">Selecione a marca e o modelo que você joga.</p><label>Marca do aparelho</label><select value={brand} onChange={e=>setBrand(e.target.value)}><option value="">Selecionar marca</option>{[...new Set(devices.map(d=>d.brand))].map(b=><option key={b}>{b}</option>)}</select><label>Modelo</label><select value={model} onChange={e=>setModel(e.target.value)} disabled={!brand}><option value="">{brand?'Selecionar modelo':'Escolha a marca acima'}</option>{models.map(d=><option key={d.model}>{d.model}</option>)}</select><div className="device-note">Modelos disponíveis: {devices.length} · Lista inicial, será ampliada e conferida.</div></section>
 <section className="panel"><div className="step">02 / ESTILO</div><h2>Personalize sua jogabilidade</h2><div className="two"><div><label>Estilo de mira</label><select value={style} onChange={e=>setStyle(e.target.value)}><option value="balanced">Equilibrado</option><option value="fast">Puxada rápida</option><option value="control">Mais controle</option></select></div><div><label>Quantos dedos?</label><select value={fingers} onChange={e=>setFingers(e.target.value)}><option value="2">2 dedos</option><option value="3">3 dedos</option><option value="4">4 dedos</option></select></div></div><button className="primary" onClick={generate}>⚡ GERAR SENSI FULL CAPA</button></section>
 {generated&&<section className="panel result"><div className="step">03 / SUA CONFIGURAÇÃO</div><div className="result-head"><div><h2>Perfil recomendado</h2><p className="sub">{generated.device} · tela {generated.refresh} Hz (perfil inicial)</p></div><span className="badge">GERADO</span></div><div className="sensilist">{labels.map((l,i)=><div className="sensirow" key={l}><span>{l}</span><strong>{generated.values[i]}</strong><div className="bar"><i style={{width:`${generated.values[i]/2}%`}}/></div></div>)}</div><div className="metrics"><div><small>DPI sugerida</small><b>{generated.dpi}</b><span>Referência, não aplicada automaticamente</span></div><div><small>Botão de tiro</small><b>{generated.button}%</b><span>Comece por este tamanho</span></div></div><button className="secondary" onClick={copy}>▣ COPIAR CONFIGURAÇÃO</button><button className="secondary" onClick={save}>♡ SALVAR PERFIL</button><div className="warn">As recomendações são pontos de partida estimados, não medições específicas do aparelho nem promessa de capa. Teste no campo de treinamento e ajuste aos poucos.</div></section>}
 <section className="panel optimizer"><div className="step">04 / CONTROLE</div><h2>Otimização de mira</h2><p className="sub">Selecione o que acontece durante o arrasto. O app recalibra as recomendações para o próximo teste.</p><div className="feedback"><button className={feedback==='overshoot'?'selected':''} onClick={()=>setFeedback('overshoot')}>Passa da cabeça</button><button className={feedback==='short'?'selected':''} onClick={()=>setFeedback('short')}>Fica no peito</button><button className={feedback==='shake'?'selected':''} onClick={()=>setFeedback('shake')}>Mira tremendo</button></div><button className="primary" disabled={!generated||!feedback} onClick={tune}>AJUSTAR E TESTAR</button><button className={`activate ${optimized?'on':''}`} disabled={!generated} onClick={()=>setOptimized(v=>!v)}>{optimized?'✓ PERFIL DE TESTE ATIVO':'⛭ ATIVAR PERFIL DE ESTABILIDADE'}</button><div className="warn">Este botão ativa um perfil de ajuste dentro do Sensi Full Capa. Um app comum não consegue estabilizar a mira dentro do Free Fire nem alterar o jogo ou a DPI do sistema automaticamente. A DPI deve ser aplicada manualmente nas configurações compatíveis do Android.</div></section>
 <section className="panel saved"><div className="step">05 / HISTÓRICO</div><h2>Perfis salvos</h2>{saved.length===0?<p className="sub">Suas configurações salvas aparecerão aqui.</p>:saved.map((s,i)=><div className="saveditem" key={i}><span>{s.device}</span><small>DPI {s.dpi} · Geral {s.values[0]}</small></div>)}</section></main><footer> SENSI FULL CAPA <span>Ferramenta independente de recomendações. Não afiliada à Garena.</span></footer></div>;
}
createRoot(document.getElementById('root')).render(<App/>);
