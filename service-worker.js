const CACHE_NAME = "laryngo-info-france-v30";
const URLS_TO_CACHE = [
  "./",
  "./index.html",

  "./patient.html",
  "./je-viens-dapprendre-mon-cancer.html",
  "./questions-a-mon-orl.html",
  "./operation.html",
  "./je-viens-detre-laryngectomise.html",
  "./ma-nouvelle-vie.html",
  "./materiel.html",

  "./voix.html",
  "./aides-droits.html",
  "./annuaire-national.html",
  "./ressources.html",
  "./faq.html",
  "./carte-urgence.html",

  "./aidants.html",

  "./professionnels.html",
  "./contributions-professionnels.html",

  "./urgence.html",
  "./secouristes.html",

  "./temoignages.html",
  "./sources.html",
  "./contact.html",
  "./accessibilite.html",
  "./mentions-legales.html",
  "./confidentialite.html",
  "./remerciements.html",
  "./plan-du-site.html",

  "./style.css",
  "./manifest.json",
  "./favicon.svg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
  );

  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
