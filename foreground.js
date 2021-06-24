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
    // console.log(time)

    function displayTime() {
        $('#refreshTimeCurrent').remove();
        var dt = new Date();
        
        var hours = (dt.getHours() - 12) < 10 ? "0" + (dt.getHours() - 12) : dt.getHours - 12;
        var minutes = (dt.getMinutes()) < 10 ? ("0" + dt.getMinutes()) : dt.getMinutes();
        var seconds = (dt.getSeconds()) < 10 ? ("0" + dt.getSeconds()) : dt.getSeconds();
        var daynight = (dt.getHours() <= 12 ? " AM" : " PM");

        var time = hours + " : " + minutes + " : " + seconds + " " + daynight;

        return "&nbsp;at " + time;
    }

    if (value.func == "start") {
        localStorage.setItem("intervalId", setInterval(function () {
            document.querySelector('button[name="refreshButton"]').click();
            $('.slds-text-body--small').append("<span id='refreshTimeCurrent'>" + displayTime() + "</span>").css('display', 'inline-flex');
        }, parseInt(value.time * 1000)));
        console.log("start : " + localStorage.getItem("intervalId"))
    } else if (value.func == "stop") {
        console.log("stop : " + localStorage.getItem("intervalId"))
        clearInterval(localStorage.getItem("intervalId"));
    } else {
        chrome.storage.local.clear()
    }

});