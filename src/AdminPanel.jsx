import React, { useState, useEffect } from 'react'

const KEY = 'officium_users_v2'
const DEFAULTS = [
  { email:'amaria@officium.com.br', nome:'A Maria', tipo:'Admin' },
  { email:'admin@officium.com.br', nome:'Admin', tipo:'Admin' },
]

function listar() {
  const extras = JSON.parse(localStorage.getItem(KEY)||'[]')
  return [...DEFAULTS, ...extras.map(u=>({...u,tipo:'Usuário'}))]
}
function remover(email) {
  const extras = JSON.parse(localStorage.getItem(KEY)||'[]')
  localStorage.setItem(KEY, JSON.stringify(extras.filter(u=>u.email!==email)))
}
function adicionar(nome,email,senha) {
  const extras = JSON.parse(localStorage.getItem(KEY)||'[]')
  extras.push({nome,email,senha})
  localStorage.setItem(KEY, JSON.stringify(extras))
}

export default function AdminPanel() {
  const [users, setUsers] = useState([])
  const [modal, setModal] = useState(false)
  const [nome, setNome]   = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [conf, setConf]   = useState('')
  const [err, setErr]     = useState('')

  useEffect(()=>{ setUsers(listar()) }, [])

  function salvar() {
    if (!nome||!email||!senha||!conf) return setErr('Preencha todos os campos')
    if (senha!==conf) return setErr('Senhas não coincidem')
    if (senha.length<6) return setErr('Mínimo 6 caracteres')
    if (listar().find(u=>u.email===email)) return setErr('Email já cadastrado')
    adicionar(nome,email,senha)
    setUsers(listar())
    setModal(false); setNome(''); setEmail(''); setSenha(''); setConf(''); setErr('')
  }

  function del(email) {
    if (DEFAULTS.find(d=>d.email===email)) return
    remover(email); setUsers(listar())
  }

  const s = {
    wrap:  { padding:'20px' },
    head:  { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16, paddingBottom:8, borderBottom:'0.5px solid #C4B89A' },
    btn:   { background:'#2C1F14', color:'#C4A870', border:'0.5px solid #C4A870', borderRadius:4, padding:'6px 14px', fontSize:9, letterSpacing:'0.12em', textTransform:'uppercase', cursor:'pointer' },
    tabWrap:{ background:'#F5F2EC', border:'0.5px solid #C4B89A', borderRadius:8, overflow:'hidden' },
    th:    { fontSize:8, letterSpacing:'0.12em', color:'#9A8878', textTransform:'uppercase', textAlign:'left', padding:'10px 14px', borderBottom:'0.5px solid #C4B89A', background:'#EAE4DA' },
    td:    { fontSize:12, color:'#2C1F14', padding:'12px 14px', borderBottom:'0.5px solid #E8E2D8' },
    badge: (t) => ({ fontSize:9, color:t==='Admin'?'#C4A870':'#6A8A5A', background:t==='Admin'?'#2C1F14':'#1A2A18', borderRadius:10, padding:'2px 8px' }),
    delBtn:{ fontSize:9, color:'#8A5A5A', background:'none', border:'0.5px solid #C4B89A', borderRadius:4, padding:'3px 10px', cursor:'pointer' },
    overlay:{ position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(44,31,20,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100 },
    mCard: { background:'#2C1F14', borderRadius:8, padding:'28px', width:320 },
    mTit:  { fontSize:10, letterSpacing:'0.2em', color:'#C4A870', textTransform:'uppercase', textAlign:'center', marginBottom:16 },
    label: { fontSize:8, letterSpacing:'0.16em', color:'#7A6A58', textTransform:'uppercase', marginBottom:5 },
    field: { display:'flex', background:'#1E1510', border:'0.5px solid #4A3828', borderRadius:3, padding:'9px 12px', marginBottom:12 },
    inp:   { background:'none', border:'none', outline:'none', fontSize:11, color:'#C4B898', flex:1, fontFamily:'inherit' },
    mBtn:  { background:'#C4A870', borderRadius:3, padding:10, textAlign:'center', fontSize:9, letterSpacing:'0.2em', color:'#2C1F14', fontWeight:600, textTransform:'uppercase', cursor:'pointer', marginTop:4, width:'100%', border:'none' },
    mCan:  { background:'none', border:'0.5px solid #4A3828', borderRadius:3, padding:8, textAlign:'center', fontSize:9, color:'#7A6A58', textTransform:'uppercase', cursor:'pointer', marginTop:8, width:'100%' },
    err:   { fontSize:10, color:'#C4A870', background:'#3A2020', borderRadius:4, padding:'6px 10px', marginBottom:12, textAlign:'center' },
  }

  return (
    <div style={s.wrap}>
      <div style={s.head}>
        <span style={{fontSize:9,letterSpacing:'0.1em',color:'#9A8878',textTransform:'uppercase'}}>{users.length} usuários cadastrados</span>
        <button onClick={()=>setModal(true)} style={s.btn}>+ Novo acesso</button>
      </div>

      <div style={s.tabWrap}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr>
              <th style={s.th}>Nome</th>
              <th style={s.th}>Email</th>
              <th style={s.th}>Tipo</th>
              <th style={s.th}>Ação</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u,i)=>(
              <tr key={i} style={{background:i%2===0?'#F5F2EC':'#F0EDE6'}}>
                <td style={s.td}>{u.nome}</td>
                <td style={{...s.td,color:'#7A6A58'}}>{u.email}</td>
                <td style={s.td}><span style={s.badge(u.tipo)}>{u.tipo}</span></td>
                <td style={s.td}>
                  {DEFAULTS.find(d=>d.email===u.email)
                    ? <span style={{fontSize:9,color:'#C4B89A'}}>padrão</span>
                    : <button onClick={()=>del(u.email)} style={s.delBtn}>Remover</button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div style={s.overlay}>
          <div style={s.mCard}>
            <div style={s.mTit}>Novo Acesso</div>
            {err && <div style={s.err}>{err}</div>}
            <div style={s.label}>Nome</div>
            <div style={s.field}><input value={nome} onChange={e=>setNome(e.target.value)} placeholder="Nome completo" style={s.inp}/></div>
            <div style={s.label}>Email</div>
            <div style={s.field}><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email@exemplo.com" style={s.inp}/></div>
            <div style={s.label}>Senha</div>
            <div style={s.field}><input type="password" value={senha} onChange={e=>setSenha(e.target.value)} placeholder="mínimo 6 caracteres" style={s.inp}/></div>
            <div style={s.label}>Confirmar Senha</div>
            <div style={s.field}><input type="password" value={conf} onChange={e=>setConf(e.target.value)} placeholder="repita a senha" style={s.inp}/></div>
            <button onClick={salvar} style={s.mBtn}>Criar Acesso</button>
            <button onClick={()=>{setModal(false);setErr('');setNome('');setEmail('');setSenha('');setConf('')}} style={s.mCan}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  )
}
