// console.log("foreground");

chrome.storage.local.get((value) => {

    //function to return latest time queue updated
    function displayTime() {
        $('#refreshTimeCurrent').remove();
        var dt = new Date();
        var hours = (dt.getHours()) <= 12 ? (dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours())
            : ((dt.getHours() - 12) < 10 ? "0" + (dt.getHours() - 12) : "");
        var minutes = (dt.getMinutes()) < 10 ? ("0" + dt.getMinutes()) : dt.getMinutes();
        var seconds = (dt.getSeconds()) < 10 ? ("0" + dt.getSeconds()) : dt.getSeconds();
        var daynight = (dt.getHours() <= 12 ? " AM" : " PM");
        var time = hours + " : " + minutes + " : " + seconds + "" + daynight;

        return "&nbsp;at " + time;
    }

    if (value.func == "start" && document.getElementById("refreshTimeCurrent") === null) { //if start button called and time is not set
            localStorage.setItem("intervalId", setInterval(function () {
                document.querySelector('button[name="refreshButton"]').click();

                $("p > force-list-view-manager-status-info").append("<span id='refreshTimeCurrent'>" + displayTime() + "</span>").css('display', 'inline-flex');
                $('.forceRelatedListDesktop:contains("Files")').find('span#refreshTimeCurrent').remove();
                $('.forceRelatedListDesktop:contains("Case History")').find('span#refreshTimeCurrent').remove();
                $('.forceRelatedListDesktop:contains("Cases")').find('span#refreshTimeCurrent').remove();

            }, parseInt(value.time * 1000)));

    } else if (value.func == "stop") { //if stop button called
        clearInterval(localStorage.getItem("intervalId"));
        localStorage.clear("intervalId");
        $('#refreshTimeCurrent').remove();
    } else { //if invalid request, it will clear local storage
        chrome.storage.local.clear("intervalId")
    }

});