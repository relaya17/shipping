const CACHE_NAME = 'vip-shipping-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/images/shippingVip.jpg',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// התקנת Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// הפעלת Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// טיפול בבקשות
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // החזר מהמטמון אם קיים
        if (response) {
          return response;
        }

        // אחרת, קבל מהרשת
        return fetch(event.request).then((response) => {
          // בדוק אם התקבלה תגובה תקינה
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // שכפל את התגובה
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // במקרה של שגיאה, החזר עמוד 404 מותאם אישית
        if (event.request.destination === 'document') {
          return caches.match('/offline.html');
        }
      })
  );
});

// טיפול בהתראות Push
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'עדכון חדש זמין!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'צפה בעדכון',
        icon: '/icons/icon-72x72.png'
      },
      {
        action: 'close',
        title: 'סגור',
        icon: '/icons/icon-72x72.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('VIP International Shipping', options)
  );
});

// טיפול בלחיצה על התראה
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
