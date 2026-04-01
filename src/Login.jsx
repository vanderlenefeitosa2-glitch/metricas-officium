import React, { useState } from 'react'

const BELL = () => (
  <svg width="36" height="42" viewBox="0 0 36 42" fill="none">
    <line x1="18" y1="0" x2="18" y2="5" stroke="#C4A870" strokeWidth="1.2"/>
    <rect x="14" y="4" width="8" height="3" stroke="#C4A870" strokeWidth="1" fill="none"/>
    <path d="M14 7 C14 7 6 12 6 22 L6 31 L30 31 L30 22 C30 12 22 7 22 7 Z" stroke="#C4A870" strokeWidth="1.2" fill="none"/>
    <path d="M6 31 L30 31" stroke="#C4A870" strokeWidth="1.2"/>
    <path d="M12 31 C12 34.5 14.7 37 18 37 C21.3 37 24 34.5 24 31" stroke="#C4A870" strokeWidth="1.2" fill="none"/>
  </svg>
)

const STORAGE_KEY = 'officium_users'

function getUsers() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const users = stored ? JSON.parse(stored) : []
    const defaults = [
      { email: 'amaria@officium.com.br', senha: 'officium2026', nome: 'A Maria' },
      { email: 'admin@officium.com.br', senha: 'admin2026', nome: 'Admin' },
    ]
    if (users.length === 0) return defaults
    return [...defaults, ...users]
  } catch { return [] }
}

function saveUser(nome, email, senha) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const users = stored ? JSON.parse(stored) : []
    users.push({ nome, email, senha })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
  } catch {}
}

export default function Login({ onLogin }) {
  const [modo, setModo] = useState('login')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirma, setConfirma] = useState('')
  const [showSenha, setShowSenha] = useState(false)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')

  const s = {
    wrap: { minHeight:'100vh', background:'#EDE8DF', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 20px', fontFamily:"'Inter',sans-serif" },
    divLine: { display:'flex', alignItems:'center', gap:0, marginBottom:14, width:260, justifyContent:'center' },
    line: (dir) => ({ flex:1, height:'0.5px', background:`linear-gradient(to ${dir}, transparent, #C4A870)` }),
    plataforma: { fontSize:9, letterSpacing:'0.24em', color:'#9A8060', textTransform:'uppercase', marginBottom:10, textAlign:'center' },
    titulo: { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:36, fontWeight:300, letterSpacing:'0.2em', color:'#2C1F14', textTransform:'uppercase', textAlign:'center', marginBottom:10, lineHeight:1.1 },
    subtDiv: { display:'flex', alignItems:'center', gap:10, marginBottom:28 },
    subtLine: { height:'0.5px', width:28, background:'#C4A870' },
    subtTxt: { fontSize:8, letterSpacing:'0.2em', color:'#7A6A58', textTransform:'uppercase' },
    card: { background:'#2C1F14', borderRadius:3, padding:'28px 26px', width:'100%', maxWidth:340 },
    cardTitle: { fontSize:10, letterSpacing:'0.24em', color:'#C4A870', textTransform:'uppercase', textAlign:'center', marginBottom:5 },
    cardLine: { height:'0.5px', background:'#C4A870', width:30, margin:'0 auto 22px' },
    label: { fontSize:8, letterSpacing:'0.18em', color:'#7A6A58', textTransform:'uppercase', marginBottom:5 },
    inputWrap: (err) => ({ display:'flex', alignItems:'center', gap:8, background:'#1E1510', border:`0.5px solid ${err?'#8A4A4A':'#4A3828'}`, borderRadius:2, padding:'9px 12px', marginBottom:14 }),
    input: { background:'none', border:'none', outline:'none', fontSize:11, color:'#C4B898', flex:1, fontFamily:'inherit' },
    btn: { background:'#C4A870', borderRadius:2, padding:11, textAlign:'center', fontSize:9, letterSpacing:'0.24em', color:'#2C1F14', fontWeight:500, textTransform:'uppercase', cursor:'pointer' },
    btnSecondary: { background:'none', border:'0.5px solid #4A3828', borderRadius:2, padding:9, textAlign:'center', fontSize:9, letterSpacing:'0.18em', color:'#7A6A58', textTransform:'uppercase', cursor:'pointer', marginTop:10 },
    erro: { fontSize:10, color:'#C4A870', textAlign:'center', marginBottom:12, background:'#3A2020', borderRadius:4, padding:'6px 10px' },
    sucesso: { fontSize:10, color:'#6A8A5A', textAlign:'center', marginBottom:12, background:'#1A2A18', borderRadius:4, padding:'6px 10px' },
    rodapeDiv: { height:'0.5px', width:50, background:'#C4A870', margin:'22px auto 8px' },
    rodape: { fontSize:8, letterSpacing:'0.16em', color:'#9A8878', textTransform:'uppercase', textAlign:'center' },
    restricted: { fontSize:8, letterSpacing:'0.14em', color:'#5A4A38', textTransform:'uppercase', textAlign:'center', marginTop:14 },
  }

  function handleLogin() {
    const users = getUsers()
    const user = users.find(u => u.email === email && u.senha === senha)
    if (user) { setErro(''); onLogin(user.nome || 'Usuário', email) }
    else setErro('Email ou senha incorretos')
  }

  function handleCadastro() {
    if (!nome || !email || !senha || !confirma) { setErro('Preencha todos os campos'); return }
    if (senha !== confirma) { setErro('As senhas não coincidem'); return }
    if (senha.length < 6) { setErro('Senha deve ter pelo menos 6 caracteres'); return }
    const users = getUsers()
    if (users.find(u => u.email === email)) { setErro('Email já cadastrado'); return }
    saveUser(nome, email, senha)
    setErro('')
    setSucesso('Acesso criado! Faça login para entrar.')
    setTimeout(() => { setSucesso(''); setModo('login'); setNome(''); setConfirma('') }, 2000)
  }

  const IconEmail = () => <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#C4A870" strokeWidth="1"><rect x="1" y="3" width="10" height="7" rx="1"/><path d="M1 3l5 4 5-4"/></svg>
  const IconLock = () => <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#C4A870" strokeWidth="1"><rect x="2" y="5" width="8" height="6" rx="1"/><path d="M4 5V3.5a2 2 0 014 0V5"/></svg>
  const IconUser = () => <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#C4A870" strokeWidth="1"><circle cx="6" cy="4" r="2"/><path d="M2 10c0-2.2 1.8-4 4-4s4 1.8 4 4"/></svg>
  const IconEye = () => <svg onClick={() => setShowSenha(!showSenha)} width="11" height="11" viewBox="0 0 12 12" fill="none" stroke={showSenha?'#C4A870':'#4A3828'} strokeWidth="1" style={{cursor:'pointer',flexShrink:0}}><ellipse cx="6" cy="6" rx="5" ry="3"/><circle cx="6" cy="6" r="1.5"/></svg>

  return (
    <div style={s.wrap}>
      <div style={s.divLine}>
        <div style={s.line('right')}/>
        <div style={{margin:'0 16px'}}><BELL/></div>
        <div style={s.line('left')}/>
      </div>

      <div style={s.plataforma}>Plataforma de Gestão</div>

      <div style={s.titulo}>Métricas<br/>Officium</div>

      <div style={s.subtDiv}>
        <div style={s.subtLine}/>
        <div style={s.subtTxt}>Boutique · Estratégia Médica</div>
        <div style={s.subtLine}/>
      </div>

      <div style={s.card}>
        <div style={s.cardTitle}>{modo === 'login' ? 'Acesso Restrito' : 'Criar Acesso'}</div>
        <div style={s.cardLine}/>

        {erro && <div style={s.erro}>{erro}</div>}
        {sucesso && <div style={s.sucesso}>{sucesso}</div>}

        {modo === 'cadastro' && (
          <>
            <div style={s.label}>Nome</div>
            <div style={s.inputWrap(false)}>
              <IconUser/>
              <input value={nome} onChange={e=>setNome(e.target.value)} placeholder="Seu nome" style={s.input}/>
            </div>
          </>
        )}

        <div style={s.label}>Email</div>
        <div style={s.inputWrap(!!erro)}>
          <IconEmail/>
          <input value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&modo==='login'&&handleLogin()} placeholder="seu@email.com" style={s.input}/>
        </div>

        <div style={s.label}>Senha</div>
        <div style={s.inputWrap(!!erro)}>
          <IconLock/>
          <input type={showSenha?'text':'password'} value={senha} onChange={e=>setSenha(e.target.value)} onKeyDown={e=>e.key==='Enter'&&modo==='login'&&handleLogin()} placeholder="••••••••" style={s.input}/>
          <IconEye/>
        </div>

        {modo === 'cadastro' && (
          <>
            <div style={s.label}>Confirmar senha</div>
            <div style={s.inputWrap(false)}>
              <IconLock/>
              <input type="password" value={confirma} onChange={e=>setConfirma(e.target.value)} placeholder="••••••••" style={s.input}/>
            </div>
          </>
        )}

        <div onClick={modo==='login'?handleLogin:handleCadastro} style={s.btn}>
          {modo === 'login' ? 'Entrar' : 'Criar acesso'}
        </div>

        <div onClick={() => { setModo(modo==='login'?'cadastro':'login'); setErro(''); setSucesso('') }} style={s.btnSecondary}>
          {modo === 'login' ? '+ Criar novo acesso' : '← Voltar para login'}
        </div>

        <div style={s.restricted}>Acesso exclusivo à equipe interna</div>
      </div>

      <div style={s.rodapeDiv}/>
      <div style={s.rodape}>Desenvolvido pela Boutique Officium</div>
    </div>
  )
}
