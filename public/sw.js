// Service Worker for Khmer E-Invitation
const CACHE_NAME = 'e-invitation-khmer-v6';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// Network First strategy to ensure live updates are always immediately visible
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // For navigation or scripts/styles, always fetch from network first
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Only cache valid GET responses for media/fonts if desired
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
