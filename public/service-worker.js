const CACHE_NAME = 'my-site-cache-v1';

// List of files to cache
const urlsToCache = [
  '/',                // Root URL
  '/index.html',      // Main HTML file
  '/static/js/main.js', // Adjust based on your build output
  '/static/css/main.css', // Adjust based on your build output
  '/favicon.ico',     // Favicon
  '/logo192.png',     // Example logo
];

// Install event: Cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Failed to cache during install:', error);
      })
  );
});

// Fetch event: Serve files from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached response if available, otherwise fetch from network
        return response || fetch(event.request);
      })
      .catch((error) => {
        console.error('Fetch failed:', error);
      })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
