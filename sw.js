/* DB-bible_v16 Service Worker */
const CACHE = 'db-bible-v16-1';
const PRECACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-96.png',
  './icons/icon-144.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(PRECACHE))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // 외부 폰트·CDN은 네트워크 우선
  if (url.origin !== self.location.origin) {
    event.respondWith(
      fetch(req).catch(() => caches.match(req))
    );
    return;
  }
  // 앱 파일: 캐시 우선, 없으면 네트워크 후 캐시
  event.respondWith(
    caches.match(req).then((hit) => {
      if (hit) {
        // 백그라운드 갱신
        fetch(req).then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
        }).catch(() => {});
        return hit;
      }
      return fetch(req).then((res) => {
        if (res && res.ok && (url.pathname.endsWith('.html') || url.pathname.endsWith('.js') || url.pathname.endsWith('.webmanifest') || url.pathname.includes('/icons/'))) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
