document.addEventListener('DOMContentLoaded', function () {

    chrome.storage.local.get((value) => {
        console.log(value.time)
        
        if(parseInt(value.time) > 0){

            $("#status").html("")
            $("#status").html("In progress every " + value.time + " seconds");
            $("#refreshTime").val("")
            $("#btnstart").hide();
            $("#btnstop").show();
        }
    })

    var btnstart = document.getElementById("btnstart");
    var btnstop = document.getElementById("btnstop");

    $("#btnstop").hide();

    document.getElementById("refreshTime").addEventListener('input', btnActivity);
    btnstart.addEventListener('click', fnStart);
    btnstop.addEventListener('click', fnStop);

 function btnActivity(e){

console.log(e.target.value)

parseInt(e.target.value) > 0 ? $("#btnstart").removeAttr("disabled") : ""

 }

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
        $("#btnstart").attr("disabled", "disabled");
    };

});