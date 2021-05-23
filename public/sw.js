const cacheName = 'version-1';
const self = this;

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

//Install a service worker
self.addEventListener('install', event => {
  //perform install steps
  event.waitUntil(
    caches.open('v1')
    .then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if(response) {
        return response 
      }
      return fetch(event.request);
    })
  );
});

// //update a service worker
// self.addEventListener('activate', event => {
//   const cacheWhitelist = ['pwa-nomadic-nibbler'];
//   event.waitUntil(
//     caches.keys().then(cacheName => {
//       if(cacheWhitelist.indexOf(cacheName) === -1) {
//         return caches.delete(cacheName); 
//       }
//     })
//   )
// })

// const cacheName = 'version-1';
// const self = this;

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
});


self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  event.waitUntil(
    caches.keys().then(cacheName => {
      return Promise.all(
        cacheName.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  // check if request is made by chrome extensions or web page
  // if request is made for web page url must contains http.
  if (!(evt.request.url.indexOf('http') === 0)) return; // skip the request. if request is not made with http protocol

  evt.respondWith(
    caches
      .match(evt.request)
      .then(
        cacheRes =>
          cacheRes ||
          fetch(evt.request).then(fetchRes =>
            caches.open(dynamicNames).then(cache => {
              cache.put(evt.request.url, fetchRes.clone());
              // check cached items size
              limitCacheSize(dynamicNames, 75);
              return fetchRes;
            })
          )
      )
      .catch(() => caches.match('/fallback'))
  );
});

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

