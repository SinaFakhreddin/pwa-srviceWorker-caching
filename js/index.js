if ("serviceWorker" in navigator){
    console.log("service worker is supported")
    window.addEventListener("load" , ()=>{
        navigator.serviceWorker.register("./../sw-cached-site.js").then(reg=>console.log("sw is registered")).catch(err=>console.log("sw is not registered"))
    })
}