const CACHE_NAME='minha-escala-pessoal-v2-sem-login';
const ASSETS=['./','./index.html','./manifest.json','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',event=>event.waitUntil(Promise.all([
  caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('minha-escala-pessoal-')&&k!==CACHE_NAME).map(k=>caches.delete(k)))),
  self.clients.claim()
])));
self.addEventListener('message',event=>{if(event.data?.type==='skipWaiting')self.skipWaiting()});
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
  const cachePromise=caches.open(CACHE_NAME);
  const network=cachePromise.then(async cache=>{
    const response=await fetch(req);
    if(response.ok)await cache.put(req,response.clone());
    return response;
  });
  event.waitUntil(network.then(()=>{},()=>{}));
  event.respondWith(cachePromise.then(async cache=>{
    const cached=await cache.match(req);
    if(cached)return cached;
    try{return await network}catch(e){
      if(req.mode==='navigate')return await cache.match('./index.html')||Response.error();
      return Response.error();
    }
  }));
});
