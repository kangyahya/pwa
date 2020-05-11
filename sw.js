const CACHE_NAME = "submissionfirst";
var urlsToCache = [
  '/',
  '/manifest.json',
  '/nav.html',
  '/index.html',
  '/pages/home.html',
  '/pages/about.html',
  '/pages/contact.html',
  '/pages/blog.html',
  '/css/materialize.min.css',
  '/css/style.css',
  '/fonts/material-icons.css',
  '/fonts/material-design-icons/MaterialIcons-Regular.ttf',
  '/js/materialize.min.js',
  '/js/scripts.js',
  '/favicon/android-icon-36x36.png',
  '/favicon/android-icon-48x48.png',
  '/favicon/android-icon-72x72.png',
  '/favicon/android-icon-96x96.png',
  '/favicon/android-icon-144x144.png',
  '/favicon/android-icon-192x192.png',
  '/favicon/android-icon-512x512.png',
  '/favicon/apple-icon.png',
  '/favicon/apple-icon-57x57.png',
  '/favicon/apple-icon-60x60.png',
  '/favicon/apple-icon-72x72.png',
  '/favicon/apple-icon-76x76.png',
  '/favicon/apple-icon-114x114.png',
  '/favicon/apple-icon-120x120.png',
  '/favicon/apple-icon-144x144.png',
  '/favicon/apple-icon-152x152.png',
  '/favicon/apple-icon-180x180.png',
  '/favicon/apple-icon-precomposed.png',
  '/favicon/favicon.ico',
  '/favicon/favicon-16x16.png',
  '/favicon/favicon-32x32.png',
  '/favicon/favicon-96x96.png',
  '/favicon/ms-icon-70x70.png',
  '/favicon/ms-icon-144x144.png',
  '/favicon/ms-icon-150x150.png',
  '/favicon/ms-icon-310x310.png',
  '/img/yahya.png',
  '/img/it-logoo.png',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
];

self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
})

self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys()
    .then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName){
          if(cacheName != CACHE_NAME){  
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request, {cacheName:CACHE_NAME})
    .then(function(response) {
      if(response){
        console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
        return response;
      }
      
      console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
      return fetch(event.request);
    })
  );
});