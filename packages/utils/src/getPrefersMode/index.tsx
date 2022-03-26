export type WebPrefersMode = 'DARK' | 'LIGHT'

const DARK_MODE = '(prefers-color-scheme: dark)'

function getWebPrefersMode(): WebPrefersMode {
  if (typeof window === 'undefined') {
    return 'LIGHT'
  }

  return window.matchMedia(DARK_MODE).matches ? 'DARK' : 'LIGHT'
}

export default getWebPrefersMode
