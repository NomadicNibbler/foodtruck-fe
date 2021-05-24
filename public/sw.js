const cacheName = 'v1';
// const self = this;

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

// Install a service worker
self.addEventListener('install', event => {
  //perform install steps
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => {
      console.log('Opened cache')
      return cache.addAll(urlsToCache)
    })
  )
})

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
  )
})

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if(response) {
        return response 
      }

      const requestToCache = event.request.clone();

      return fetch(event.request)
      .then(response => {
        if (!response || response.status !== 200) {
          return response;
        }

        const responseToCache = response.clone()

        caches.open(cacheName)
        .then(cache => {
          cache.put(requestToCache, responseToCache)
        })

        return response

      })
    })
  )
})

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

// self.addEventListener('install', (event) => {
//   console.log('Service Worker: Installed');
// });


// self.addEventListener('activate', (event) => {
//   console.log('Service Worker: Activated');
//   event.waitUntil(
//     caches.keys().then(cacheName => {
//       return Promise.all(
//         cacheName.map(cache => {
//           if (cache !== cacheName) {
//             console.log('Service Worker: clearing old cache');
//             return caches.delete(cache);
//           }
//         })
//       );
//     })
//   );
// });

// // fetch event
// self.addEventListener('fetch', evt => {
//   // check if request is made by chrome extensions or web page
//   // if request is made for web page url must contains http.
//   if (!(evt.request.url.indexOf('http') === 0)) return; // skip the request. if request is not made with http protocol

//   evt.respondWith(
//     caches
//       .match(evt.request)
//       .then(
//         cacheRes =>
//           cacheRes ||
//           fetch(evt.request).then(fetchRes =>
//             caches.open(dynamicNames).then(cache => {
//               cache.put(evt.request.url, fetchRes.clone());
//               // check cached items size
//               limitCacheSize(dynamicNames, 75);
//               return fetchRes;
//             })
//           )
//       )
//       .catch(() => caches.match('/fallback'))
//   );
// });

// // cache size limit function
// const limitCacheSize = (name, size) => {
//   caches.open(name).then(cache => {
//     cache.keys().then(keys => {
//       if (keys.length > size) {
//         cache.delete(keys[0]).then(limitCacheSize(name, size));
//       }
//     });
//   });
// };

// ONE
// const cacheName = 'version-1';
// const self = this;

// self.addEventListener('install', (event) => {
//   console.log('Service Worker: Installed');
// });

// self.addEventListener('activate', (event) => {
//   console.log('Service Worker: Activated');
//   event.waitUntil(
//     caches.keys().then(cacheName => {
//       return Promise.all(
//         cacheName.map(cache => {
//           if (cache !== cacheName) {
//             console.log('Service Worker: clearing old cache');
//             return caches.delete(cache);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener('fetch', (event) => {
//   console.log('Service Worker: fetching');
//   event.respondWith(
//     fetch(event.request)
//       .then(res => {
//         const resClone = res.clone();
//         caches
//           .open(cacheName)
//           .then(cache => {
//             cache.put(event.request, resClone);
//           });
//         return res;
//       }).catch(err => caches.match(event.request).then(res => res))
//   );
// });

//TWO

// the cache version gets updated every time there is a new deployment
// const CACHE_VERSION = 10;
// const CURRENT_CACHE = `main-${CACHE_VERSION}`;

// // these are the routes we are going to cache for offline support
// const cacheFiles = ['/', '/about-me/', '/projects/', '/offline/'];

// // on activation we clean up the previously registered service workers
// self.addEventListener('activate', evt =>
//   evt.waitUntil(
//     caches.keys().then(cacheNames => {
//       return Promise.all(
//         cacheNames.map(cacheName => {
//           if (cacheName !== CURRENT_CACHE) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   )
// );

// // on install we download the routes we want to cache for offline
// self.addEventListener('install', evt =>
//   evt.waitUntil(
//     caches.open(CURRENT_CACHE).then(cache => {
//       return cache.addAll(cacheFiles);
//     })
//   )
// );

// // fetch the resource from the network
// const fromNetwork = (request, timeout) =>
//   new Promise((fulfill, reject) => {
//     const timeoutId = setTimeout(reject, timeout);
//     fetch(request).then(response => {
//       clearTimeout(timeoutId);
//       fulfill(response);
//       update(request);
//     }, reject);
//   });

// // fetch the resource from the browser cache
// const fromCache = request =>
//   caches
//     .open(CURRENT_CACHE)
//     .then(cache =>
//       cache
//         .match(request)
//         .then(matching => matching || cache.match('/offline/'))
//     );

// // cache the current page to make it available for offline
// const update = request =>
//   caches
//     .open(CURRENT_CACHE)
//     .then(cache =>
//       fetch(request).then(response => cache.put(request, response))
//     );

// // general strategy when making a request (eg if online try to fetch it
// // from the network with a timeout, if something fails serve from cache)
// self.addEventListener('fetch', evt => {
//   evt.respondWith(
//     fromNetwork(evt.request, 10000).catch(() => fromCache(evt.request))
//   );
//   evt.waitUntil(update(evt.request));
// });
