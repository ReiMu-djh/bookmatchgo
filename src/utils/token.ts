import type { DestinyKey } from '@/data/destinies'

const DESTINY_PREFIX: Record<DestinyKey, string> = {
  STRATEGIST: 'ST', HOTBLOOD: 'HB', COWARD: 'CW', UNDERDOG: 'UD',
  SLACKER: 'SK', YANDERE: 'YD', CHOSEN_ONE: 'CO', VILLAIN: 'VL'
}

const CIPHER_KEY = 'BookMatch2026'

function xorEncrypt(input: string): string {
  const encoder = new TextEncoder()
  const inputBytes = encoder.encode(input)
  const keyBytes = encoder.encode(CIPHER_KEY)
  const result = new Uint8Array(inputBytes.length)
  for (let i = 0; i < inputBytes.length; i++) {
    result[i] = inputBytes[i] ^ keyBytes[i % keyBytes.length]
  }
  let binary = ''
  for (let i = 0; i < result.length; i++) {
    binary += String.fromCharCode(result[i])
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function xorDecrypt(encoded: string): string | null {
  try {
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/')
    while (base64.length % 4) base64 += '='
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    const encoder = new TextEncoder()
    const keyBytes = encoder.encode(CIPHER_KEY)
    const result = new Uint8Array(bytes.length)
    for (let i = 0; i < bytes.length; i++) {
      result[i] = bytes[i] ^ keyBytes[i % keyBytes.length]
    }
    return new TextDecoder().decode(result)
  } catch {
    return null
  }
}

export function generateToken(destinyKey: DestinyKey, nickname: string): string {
  const prefix = DESTINY_PREFIX[destinyKey]
  const payload = JSON.stringify({ d: prefix, n: nickname || '无名侠客' })
  const encoded = xorEncrypt(payload)
  return `BM-${encoded}`
}

export function parseToken(token: string): { valid: boolean; destinyPrefix: string; nickname: string } {
  const trimmed = token.trim()
  if (!trimmed.toUpperCase().startsWith('BM-')) return { valid: false, destinyPrefix: '', nickname: '' }

  const encoded = trimmed.slice(3)
  const decoded = xorDecrypt(encoded)
  if (!decoded) return { valid: false, destinyPrefix: '', nickname: '' }

  try {
    const payload = JSON.parse(decoded)
    if (payload.d && payload.n) {
      return { valid: true, destinyPrefix: payload.d, nickname: payload.n }
    }
  } catch {}

  return { valid: false, destinyPrefix: '', nickname: '' }
}

export function getDestinyKeyFromPrefix(prefix: string): DestinyKey | null {
  const entries = Object.entries(DESTINY_PREFIX) as [DestinyKey, string][]
  const entry = entries.find(([, v]) => v === prefix.toUpperCase())
  return entry ? entry[0] : null
}
