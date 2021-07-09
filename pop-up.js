document.addEventListener('DOMContentLoaded', function () {

    // chrome.storage.local.get((value) => {
    //     console.log(value)

    //     // if (parseInt(value.time) > 0) {

    //     //     $("#status").html("")
    //     //     $("#status").html("In progress every " + value.time + " seconds");
    //     //     $("#refreshTime").val("")
    //     //     $("#btnstart").hide();
    //     //     $("#btnstop").show();
    //     //     // fnStart();

    //     // }

    //     fnStop();
    // })

    var btnstart = document.getElementById("btnstart");
    var btnstop = document.getElementById("btnstop");

    $("#negativeNumber").hide();
    $("#btnstop").hide();


    document.getElementById("refreshTime").addEventListener('input', btnActivity);
    btnstart.addEventListener('click', fnStart);
    btnstop.addEventListener('click', fnStop);

    function btnActivity(e) {

        console.log(e.target.value)

        parseInt(e.target.value) > 0 ? $("#btnstart").removeAttr("disabled") : $("#btnstart").attr("disabled", "disabled");

    }

    function fnStart() {

        // var refreshTime;
        var refreshTime = document.getElementById("refreshTime").value;

        console.log("fnstart called")

        // chrome.storage.local.get((value) => {
        //     console.log("Test ")
        //     console.log(value)
        //     if(value.time == undefined){
        //         $('#negativeNumber').html("Time not found");
        //     }
        //     else if (parseInt(value.time) > 0) {
        //         refreshTime = value.time;
        //     } else {
        //         refreshTime = document.getElementById("refreshTime").value;
        //     }
        // })

        console.log("fnstart called :"+refreshTime)

        if (refreshTime == "" || null) {

        }

        else if (refreshTime <= 0) {
            $("#negativeNumber").show();
            $('#negativeNumber').html("Enter number greater than 0");
        }
        else {
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
            $("#negativeNumber").hide();
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