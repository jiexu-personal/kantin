// ═══════════════════════════════
// Service Worker — Kantin Terminal Ferry
// Version bump here to force cache refresh
// ═══════════════════════════════
const CACHE_NAME = 'kantin-v4.0';
const OFFLINE_URLS = [
  './index.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap',
];

// ── INSTALL: cache all shell files ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache index.html dan manifest dulu (mesti berjaya)
      return cache.addAll(['./index.html', './manifest.json'])
        .then(() => {
          // Cache CDN files secara berasingan (gagal = OK, akan cuba semula kemudian)
          return Promise.allSettled([
            cache.add('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'),
            cache.add('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap'),
          ]);
        });
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: delete old caches ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: network-first for HTML, cache-first for assets ──
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and chrome-extension requests
  if (request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;

  // For navigation (HTML page): network-first, fallback to cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // For Google Fonts: cache-first
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        }).catch(() => new Response('', { status: 503 }));
      })
    );
    return;
  }

  // For jsPDF CDN: cache-first (supaya boleh guna offline)
  if (url.hostname.includes('cdnjs.cloudflare.com')) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          }
          return response;
        }).catch(() => new Response('// jsPDF offline — sila sambung internet sekali untuk download', { status: 503 }));
      })
    );
    return;
  }

  // For everything else: cache-first, fallback to network
  event.respondWith(
    caches.match(request).then(cached => {
      return cached || fetch(request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      });
    })
  );
});
