const cacheName = "v1";
const cacheAssets = [
    "index.html",
    "about.html",
    "contact.html",
    "dastekhar.html",
    "/js/index.js",
    "/style/style.css"
]


self.addEventListener("install" , (e)=>{
    console.log("service worker is installed")
    e.waitUntil(
        caches.open(cacheName).then(cache=>{
            console.log("service worker: caching file");
            cache.addAll(cacheAssets)
        }).then(()=>self.skipWaiting())
    )
})


self.addEventListener("activate" , (e)=>{
    e.waitUntil(
        caches.keys().then(cacheNames=>{
            console.log("service worker is deleting prev version of cache")
          return Promise.all(cacheNames.map((chName)=>{
              if (chName!==cacheName){
                  caches.delete(chName)
              }
          }))
        })
    )
})



self.addEventListener("fetch" , (e)=>{
    console.log("sevice worker is fetching")
    e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)))
})


