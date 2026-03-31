import React, { useState } from 'react'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [showSenha, setShowSenha] = useState(false)

  const USERS = [
    { email: 'amaria@officium.com.br', senha: 'officium2026' },
    { email: 'admin@officium.com.br', senha: 'admin2026' },
  ]

  function handleLogin() {
    const user = USERS.find(u => u.email === email && u.senha === senha)
    if (user) { setErro(''); onLogin() }
    else setErro('Email ou senha incorretos')
  }

  return (
    <div style={{ minHeight:'100vh', background:'#EDE8DF', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 20px', fontFamily:"'Inter', sans-serif" }}>

      <div style={{ display:'flex', alignItems:'center', gap:0, marginBottom:14, width:260, justifyContent:'center' }}>
        <div style={{ flex:1, height:'0.5px', background:'linear-gradient(to right, transparent, #C4A870)' }}/>
        <div style={{ margin:'0 16px' }}>
          <svg width="36" height="42" viewBox="0 0 36 42" fill="none">
            <line x1="18" y1="0" x2="18" y2="5" stroke="#C4A870" strokeWidth="1.2"/>
            <rect x="14" y="4" width="8" height="3" stroke="#C4A870" strokeWidth="1" fill="none"/>
            <path d="M14 7 C14 7 6 12 6 22 L6 31 L30 31 L30 22 C30 12 22 7 22 7 Z" stroke="#C4A870" strokeWidth="1.2" fill="none"/>
            <path d="M6 31 L30 31" stroke="#C4A870" strokeWidth="1.2"/>
            <path d="M12 31 C12 34.5 14.7 37 18 37 C21.3 37 24 34.5 24 31" stroke="#C4A870" strokeWidth="1.2" fill="none"/>
          </svg>
        </div>
        <div style={{ flex:1, height:'0.5px', background:'linear-gradient(to left, transparent, #C4A870)' }}/>
      </div>

      <div style={{ fontSize:9, letterSpacing:'0.24em', color:'#9A8060', textTransform:'uppercase', marginBottom:10, textAlign:'center' }}>Plataforma de Gestão</div>

      <div style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:36, fontWeight:300, letterSpacing:'0.2em', color:'#2C1F14', textTransform:'uppercase', textAlign:'center', marginBottom:10, lineHeight:1.1 }}>
        Métricas<br/>Officium
      </div>

      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:28 }}>
        <div style={{ height:'0.5px', width:28, background:'#C4A870' }}/>
        <div style={{ fontSize:8, letterSpacing:'0.2em', color:'#7A6A58', textTransform:'uppercase' }}>Boutique · Estratégia Médica</div>
        <div style={{ height:'0.5px', width:28, background:'#C4A870' }}/>
      </div>

      <div style={{ background:'#2C1F14', borderRadius:3, padding:'28px 26px', width:'100%', maxWidth:320 }}>
        <div style={{ fontSize:10, letterSpacing:'0.24em', color:'#C4A870', textTransform:'uppercase', textAlign:'center', marginBottom:5 }}>Acesso Restrito</div>
        <div style={{ height:'0.5px', background:'#C4A870', width:30, margin:'0 auto 22px' }}/>

        <div style={{ fontSize:8, letterSpacing:'0.18em', color:'#7A6A58', textTransform:'uppercase', marginBottom:5 }}>Email</div>
        <div style={{ display:'flex', alignItems:'center', gap:8, background:'#1E1510', border:`0.5px solid ${erro ? '#8A4A4A' : '#4A3828'}`, borderRadius:2, padding:'9px 12px', marginBottom:14 }}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#C4A870" strokeWidth="1"><rect x="1" y="3" width="10" height="7" rx="1"/><path d="M1 3l5 4 5-4"/></svg>
          <input value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key==='Enter' && handleLogin()} placeholder="seu@email.com" style={{ background:'none', border:'none', outline:'none', fontSize:11, color:'#C4B898', flex:1, fontFamily:'inherit' }}/>
        </div>

        <div style={{ fontSize:8, letterSpacing:'0.18em', color:'#7A6A58', textTransform:'uppercase', marginBottom:5 }}>Senha</div>
        <div style={{ display:'flex', alignItems:'center', gap:8, background:'#1E1510', border:`0.5px solid ${erro ? '#8A4A4A' : '#4A3828'}`, borderRadius:2, padding:'9px 12px', marginBottom:18 }}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#C4A870" strokeWidth="1"><rect x="2" y="5" width="8" height="6" rx="1"/><path d="M4 5V3.5a2 2 0 014 0V5"/></svg>
          <input type={showSenha ? 'text' : 'password'} value={senha} onChange={e => setSenha(e.target.value)} onKeyDown={e => e.key==='Enter' && handleLogin()} placeholder="••••••••" style={{ background:'none', border:'none', outline:'none', fontSize:11, color:'#C4B898', flex:1, fontFamily:'inherit' }}/>
          <svg onClick={() => setShowSenha(!showSenha)} width="11" height="11" viewBox="0 0 12 12" fill="none" stroke={showSenha ? '#C4A870' : '#4A3828'} strokeWidth="1" style={{ cursor:'pointer', flexShrink:0 }}><ellipse cx="6" cy="6" rx="5" ry="3"/><circle cx="6" cy="6" r="1.5"/></svg>
        </div>

        {erro && <div style={{ fontSize:10, color:'#C4A870', textAlign:'center', marginBottom:12, background:'#3A2020', borderRadius:4, padding:'6px 10px' }}>{erro}</div>}

        <div onClick={handleLogin} style={{ background:'#C4A870', borderRadius:2, padding:11, textAlign:'center', fontSize:9, letterSpacing:'0.24em', color:'#2C1F14', fontWeight:500, textTransform:'uppercase', cursor:'pointer', transition:'opacity 0.15s' }}>Entrar</div>

        <div style={{ fontSize:8, letterSpacing:'0.14em', color:'#5A4A38', textTransform:'uppercase', textAlign:'center', marginTop:14 }}>Acesso exclusivo à equipe interna</div>
      </div>

      <div style={{ height:'0.5px', width:50, background:'#C4A870', margin:'22px auto 8px' }}/>
      <div style={{ fontSize:8, letterSpacing:'0.16em', color:'#9A8878', textTransform:'uppercase', textAlign:'center' }}>Desenvolvido pela Boutique Officium</div>

    </div>
  )
}
