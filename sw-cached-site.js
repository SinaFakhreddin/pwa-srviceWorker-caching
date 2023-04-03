const cacheName = "v2";


self.addEventListener("install" , (e)=>{
    console.log("service worker is installed")
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
    e.respondWith(
        fetch(e.request).then(res=> {
            console.log("res v2" , res)
            //make a copy for each req
            const copyOfRes = res.clone()
            // open caches
            caches.open(cacheName).then((Cache)=>{
                //add rseponse to cache
                console.log("v2 add response to cache" , "e.req",e.request ,"copy" ,copyOfRes)
                Cache.put(e.request , copyOfRes)
            })
            return res
        }).catch(err=>caches.match(e.request).then(res=>res))
    )
})


