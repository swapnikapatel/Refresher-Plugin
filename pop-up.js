document.addEventListener('DOMContentLoaded', function () {

    var btnstart = document.getElementById("btnstart");
    var btnstop = document.getElementById("btnstop");

    $("#btnstop").hide();

    btnstart.addEventListener('click', fnStart);
    btnstop.addEventListener('click', fnStop);



    function fnStart() {


        var refreshTime = document.getElementById("refreshTime").value;

        if (refreshTime == "" || null) {

        } else {
            chrome.storage.local.clear();
            chrome.storage.local.set({
                "func": "start",
                "time": refreshTime
            });

            chrome.tabs.executeScript(null, { file: './foreground.js' });
            console.log("time set");

            $("#status").html("")
            $("#status").html("In progress every " + refreshTime + " seconds");
            $("#refreshTime").val("")
            $("#btnstart").hide();
            $("#btnstop").show();
        }

    };

    function fnStop() {

        chrome.storage.local.clear();
        chrome.storage.local.set({
            "func": "stop",
            "time": "0"
        });

        chrome.tabs.executeScript(null, { file: './foreground.js' });
        console.log("time stopped")

        $("#status").html("")
        $("#status").html("Ready");
        $("#btnstop").hide();
        $("#btnstart").show();
    };

});