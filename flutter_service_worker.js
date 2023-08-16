'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"splash/img/light-2x.png": "c24b58628c8474a03a57af2835516ca7",
"splash/img/dark-3x.png": "465a326623e189c2843df6f91596ef21",
"splash/img/dark-1x.png": "5260f98104258fa7b1fb0ea77b1cd2f9",
"splash/img/light-3x.png": "d78a3ad072cab20231d333f92ac152d4",
"splash/img/branding-dark-3x.png": "5185896cd27f711204d79cb9949f3240",
"splash/img/dark-2x.png": "46f86c4b6d58b90426badeb88548f61c",
"splash/img/branding-dark-4x.png": "50eac33e1812ecb76eae74feb6b201b0",
"splash/img/light-1x.png": "286c2171fdb991aade33d87abd851a37",
"splash/img/light-4x.png": "95cc3412a1e2906c371fc2fa1ad3ed16",
"splash/img/branding-4x.png": "50eac33e1812ecb76eae74feb6b201b0",
"splash/img/branding-2x.png": "9c00a2e9fd15692cc9d282786ed76a22",
"splash/img/dark-4x.png": "0d866e1291784657f7661771b0f51149",
"splash/img/branding-3x.png": "5185896cd27f711204d79cb9949f3240",
"splash/img/branding-dark-2x.png": "9c00a2e9fd15692cc9d282786ed76a22",
"splash/img/branding-1x.png": "f24892af358d2dc04e2648f1d9fe3a79",
"splash/img/branding-dark-1x.png": "f24892af358d2dc04e2648f1d9fe3a79",
"splash/splash.js": "123c400b58bea74c1305ca3ac966748d",
"splash/style.css": "f4d803db23961f98c9e4206793bd0752",
"icons/Icon-maskable-512.png": "5cd6e5f04bcfeea7d8538c8b11b575b8",
"icons/Icon-maskable-192.png": "02ac0ee3ea8639d69b51eae210194d79",
"icons/Icon-192.png": "02ac0ee3ea8639d69b51eae210194d79",
"icons/Icon-512.png": "5cd6e5f04bcfeea7d8538c8b11b575b8",
"index.html": "13b3c9ebf8accc972ca7f74d82333d11",
"/": "13b3c9ebf8accc972ca7f74d82333d11",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"manifest.json": "abbb9ea5d372c4f730b072021db3e0e6",
"favicon.png": "82470fc7e3482e999d332a4cf5414865",
"assets/fonts/MaterialIcons-Regular.otf": "560b93a06a415d54b6d0a0eb8f5406ed",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.bin": "d0409090f8ee35e45af56654791f65ba",
"assets/assets/icons/light_icon.png": "0d866e1291784657f7661771b0f51149",
"assets/assets/icons/launcher/sorayomi_icon.ico": "40833923db3ba9fb49feb0c784ed9662",
"assets/assets/icons/launcher/sorayomi_preview_icon.png": "35d2f7aba2761306336d04d4ef414032",
"assets/assets/icons/launcher/from_suwayomi.png": "322d246b4780e447ad411e9ccfcc6a93",
"assets/assets/icons/launcher/sorayomi_icon.png": "8fe0d1d0fb3d54bd44c909e2818b70e2",
"assets/assets/icons/dark_icon.png": "95cc3412a1e2906c371fc2fa1ad3ed16",
"assets/assets/icons/previous_done.png": "cff60670ab97b59d72be60ab7201d5cc",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/packages/fluttertoast/assets/toastify.js": "56e2c9cedd97f10e7e5f1cebd85d53e3",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "d7791ef376c159f302b8ad90a748d2ab",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "658b490c9da97710b01bd0f8825fce94",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "5070443340d1d8cceb516d02c3d6dee7",
"assets/AssetManifest.json": "44c848d999a3c2dc7059a368fe635077",
"assets/NOTICES": "0415e8f5885ab0064567233c74f67797",
"assets/FontManifest.json": "5a32d4310a6f5d9a6b651e75ba0d7372",
"version.json": "694f8d5f10f73d3e988a0eb8920a74d3",
"main.dart.js": "c8f0ae3c204b096ff556dcd94e2b6af5",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
