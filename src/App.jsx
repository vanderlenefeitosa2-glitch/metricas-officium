import React, { useState } from 'react'
import Login from './Login.jsx'
import AdminPanel from './AdminPanel.jsx'

const PROFILES = [
  {id:'claudia',   label:'Dra. Claudia'},
  {id:'pediatralis',label:'Pediatralis'},
  {id:'lismed',    label:'Dra. Lis Batista'},
  {id:'amaria',    label:'Amaria'},
  {id:'direito',   label:'Direito da Saúde'},
]
const MONTHS = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
const MOCK = {
  claudia:{seg:'48.291',segDelta:'+1.3k',sal:'3.412',eng:'2.1%',engDelta:'+0.3%',alcance:'124.800',impressoes:'312.400',visitasPerfil:'8.240',cliquesLink:'1.102',alcanceNaoSeg:'68%',legendaIdeal:'Longa (acima de 150 palavras)',picoHorario:[{dia:'Seg',hora:'19h',eng:'1.8%'},{dia:'Ter',hora:'18h',eng:'1.9%'},{dia:'Qua',hora:'20h',eng:'2.0%'},{dia:'Qui',hora:'18h',eng:'2.4%'},{dia:'Sex',hora:'17h',eng:'2.1%'},{dia:'Sáb',hora:'11h',eng:'1.7%'},{dia:'Dom',hora:'19h',eng:'2.6%'}],stories:{alcance:'12.400',toqueFrente:'34%',saidas:'8%',respostas:'240'},bars:[42,58,31,78,52,44,96,68,47,36,62,74],formats:[{name:'Reels',pct:52},{name:'Carrossel',pct:31},{name:'Foto',pct:17}],posts:[{rank:1,format:'Reel',curtidas:'4.218',salvamentos:'892',comentarios:'314',why:'Gancho de dor nos primeiros 3s + dado estatístico. CTA de salvamento gerou 3x mais retenção.',repost:'Repostar com gancho atualizado e novo dado de 2026'},{rank:2,format:'Carrossel',curtidas:'2.841',salvamentos:'1.102',comentarios:'199',why:'Slide 1 gerou curiosidade sem entregar a resposta — padrão de alta rolagem. Salvamentos indicam referência.',repost:'Versão atualizada com novo estudo clínico'},{rank:3,format:'Reel',curtidas:'2.103',salvamentos:'541',comentarios:'278',why:'Publicado às 18h30 na quinta. Legenda curta + pergunta direta gerou volume de comentários acima da média.',repost:null}],hooks:[{hook:'"Você está fazendo isso errado..."',eng:'4.2%',posts:3},{hook:'"Ninguém te contou que..."',eng:'3.8%',posts:2},{hook:'"Estudo comprova que..."',eng:'3.5%',posts:4},{hook:'"O erro que 90% comete..."',eng:'3.1%',posts:2}],dores:[{dor:'Dificuldade de encontrar médico de confiança',freq:48,exemplo:'"Onde encontro um especialista bom em SP?"'},{dor:'Medo de diagnóstico tardio',freq:34,exemplo:'"Passei anos sem saber que tinha isso"'},{dor:'Custo elevado de consultas',freq:28,exemplo:'"Plano de saúde não cobre nada"'}],viral:[{tema:'Mitos sobre check-up anual',potencial:'Alto',motivo:'Alta busca + indignação = compartilhamento orgânico'},{tema:'O que o plano de saúde esconde',potencial:'Alto',motivo:'Tema polêmico + utilidade pública = viralização'},{tema:'Rotina de uma médica real',potencial:'Médio',motivo:'Humanização + curiosidade = identificação'}],recos:[{icon:'clock',tip:'Poste às 19h aos domingos',sub:'Maior pico de engajamento'},{icon:'play',tip:'Reels com dado + pergunta performam 3x mais',sub:'Padrão em 8 posts analisados'},{icon:'target',tip:'Meta: 16 posts/mês',sub:'Baseado na evolução de março'}],trends:['Como prevenir diabetes tipo 2','Sintomas de burnout médico','Check-up anual o que inclui','Médico particular SP']},
  pediatralis:{seg:'127.941',segDelta:'+4.1k',sal:'2.601',eng:'1.24%',engDelta:'estável',alcance:'498.200',impressoes:'1.240.000',visitasPerfil:'32.400',cliquesLink:'4.820',alcanceNaoSeg:'74%',legendaIdeal:'Média (80 a 150 palavras)',picoHorario:[{dia:'Seg',hora:'16h',eng:'1.1%'},{dia:'Ter',hora:'15h',eng:'1.2%'},{dia:'Qua',hora:'16h',eng:'1.3%'},{dia:'Qui',hora:'15h',eng:'1.4%'},{dia:'Sex',hora:'14h',eng:'1.2%'},{dia:'Sáb',hora:'10h',eng:'1.0%'},{dia:'Dom',hora:'16h',eng:'1.5%'}],stories:{alcance:'48.200',toqueFrente:'28%',saidas:'6%',respostas:'1.240'},bars:[55,72,44,89,61,52,96,66,46,41,73,81],formats:[{name:'Reels',pct:60},{name:'Carrossel',pct:25},{name:'Foto',pct:15}],posts:[{rank:1,format:'Reel',curtidas:'11.204',salvamentos:'2.108',comentarios:'836',why:'Hook "isso que você faz está errado" com mães. Alta busca por febre em bebê no Google.',repost:'Repostar na época de gripe com ajuste no gancho'},{rank:2,format:'Carrossel',curtidas:'7.412',salvamentos:'3.204',comentarios:'514',why:'Guia de vacinação — conteúdo de referência. Mães salvam para consultar depois.',repost:'Versão atualizada com calendário 2026'},{rank:3,format:'Reel',curtidas:'5.108',salvamentos:'982',comentarios:'624',why:'Pergunta polêmica gerou discordância = maior alcance orgânico pelo algoritmo.',repost:null}],hooks:[{hook:'"O que fazer quando meu filho..."',eng:'2.1%',posts:8},{hook:'"Pediatra alerta: nunca faça..."',eng:'1.9%',posts:5},{hook:'"Sinal que toda mãe precisa ver"',eng:'1.8%',posts:4},{hook:'"Mito ou verdade sobre crianças"',eng:'1.6%',posts:6}],dores:[{dor:'Febre alta sem saber quando ir ao PS',freq:124,exemplo:'"Que temperatura é emergência?"'},{dor:'Recusa alimentar na introdução',freq:98,exemplo:'"Meu filho não quer comer nada"'},{dor:'Desenvolvimento atípico e diagnóstico',freq:76,exemplo:'"Como saber se é normal para a idade?"'}],viral:[{tema:'Febre: mitos que assustam mães',potencial:'Alto',motivo:'Dúvida universal + urgência = compartilhamento em grupos'},{tema:'Introdução alimentar sem neura',potencial:'Alto',motivo:'Dor cotidiana + solução prática = salvamentos em massa'},{tema:'Vacinas: o que ninguém explica',potencial:'Médio',motivo:'Polêmica + autoridade médica = debate nos comentários'}],recos:[{icon:'clock',tip:'Poste às 16h — pico de mães após escola',sub:'Melhor horário identificado'},{icon:'play',tip:'Reels com urgência engajam 4x mais',sub:'Padrão em 12 posts'},{icon:'target',tip:'Meta: 20 posts/mês',sub:'Perfil em aceleração'}],trends:['Febre bebê quando ir pronto socorro','Vacinas crianças 2026','Pediatra particular SP','Desenvolvimento motor 6 meses']},
  lismed:{seg:'31.502',segDelta:'+920',sal:'1.108',eng:'3.4%',engDelta:'+0.8%',alcance:'88.400',impressoes:'204.800',visitasPerfil:'4.820',cliquesLink:'820',alcanceNaoSeg:'52%',legendaIdeal:'Longa (acima de 200 palavras técnicas)',picoHorario:[{dia:'Seg',hora:'20h',eng:'3.1%'},{dia:'Ter',hora:'19h',eng:'3.4%'},{dia:'Qua',hora:'20h',eng:'3.2%'},{dia:'Qui',hora:'19h',eng:'3.8%'},{dia:'Sex',hora:'18h',eng:'3.0%'},{dia:'Sáb',hora:'10h',eng:'2.4%'},{dia:'Dom',hora:'20h',eng:'2.8%'}],stories:{alcance:'8.400',toqueFrente:'42%',saidas:'5%',respostas:'180'},bars:[30,51,46,71,39,61,86,56,41,36,66,73],formats:[{name:'Carrossel',pct:48},{name:'Reels',pct:35},{name:'Foto',pct:17}],posts:[{rank:1,format:'Carrossel',curtidas:'1.801',salvamentos:'621',comentarios:'199',why:'Conteúdo técnico B2B — médicos salvam para referência profissional. Tom de autoridade.',repost:'Repostar com métricas atualizadas do estudo'},{rank:2,format:'Reel',curtidas:'1.204',salvamentos:'381',comentarios:'314',why:'Bastidores de consultoria — humaniza sem perder autoridade. Comentários revelam dor real.',repost:null},{rank:3,format:'Carrossel',curtidas:'981',salvamentos:'512',comentarios:'146',why:'Checklist de gestão — valor prático alto. Salvamento 6x acima da média.',repost:'Versão 2026 com novos indicadores'}],hooks:[{hook:'"O erro de gestão que quebra clínicas"',eng:'4.8%',posts:2},{hook:'"O que nenhuma faculdade ensina"',eng:'4.2%',posts:3},{hook:'"Médico empreendedor: alerta"',eng:'3.9%',posts:2},{hook:'"Dados que toda clínica precisa ver"',eng:'3.4%',posts:4}],dores:[{dor:'Gestão financeira da clínica sem formação',freq:42,exemplo:'"Trabalho muito e não sobra nada"'},{dor:'Dificuldade de publicar com autoridade',freq:36,exemplo:'"Não sei por onde começar"'},{dor:'Equipe médica difícil de liderar',freq:28,exemplo:'"Como demito sem processo?"'}],viral:[{tema:'Quanto ganha um médico de verdade',potencial:'Alto',motivo:'Curiosidade + tabu financeiro = engajamento explosivo'},{tema:'Erros que fecham clínicas',potencial:'Alto',motivo:'Medo + identificação = compartilhamento entre médicos'},{tema:'Consultoria médica: vale a pena?',potencial:'Médio',motivo:'Questionamento da própria audiência'}],recos:[{icon:'clock',tip:'Poste às 19h — médicos consomem à noite',sub:'Padrão B2B identificado'},{icon:'play',tip:'Carrosséis técnicos geram mais leads',sub:'6 de 8 top posts são carrosséis'},{icon:'target',tip:'Meta: 10 posts/mês com qualidade',sub:'Impacto maior que volume'}],trends:['Gestão clínica médica','Marketing médico CFM','Consultoria para médicos','Como publicar revista científica']},
  amaria:{seg:'22.108',segDelta:'+680',sal:'891',eng:'4.2%',engDelta:'maior da carteira',alcance:'68.400',impressoes:'142.800',visitasPerfil:'3.240',cliquesLink:'640',alcanceNaoSeg:'48%',legendaIdeal:'Média a longa (storytelling)',picoHorario:[{dia:'Seg',hora:'18h',eng:'3.8%'},{dia:'Ter',hora:'17h',eng:'4.0%'},{dia:'Qua',hora:'18h',eng:'3.9%'},{dia:'Qui',hora:'17h',eng:'4.6%'},{dia:'Sex',hora:'16h',eng:'3.8%'},{dia:'Sáb',hora:'11h',eng:'3.2%'},{dia:'Dom',hora:'18h',eng:'3.6%'}],stories:{alcance:'6.800',toqueFrente:'38%',saidas:'7%',respostas:'124'},bars:[25,46,36,61,43,56,89,51,39,31,59,66],formats:[{name:'Carrossel',pct:55},{name:'Reels',pct:30},{name:'Foto',pct:15}],posts:[{rank:1,format:'Carrossel',curtidas:'1.401',salvamentos:'721',comentarios:'246',why:'Framework de estratégia — referência para gestores. Alta densidade de valor por slide.',repost:'Repostar com casos reais de clientes'},{rank:2,format:'Reel',curtidas:'981',salvamentos:'341',comentarios:'199',why:'Bastidores reais geraram identificação forte. Comentários revelam dor de médicos sem tempo.',repost:null},{rank:3,format:'Carrossel',curtidas:'761',salvamentos:'481',comentarios:'133',why:'Checklist pré-lançamento — alto salvamento. Conteúdo de planejamento tem retenção alta.',repost:'Versão para pré-lançamento de produto'}],hooks:[{hook:'"O médico que não posta está perdendo..."',eng:'5.1%',posts:3},{hook:'"Framework que dobrou o alcance"',eng:'4.8%',posts:2},{hook:'"Erro que todo médico no Instagram comete"',eng:'4.4%',posts:4},{hook:'"Conteúdo que converte vs que viraliza"',eng:'4.0%',posts:3}],dores:[{dor:'Falta de tempo para criar conteúdo',freq:58,exemplo:'"Quero postar mas não consigo"'},{dor:'Não saber o que falar sem violar o CFM',freq:46,exemplo:'"Tenho medo de postar errado"'},{dor:'Crescer seguidores sem converter em pacientes',freq:38,exemplo:'"Tenho likes mas não pacientes"'}],viral:[{tema:'O que o CFM realmente proíbe',potencial:'Alto',motivo:'Dúvida universal entre médicos + clareza = autoridade'},{tema:'Médico com 100k seguidores: rotina real',potencial:'Alto',motivo:'Aspiração + bastidores = alto engajamento'},{tema:'Conteúdo que converte vs que viraliza',potencial:'Médio',motivo:'Debate técnico na audiência de gestores'}],recos:[{icon:'clock',tip:'Poste às 17h — pico de empreendedores',sub:'Melhor horário do perfil'},{icon:'play',tip:'Frameworks visuais têm 5x mais salvamentos',sub:'Padrão em 10 posts'},{icon:'target',tip:'Meta: 12 posts/mês com autoridade',sub:'Perfil em construção de marca'}],trends:['Marketing médico como fazer','Conteúdo médicos Instagram','Estratégia redes sociais clínica','Médico atrair pacientes online']},
  direito:{seg:'15.812',segDelta:'+1.2k',sal:'651',eng:'5.1%',engDelta:'crescimento forte',alcance:'58.400',impressoes:'124.800',visitasPerfil:'2.840',cliquesLink:'580',alcanceNaoSeg:'62%',legendaIdeal:'Curta a média (objetiva e direta)',picoHorario:[{dia:'Seg',hora:'20h',eng:'4.8%'},{dia:'Ter',hora:'20h',eng:'5.0%'},{dia:'Qua',hora:'21h',eng:'4.9%'},{dia:'Qui',hora:'20h',eng:'5.4%'},{dia:'Sex',hora:'19h',eng:'4.8%'},{dia:'Sáb',hora:'11h',eng:'4.0%'},{dia:'Dom',hora:'20h',eng:'4.4%'}],stories:{alcance:'4.200',toqueFrente:'45%',saidas:'6%',respostas:'98'},bars:[21,39,31,56,36,49,81,43,33,29,53,61],formats:[{name:'Carrossel',pct:62},{name:'Reels',pct:25},{name:'Foto',pct:13}],posts:[{rank:1,format:'Carrossel',curtidas:'1.108',salvamentos:'581',comentarios:'314',why:'Direitos do paciente — indignação gerou compartilhamento 8x acima do normal.',repost:'Repostar com novo caso jurídico'},{rank:2,format:'Carrossel',curtidas:'821',salvamentos:'491',comentarios:'199',why:'Guia prático: plano negou procedimento. Salvo para usar em crise. Alta utilidade.',repost:'Atualizar com resoluções ANS 2026'},{rank:3,format:'Reel',curtidas:'641',salvamentos:'281',comentarios:'246',why:'Gancho de indignação. Comentários viraram leads para consultoria jurídica.',repost:null}],hooks:[{hook:'"O plano não pode fazer isso com você"',eng:'6.2%',posts:4},{hook:'"Seus direitos que ninguém te contou"',eng:'5.8%',posts:3},{hook:'"Negativa do plano: o que a lei diz"',eng:'5.4%',posts:2},{hook:'"Erro médico: quando você pode processar"',eng:'4.9%',posts:2}],dores:[{dor:'Plano de saúde negando cobertura',freq:86,exemplo:'"Negaram minha cirurgia, o que faço?"'},{dor:'Desconhecimento dos direitos como paciente',freq:64,exemplo:'"Não sabia que tinha direito a isso"'},{dor:'Medo de processar o médico ou plano',freq:48,exemplo:'"Vale a pena entrar na justiça?"'}],viral:[{tema:'Plano de saúde: o que é crime',potencial:'Alto',motivo:'Indignação + utilidade + compartilhamento em grupos de WhatsApp'},{tema:'Erro médico: seus direitos reais',potencial:'Alto',motivo:'Medo + desinformação = busca ativa e salvamentos'},{tema:'ANS 2026: mudanças que te afetam',potencial:'Médio',motivo:'Novidade + impacto direto na vida das pessoas'}],recos:[{icon:'clock',tip:'Poste às 20h — maior consumo jurídico',sub:'Pico em 8 posts'},{icon:'play',tip:'Conteúdo de utilidade pública gera leads',sub:'Padrão: salvar → buscar especialista'},{icon:'target',tip:'Meta: 8 posts/mês com revisão jurídica',sub:'Perfil em aceleração'}],trends:['Negativa plano o que fazer','Direitos paciente SUS','Plano pode negar cirurgia','Advogado saúde online']},
}

function Bell() {
  return <svg width="20" height="24" viewBox="0 0 36 42" fill="none"><line x1="18" y1="0" x2="18" y2="5" stroke="#C4A870" strokeWidth="1.2"/><rect x="14" y="4" width="8" height="3" stroke="#C4A870" strokeWidth="1" fill="none"/><path d="M14 7 C14 7 6 12 6 22 L6 31 L30 31 L30 22 C30 12 22 7 22 7 Z" stroke="#C4A870" strokeWidth="1.2" fill="none"/><path d="M6 31 L30 31" stroke="#C4A870" strokeWidth="1.2"/><path d="M12 31 C12 34.5 14.7 37 18 37 C21.3 37 24 34.5 24 31" stroke="#C4A870" strokeWidth="1.2" fill="none"/></svg>
}

function Bar({bars}) {
  const max = Math.max(...bars)
  return (
    <div style={{display:'flex',alignItems:'flex-end',gap:4,height:80}}>
      {bars.map((v,i) => (
        <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3,height:'100%'}}>
          <div style={{width:'100%',borderRadius:'2px 2px 0 0',height:`${Math.round((v/max)*100)}%`,background:v===max?'#C4A870':v>=max*0.75?'#8A6A40':'#C4B89A'}}/>
          <span style={{fontSize:8,color:'#9A8878'}}>{i*2+1}</span>
        </div>
      ))}
    </div>
  )
}

function Titulo({text, badge}) {
  return (
    <div style={{fontSize:9,letterSpacing:'0.12em',color:'#9A8878',textTransform:'uppercase',marginBottom:10,paddingBottom:8,borderBottom:'0.5px solid #C4B89A',display:'flex',alignItems:'center',gap:6}}>
      {text}
      {badge && <span style={{fontSize:8,color:'#F5F0E8',background:'#2C1F14',borderRadius:10,padding:'2px 7px'}}>{badge}</span>}
    </div>
  )
}

function CardEscuro({children, style}) {
  return <div style={{background:'#2C1F14',borderRadius:8,padding:'14px',...style}}>{children}</div>
}

function CardClaro({children, style}) {
  return <div style={{background:'#F5F2EC',border:'0.5px solid #C4B89A',borderRadius:8,padding:'14px',...style}}>{children}</div>
}

export default function App() {
  const savedEmail = localStorage.getItem('officium_email') || ''
  const savedName  = localStorage.getItem('officium_name')  || ''
  const [loggedIn,      setLoggedIn]      = useState(!!savedEmail)
  const [userName,      setUserName]      = useState(savedName)
  const [activeProfile, setActiveProfile] = useState('claudia')
  const [activeMonth,   setActiveMonth]   = useState('Mar')
  const [showAdmin,     setShowAdmin]     = useState(false)
  const isAdmin = ['amaria@officium.com.br','admin@officium.com.br'].includes(savedEmail)
  const d = MOCK[activeProfile]
  const now = new Date()

  function doLogin(nome, email) {
    localStorage.setItem('officium_email', email)
    localStorage.setItem('officium_name', nome)
    setLoggedIn(true); setUserName(nome)
  }
  function doLogout() {
    localStorage.removeItem('officium_email')
    localStorage.removeItem('officium_name')
    setLoggedIn(false); setUserName('')
  }

  if (!loggedIn) return <Login onLogin={doLogin}/>

  const topbar = (
    <div style={{background:'#F5F2EC',borderBottom:'0.5px solid #C4B89A',padding:'12px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:10}}>
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <div style={{width:32,height:32,background:'#2C1F14',borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center'}}><Bell/></div>
        <div>
          <div style={{fontSize:11,letterSpacing:'0.18em',color:'#2C1F14',fontWeight:500,textTransform:'uppercase'}}>Officium</div>
          <div style={{fontSize:9,letterSpacing:'0.1em',color:'#9A8878',textTransform:'uppercase'}}>Boutique · Estratégia Médica</div>
        </div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <div style={{width:6,height:6,borderRadius:'50%',background:'#6A8A5A'}}/>
        <span style={{fontSize:10,color:'#6A8A5A'}}>API conectada</span>
        <span style={{fontSize:10,color:'#9A8878',border:'0.5px solid #C4B89A',borderRadius:20,padding:'4px 12px'}}>{MONTHS[now.getMonth()]} · {now.getFullYear()}</span>
        {userName && <span style={{fontSize:10,color:'#7A6A58'}}>Olá, {userName}</span>}
        {isAdmin && <button onClick={()=>setShowAdmin(!showAdmin)} style={{fontSize:9,color:showAdmin?'#C4A870':'#9A8878',background:'none',border:(showAdmin?'0.5px solid #C4A870':'0.5px solid #C4B89A'),borderRadius:4,padding:'4px 10px',cursor:'pointer',letterSpacing:'0.08em',textTransform:'uppercase'}}>Admin</button>}
        <button onClick={doLogout} style={{fontSize:9,color:'#9A8878',background:'none',border:'0.5px solid #C4B89A',borderRadius:4,padding:'4px 10px',cursor:'pointer',letterSpacing:'0.08em',textTransform:'uppercase'}}>Sair</button>
      </div>
    </div>
  )

  if (showAdmin) return (
    <div style={{minHeight:'100vh',background:'#EDE8DF'}}>
      {topbar}
      <div style={{padding:'18px 20px',maxWidth:1200,margin:'0 auto'}}>
        <button onClick={()=>setShowAdmin(false)} style={{fontSize:9,color:'#7A6A58',background:'none',border:'0.5px solid #C4B89A',borderRadius:4,padding:'6px 14px',cursor:'pointer',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:16}}>← Voltar ao dashboard</button>
        <AdminPanel/>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#EDE8DF'}}>
      {topbar}

      <div style={{background:'#EAE4DA',borderBottom:'0.5px solid #C4B89A',padding:'0 20px',display:'flex',overflowX:'auto'}}>
        {PROFILES.map(p => (
          <button key={p.id} onClick={()=>setActiveProfile(p.id)} style={{fontSize:10,letterSpacing:'0.1em',color:activeProfile===p.id?'#2C1F14':'#9A8878',padding:'13px 18px',border:'none',background:'none',cursor:'pointer',borderBottom:activeProfile===p.id?'2px solid #C4A870':'2px solid transparent',whiteSpace:'nowrap',textTransform:'uppercase',flexShrink:0,fontWeight:activeProfile===p.id?500:400}}>
            {p.label}
          </button>
        ))}
        <button style={{border:'0.5px dashed #C4B89A',borderRadius:8,margin:'8px 0 8px 8px',padding:'0 14px',fontSize:10,color:'#9A8878',background:'none',cursor:'pointer',letterSpacing:'0.08em',textTransform:'uppercase',flexShrink:0}}>+ perfil</button>
      </div>

      <div style={{padding:'18px 20px',display:'flex',flexDirection:'column',gap:14,maxWidth:1200,margin:'0 auto'}}>

        <div style={{display:'flex',gap:6,alignItems:'center',flexWrap:'wrap'}}>
          <span style={{fontSize:9,color:'#9A8878',letterSpacing:'0.1em',textTransform:'uppercase',marginRight:4}}>Período</span>
          {MONTHS.map(m => (
            <button key={m} onClick={()=>setActiveMonth(m)} style={{fontSize:10,color:activeMonth===m?'#F5F0E8':'#7A6A58',padding:'4px 12px',border:'0.5px solid',borderColor:activeMonth===m?'#2C1F14':'#C4B89A',borderRadius:20,background:activeMonth===m?'#2C1F14':'none',cursor:'pointer'}}>
              {m}
            </button>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:10}}>
          {[{l:'Seguidores',v:d.seg,d:d.segDelta},{l:'Salvamentos',v:d.sal,d:'+8% vs mês anterior'},{l:'Engajamento',v:d.eng,d:d.engDelta},{l:'Visitas ao perfil',v:d.visitasPerfil,d:'este mês'}].map(m => (
            <CardEscuro key={m.l}>
              <div style={{fontSize:9,letterSpacing:'0.1em',color:'#7A6A58',textTransform:'uppercase',marginBottom:6}}>{m.l}</div>
              <div style={{fontSize:22,fontWeight:600,color:'#F5F0E8'}}>{m.v}</div>
              <div style={{fontSize:9,marginTop:4,color:'#6A8A5A'}}>{m.d}</div>
            </CardEscuro>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:10}}>
          {[{l:'Alcance',v:d.alcance,s:'pessoas únicas'},{l:'Impressões',v:d.impressoes,s:'visualizações totais'},{l:'Cliques no link',v:d.cliquesLink,s:'via bio'},{l:'Alcance não-seguidores',v:d.alcanceNaoSeg,s:'distribuição orgânica'}].map(m => (
            <CardClaro key={m.l}>
              <div style={{fontSize:9,letterSpacing:'0.1em',color:'#9A8878',textTransform:'uppercase',marginBottom:6}}>{m.l}</div>
              <div style={{fontSize:20,fontWeight:600,color:'#2C1F14'}}>{m.v}</div>
              <div style={{fontSize:9,marginTop:4,color:'#9A8878'}}>{m.s}</div>
            </CardClaro>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1.8fr 1fr',gap:10}}>
          <CardClaro>
            <div style={{fontSize:9,letterSpacing:'0.1em',color:'#9A8878',textTransform:'uppercase',marginBottom:12}}>Curtidas por publicação</div>
            <Bar bars={d.bars}/>
          </CardClaro>
          <CardClaro>
            <div style={{fontSize:9,letterSpacing:'0.1em',color:'#9A8878',textTransform:'uppercase',marginBottom:12}}>Formato de conteúdo</div>
            {d.formats.map(f => (
              <div key={f.name} style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
                <span style={{fontSize:11,color:'#5A4A38',width:64,flexShrink:0}}>{f.name}</span>
                <div style={{flex:1,height:5,background:'#D4C8B8',borderRadius:3,overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${f.pct}%`,background:'#2C1F14',borderRadius:3}}/>
                </div>
                <span style={{fontSize:11,color:'#2C1F14',fontWeight:600,width:28,textAlign:'right'}}>{f.pct}%</span>
              </div>
            ))}
          </CardClaro>
        </div>

        <CardClaro>
          <div style={{fontSize:9,letterSpacing:'0.1em',color:'#9A8878',textTransform:'uppercase',marginBottom:12}}>Performance de Stories</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:10}}>
            {[['Alcance',d.stories.alcance],['Toque pra frente',d.stories.toqueFrente],['Saídas',d.stories.saidas],['Respostas',d.stories.respostas]].map(([l,v]) => (
              <div key={l} style={{background:'#2C1F14',borderRadius:6,padding:'12px',textAlign:'center'}}>
                <div style={{fontSize:9,color:'#7A6A58',marginBottom:5,textTransform:'uppercase',letterSpacing:'0.08em'}}>{l}</div>
                <div style={{fontSize:18,fontWeight:600,color:'#F5F0E8'}}>{v}</div>
              </div>
            ))}
          </div>
        </CardClaro>

        <CardClaro>
          <div style={{fontSize:9,letterSpacing:'0.1em',color:'#9A8878',textTransform:'uppercase',marginBottom:12}}>Pico de engajamento por dia da semana</div>
          <div style={{display:'flex',gap:8}}>
            {d.picoHorario.map(p => (
              <div key={p.dia} style={{flex:1,background:'#2C1F14',borderRadius:6,padding:'12px 8px',textAlign:'center'}}>
                <div style={{fontSize:9,color:'#7A6A58',marginBottom:4,textTransform:'uppercase'}}>{p.dia}</div>
                <div style={{fontSize:16,fontWeight:600,color:'#C4A870'}}>{p.hora}</div>
                <div style={{fontSize:9,color:'#6A8A5A',marginTop:3}}>{p.eng}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:10,fontSize:10,color:'#9A8878'}}>Legenda ideal: <strong style={{color:'#2C1F14'}}>{d.legendaIdeal}</strong></div>
        </CardClaro>

        <div>
          <Titulo text="Por que estão engajando?" badge="análise IA"/>
          {d.posts.map(p => (
            <div key={p.rank} style={{background:'#2C1F14',borderRadius:8,padding:'14px',marginBottom:8}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <div style={{width:24,height:24,borderRadius:'50%',background:'#3D2B1A',border:'0.5px solid #C4A870',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:'#C4A870',fontWeight:600}}>{p.rank}</div>
                  <span style={{fontSize:10,color:'#8A7A68',background:'#3D2B1A',borderRadius:10,padding:'2px 10px'}}>{p.format}</span>
                </div>
                <div style={{display:'flex',gap:14}}>
                  {[[p.curtidas,'curtidas'],[p.salvamentos,'salvamentos'],[p.comentarios,'comentários']].map(([v,l]) => (
                    <span key={l} style={{fontSize:10,color:'#7A6A58'}}><strong style={{color:'#F5F0E8'}}>{v}</strong> {l}</span>
                  ))}
                </div>
              </div>
              <div style={{background:'#3D2B1A',borderLeft:'2px solid #C4A870',borderRadius:'0 4px 4px 0',padding:'8px 12px'}}>
                <div style={{fontSize:8,color:'#C4A870',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:4}}>Por que engajou</div>
                <div style={{fontSize:11,color:'#A89A88',lineHeight:1.7}}>{p.why}</div>
              </div>
              {p.repost && <div style={{fontSize:10,color:'#6A8A5A',background:'#1A2A18',border:'0.5px solid #3A5030',borderRadius:10,padding:'4px 12px',marginTop:8,display:'inline-block'}}>Sugestão de repost: {p.repost}</div>}
            </div>
          ))}
        </div>

        <div>
          <Titulo text="Melhores hooks" badge="padrão IA"/>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:8}}>
            {d.hooks.map((h,i) => (
              <div key={i} style={{background:'#2C1F14',borderRadius:8,padding:'14px',display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:28,height:28,borderRadius:'50%',background:'#3D2B1A',border:'0.5px solid #C4A870',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,color:'#C4A870',fontWeight:600,flexShrink:0}}>{i+1}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:11,color:'#F5F0E8',lineHeight:1.5,marginBottom:5}}>{h.hook}</div>
                  <div style={{display:'flex',gap:12}}>
                    <span style={{fontSize:9,color:'#6A8A5A'}}>eng: <strong>{h.eng}</strong></span>
                    <span style={{fontSize:9,color:'#7A6A58'}}>{h.posts} posts</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Titulo text="Dores latentes nos comentários" badge="análise IA"/>
          {d.dores.map((dr,i) => (
            <div key={i} style={{background:'#F5F2EC',border:'0.5px solid #C4B89A',borderRadius:8,padding:'14px',marginBottom:8}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:6}}>
                <div style={{fontSize:13,color:'#2C1F14',fontWeight:600}}>{dr.dor}</div>
                <div style={{fontSize:10,color:'#C4A870',background:'#2C1F14',borderRadius:10,padding:'3px 12px',flexShrink:0,marginLeft:12}}>{dr.freq} menções</div>
              </div>
              <div style={{fontSize:10,color:'#7A6A58',fontStyle:'italic',marginBottom:8}}>{dr.exemplo}</div>
              <div style={{height:3,background:'#D4C8B8',borderRadius:2,overflow:'hidden'}}>
                <div style={{height:'100%',width:`${Math.round((dr.freq/d.dores[0].freq)*100)}%`,background:'#C4A870',borderRadius:2}}/>
              </div>
            </div>
          ))}
        </div>

        <div>
          <Titulo text="Temas com potencial de viralizar" badge="análise IA"/>
          {d.viral.map((v,i) => (
            <div key={i} style={{background:'#2C1F14',borderRadius:8,padding:'14px',display:'flex',alignItems:'flex-start',gap:12,marginBottom:8}}>
              <span style={{fontSize:9,color:v.potencial==='Alto'?'#6A8A5A':'#9A8060',background:v.potencial==='Alto'?'#1A2A18':'#2A2010',border:(v.potencial==='Alto'?'0.5px solid #3A5030':'0.5px solid #4A3A20'),borderRadius:10,padding:'3px 10px',flexShrink:0,marginTop:2}}>{v.potencial}</span>
              <div>
                <div style={{fontSize:13,color:'#F5F0E8',fontWeight:600,marginBottom:4}}>{v.tema}</div>
                <div style={{fontSize:10,color:'#8A7A68',lineHeight:1.6}}>{v.motivo}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:10}}>
          {d.recos.map((r,i) => (
            <CardClaro key={i}>
              <div style={{width:28,height:28,borderRadius:6,background:'#2C1F14',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:10}}>
                <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="#C4A870" strokeWidth="1.2">
                  {r.icon==='clock'  && <><circle cx="6" cy="6" r="4"/><path d="M6 4v2l1.5 1"/></>}
                  {r.icon==='play'   && <><rect x="1" y="1" width="10" height="10" rx="2"/><path d="M4 4l4 2-4 2z"/></>}
                  {r.icon==='target' && <><circle cx="6" cy="6" r="4"/><circle cx="6" cy="6" r="2"/></>}
                </svg>
              </div>
              <div style={{fontSize:12,color:'#2C1F14',lineHeight:1.5,marginBottom:4,fontWeight:600}}>{r.tip}</div>
              <div style={{fontSize:9,color:'#9A8878'}}>{r.sub}</div>
            </CardClaro>
          ))}
        </div>

        <CardEscuro style={{marginBottom:24}}>
          <div style={{fontSize:9,letterSpacing:'0.12em',color:'#7A6A58',textTransform:'uppercase',marginBottom:12}}>O que os leads estão buscando agora</div>
          {d.trends.map((t,i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 10px',background:'#3D2B1A',borderRadius:6,marginBottom:6}}>
              <span style={{fontSize:9,color:'#5A4A38',width:16}}>{i+1}</span>
              <span style={{fontSize:11,color:'#A89A88',flex:1}}>{t}</span>
              <span style={{fontSize:9,color:'#C4A870',border:'0.5px solid #4A3828',borderRadius:10,padding:'2px 10px'}}>{['alto','alto','médio','médio'][i]}</span>
            </div>
          ))}
        </CardEscuro>

      </div>
      </div>
    </div>
  )
}
