consume we have an inputfield with value( <input/> ) .first step is registering task that includes four steps:


first step:
we should sureabout existing serviceWorker in navigator and backgroudnSync in window:
if("serviceWorker" in navigator && "backgroundSync" in window ){
...... nextSteps

}

second step:
registring a task in servicWorker:
we can registring a backgroundSynctask with seriveWorker when registring serviceWorker is happend completly(navigator.serviceWorker.ready( )) :
if("serviceWorker" in navigator && "backgroundSync" in window ){
navigator.serviceWorker.ready( )
}

third step:
if("serviceWorker" in navigator && "backgroundSync" in window ){
navigator.serviceWorker.ready( ).then(serviceWorkerregistration=>{

serviceWorkerregistration.sync.register("task-1").then(()=>console.log("sync progress"))

})
}

fourth step:
then go to registered serviceWorker and in sync eventListener get the task-1:


//in registered serviceWorker:

self.addEventListener("sync" , function(){

//because all of the backgroundSyncTask be handled here you should first choose the intended task:
if(event.tag==="task-1 ){
e.waitUntil(
doSomeThing()

)

} else{

......