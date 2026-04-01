import React, { useState } from 'react'
import Login from './Login.jsx'
import AdminPanel from './AdminPanel.jsx'

const PERFIS = [
  { id:'claudia',      label:'Dra. Claudia',      ig:'draclaudia' },
  { id:'pediatralis',  label:'Pediatralis',        ig:'pediatralis' },
  { id:'vanderlene',   label:'Vanderlene Feitosa', ig:'vanderlenefeitosa' },
  { id:'lismed',       label:'Dra. Lis Batista',   ig:'dralistabatista' },
  { id:'amaria',       label:'Amaria',             ig:'amariavanderlene' },
]

const MESES = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']

const DADOS = {
  claudia: {
    seg:'48.291', segDelta:'+1.3k', pub:'312', sal:'3.412', eng:'2.1%', engDelta:'+0.3%',
    alcance:'124.800', impressoes:'312.400', visitas:'8.240', cliques:'1.102', alcNaoSeg:'68%',
    legendaIdeal:'Longa (acima de 150 palavras)',
    stories:{ alcance:'12.400', toqueFrente:'34%', saidas:'8%', respostas:'240' },
    bars:[42,58,31,78,52,44,96,68,47,36,62,74],
    formatos:[{n:'Reels',p:52},{n:'Carrossel',p:31},{n:'Foto',p:17}],
    horarios:[{d:'Seg',h:'19h',e:'1.8%'},{d:'Ter',h:'18h',e:'1.9%'},{d:'Qua',h:'20h',e:'2.0%'},{d:'Qui',h:'18h',e:'2.4%'},{d:'Sex',h:'17h',e:'2.1%'},{d:'Sáb',h:'11h',e:'1.7%'},{d:'Dom',h:'19h',e:'2.6%'}],
    posts:[
      {r:1,f:'Reel',cur:'4.218',sal:'892',com:'314',why:'Gancho de dor nos primeiros 3s + dado estatístico. CTA de salvamento gerou 3x mais retenção.',repost:'Repostar com gancho atualizado e novo dado de 2026'},
      {r:2,f:'Carrossel',cur:'2.841',sal:'1.102',com:'199',why:'Slide 1 gerou curiosidade sem entregar a resposta — padrão de alta rolagem. Salvamentos indicam referência.',repost:'Versão atualizada com novo estudo clínico'},
      {r:3,f:'Reel',cur:'2.103',sal:'541',com:'278',why:'Publicado às 18h30 na quinta. Legenda curta + pergunta direta gerou volume de comentários acima da média.',repost:null},
    ],
    hooks:[{h:'"Você está fazendo isso errado..."',e:'4.2%',p:3},{h:'"Ninguém te contou que..."',e:'3.8%',p:2},{h:'"Estudo comprova que..."',e:'3.5%',p:4},{h:'"O erro que 90% comete..."',e:'3.1%',p:2}],
    dores:[{d:'Dificuldade de encontrar médico de confiança',f:48,ex:'"Onde encontro um especialista bom?"'},{d:'Medo de diagnóstico tardio',f:34,ex:'"Passei anos sem saber que tinha isso"'},{d:'Custo elevado de consultas',f:28,ex:'"Plano de saúde não cobre nada"'}],
    viral:[{t:'Mitos sobre check-up anual',p:'Alto',m:'Alta busca + indignação = compartilhamento orgânico'},{t:'O que o plano de saúde esconde',p:'Alto',m:'Tema polêmico + utilidade pública = viralização'},{t:'Rotina de uma médica real',p:'Médio',m:'Humanização + curiosidade = identificação'}],
    recos:[{t:'Poste às 19h aos domingos',s:'Maior pico de engajamento'},{t:'Reels com dado + pergunta performam 3x mais',s:'Padrão em 8 posts analisados'},{t:'Meta: 16 posts/mês',s:'Baseado na evolução de março'}],
    trends:['Como prevenir diabetes tipo 2','Sintomas de burnout médico','Check-up anual o que inclui','Médico particular SP'],
  },
  pediatralis: {
    seg:'127.941', segDelta:'+4.1k', pub:'760', sal:'2.601', eng:'1.24%', engDelta:'estável',
    alcance:'498.200', impressoes:'1.240.000', visitas:'32.400', cliques:'4.820', alcNaoSeg:'74%',
    legendaIdeal:'Média (80 a 150 palavras)',
    stories:{ alcance:'48.200', toqueFrente:'28%', saidas:'6%', respostas:'1.240' },
    bars:[55,72,44,89,61,52,96,66,46,41,73,81],
    formatos:[{n:'Reels',p:60},{n:'Carrossel',p:25},{n:'Foto',p:15}],
    horarios:[{d:'Seg',h:'16h',e:'1.1%'},{d:'Ter',h:'15h',e:'1.2%'},{d:'Qua',h:'16h',e:'1.3%'},{d:'Qui',h:'15h',e:'1.4%'},{d:'Sex',h:'14h',e:'1.2%'},{d:'Sáb',h:'10h',e:'1.0%'},{d:'Dom',h:'16h',e:'1.5%'}],
    posts:[
      {r:1,f:'Reel',cur:'11.204',sal:'2.108',com:'836',why:'Hook sobre erro comum das mães. Alta busca por febre em bebê no Google.',repost:'Repostar na época de gripe com ajuste no gancho'},
      {r:2,f:'Carrossel',cur:'7.412',sal:'3.204',com:'514',why:'Guia de vacinação — conteúdo de referência. Mães salvam para consultar depois.',repost:'Versão atualizada com calendário 2026'},
      {r:3,f:'Reel',cur:'5.108',sal:'982',com:'624',why:'Pergunta polêmica gerou discordância = maior alcance orgânico pelo algoritmo.',repost:null},
    ],
    hooks:[{h:'"O que fazer quando meu filho..."',e:'2.1%',p:8},{h:'"Pediatra alerta: nunca faça..."',e:'1.9%',p:5},{h:'"Sinal que toda mãe precisa ver"',e:'1.8%',p:4},{h:'"Mito ou verdade sobre crianças"',e:'1.6%',p:6}],
    dores:[{d:'Febre alta sem saber quando ir ao PS',f:124,ex:'"Que temperatura é emergência?"'},{d:'Recusa alimentar na introdução',f:98,ex:'"Meu filho não quer comer nada"'},{d:'Desenvolvimento atípico e diagnóstico',f:76,ex:'"Como saber se é normal para a idade?"'}],
    viral:[{t:'Febre: mitos que assustam mães',p:'Alto',m:'Dúvida universal + urgência = compartilhamento em grupos'},{t:'Introdução alimentar sem neura',p:'Alto',m:'Dor cotidiana + solução prática = salvamentos em massa'},{t:'Vacinas: o que ninguém explica',p:'Médio',m:'Polêmica + autoridade médica = debate nos comentários'}],
    recos:[{t:'Poste às 16h — pico de mães após escola',s:'Melhor horário identificado'},{t:'Reels com urgência engajam 4x mais',s:'Padrão em 12 posts'},{t:'Meta: 20 posts/mês',s:'Perfil em aceleração'}],
    trends:['Febre bebê quando ir pronto socorro','Vacinas crianças 2026','Pediatra particular SP','Desenvolvimento motor 6 meses'],
  },
  vanderlene: {
    seg:'18.420', segDelta:'+540', pub:'183', sal:'1.240', eng:'3.8%', engDelta:'+0.6%',
    alcance:'72.400', impressoes:'168.200', visitas:'4.120', cliques:'680', alcNaoSeg:'54%',
    legendaIdeal:'Média a longa (storytelling)',
    stories:{ alcance:'7.200', toqueFrente:'36%', saidas:'8%', respostas:'142' },
    bars:[28,44,36,62,41,54,88,52,38,30,56,68],
    formatos:[{n:'Carrossel',p:52},{n:'Reels',p:32},{n:'Foto',p:16}],
    horarios:[{d:'Seg',h:'18h',e:'3.4%'},{d:'Ter',h:'17h',e:'3.8%'},{d:'Qua',h:'18h',e:'3.6%'},{d:'Qui',h:'17h',e:'4.2%'},{d:'Sex',h:'16h',e:'3.5%'},{d:'Sáb',h:'11h',e:'2.8%'},{d:'Dom',h:'18h',e:'3.2%'}],
    posts:[
      {r:1,f:'Carrossel',cur:'1.820',sal:'892',com:'312',why:'Framework de estratégia — referência para gestores. Alta densidade de valor por slide.',repost:'Repostar com casos reais de clientes'},
      {r:2,f:'Reel',cur:'1.241',sal:'421',com:'228',why:'Bastidores reais geraram identificação forte. Comentários revelam dor de médicos sem tempo.',repost:null},
      {r:3,f:'Carrossel',cur:'882',sal:'512',com:'164',why:'Checklist pré-lançamento — alto salvamento. Conteúdo de planejamento tem retenção alta.',repost:'Versão para pré-lançamento de produto'},
    ],
    hooks:[{h:'"O médico que não posta está perdendo..."',e:'5.1%',p:3},{h:'"Framework que dobrou o alcance"',e:'4.8%',p:2},{h:'"Erro que todo médico no Instagram comete"',e:'4.4%',p:4},{h:'"Conteúdo que converte vs que viraliza"',e:'4.0%',p:3}],
    dores:[{d:'Falta de tempo para criar conteúdo',f:58,ex:'"Quero postar mas não consigo"'},{d:'Não saber o que falar sem violar o CFM',f:46,ex:'"Tenho medo de postar errado"'},{d:'Crescer seguidores sem converter em pacientes',f:38,ex:'"Tenho likes mas não pacientes"'}],
    viral:[{t:'O que o CFM realmente proíbe',p:'Alto',m:'Dúvida universal entre médicos + clareza = autoridade'},{t:'Médico com 100k seguidores: rotina real',p:'Alto',m:'Aspiração + bastidores = alto engajamento'},{t:'Conteúdo que converte vs que viraliza',p:'Médio',m:'Debate técnico na audiência de gestores'}],
    recos:[{t:'Poste às 17h — pico de empreendedores',s:'Melhor horário do perfil'},{t:'Frameworks visuais têm 5x mais salvamentos',s:'Padrão em 10 posts'},{t:'Meta: 12 posts/mês com autoridade',s:'Perfil em construção de marca'}],
    trends:['Marketing médico como fazer','Conteúdo médicos Instagram','Estratégia redes sociais clínica','Médico atrair pacientes online'],
  },
  lismed: {
    seg:'31.502', segDelta:'+920', pub:'198', sal:'1.108', eng:'3.4%', engDelta:'+0.8%',
    alcance:'88.400', impressoes:'204.800', visitas:'4.820', cliques:'820', alcNaoSeg:'52%',
    legendaIdeal:'Longa (acima de 200 palavras técnicas)',
    stories:{ alcance:'8.400', toqueFrente:'42%', saidas:'5%', respostas:'180' },
    bars:[30,51,46,71,39,61,86,56,41,36,66,73],
    formatos:[{n:'Carrossel',p:48},{n:'Reels',p:35},{n:'Foto',p:17}],
    horarios:[{d:'Seg',h:'20h',e:'3.1%'},{d:'Ter',h:'19h',e:'3.4%'},{d:'Qua',h:'20h',e:'3.2%'},{d:'Qui',h:'19h',e:'3.8%'},{d:'Sex',h:'18h',e:'3.0%'},{d:'Sáb',h:'10h',e:'2.4%'},{d:'Dom',h:'20h',e:'2.8%'}],
    posts:[
      {r:1,f:'Carrossel',cur:'1.801',sal:'621',com:'199',why:'Conteúdo técnico B2B — médicos salvam para referência profissional. Tom de autoridade.',repost:'Repostar com métricas atualizadas do estudo'},
      {r:2,f:'Reel',cur:'1.204',sal:'381',com:'314',why:'Bastidores de consultoria — humaniza sem perder autoridade. Comentários revelam dor real.',repost:null},
      {r:3,f:'Carrossel',cur:'981',sal:'512',com:'146',why:'Checklist de gestão — valor prático alto. Salvamento 6x acima da média.',repost:'Versão 2026 com novos indicadores'},
    ],
    hooks:[{h:'"O erro de gestão que quebra clínicas"',e:'4.8%',p:2},{h:'"O que nenhuma faculdade ensina"',e:'4.2%',p:3},{h:'"Médico empreendedor: alerta"',e:'3.9%',p:2},{h:'"Dados que toda clínica precisa ver"',e:'3.4%',p:4}],
    dores:[{d:'Gestão financeira da clínica sem formação',f:42,ex:'"Trabalho muito e não sobra nada"'},{d:'Dificuldade de publicar com autoridade',f:36,ex:'"Não sei por onde começar"'},{d:'Equipe médica difícil de liderar',f:28,ex:'"Como demito sem processo?"'}],
    viral:[{t:'Quanto ganha um médico de verdade',p:'Alto',m:'Curiosidade + tabu financeiro = engajamento explosivo'},{t:'Erros que fecham clínicas',p:'Alto',m:'Medo + identificação = compartilhamento entre médicos'},{t:'Consultoria médica: vale a pena?',p:'Médio',m:'Questionamento da própria audiência'}],
    recos:[{t:'Poste às 19h — médicos consomem à noite',s:'Padrão B2B identificado'},{t:'Carrosséis técnicos geram mais leads',s:'6 de 8 top posts são carrosséis'},{t:'Meta: 10 posts/mês com qualidade',s:'Impacto maior que volume'}],
    trends:['Gestão clínica médica','Marketing médico CFM','Consultoria para médicos','Como publicar revista científica'],
  },
  amaria: {
    seg:'22.108', segDelta:'+680', pub:'145', sal:'891', eng:'4.2%', engDelta:'maior da carteira',
    alcance:'68.400', impressoes:'142.800', visitas:'3.240', cliques:'640', alcNaoSeg:'48%',
    legendaIdeal:'Média a longa (storytelling)',
    stories:{ alcance:'6.800', toqueFrente:'38%', saidas:'7%', respostas:'124' },
    bars:[25,46,36,61,43,56,89,51,39,31,59,66],
    formatos:[{n:'Carrossel',p:55},{n:'Reels',p:30},{n:'Foto',p:15}],
    horarios:[{d:'Seg',h:'18h',e:'3.8%'},{d:'Ter',h:'17h',e:'4.0%'},{d:'Qua',h:'18h',e:'3.9%'},{d:'Qui',h:'17h',e:'4.6%'},{d:'Sex',h:'16h',e:'3.8%'},{d:'Sáb',h:'11h',e:'3.2%'},{d:'Dom',h:'18h',e:'3.6%'}],
    posts:[
      {r:1,f:'Carrossel',cur:'1.401',sal:'721',com:'246',why:'Framework de estratégia — referência para gestores. Alta densidade de valor por slide.',repost:'Repostar com casos reais de clientes'},
      {r:2,f:'Reel',cur:'981',sal:'341',com:'199',why:'Bastidores reais geraram identificação forte. Comentários revelam dor de médicos sem tempo.',repost:null},
      {r:3,f:'Carrossel',cur:'761',sal:'481',com:'133',why:'Checklist pré-lançamento — alto salvamento. Conteúdo de planejamento tem retenção alta.',repost:'Versão para pré-lançamento de produto'},
    ],
    hooks:[{h:'"O médico que não posta está perdendo..."',e:'5.1%',p:3},{h:'"Framework que dobrou o alcance"',e:'4.8%',p:2},{h:'"Erro que todo médico no Instagram comete"',e:'4.4%',p:4},{h:'"Conteúdo que converte vs viraliza"',e:'4.0%',p:3}],
    dores:[{d:'Falta de tempo para criar conteúdo',f:58,ex:'"Quero postar mas não consigo"'},{d:'Não saber o que falar sem violar o CFM',f:46,ex:'"Tenho medo de postar errado"'},{d:'Crescer seguidores sem converter em pacientes',f:38,ex:'"Tenho likes mas não pacientes"'}],
    viral:[{t:'O que o CFM realmente proíbe',p:'Alto',m:'Dúvida universal entre médicos + clareza = autoridade'},{t:'Médico com 100k seguidores: rotina real',p:'Alto',m:'Aspiração + bastidores = alto engajamento'},{t:'Conteúdo que converte vs que viraliza',p:'Médio',m:'Debate técnico na audiência de gestores'}],
    recos:[{t:'Poste às 17h — pico de empreendedores',s:'Melhor horário do perfil'},{t:'Frameworks visuais têm 5x mais salvamentos',s:'Padrão em 10 posts'},{t:'Meta: 12 posts/mês com autoridade',s:'Perfil em construção de marca'}],
    trends:['Marketing médico como fazer','Conteúdo médicos Instagram','Estratégia redes sociais clínica','Médico atrair pacientes online'],
  },
}

// ─── Componentes base ────────────────────────────────────────────────────────

function Bell() {
  return (
    <svg width="20" height="24" viewBox="0 0 36 42" fill="none">
      <line x1="18" y1="0" x2="18" y2="5" stroke="#C4A870" strokeWidth="1.2"/>
      <rect x="14" y="4" width="8" height="3" stroke="#C4A870" strokeWidth="1" fill="none"/>
      <path d="M14 7 C14 7 6 12 6 22 L6 31 L30 31 L30 22 C30 12 22 7 22 7 Z" stroke="#C4A870" strokeWidth="1.2" fill="none"/>
      <path d="M6 31 L30 31" stroke="#C4A870" strokeWidth="1.2"/>
      <path d="M12 31 C12 34.5 14.7 37 18 37 C21.3 37 24 34.5 24 31" stroke="#C4A870" strokeWidth="1.2" fill="none"/>
    </svg>
  )
}

function Barra({ bars }) {
  const max = Math.max(...bars)
  return (
    <div style={{display:'flex',alignItems:'flex-end',gap:4,height:80}}>
      {bars.map((v, i) => {
        const h = Math.round((v / max) * 100)
        const cor = v === max ? '#C4A870' : (v >= max * 0.75 ? '#8A6A40' : '#C4B89A')
        return (
          <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3,height:'100%'}}>
            <div style={{width:'100%',borderRadius:'2px 2px 0 0',height:h+'%',background:cor}}/>
            <span style={{fontSize:8,color:'#9A8878'}}>{i * 2 + 1}</span>
          </div>
        )
      })}
    </div>
  )
}

function Secao({ titulo, badge, children }) {
  return (
    <div style={{marginBottom:4}}>
      <div style={{fontSize:9,letterSpacing:'0.12em',color:'#9A8878',textTransform:'uppercase',marginBottom:10,paddingBottom:8,borderBottom:'0.5px solid #C4B89A',display:'flex',alignItems:'center',gap:8}}>
        {titulo}
        {badge && <span style={{fontSize:8,color:'#F5F0E8',background:'#2C1F14',borderRadius:10,padding:'2px 8px'}}>{badge}</span>}
      </div>
      {children}
    </div>
  )
}

function CardE({ children, style }) {
  return <div style={{background:'#2C1F14',borderRadius:8,padding:'14px 16px',...style}}>{children}</div>
}

function CardC({ children, style }) {
  return <div style={{background:'#F5F2EC',border:'0.5px solid #C4B89A',borderRadius:8,padding:'14px 16px',...style}}>{children}</div>
}

// ─── App principal ───────────────────────────────────────────────────────────

export default function App() {
  const savedEmail = localStorage.getItem('officium_email') || ''
  const savedNome  = localStorage.getItem('officium_nome')  || ''

  const [logado,   setLogado]   = useState(!!savedEmail)
  const [nome,     setNome]     = useState(savedNome)
  const [perfil,   setPerfil]   = useState('claudia')
  const [mes,      setMes]      = useState(MESES[new Date().getMonth()])
  const [admin,    setAdmin]    = useState(false)

  const isAdmin = ['amaria@officium.com.br','admin@officium.com.br'].includes(savedEmail)

  function login(n, e) {
    localStorage.setItem('officium_email', e)
    localStorage.setItem('officium_nome', n)
    setLogado(true); setNome(n)
  }
  function sair() {
    localStorage.removeItem('officium_email')
    localStorage.removeItem('officium_nome')
    setLogado(false); setNome(''); setAdmin(false)
  }

  if (!logado) return <Login onLogin={login}/>

  const d = DADOS[perfil]

  // ── TOPO ──────────────────────────────────────────────────────────────────
  const Topo = (
    <div style={{background:'#F5F2EC',borderBottom:'0.5px solid #C4B89A',padding:'12px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:10}}>
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <div style={{width:32,height:32,background:'#2C1F14',borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Bell/>
        </div>
        <div>
          <div style={{fontSize:11,letterSpacing:'0.18em',color:'#2C1F14',fontWeight:600,textTransform:'uppercase'}}>Officium</div>
          <div style={{fontSize:9,letterSpacing:'0.1em',color:'#9A8878',textTransform:'uppercase'}}>Boutique Estratégia Médica</div>
        </div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <div style={{width:6,height:6,borderRadius:'50%',background:'#6A8A5A'}}/>
        <span style={{fontSize:10,color:'#6A8A5A'}}>API conectada</span>
        <span style={{fontSize:10,color:'#9A8878',border:'0.5px solid #C4B89A',borderRadius:20,padding:'4px 12px'}}>
          {mes} {new Date().getFullYear()}
        </span>
        {nome && <span style={{fontSize:10,color:'#7A6A58'}}>Olá, {nome}</span>}
        {isAdmin && (
          <button onClick={() => setAdmin(!admin)} style={{fontSize:9,color:admin?'#C4A870':'#9A8878',background:'none',border:'0.5px solid',borderColor:admin?'#C4A870':'#C4B89A',borderRadius:4,padding:'4px 10px',cursor:'pointer',letterSpacing:'0.08em',textTransform:'uppercase'}}>
            Admin
          </button>
        )}
        <button onClick={sair} style={{fontSize:9,color:'#9A8878',background:'none',border:'0.5px solid #C4B89A',borderRadius:4,padding:'4px 10px',cursor:'pointer',letterSpacing:'0.08em',textTransform:'uppercase'}}>
          Sair
        </button>
      </div>
    </div>
  )

  // ── ADMIN ─────────────────────────────────────────────────────────────────
  if (admin) {
    return (
      <div style={{minHeight:'100vh',background:'#EDE8DF'}}>
        {Topo}
        <div style={{padding:'20px',maxWidth:900,margin:'0 auto'}}>
          <button onClick={() => setAdmin(false)} style={{fontSize:9,color:'#7A6A58',background:'none',border:'0.5px solid #C4B89A',borderRadius:4,padding:'6px 14px',cursor:'pointer',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:16}}>
            Voltar ao dashboard
          </button>
          <AdminPanel/>
        </div>
      </div>
    )
  }

  // ── DASHBOARD ─────────────────────────────────────────────────────────────
  return (
    <div style={{minHeight:'100vh',background:'#EDE8DF'}}>
      {Topo}

      {/* Abas de perfil */}
      <div style={{background:'#EAE4DA',borderBottom:'0.5px solid #C4B89A',padding:'0 20px',display:'flex',overflowX:'auto'}}>
        {PERFIS.map(p => (
          <button key={p.id} onClick={() => setPerfil(p.id)} style={{fontSize:10,letterSpacing:'0.1em',color:perfil===p.id?'#2C1F14':'#9A8878',padding:'13px 18px',border:'none',background:'none',cursor:'pointer',borderBottom:perfil===p.id?'2px solid #C4A870':'2px solid transparent',whiteSpace:'nowrap',textTransform:'uppercase',flexShrink:0,fontWeight:perfil===p.id?600:400,transition:'all 0.15s'}}>
            {p.label}
          </button>
        ))}
      </div>

      <div style={{padding:'18px 20px',display:'flex',flexDirection:'column',gap:14,maxWidth:1200,margin:'0 auto'}}>

        {/* Filtro de mês */}
        <div style={{display:'flex',gap:6,alignItems:'center',flexWrap:'wrap'}}>
          <span style={{fontSize:9,color:'#9A8878',letterSpacing:'0.1em',textTransform:'uppercase',marginRight:4}}>Período</span>
          {MESES.map(m => (
            <button key={m} onClick={() => setMes(m)} style={{fontSize:10,color:mes===m?'#F5F0E8':'#7A6A58',padding:'4px 12px',border:'0.5px solid',borderColor:mes===m?'#2C1F14':'#C4B89A',borderRadius:20,background:mes===m?'#2C1F14':'none',cursor:'pointer',transition:'all 0.12s'}}>
              {m}
            </button>
          ))}
        </div>

        {/* Cards principais */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:10}}>
          {[
            {l:'Seguidores',    v:d.seg,    delta:d.segDelta,  cor:'#6A8A5A'},
            {l:'Salvamentos',   v:d.sal,    delta:'+8% vs mês anterior', cor:'#6A8A5A'},
            {l:'Engajamento',   v:d.eng,    delta:d.engDelta,  cor:'#6A8A5A'},
            {l:'Visitas ao perfil', v:d.visitas, delta:'este mês', cor:'#8A7A68'},
          ].map(c => (
            <CardE key={c.l}>
              <div style={{fontSize:9,letterSpacing:'0.1em',color:'#7A6A58',textTransform:'uppercase',marginBottom:6}}>{c.l}</div>
              <div style={{fontSize:22,fontWeight:700,color:'#F5F0E8',letterSpacing:'-0.02em'}}>{c.v}</div>
              <div style={{fontSize:9,marginTop:4,color:c.cor}}>{c.delta}</div>
            </CardE>
          ))}
        </div>

        {/* Cards secundários */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:10}}>
          {[
            {l:'Alcance',               v:d.alcance,    s:'pessoas únicas'},
            {l:'Impressões',            v:d.impressoes, s:'visualizações totais'},
            {l:'Cliques no link',       v:d.cliques,    s:'via bio'},
            {l:'Alcance não-seguidores',v:d.alcNaoSeg,  s:'distribuição orgânica'},
          ].map(c => (
            <CardC key={c.l}>
              <div style={{fontSize:9,letterSpacing:'0.1em',color:'#9A8878',textTransform:'uppercase',marginBottom:6}}>{c.l}</div>
              <div style={{fontSize:20,fontWeight:700,color:'#2C1F14',letterSpacing:'-0.02em'}}>{c.v}</div>
              <div style={{fontSize:9,marginTop:4,color:'#9A8878'}}>{c.s}</div>
            </CardC>
          ))}
        </div>

        {/* Gráfico + Formatos */}
        <div style={{display:'grid',gridTemplateColumns:'1.8fr 1fr',gap:10}}>
          <CardC>
            <div style={{fontSize:9,letterSpacing:'0.1em',color:'#9A8878',textTransform:'uppercase',marginBottom:12}}>Curtidas por publicação</div>
            <Barra bars={d.bars}/>
          </CardC>
          <CardC>
            <div style={{fontSize:9,letterSpacing:'0.1em',color:'#9A8878',textTransform:'uppercase',marginBottom:12}}>Formato de conteúdo</div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {d.formatos.map(f => (
                <div key={f.n} style={{display:'flex',alignItems:'center',gap:8}}>
                  <span style={{fontSize:11,color:'#5A4A38',width:64,flexShrink:0}}>{f.n}</span>
                  <div style={{flex:1,height:5,background:'#D4C8B8',borderRadius:3,overflow:'hidden'}}>
                    <div style={{height:'100%',width:f.p+'%',background:'#2C1F14',borderRadius:3}}/>
                  </div>
                  <span style={{fontSize:11,color:'#2C1F14',fontWeight:600,width:28,textAlign:'right'}}>{f.p}%</span>
                </div>
              ))}
            </div>
          </CardC>
        </div>

        {/* Stories */}
        <CardC>
          <div style={{fontSize:9,letterSpacing:'0.1em',color:'#9A8878',textTransform:'uppercase',marginBottom:12}}>Performance de Stories</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:10}}>
            {[
              {l:'Alcance',         v:d.stories.alcance},
              {l:'Toque pra frente',v:d.stories.toqueFrente},
              {l:'Saídas',          v:d.stories.saidas},
              {l:'Respostas',       v:d.stories.respostas},
            ].map(s => (
              <CardE key={s.l} style={{textAlign:'center',padding:'12px'}}>
                <div style={{fontSize:9,color:'#7A6A58',marginBottom:5,textTransform:'uppercase',letterSpacing:'0.08em'}}>{s.l}</div>
                <div style={{fontSize:18,fontWeight:700,color:'#F5F0E8'}}>{s.v}</div>
              </CardE>
            ))}
          </div>
        </CardC>

        {/* Pico horário */}
        <CardC>
          <div style={{fontSize:9,letterSpacing:'0.1em',color:'#9A8878',textTransform:'uppercase',marginBottom:12}}>Pico de engajamento por dia da semana</div>
          <div style={{display:'flex',gap:8}}>
            {d.horarios.map(h => (
              <div key={h.d} style={{flex:1,background:'#2C1F14',borderRadius:6,padding:'12px 8px',textAlign:'center'}}>
                <div style={{fontSize:9,color:'#7A6A58',marginBottom:4,textTransform:'uppercase'}}>{h.d}</div>
                <div style={{fontSize:16,fontWeight:700,color:'#C4A870'}}>{h.h}</div>
                <div style={{fontSize:9,color:'#6A8A5A',marginTop:3}}>{h.e}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:10,fontSize:10,color:'#9A8878'}}>
            Legenda ideal: <strong style={{color:'#2C1F14'}}>{d.legendaIdeal}</strong>
          </div>
        </CardC>

        {/* Por que engajou */}
        <Secao titulo="Por que estão engajando?" badge="Análise IA">
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {d.posts.map(p => (
              <CardE key={p.r}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <div style={{width:24,height:24,borderRadius:'50%',background:'#3D2B1A',border:'0.5px solid #C4A870',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:'#C4A870',fontWeight:700}}>{p.r}</div>
                    <span style={{fontSize:10,color:'#8A7A68',background:'#3D2B1A',borderRadius:10,padding:'2px 10px'}}>{p.f}</span>
                  </div>
                  <div style={{display:'flex',gap:14}}>
                    <span style={{fontSize:10,color:'#7A6A58'}}><strong style={{color:'#F5F0E8'}}>{p.cur}</strong> curtidas</span>
                    <span style={{fontSize:10,color:'#7A6A58'}}><strong style={{color:'#F5F0E8'}}>{p.sal}</strong> salvamentos</span>
                    <span style={{fontSize:10,color:'#7A6A58'}}><strong style={{color:'#F5F0E8'}}>{p.com}</strong> comentários</span>
                  </div>
                </div>
                <div style={{background:'#3D2B1A',borderLeft:'2px solid #C4A870',borderRadius:'0 4px 4px 0',padding:'8px 12px'}}>
                  <div style={{fontSize:8,color:'#C4A870',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:4}}>Por que engajou</div>
                  <div style={{fontSize:11,color:'#A89A88',lineHeight:1.7}}>{p.why}</div>
                </div>
                {p.repost && (
                  <div style={{fontSize:10,color:'#6A8A5A',background:'#1A2A18',border:'0.5px solid #3A5030',borderRadius:10,padding:'4px 12px',marginTop:8,display:'inline-block'}}>
                    Sugestão de repost: {p.repost}
                  </div>
                )}
              </CardE>
            ))}
          </div>
        </Secao>

        {/* Hooks */}
        <Secao titulo="Melhores hooks" badge="Padrão IA">
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:8}}>
            {d.hooks.map((h, i) => (
              <CardE key={i} style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:28,height:28,borderRadius:'50%',background:'#3D2B1A',border:'0.5px solid #C4A870',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,color:'#C4A870',fontWeight:700,flexShrink:0}}>{i+1}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:11,color:'#F5F0E8',lineHeight:1.5,marginBottom:5}}>{h.h}</div>
                  <div style={{display:'flex',gap:12}}>
                    <span style={{fontSize:9,color:'#6A8A5A'}}>eng: <strong>{h.e}</strong></span>
                    <span style={{fontSize:9,color:'#7A6A58'}}>{h.p} posts</span>
                  </div>
                </div>
              </CardE>
            ))}
          </div>
        </Secao>

        {/* Dores */}
        <Secao titulo="Dores latentes nos comentários" badge="Análise IA">
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {d.dores.map((dr, i) => (
              <CardC key={i}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:6}}>
                  <div style={{fontSize:13,color:'#2C1F14',fontWeight:600}}>{dr.d}</div>
                  <div style={{fontSize:10,color:'#C4A870',background:'#2C1F14',borderRadius:10,padding:'3px 12px',flexShrink:0,marginLeft:12}}>{dr.f} menções</div>
                </div>
                <div style={{fontSize:10,color:'#7A6A58',fontStyle:'italic',marginBottom:8}}>{dr.ex}</div>
                <div style={{height:3,background:'#D4C8B8',borderRadius:2,overflow:'hidden'}}>
                  <div style={{height:'100%',width:Math.round((dr.f/d.dores[0].f)*100)+'%',background:'#C4A870',borderRadius:2}}/>
                </div>
              </CardC>
            ))}
          </div>
        </Secao>

        {/* Viral */}
        <Secao titulo="Temas com potencial de viralizar" badge="Análise IA">
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {d.viral.map((v, i) => (
              <CardE key={i} style={{display:'flex',alignItems:'flex-start',gap:12}}>
                <span style={{fontSize:9,color:v.p==='Alto'?'#6A8A5A':'#9A8060',background:v.p==='Alto'?'#1A2A18':'#2A2010',border:'0.5px solid',borderColor:v.p==='Alto'?'#3A5030':'#4A3A20',borderRadius:10,padding:'3px 10px',flexShrink:0,marginTop:2}}>
                  {v.p}
                </span>
                <div>
                  <div style={{fontSize:13,color:'#F5F0E8',fontWeight:600,marginBottom:4}}>{v.t}</div>
                  <div style={{fontSize:10,color:'#8A7A68',lineHeight:1.6}}>{v.m}</div>
                </div>
              </CardE>
            ))}
          </div>
        </Secao>

        {/* Recomendações */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:10}}>
          {d.recos.map((r, i) => (
            <CardC key={i}>
              <div style={{fontSize:12,color:'#2C1F14',lineHeight:1.5,marginBottom:4,fontWeight:600}}>{r.t}</div>
              <div style={{fontSize:9,color:'#9A8878'}}>{r.s}</div>
            </CardC>
          ))}
        </div>

        {/* Trends */}
        <CardE style={{marginBottom:24}}>
          <div style={{fontSize:9,letterSpacing:'0.12em',color:'#7A6A58',textTransform:'uppercase',marginBottom:12}}>O que os leads estão buscando agora</div>
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            {d.trends.map((t, i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 10px',background:'#3D2B1A',borderRadius:6}}>
                <span style={{fontSize:9,color:'#5A4A38',width:16}}>{i+1}</span>
                <span style={{fontSize:11,color:'#A89A88',flex:1}}>{t}</span>
                <span style={{fontSize:9,color:'#C4A870',border:'0.5px solid #4A3828',borderRadius:10,padding:'2px 10px'}}>{i < 2 ? 'alto' : 'medio'}</span>
              </div>
            ))}
          </div>
        </CardE>

      </div>
    </div>
  )
}
