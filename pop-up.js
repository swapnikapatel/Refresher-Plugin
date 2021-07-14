document.addEventListener('DOMContentLoaded', function () {

    var btnstart = document.getElementById("btnstart");
    var btnstop = document.getElementById("btnstop");

    document.getElementById("refreshTime").addEventListener('input', timeValue);
    btnstart.addEventListener('click', fnStart);
    btnstop.addEventListener('click', fnStop);

    var localChromeStorage = checkIfLocalStorage();

    if (localChromeStorage.storage === false) {
        $("#negativeNumber").hide();
        $("#btnstop").hide();
    } else if (localChromeStorage.storage === true) {
        $("#status").html("")
        $("#status").html("In progress every " + JSON.parse(localChromeStorage.current).time + " seconds");
        $("#refreshTime").val("")
        $("#btnstart").hide();
        $("#btnstop").show();
        $("#refreshTime").attr("disabled", "disabled");
        refreshStart();
    }

})

function checkIfLocalStorage() {

    var current = localStorage.getItem("currentFunction");
    if (current === null) {
        return { storage: false }
    } else {
        return { storage: true, current }
    }

}

function timeValue(e) {
    parseInt(e.target.value) > 0 ? (
        $("#btnstart").removeAttr("disabled"),
        $("#negativeNumber").is(":visible") ?
            ($("#negativeNumber").html(""),
                $("#negativeNumber").hide()) : ""
    )
        : ($("#btnstart").attr("disabled", "disabled"),
            $("#negativeNumber").show(),
            $('#negativeNumber').html("Enter number greater than 0!"));

}

function fnStart() {

    chrome.runtime.sendMessage({ greeting: "hello" });

    var currentFunction;
    var refreshTime = document.getElementById("refreshTime").value;

    if (refreshTime === undefined || "" || null) {
        $('#negativeNumber').html("Time not found");
    } else if (parseInt(refreshTime) <= 0) {
        $("#negativeNumber").show();
        $('#negativeNumber').html("Enter number greater than 0!");
    } else {

        currentFunction = JSON.stringify({
            func: "start",
            time: refreshTime
        });

        localStorage.setItem("currentFunction", currentFunction);

        chrome.storage.local.clear();
        chrome.storage.local.set({
            "func": "start",
            "time": refreshTime
        });

        chrome.tabs.executeScript(null, { file: './foreground.js' });

        $("#status").html("")
        $("#status").html("In progress every " + refreshTime + " seconds");
        $("#refreshTime").val("")
        $("#btnstart").hide();
        $("#negativeNumber").hide();
        $("#btnstop").show();
        $("#refreshTime").attr("disabled", "disabled");
    }

};

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

function fnStop() {

    localStorage.clear("intervalId")
    chrome.storage.local.clear();
    chrome.storage.local.set({
        "func": "stop",
        "time": "0"
    });

    chrome.tabs.executeScript(null, { file: './foreground.js' });

    $("#status").html("")
    $("#status").html("Ready");
    $("#btnstop").hide();
    $("#btnstart").show();
    $("#btnstart").attr("disabled", "disabled");
    $("#refreshTime").removeAttr("disabled");
};