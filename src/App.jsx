import React, { useState, useEffect } from 'react'

const PROFILES = [
  { id: 'claudia', label: 'Dra. Claudia', ig: '@dra.claudia', color: '#C4A870' },
  { id: 'pediatralis', label: 'Pediatralis', ig: '@pediatralis', color: '#C4A870' },
  { id: 'lismed', label: 'Dra. Lis Batista', ig: '@dra.lisbatista', color: '#C4A870' },
  { id: 'amaria', label: 'Amaria', ig: '@amaria.co', color: '#C4A870' },
  { id: 'direito', label: 'Direito da Saúde', ig: '@direitodasaude', color: '#C4A870' },
]

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

const MOCK = {
  claudia: {
    seg: '48.291', segDelta: '+1.3k', pub: '312', sal: '3.412', eng: '2.1%', engDelta: '+0.3%',
    bars: [42,58,31,78,52,44,96,68,47,36,62,74],
    formats: [{ name: 'Reels', pct: 52 }, { name: 'Carrossel', pct: 31 }, { name: 'Foto', pct: 17 }],
    posts: [
      { rank: 1, format: 'Reel', curtidas: '4.218', salvamentos: '892', comentarios: '314',
        why: 'Gancho de dor nos primeiros 3 segundos + dado estatístico no meio. CTA de salvamento no final gerou 3x mais retenção neste perfil.',
        repost: 'Repostar com gancho atualizado e novo dado de 2026' },
      { rank: 2, format: 'Carrossel', curtidas: '2.841', salvamentos: '1.102', comentarios: '199',
        why: 'Tema diagnóstico precoce. Slide 1 gerou curiosidade sem entregar a resposta — padrão de alta rolagem. Salvamentos indicam conteúdo de referência.',
        repost: 'Versão atualizada com novo estudo clínico' },
      { rank: 3, format: 'Reel', curtidas: '2.103', salvamentos: '541', comentarios: '278',
        why: 'Publicado às 18h30 na quinta — pico de audiência. Legenda curta + pergunta direta gerou volume de comentários acima da média.',
        repost: null },
    ],
    recos: [
      { icon: '⏰', tip: 'Poste às 18h nas quintas e domingos', sub: 'Horário de maior alcance do perfil' },
      { icon: '▶', tip: 'Reels com dado + pergunta performam 3x mais', sub: 'Padrão identificado em 8 posts' },
      { icon: '◎', tip: 'Meta: 16 posts/mês para manter crescimento', sub: 'Baseado na evolução de março' },
    ],
    trends: ['Como prevenir diabetes tipo 2', 'Sintomas de burnout médico', 'Check-up anual o que inclui', 'Médico ginecologista particular'],
  },
  pediatralis: {
    seg: '127.941', segDelta: '+4.1k', pub: '760', sal: '2.601', eng: '1.24%', engDelta: 'estável',
    bars: [55,72,44,89,61,52,96,66,46,41,73,81],
    formats: [{ name: 'Reels', pct: 60 }, { name: 'Carrossel', pct: 25 }, { name: 'Foto', pct: 15 }],
    posts: [
      { rank: 1, format: 'Reel', curtidas: '11.204', salvamentos: '2.108', comentarios: '836',
        why: 'Tema febre na criança — alta busca ativa no Google. O hook "isso que você faz está errado" disparou compartilhamentos com mães.',
        repost: 'Repostar na época de gripe com ajuste no gancho' },
      { rank: 2, format: 'Carrossel', curtidas: '7.412', salvamentos: '3.204', comentarios: '514',
        why: 'Guia visual de vacinação — conteúdo de referência. Taxa de salvamento 4x acima da média. Mães salvam para consultar depois.',
        repost: 'Versão atualizada com calendário 2026' },
      { rank: 3, format: 'Reel', curtidas: '5.108', salvamentos: '982', comentarios: '624',
        why: 'Pergunta polêmica no gancho gerou alto volume de comentários discordantes = maior alcance orgânico pelo algoritmo.',
        repost: null },
    ],
    recos: [
      { icon: '⏰', tip: 'Poste às 16h — pico de mães após escola', sub: 'Melhor horário identificado' },
      { icon: '▶', tip: 'Reels com tema de urgência engajam 4x mais', sub: 'Padrão em 12 posts analisados' },
      { icon: '◎', tip: 'Meta: 20 posts/mês — perfil em aceleração', sub: 'Crescimento de 4.1k em março' },
    ],
    trends: ['Febre em bebê quando ir ao pronto socorro', 'Vacinas crianças 2026', 'Pediatra particular SP', 'Desenvolvimento motor bebê 6 meses'],
  },
  lismed: {
    seg: '31.502', segDelta: '+920', pub: '198', sal: '1.108', eng: '3.4%', engDelta: '+0.8%',
    bars: [30,51,46,71,39,61,86,56,41,36,66,73],
    formats: [{ name: 'Carrossel', pct: 48 }, { name: 'Reels', pct: 35 }, { name: 'Foto', pct: 17 }],
    posts: [
      { rank: 1, format: 'Carrossel', curtidas: '1.801', salvamentos: '621', comentarios: '199',
        why: 'Conteúdo técnico sobre publicação em revista médica. Audiência B2B salva para referência profissional. Tom de autoridade + dados de impacto.',
        repost: 'Repostar com atualização de métricas do estudo' },
      { rank: 2, format: 'Reel', curtidas: '1.204', salvamentos: '381', comentarios: '314',
        why: 'Bastidores de consultoria estratégica — humaniza a marca sem perder autoridade. Comentários revelam dor de médicos sem tempo.',
        repost: null },
      { rank: 3, format: 'Carrossel', curtidas: '981', salvamentos: '512', comentarios: '146',
        why: 'Checklist de gestão de clínica — conteúdo de alto valor prático. Taxa de salvamento 6x a média. Cada slide resolve um problema específico.',
        repost: 'Versão 2026 com novos indicadores de gestão' },
    ],
    recos: [
      { icon: '⏰', tip: 'Poste às 19h — médicos consomem à noite', sub: 'Padrão B2B identificado' },
      { icon: '▶', tip: 'Carrosséis técnicos com checklist geram mais leads', sub: '6 de 8 top posts são carrosséis' },
      { icon: '◎', tip: 'Meta: 10 posts/mês com qualidade acima de volume', sub: 'Perfil B2B — impacto maior' },
    ],
    trends: ['Gestão de clínica médica', 'Como publicar em revista científica', 'Marketing médico CFM', 'Consultoria para médicos'],
  },
  amaria: {
    seg: '22.108', segDelta: '+680', pub: '145', sal: '891', eng: '4.2%', engDelta: 'maior da carteira',
    bars: [25,46,36,61,43,56,89,51,39,31,59,66],
    formats: [{ name: 'Carrossel', pct: 55 }, { name: 'Reels', pct: 30 }, { name: 'Foto', pct: 15 }],
    posts: [
      { rank: 1, format: 'Carrossel', curtidas: '1.401', salvamentos: '721', comentarios: '246',
        why: 'Framework de estratégia de conteúdo médico — conteúdo de referência para gestores. Alta densidade de valor por slide.',
        repost: 'Repostar com casos reais de clientes' },
      { rank: 2, format: 'Reel', curtidas: '981', salvamentos: '341', comentarios: '199',
        why: 'Bastidores de criação de conteúdo para médicos. Tom real gerou identificação forte. Comentários revelam dor de médicos sem tempo para conteúdo.',
        repost: null },
      { rank: 3, format: 'Carrossel', curtidas: '761', salvamentos: '481', comentarios: '133',
        why: 'Checklist pré-lançamento — alta intenção de ação. Pessoas salvam para usar depois. Conteúdo de planejamento tem alto salvamento.',
        repost: 'Versão voltada para pré-lançamento de produto' },
    ],
    recos: [
      { icon: '⏰', tip: 'Poste às 17h — pico de empreendedores', sub: 'Melhor horário do perfil' },
      { icon: '▶', tip: 'Frameworks visuais em carrossel têm 5x mais salvamentos', sub: 'Padrão em 10 posts analisados' },
      { icon: '◎', tip: 'Meta: 12 posts/mês com foco em autoridade', sub: 'Perfil em construção de marca' },
    ],
    trends: ['Marketing médico como fazer', 'Conteúdo para médicos Instagram', 'Estratégia redes sociais clínica', 'Como médico atrair pacientes'],
  },
  direito: {
    seg: '15.812', segDelta: '+1.2k', pub: '98', sal: '651', eng: '5.1%', engDelta: 'crescimento forte',
    bars: [21,39,31,56,36,49,81,43,33,29,53,61],
    formats: [{ name: 'Carrossel', pct: 62 }, { name: 'Reels', pct: 25 }, { name: 'Foto', pct: 13 }],
    posts: [
      { rank: 1, format: 'Carrossel', curtidas: '1.108', salvamentos: '581', comentarios: '314',
        why: 'Direitos do paciente — alta busca e alta tensão. Compartilhamentos de pacientes indignados ampliaram o alcance organicamente 8x.',
        repost: 'Repostar com novo caso jurídico recente' },
      { rank: 2, format: 'Carrossel', curtidas: '821', salvamentos: '491', comentarios: '199',
        why: 'Guia: o que fazer quando o plano nega o procedimento. Salvo para usar em momento de crise. Alta retenção e utilidade pública.',
        repost: 'Atualizar com novas resoluções ANS 2026' },
      { rank: 3, format: 'Reel', curtidas: '641', salvamentos: '281', comentarios: '246',
        why: 'Gancho de indignação = alto compartilhamento. Comentários viraram leads para consultoria jurídica.',
        repost: null },
    ],
    recos: [
      { icon: '⏰', tip: 'Poste às 20h — maior consumo jurídico', sub: 'Pico identificado em 8 posts' },
      { icon: '▶', tip: 'Conteúdo de direitos com utilidade pública gera leads', sub: 'Padrão: salvar → buscar especialista' },
      { icon: '◎', tip: 'Meta: 8 posts/mês — qualidade jurídica exige revisão', sub: 'Perfil em aceleração' },
    ],
    trends: ['Negativa plano de saúde o que fazer', 'Direitos do paciente SUS', 'Plano de saúde pode negar cirurgia', 'Advogado saúde online'],
  },
}

function BarChart({ bars }) {
  const max = Math.max(...bars)
  const days = ['1','3','5','7','9','11','13','15','17','19','21','23']
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 80 }}>
      {bars.map((v, i) => {
        const pct = Math.round((v / max) * 100)
        const isPeak = v === max
        const isHigh = v >= max * 0.75 && !isPeak
        return (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, height: '100%' }}>
            <div style={{
              width: '100%', borderRadius: '2px 2px 0 0',
              height: `${pct}%`,
              background: isPeak ? '#C4A870' : isHigh ? '#7A6840' : '#2E2A1E',
              transition: 'height 0.4s ease'
            }} />
            <span style={{ fontSize: 9, color: '#3A3428' }}>{days[i]}</span>
          </div>
        )
      })}
    </div>
  )
}

function FormatList({ formats }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {formats.map(f => (
        <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, color: '#7A6E5A', width: 64, flexShrink: 0 }}>{f.name}</span>
          <div style={{ flex: 1, height: 4, background: '#2E2A1E', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${f.pct}%`, background: '#C4A870', borderRadius: 2 }} />
          </div>
          <span style={{ fontSize: 11, color: '#EDE8DF', fontWeight: 500, width: 28, textAlign: 'right' }}>{f.pct}%</span>
        </div>
      ))}
    </div>
  )
}

function PostCard({ post }) {
  return (
    <div style={{ background: '#161410', border: '0.5px solid #2A2620', borderRadius: 8, padding: '12px 14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 22, height: 22, borderRadius: '50%',
            background: '#231F18', border: '0.5px solid #C4A870',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, color: '#C4A870', fontWeight: 500, flexShrink: 0
          }}>{post.rank}</div>
          <span style={{ fontSize: 10, color: '#7A6E5A', background: '#1E1A14', border: '0.5px solid #2A2620', borderRadius: 10, padding: '2px 8px' }}>{post.format}</span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {[['♥', post.curtidas], ['⤓', post.salvamentos], ['◷', post.comentarios]].map(([icon, val]) => (
            <span key={icon} style={{ fontSize: 10, color: '#5A5044' }}>
              <span style={{ color: '#EDE8DF', fontWeight: 500 }}>{val}</span> {icon === '♥' ? 'curtidas' : icon === '⤓' ? 'salvamentos' : 'comentários'}
            </span>
          ))}
        </div>
      </div>
      <div style={{ background: '#1A1812', borderLeft: '2px solid #C4A870', borderRadius: '0 4px 4px 0', padding: '8px 10px', marginTop: 6 }}>
        <div style={{ fontSize: 9, color: '#C4A870', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>Por que engajou</div>
        <div style={{ fontSize: 11, color: '#8A7E6E', lineHeight: 1.6 }}>{post.why}</div>
      </div>
      {post.repost && (
        <div style={{ fontSize: 10, color: '#6A8A5A', background: '#161E14', border: '0.5px solid #3A5030', borderRadius: 10, padding: '3px 10px', marginTop: 8, display: 'inline-block' }}>
          Sugestão de repost: {post.repost}
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [activeProfile, setActiveProfile] = useState('claudia')
  const [activeMonth, setActiveMonth] = useState('Mar')
  const now = new Date()

  const d = MOCK[activeProfile]

  return (
    <div style={{ minHeight: '100vh', background: '#111009' }}>
      {/* TOPBAR */}
      <div style={{ background: '#1A1812', borderBottom: '0.5px solid #2E2A1E', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 32, border: '0.5px solid #C4A870', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" stroke="#C4A870" strokeWidth="1.5">
              <path d="M7 1C7 1 3 3 3 8C3 11.3 4.8 14 7 15C9.2 14 11 11.3 11 8C11 3 7 1 7 1Z"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.18em', color: '#C4A870', fontWeight: 500, textTransform: 'uppercase' }}>Officium</div>
            <div style={{ fontSize: 9, letterSpacing: '0.1em', color: '#5A5044', textTransform: 'uppercase' }}>Boutique · Estratégia Médica</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6A8A5A' }} />
          <span style={{ fontSize: 10, color: '#5A8A5A' }}>API conectada</span>
          <div style={{ fontSize: 10, color: '#5A5044', border: '0.5px solid #2E2A1E', borderRadius: 20, padding: '4px 12px' }}>
            {MONTHS[now.getMonth()]} · {now.getFullYear()}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ background: '#161410', borderBottom: '0.5px solid #2E2A1E', padding: '0 20px', display: 'flex', gap: 0, overflowX: 'auto' }}>
        {PROFILES.map(p => (
          <button key={p.id} onClick={() => setActiveProfile(p.id)} style={{
            fontSize: 10, letterSpacing: '0.1em', color: activeProfile === p.id ? '#C4A870' : '#4A4438',
            padding: '13px 18px', border: 'none', background: 'none', cursor: 'pointer',
            borderBottom: activeProfile === p.id ? '2px solid #C4A870' : '2px solid transparent',
            whiteSpace: 'nowrap', transition: 'all 0.15s', textTransform: 'uppercase', flexShrink: 0
          }}>{p.label}</button>
        ))}
        <button style={{ border: '0.5px dashed #3A3020', borderRadius: 8, margin: '8px 0 8px 8px', padding: '0 14px', fontSize: 10, color: '#4A4438', background: 'none', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0 }}>+ perfil</button>
      </div>

      {/* CONTENT */}
      <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 1200, margin: '0 auto' }}>

        {/* FILTROS */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ fontSize: 9, color: '#4A4438', letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: 4 }}>Período</span>
          {MONTHS.map(m => (
            <button key={m} onClick={() => setActiveMonth(m)} style={{
              fontSize: 10, color: activeMonth === m ? '#131210' : '#5A5044',
              padding: '4px 12px', border: '0.5px solid', borderColor: activeMonth === m ? '#C4A870' : '#2A2620',
              borderRadius: 20, background: activeMonth === m ? '#C4A870' : 'none', cursor: 'pointer', transition: 'all 0.12s'
            }}>{m}</button>
          ))}
        </div>

        {/* MÉTRICAS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 10 }}>
          {[
            { label: 'Seguidores', val: d.seg, delta: d.segDelta, up: true },
            { label: 'Publicações', val: d.pub, delta: `no mês`, up: null },
            { label: 'Salvamentos', val: d.sal, delta: '+8% vs mês anterior', up: true },
            { label: 'Engajamento', val: d.eng, delta: d.engDelta, up: true },
          ].map(m => (
            <div key={m.label} style={{ background: '#1A1812', border: '0.5px solid #2A2620', borderRadius: 8, padding: '12px 14px' }}>
              <div style={{ fontSize: 9, letterSpacing: '0.1em', color: '#4A4438', textTransform: 'uppercase', marginBottom: 6 }}>{m.label}</div>
              <div style={{ fontSize: 22, fontWeight: 500, color: '#EDE8DF', letterSpacing: '-0.01em' }}>{m.val}</div>
              <div style={{ fontSize: 9, marginTop: 3, color: m.up ? '#6A8A5A' : '#5A5044' }}>{m.delta}</div>
            </div>
          ))}
        </div>

        {/* GRÁFICOS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: 10 }}>
          <div style={{ background: '#1A1812', border: '0.5px solid #2A2620', borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.1em', color: '#4A4438', textTransform: 'uppercase', marginBottom: 12 }}>Curtidas por publicação</div>
            <BarChart bars={d.bars} />
          </div>
          <div style={{ background: '#1A1812', border: '0.5px solid #2A2620', borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.1em', color: '#4A4438', textTransform: 'uppercase', marginBottom: 12 }}>Formato de conteúdo</div>
            <FormatList formats={d.formats} />
          </div>
        </div>

        {/* POR QUE ESTÃO ENGAJANDO */}
        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.12em', color: '#4A4438', textTransform: 'uppercase', marginBottom: 10, paddingBottom: 8, borderBottom: '0.5px solid #2A2620', display: 'flex', alignItems: 'center', gap: 6 }}>
            Por que estão engajando?
            <span style={{ fontSize: 8, color: '#C4A870', background: '#1E1A12', border: '0.5px solid #3A3020', borderRadius: 10, padding: '2px 7px' }}>análise IA</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {d.posts.map(p => <PostCard key={p.rank} post={p} />)}
          </div>
        </div>

        {/* RECOMENDAÇÕES */}
        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.12em', color: '#4A4438', textTransform: 'uppercase', marginBottom: 10, paddingBottom: 8, borderBottom: '0.5px solid #2A2620', display: 'flex', alignItems: 'center', gap: 6 }}>
            Recomendações automáticas
            <span style={{ fontSize: 8, color: '#C4A870', background: '#1E1A12', border: '0.5px solid #3A3020', borderRadius: 10, padding: '2px 7px' }}>método amaria</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 10 }}>
            {d.recos.map((r, i) => (
              <div key={i} style={{ background: '#1A1812', border: '0.5px solid #2A2620', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ width: 24, height: 24, borderRadius: 4, background: '#1E1A12', border: '0.5px solid #3A3020', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, fontSize: 12 }}>{r.icon}</div>
                <div style={{ fontSize: 12, color: '#EDE8DF', lineHeight: 1.4, marginBottom: 3, fontWeight: 500 }}>{r.tip}</div>
                <div style={{ fontSize: 9, color: '#4A4438' }}>{r.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TRENDS */}
        <div style={{ background: '#1A1812', border: '0.5px solid #2A2620', borderRadius: 8, padding: '14px 16px', marginBottom: 24 }}>
          <div style={{ fontSize: 9, letterSpacing: '0.12em', color: '#4A4438', textTransform: 'uppercase', marginBottom: 12 }}>O que os leads estão buscando agora</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {d.trends.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', background: '#161410', borderRadius: 6 }}>
                <span style={{ fontSize: 9, color: '#4A4438', width: 14 }}>{i + 1}</span>
                <span style={{ fontSize: 11, color: '#8A7E6E', flex: 1 }}>{t}</span>
                <span style={{ fontSize: 9, color: '#C4A870', border: '0.5px solid #3A3020', borderRadius: 10, padding: '1px 8px' }}>{['alto', 'alto', 'médio', 'médio'][i]}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
