// Service worker de la bitácora: hace que la página se pueda instalar como app y que abra sin internet.
// - La página (index.html): primero pide la versión nueva; si no hay internet, usa la guardada.
// - Lo demás (JS, CSS, fuentes, íconos): usa lo guardado y lo actualiza en segundo plano.
// Si cambias este archivo, sube la versión para que se borre lo viejo.
const VERSION = 'bitacora-v1'

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(['./', './manifest.webmanifest', './iconos/icono-192.png'])))
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((claves) => Promise.all(claves.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (e) => {
  const pedido = e.request
  if (pedido.method !== 'GET' || new URL(pedido.url).origin !== self.location.origin) return

  if (pedido.mode === 'navigate') {
    e.respondWith(
      fetch(pedido)
        .then((r) => {
          const copia = r.clone()
          caches.open(VERSION).then((c) => c.put('./', copia))
          return r
        })
        .catch(() => caches.match('./')),
    )
    return
  }

  e.respondWith(
    caches.open(VERSION).then(async (c) => {
      const guardada = await c.match(pedido)
      const nueva = fetch(pedido)
        .then((r) => {
          if (r.ok) c.put(pedido, r.clone())
          return r
        })
        .catch(() => guardada)
      return guardada || nueva
    }),
  )
})
