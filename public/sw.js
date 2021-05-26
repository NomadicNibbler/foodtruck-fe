const CACHE_VERSION = 10;
const CURRENT_CACHE = `main-${CACHE_VERSION}`;

const urlsToCache = [
  '/site.webmanifest',
  '/static/js/main.chunk.js',
  '/static/js/vendors~main.chunk.js',
  '/static/js/bundle.js',
  '/favicon.ico',
  '/mstile-144x144.png',
  'static/media/artboard_1.b2705420.webp',
  '/',
  '/login',
  '/newuser',
  '/newlocatioin', 
  '/trucklist', 
  '/map',
];

self.addEventListener('activate', evt =>
  evt.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CURRENT_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  )
);

self.addEventListener('install', evt =>
  evt.waitUntil(
    caches.open(CURRENT_CACHE).then(cache => {
      return cache.addAll(urlsToCache);
    })
  )
);


const fromNetwork = (request, timeout) =>
  new Promise((fulfill, reject) => {
    const timeoutId = setTimeout(reject, timeout);
    fetch(request).then(response => {
      clearTimeout(timeoutId);
      fulfill(response);
      update(request);
    }, reject);
  });

const fromCache = request =>
  caches
    .open(CURRENT_CACHE)
    .then(cache =>
      cache
        .match(request)
        .then(matching => matching || cache.match('/offline/'))
    );

const update = request =>
  caches
    .open(CURRENT_CACHE)
    .then(cache =>
      fetch(request).then(response => cache.put(request, response))
    );

self.addEventListener('fetch', evt => {
  if (!(evt.request.url.indexOf('http') === 0)) return;
  if(evt.request.method === 'POST') return; 
  evt.respondWith(
    fromNetwork(evt.request, 10000).catch(() => fromCache(evt.request))
  );
  evt.waitUntil(update(evt.request));
});