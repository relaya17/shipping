const CACHE_NAME = 'vip-shipping-cache-v3';
const OFFLINE_URL = '/offline.html';

const urlsToCache = [
  '/',
  '/manifest.json',
  '/images/shippingVip.jpg',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  OFFLINE_URL
];

// התקנה - שמירת קבצים קריטיים במטמון
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(urlsToCache);
    })()
  );
  self.skipWaiting();
});

// הפעלה - מחיקת מטמונים ישנים
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })()
  );
  self.clients.claim();
});

// טיפול בבקשות fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      try {
        // נסה להביא מהרשת
        const networkResponse = await fetch(event.request);
        // שמירה במטמון
        if (event.request.method === 'GET' && networkResponse.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
      } catch (error) {
        // במקרה שאין אינטרנט – החזר מהמטמון
        const cachedResponse = await caches.match(event.request);
        return cachedResponse || (event.request.destination === 'document'
          ? await caches.match(OFFLINE_URL)
          : undefined);
      }
    })()
  );
});

// טיפול בהתראות Push
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'עדכון חדש זמין!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/' },
    actions: [
      { action: 'open', title: 'פתח אתר', icon: '/icons/icon-72x72.png' },
      { action: 'close', title: 'סגור', icon: '/icons/icon-72x72.png' }
    ]
  };
  event.waitUntil(
    self.registration.showNotification('VIP International Shipping', options)
  );
});

// טיפול בלחיצה על התראה
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'open') {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
});
