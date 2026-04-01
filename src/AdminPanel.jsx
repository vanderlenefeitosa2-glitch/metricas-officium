import React, { useState, useEffect } from 'react'

const STORAGE_KEY = 'officium_users'
const DEFAULTS = [
  { email: 'amaria@officium.com.br', nome: 'A Maria', tipo: 'Admin' },
  { email: 'admin@officium.com.br', nome: 'Admin', tipo: 'Admin' },
]

function getUsers() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const extras = stored ? JSON.parse(stored) : []
    return [...DEFAULTS, ...extras.map(u => ({ ...u, tipo: 'Usuário' }))]
  } catch { return DEFAULTS }
}

function removeUser(email) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const users = stored ? JSON.parse(stored) : []
    const updated = users.filter(u => u.email !== email)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch {}
}

function saveUser(nome, email, senha) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const users = stored ? JSON.parse(stored) : []
    users.push({ nome, email, senha })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
  } catch {}
}

const s = {
  wrap: { padding: '20px', maxWidth: 900, margin: '0 auto' },
  header: { fontSize: 9, letterSpacing: '0.12em', color: '#9A8878', textTransform: 'uppercase', marginBottom: 16, paddingBottom: 8, borderBottom: '0.5px solid #C4B89A', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  addBtn: { background: '#2C1F14', color: '#C4A870', border: '0.5px solid #C4A870', borderRadius: 4, padding: '6px 14px', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { fontSize: 8, letterSpacing: '0.12em', color: '#9A8878', textTransform: 'uppercase', textAlign: 'left', padding: '8px 12px', borderBottom: '0.5px solid #C4B89A' },
  td: { fontSize: 12, color: '#2C1F14', padding: '12px', borderBottom: '0.5px solid #E8E2D8' },
  badge: (tipo) => ({ fontSize: 9, color: tipo === 'Admin' ? '#C4A870' : '#6A8A5A', background: tipo === 'Admin' ? '#2C1F14' : '#1A2A18', borderRadius: 10, padding: '2px 8px', border: `0.5px solid ${tipo === 'Admin' ? '#C4A870' : '#3A5030'}` }),
  removeBtn: { fontSize: 9, color: '#8A5A5A', background: 'none', border: '0.5px solid #C4B89A', borderRadius: 4, padding: '4px 10px', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase' },
  modal: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(44,31,20,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 },
  modalCard: { background: '#2C1F14', borderRadius: 8, padding: '28px 26px', width: 320 },
  modalTitle: { fontSize: 10, letterSpacing: '0.2em', color: '#C4A870', textTransform: 'uppercase', textAlign: 'center', marginBottom: 5 },
  modalLine: { height: '0.5px', background: '#C4A870', width: 30, margin: '0 auto 20px' },
  label: { fontSize: 8, letterSpacing: '0.16em', color: '#7A6A58', textTransform: 'uppercase', marginBottom: 4 },
  inputWrap: { display: 'flex', alignItems: 'center', gap: 8, background: '#1E1510', border: '0.5px solid #4A3828', borderRadius: 2, padding: '9px 12px', marginBottom: 12 },
  input: { background: 'none', border: 'none', outline: 'none', fontSize: 11, color: '#C4B898', flex: 1, fontFamily: 'inherit' },
  confirmBtn: { background: '#C4A870', borderRadius: 2, padding: 10, textAlign: 'center', fontSize: 9, letterSpacing: '0.2em', color: '#2C1F14', fontWeight: 500, textTransform: 'uppercase', cursor: 'pointer', marginTop: 4 },
  cancelBtn: { background: 'none', border: '0.5px solid #4A3828', borderRadius: 2, padding: 8, textAlign: 'center', fontSize: 9, letterSpacing: '0.16em', color: '#7A6A58', textTransform: 'uppercase', cursor: 'pointer', marginTop: 8 },
  erro: { fontSize: 10, color: '#C4A870', background: '#3A2020', borderRadius: 4, padding: '6px 10px', marginBottom: 12, textAlign: 'center' },
}

export default function AdminPanel() {
  const [users, setUsers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirma, setConfirma] = useState('')
  const [erro, setErro] = useState('')

  useEffect(() => { setUsers(getUsers()) }, [])

  function handleAdd() {
    if (!nome || !email || !senha || !confirma) { setErro('Preencha todos os campos'); return }
    if (senha !== confirma) { setErro('As senhas não coincidem'); return }
    if (senha.length < 6) { setErro('Mínimo 6 caracteres'); return }
    if (users.find(u => u.email === email)) { setErro('Email já cadastrado'); return }
    saveUser(nome, email, senha)
    setUsers(getUsers())
    setShowModal(false)
    setNome(''); setEmail(''); setSenha(''); setConfirma(''); setErro('')
  }

  function handleRemove(email) {
    if (DEFAULTS.find(d => d.email === email)) return
    removeUser(email)
    setUsers(getUsers())
  }

  const IconUser = () => <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#C4A870" strokeWidth="1"><circle cx="6" cy="4" r="2"/><path d="M2 10c0-2.2 1.8-4 4-4s4 1.8 4 4"/></svg>
  const IconEmail = () => <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#C4A870" strokeWidth="1"><rect x="1" y="3" width="10" height="7" rx="1"/><path d="M1 3l5 4 5-4"/></svg>
  const IconLock = () => <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#C4A870" strokeWidth="1"><rect x="2" y="5" width="8" height="6" rx="1"/><path d="M4 5V3.5a2 2 0 014 0V5"/></svg>

  return (
    <div style={s.wrap}>
      <div style={s.header}>
        <span>Gerenciar acessos · {users.length} usuários</span>
        <button onClick={() => setShowModal(true)} style={s.addBtn}>+ Novo acesso</button>
      </div>

      <div style={{ background: '#F5F2EC', border: '0.5px solid #C4B89A', borderRadius: 8, overflow: 'hidden' }}>
        <table style={s.table}>
          <thead>
            <tr style={{ background: '#EAE4DA' }}>
              <th style={s.th}>Nome</th>
              <th style={s.th}>Email</th>
              <th style={s.th}>Tipo</th>
              <th style={s.th}>Ação</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#F5F2EC' : '#F0EDE6' }}>
                <td style={s.td}>{u.nome}</td>
                <td style={{ ...s.td, color: '#7A6A58' }}>{u.email}</td>
                <td style={s.td}><span style={s.badge(u.tipo)}>{u.tipo}</span></td>
                <td style={s.td}>
                  {DEFAULTS.find(d => d.email === u.email)
                    ? <span style={{ fontSize: 9, color: '#C4B89A' }}>padrão</span>
                    : <button onClick={() => handleRemove(u.email)} style={s.removeBtn}>Remover</button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={s.modal}>
          <div style={s.modalCard}>
            <div style={s.modalTitle}>Novo Acesso</div>
            <div style={s.modalLine}/>
            {erro && <div style={s.erro}>{erro}</div>}
            <div style={s.label}>Nome</div>
            <div style={s.inputWrap}><IconUser/><input value={nome} onChange={e=>setNome(e.target.value)} placeholder="Nome completo" style={s.input}/></div>
            <div style={s.label}>Email</div>
            <div style={s.inputWrap}><IconEmail/><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email@exemplo.com" style={s.input}/></div>
            <div style={s.label}>Senha</div>
            <div style={s.inputWrap}><IconLock/><input type="password" value={senha} onChange={e=>setSenha(e.target.value)} placeholder="mínimo 6 caracteres" style={s.input}/></div>
            <div style={s.label}>Confirmar senha</div>
            <div style={s.inputWrap}><IconLock/><input type="password" value={confirma} onChange={e=>setConfirma(e.target.value)} placeholder="confirme a senha" style={s.input}/></div>
            <div onClick={handleAdd} style={s.confirmBtn}>Criar acesso</div>
            <div onClick={() => { setShowModal(false); setErro(''); setNome(''); setEmail(''); setSenha(''); setConfirma('') }} style={s.cancelBtn}>Cancelar</div>
          </div>
        </div>
      )}
    </div>
  )
}
