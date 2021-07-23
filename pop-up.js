document.addEventListener('DOMContentLoaded', function () { //once DOM loaded

    var btnstart = document.getElementById("btnstart");
    var btnstop = document.getElementById("btnstop");

    //setting up event listener
    document.getElementById("refreshTime").addEventListener('input', timeValue);
    btnstart.addEventListener('click', fnStart);
    btnstop.addEventListener('click', fnStop);

    var localChromeStorage = checkIfLocalStorage();
    if (localChromeStorage.storage === false) { //no previous data
        $("#negativeNumber").hide();
        $("#btnstop").hide();
    } else if (localChromeStorage.storage === true) { //setting up previous data
        $("#status").html("")
        $("#status").html("In progress every " + JSON.parse(localChromeStorage.current).time + " seconds");
        $("#refreshTime").val("")
        $("#btnstart").hide();
        $("#btnstop").show();
        $("#refreshTime").attr("disabled", "disabled");
        refreshStart();
    }
})

//checking if user had set time already
function checkIfLocalStorage() {
    var current = localStorage.getItem("currentFunction");
    if (current === null) {
        return { storage: false }
    } else {
        return { storage: true, current }
    }

}

//user time value validation
function timeValue(e) {
    parseInt(e.target.value) > 0 ? (
        $("#btnstart").removeAttr("disabled"),
        $("#negativeNumber").is(":visible") ?
            ($("#negativeNumber").html(""),
                $("#negativeNumber").hide()) : ""
    )
        : ($("#btnstart").attr("disabled", "disabled"),
            $("#negativeNumber").show().html("Enter number greater than 0!"));
}

//first start call
function fnStart() {

    var currentFunction;
    var refreshTime = document.getElementById("refreshTime").value;

    if (refreshTime === undefined || "" || null) {
        $('#negativeNumber').html("Time not found");
    } else {

        currentFunction = JSON.stringify({
            func: "start",
            time: refreshTime
        });

        //setting up local storage
        localStorage.setItem("currentFunction", currentFunction);

        chrome.storage.local.clear();
        chrome.storage.local.set({
            "func": "start",
            "time": refreshTime
        });

        chrome.tabs.executeScript(null, { file: './foreground.js' });

        $("#status").html("").html("In progress every " + refreshTime + " seconds");
        $("#refreshTime").val("")
        $("#btnstart").hide();
        $("#negativeNumber").hide();
        $("#btnstop").show();
        $("#refreshTime").attr("disabled", "disabled");
    }

};

//setting earlier data to use after refreshed
function refreshStart() {

    var refreshTime;
    var localChromeStorage = checkIfLocalStorage();
    refreshTime = JSON.parse(localChromeStorage.current).time;

    if (refreshTime === undefined || "" || null) {
        $('#negativeNumber').html("Time not found");
    } else {

        chrome.storage.local.clear();
        chrome.storage.local.set({
            "func": "start",
            "time": refreshTime
        });

        chrome.tabs.executeScript(null, { file: './foreground.js' });
    }

};

//clearing the current session
function fnStop() {

    //clearing local storage
    localStorage.clear("intervalId")
    chrome.storage.local.clear();
    chrome.storage.local.set({
        "func": "stop",
        "time": "0"
    });

    chrome.tabs.executeScript(null, { file: './foreground.js' });
    $("#status").html("").html("Ready");
    $("#btnstop").hide();
    $("#btnstart").show();
    $("#btnstart").attr("disabled", "disabled");
    $("#refreshTime").removeAttr("disabled");
};