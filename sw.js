/* Service worker — cache offline do Acompanhamento Diário.
   Estratégia: cache-first para os arquivos do app; troque a versão
   abaixo sempre que atualizar o HTML para forçar a atualização. */
var VERSAO = "acomp-v1";
var ARQUIVOS = [
  "./acompanhamento-diario.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", function(e){
  self.skipWaiting();
  e.waitUntil(
    caches.open(VERSAO).then(function(cache){
      return cache.addAll(ARQUIVOS);
    }).catch(function(){ /* melhor-esforço */ })
  );
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(chaves){
      return Promise.all(chaves.map(function(k){
        if (k !== VERSAO) return caches.delete(k);
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(e){
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(function(resp){
      if (resp) return resp;
      return fetch(e.request).then(function(net){
        // guarda no cache as buscas bem-sucedidas do mesmo escopo
        var copia = net.clone();
        caches.open(VERSAO).then(function(cache){
          try { cache.put(e.request, copia); } catch(err){}
        });
        return net;
      }).catch(function(){
        // offline e sem cache: devolve o app principal como fallback
        return caches.match("./acompanhamento-diario.html");
      });
    })
  );
});
