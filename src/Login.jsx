import React, { useState } from 'react'

const STORAGE_KEY = 'officium_users_v2'

function getUsers() {
  try {
    const extras = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return [
      { email: 'amaria@officium.com.br', senha: 'officium2026', nome: 'A Maria' },
      { email: 'admin@officium.com.br', senha: 'admin2026', nome: 'Admin' },
      ...extras
    ]
  } catch { return [] }
}

function addUser(nome, email, senha) {
  const extras = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  extras.push({ nome, email, senha })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(extras))
}

const B = {
  wrap:   { minHeight:'100vh', background:'#EDE8DF', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 20px', fontFamily:"'Inter',sans-serif" },
  card:   { background:'#2C1F14', borderRadius:6, padding:'32px 28px', width:'100%', maxWidth:340 },
  titulo: { fontFamily:"Georgia,serif", fontSize:32, fontWeight:300, letterSpacing:'0.15em', color:'#2C1F14', textTransform:'uppercase', textAlign:'center', marginBottom:8, lineHeight:1.2 },
  sub:    { fontSize:9, letterSpacing:'0.22em', color:'#9A8060', textTransform:'uppercase', textAlign:'center', marginBottom:6 },
  label:  { fontSize:9, letterSpacing:'0.16em', color:'#7A6A58', textTransform:'uppercase', marginBottom:5 },
  field:  (err) => ({ display:'flex', alignItems:'center', gap:8, background:'#1E1510', border: err ? '1px solid #8A4A4A' : '0.5px solid #4A3828', borderRadius:3, padding:'10px 12px', marginBottom:14 }),
  inp:    { background:'none', border:'none', outline:'none', fontSize:12, color:'#C4B898', flex:1, fontFamily:'inherit' },
  btn:    { background:'#C4A870', borderRadius:3, padding:12, textAlign:'center', fontSize:9, letterSpacing:'0.22em', color:'#2C1F14', fontWeight:600, textTransform:'uppercase', cursor:'pointer', width:'100%', border:'none' },
  btnSec: { background:'none', border:'0.5px solid #4A3828', borderRadius:3, padding:10, textAlign:'center', fontSize:9, letterSpacing:'0.16em', color:'#7A6A58', textTransform:'uppercase', cursor:'pointer', width:'100%', marginTop:8 },
  msg:    (tipo) => ({ fontSize:10, textAlign:'center', padding:'6px 10px', borderRadius:4, marginBottom:12, background: tipo==='erro' ? '#3A2020' : '#1A2A18', color: tipo==='erro' ? '#C4A870' : '#6A9A5A' }),
  rodape: { fontSize:8, letterSpacing:'0.14em', color:'#9A8878', textTransform:'uppercase', textAlign:'center', marginTop:20 },
}

export default function Login({ onLogin }) {
  const [modo, setModo]       = useState('login')
  const [nome, setNome]       = useState('')
  const [email, setEmail]     = useState('')
  const [senha, setSenha]     = useState('')
  const [conf, setConf]       = useState('')
  const [show, setShow]       = useState(false)
  const [msg, setMsg]         = useState(null)

  function entrar() {
    const u = getUsers().find(x => x.email === email && x.senha === senha)
    if (u) { onLogin(u.nome, email) } else { setMsg({ tipo:'erro', txt:'Email ou senha incorretos' }) }
  }

  function cadastrar() {
    if (!nome || !email || !senha || !conf) return setMsg({ tipo:'erro', txt:'Preencha todos os campos' })
    if (senha !== conf) return setMsg({ tipo:'erro', txt:'As senhas não coincidem' })
    if (senha.length < 6) return setMsg({ tipo:'erro', txt:'Mínimo 6 caracteres' })
    if (getUsers().find(x => x.email === email)) return setMsg({ tipo:'erro', txt:'Email já cadastrado' })
    addUser(nome, email, senha)
    setMsg({ tipo:'ok', txt:'Acesso criado! Faça login.' })
    setTimeout(() => { setModo('login'); setMsg(null); setNome(''); setConf('') }, 2000)
  }

  function trocar(e) {
    e.preventDefault(); e.stopPropagation()
    setModo(modo === 'login' ? 'cadastro' : 'login')
    setMsg(null); setNome(''); setSenha(''); setEmail(''); setConf('')
  }

  return (
    <div style={B.wrap}>
      <svg width="34" height="40" viewBox="0 0 36 42" fill="none" style={{marginBottom:14}}>
        <line x1="18" y1="0" x2="18" y2="5" stroke="#C4A870" strokeWidth="1.2"/>
        <rect x="14" y="4" width="8" height="3" stroke="#C4A870" strokeWidth="1" fill="none"/>
        <path d="M14 7 C14 7 6 12 6 22 L6 31 L30 31 L30 22 C30 12 22 7 22 7 Z" stroke="#C4A870" strokeWidth="1.2" fill="none"/>
        <path d="M6 31 L30 31" stroke="#C4A870" strokeWidth="1.2"/>
        <path d="M12 31 C12 34.5 14.7 37 18 37 C21.3 37 24 34.5 24 31" stroke="#C4A870" strokeWidth="1.2" fill="none"/>
      </svg>
      <div style={B.sub}>Plataforma de Gestão</div>
      <div style={B.titulo}>Métricas<br/>Officium</div>
      <div style={{fontSize:8,letterSpacing:'0.18em',color:'#9A8060',textTransform:'uppercase',textAlign:'center',marginBottom:28}}>Boutique · Estratégia Médica</div>

      <div style={B.card}>
        <div style={{fontSize:10,letterSpacing:'0.22em',color:'#C4A870',textTransform:'uppercase',textAlign:'center',marginBottom:4}}>{modo==='login' ? 'Acesso Restrito' : 'Criar Acesso'}</div>
        <div style={{height:'0.5px',background:'#C4A870',width:30,margin:'0 auto 20px'}}/>

        {msg && <div style={B.msg(msg.tipo)}>{msg.txt}</div>}

        {modo==='cadastro' && (
          <div>
            <div style={B.label}>Nome</div>
            <div style={B.field(false)}>
              <input value={nome} onChange={e=>setNome(e.target.value)} placeholder="Seu nome" style={B.inp}/>
            </div>
          </div>
        )}

        <div style={B.label}>Email</div>
        <div style={B.field(msg && msg.tipo==='erro')}>
          <input value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&modo==='login'&&entrar()} placeholder="seu@email.com" style={B.inp}/>
        </div>

        <div style={B.label}>Senha</div>
        <div style={B.field(msg && msg.tipo==='erro')}>
          <input type={show?'text':'password'} value={senha} onChange={e=>setSenha(e.target.value)} onKeyDown={e=>e.key==='Enter'&&modo==='login'&&entrar()} placeholder="••••••••" style={B.inp}/>
          <span onClick={()=>setShow(!show)} style={{cursor:'pointer',fontSize:11,color:'#7A6A58'}}>👁</span>
        </div>

        {modo==='cadastro' && (
          <div>
            <div style={B.label}>Confirmar Senha</div>
            <div style={B.field(false)}>
              <input type="password" value={conf} onChange={e=>setConf(e.target.value)} placeholder="••••••••" style={B.inp}/>
            </div>
          </div>
        )}

        <button onClick={modo==='login'?entrar:cadastrar} style={B.btn}>
          {modo==='login' ? 'Entrar' : 'Criar Acesso'}
        </button>
        <button onClick={trocar} style={B.btnSec}>
          {modo==='login' ? '+ Criar novo acesso' : '← Voltar para login'}
        </button>
        <div style={{fontSize:8,letterSpacing:'0.12em',color:'#5A4A38',textTransform:'uppercase',textAlign:'center',marginTop:14}}>Acesso exclusivo à equipe interna</div>
      </div>
      <div style={B.rodape}>Desenvolvido pela Boutique Officium</div>
    </div>
  )
}
