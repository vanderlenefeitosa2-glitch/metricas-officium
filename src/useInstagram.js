const BASE = 'https://graph.facebook.com/v25.0'

export async function fetchProfile(igId, token) {
  const fields = 'followers_count,media_count,name,username,profile_picture_url'
  const res = await fetch(`${BASE}/${igId}?fields=${fields}&access_token=${token}`)
  return res.json()
}

export async function fetchInsights(igId, token) {
  const metrics = 'impressions,reach,profile_views,website_clicks,follower_count'
  const res = await fetch(`${BASE}/${igId}/insights?metric=${metrics}&period=month&access_token=${token}`)
  return res.json()
}

export async function fetchMedia(igId, token) {
  const fields = 'id,caption,media_type,timestamp,like_count,comments_count,saved,reach,impressions,engagement'
  const res = await fetch(`${BASE}/${igId}/media?fields=${fields}&limit=30&access_token=${token}`)
  return res.json()
}

export async function fetchStories(igId, token) {
  const fields = 'id,media_type,timestamp,reach,taps_forward,taps_back,exits,replies'
  const res = await fetch(`${BASE}/${igId}/stories?fields=${fields}&access_token=${token}`)
  return res.json()
}

export function calcEngagement(media) {
  if (!media || media.length === 0) return '0%'
  const total = media.reduce((acc, p) => acc + (p.like_count || 0) + (p.comments_count || 0), 0)
  const avg = total / media.length
  return `${((avg / 100) * 1).toFixed(2)}%`
}

export function getBarData(media) {
  if (!media || media.length === 0) return Array(12).fill(30)
  return media.slice(0, 12).map(p => p.like_count || 0)
}

export function getPicoHorario(media) {
  const dias = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
  const porDia = {}
  dias.forEach(d => { porDia[d] = { total: 0, count: 0, horas: {} } })
  if (!media) return dias.slice(1).map(dia => ({ dia, hora: '18h', eng: '0%' }))
  media.forEach(post => {
    const date = new Date(post.timestamp)
    const dia = dias[date.getDay()]
    const hora = date.getHours()
    const eng = (post.like_count || 0) + (post.comments_count || 0)
    if (!porDia[dia].horas[hora]) porDia[dia].horas[hora] = { total: 0, count: 0 }
    porDia[dia].horas[hora].total += eng
    porDia[dia].horas[hora].count++
    porDia[dia].total += eng
    porDia[dia].count++
  })
  return ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'].map(dia => {
    const horas = porDia[dia].horas
    let melhorHora = 18, melhorEng = 0
    Object.entries(horas).forEach(([h, d]) => {
      const avg = d.count > 0 ? d.total / d.count : 0
      if (avg > melhorEng) { melhorEng = avg; melhorHora = parseInt(h) }
    })
    const avgDia = porDia[dia].count > 0 ? (porDia[dia].total / porDia[dia].count).toFixed(0) : 0
    return { dia, hora: `${melhorHora}h`, eng: `${avgDia}` }
  })
}

export function getFormats(media) {
  if (!media || media.length === 0) return [{ name:'Reels', pct:60 }, { name:'Carrossel', pct:25 }, { name:'Foto', pct:15 }]
  const counts = { VIDEO: 0, CAROUSEL_ALBUM: 0, IMAGE: 0 }
  media.forEach(p => { if (counts[p.media_type] !== undefined) counts[p.media_type]++ })
  const total = media.length || 1
  return [
    { name: 'Reels', pct: Math.round((counts.VIDEO / total) * 100) },
    { name: 'Carrossel', pct: Math.round((counts.CAROUSEL_ALBUM / total) * 100) },
    { name: 'Foto', pct: Math.round((counts.IMAGE / total) * 100) },
  ]
}

export function getTopPosts(media) {
  if (!media || media.length === 0) return []
  return [...media]
    .sort((a, b) => ((b.like_count||0) + (b.comments_count||0)) - ((a.like_count||0) + (a.comments_count||0)))
    .slice(0, 3)
    .map((p, i) => ({
      rank: i + 1,
      format: p.media_type === 'VIDEO' ? 'Reel' : p.media_type === 'CAROUSEL_ALBUM' ? 'Carrossel' : 'Foto',
      curtidas: (p.like_count || 0).toLocaleString('pt-BR'),
      salvamentos: (p.saved || 0).toLocaleString('pt-BR'),
      comentarios: (p.comments_count || 0).toLocaleString('pt-BR'),
      caption: p.caption?.substring(0, 100) || '',
      timestamp: p.timestamp,
    }))
}
