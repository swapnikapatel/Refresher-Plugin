console.log("foreground");

// setInterval(function(){
//     document.querySelector("button[name='refreshButton']").click();
//     console.log("Rereshing");
//     // var dt = new Date();
//     // var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
//     // append.querySelector()
    
// },60000)

chrome.storage.local.get((value) => {
    console.log(value);

    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

    console.log(time)

    if (value.func == "start") {
        localStorage.setItem("intervalId", setInterval(function () {
            document.querySelector('button[name="refreshButton"]').click();
        }, parseInt(value.time * 1000)));
        console.log("start : "+localStorage.getItem("intervalId"))
    } else if (value.func == "stop") {
        console.log("stop : "+localStorage.getItem("intervalId"))
        clearInterval(localStorage.getItem("intervalId"));
    } else {
        chrome.storage.local.clear()
    }

});