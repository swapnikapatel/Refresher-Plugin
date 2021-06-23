document.addEventListener('DOMContentLoaded', function() {

    var btnstart= document.getElementById("btnstart");
    var btnstop= document.getElementById("btnstop");

    btnstart.addEventListener('click',fnStart);
    btnstop.addEventListener('click',fnStop);


    function fnStart(){

        var refreshTime = document.getElementById("refreshTime").value;

        chrome.storage.local.clear();
        chrome.storage.local.set({
            "func": "start",
            "time": refreshTime
        });

        chrome.tabs.executeScript(null, { file: './foreground.js' });
        console.log("time set")
    };
    
    function fnStop(){
    
        chrome.storage.local.clear();
        chrome.storage.local.set({
            "func": "stop",
            "time": "0"
        });

        chrome.tabs.executeScript(null, { file: './foreground.js' });
        console.log("time stopped")
    };
    
});