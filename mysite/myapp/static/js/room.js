        const roomName = JSON.parse(document.getElementById('room-name').textContent);
        var wordList;
        var title;
        var allParagraphs = JSON.parse(document.getElementById('allParagraphs').textContent);
        var username = JSON.parse(document.getElementById('player').textContent);
        var paragraphChosen = false;
        var wordIndex = 0;
        var totalLength = 0;
        var oppProgressBarWidth = 10;
        var ownProgressBarWidth = 10;
        var userList = [username];
        var startTime;
        var cpuInPlay = false;
        var cpuProgress = 0;
        var interval;

        document.getElementById('infoText').innerHTML = document.getElementById('infoText').innerHTML + " Your room code is: ".bold() + roomName.bold(); 
        document.getElementById("chat-message-input").disabled = true;
        document.getElementById("startButton").disabled = true;
            document.getElementById("cpuButton").disabled = true;
        const chatSocket = new WebSocket(
            'wss://'
            + window.location.host
            + '/ws/chat/'
            + roomName
            + '/'
        );

        //Actions that happen when data is broadcasted in channel
        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            if(data.action === "wordEntered"){
                if(data.player === username){
                    // ownProgressBarWidth +=10;
                    let bar = document.getElementById(data.player + "Bar");
                    bar.style.width = Number(bar.style.width.substring(0,bar.style.width.length -2)) +10 + "px";
                    wordIndex+=1;
                    let nowTime  = new Date()
                    let timeElapsed = (nowTime.getTime() - startTime.getTime()) / 1000;
                    let wpm =  (wordIndex * 60)/timeElapsed;
                    document.querySelector('#wpm').innerHTML = precise(wpm) + "wpm";
                    document.querySelector('#chat-log').innerHTML = wordList.slice(0,wordIndex).join(" ").bold() +
                        " " + 
                        wordList[wordIndex].fontcolor("red") +
                        " "+
                        wordList.slice(wordIndex+1).join(" ");
                    totalLength += wordList[wordIndex].length +1;
                }
                else{
                    let bar = document.getElementById(data.player + "Bar");
                    bar.style.width = Number(bar.style.width.substring(0,bar.style.width.length -2)) +10 + "px";
                    //oppProgressBarWidth +=10;
                    // document.getElementById("oppProgressBar").style.width = oppProgressBarWidth + "px";
                }
            }
            else if(data.action === "playerEntered"){
                if(data.player === username){
                    let div = document.createElement("div");
                    div.className = "ownProgressBar";
                    div.id = data.player + "Bar";
                    document.getElementById("progressContainer").appendChild(div);
                    //console.log(data.player);
                }
                else{
                    let div = document.createElement("div");
                    div.className = "oppProgressBar";
                    div.id = data.player + "Bar";
                    document.getElementById("progressContainer").appendChild(div);
                    for(var i  = 0; i<userList.length;i++){
                        chatSocket.send(JSON.stringify({
                        'message': userList[i], 
                        'player': data.player,
                        'action': "addUserProgressBar",
                    }));
                    }
                    if(paragraphChosen == true){
                        chatSocket.send(JSON.stringify({
                        'message': wordList, 
                        'player': data.player,
                        'action': "sendBackParagraph",
                    }));
                    chatSocket.send(JSON.stringify({
                        'message': title, 
                        'player': data.player,
                        'action': "sendBackTitle",
                    }));
                    }
                }
            }
            else if(data.action === "addUserProgressBar" && username == data.player){
                let div = document.createElement("div");
                div.className = "oppProgressBar";
                div.id = data.message + "Bar";
                document.getElementById("progressContainer").appendChild(div);
            }
            else if(data.action === "playerLeaving"){
                console.log(data.player + " has left the room");
            }
            else if(data.action === "playerFinished"){
                let liElement = document.createElement("li");
                liElement.innerHTML = data.message + " wpm" + " (" + data.player + ")";
                document.getElementById("finishedList").appendChild(liElement);
            }
            else if(data.action === "gameStarting"){
            document.getElementById("buttonContainer").style.pointerEvents = "none";
            document.getElementById("chat-message-input").disabled = false;
            document.getElementById("startButton").disabled = true;
            document.getElementById("cpuButton").disabled = true;
            document.querySelector('#chat-message-input').focus();
            
            startTime = new Date();
            document.querySelector('#wpm').innerHTML = 0 + "wpm";
            document.querySelector('#chat-log').innerHTML = wordList[wordIndex].bold().fontcolor("red") + 
            " " +
            wordList.slice(wordIndex+1).join(" ");
            totalLength += wordList[wordIndex].length + 1;
            if(cpuInPlay){
                setCPUInterval();
            }

            }
            else if(data.action === "addCPU"){
                let div = document.createElement("div");
                    div.className = "cpuProgressBar";
                    div.id = data.player + "Bar";
                    document.getElementById("progressContainer").appendChild(div);
            }
            else if(data.action === "newParagraph"){
                document.getElementById("wpm").innerHTML = "This is the paragraph you will be typing";
                document.getElementById("chat-log").innerHTML = data.message.join(" ");
                wordList = data.message;
                document.getElementById("startButton").disabled = false;
                document.getElementById("cpuButton").disabled = false;
                paragraphChosen = true;
            }
            else if(data.action === "newTitle"){
                title = data.message;
            }
            else if(data.action === "sendBackParagraph" && username == data.player){
                document.getElementById("wpm").innerHTML = "This is the paragraph you will be typing";
                document.getElementById("chat-log").innerHTML = data.message.join(" ");
                wordList = data.message;
                document.getElementById("startButton").disabled = false;
            document.getElementById("cpuButton").disabled = false;
            paragraphChosen = true;
            }
            else if(data.action === "sendBackTitle" && username == data.player){
                title = data.message;
            }
            
        };

        chatSocket.onclose = function(e) {
            chatSocket.send(JSON.stringify({
                        'message': "GoodBye",
                        'player': username,
                        'action': "playerLeaving" 
                    }));
            console.error('Chat socket closed unexpectedly');
            
        };

        document.querySelector('#chat-message-input').focus();
        document.querySelector('#chat-message-input').onkeyup = function(e) {
            const messageInputDom = document.querySelector('#chat-message-input');
            const message = messageInputDom.value.trim();
            if (e.keyCode === 13 || e.keyCode === 32) {  // enter, return
                if(message == wordList[wordIndex]){
                    if(wordList.length == wordIndex +1){
                        document.getElementById("chat-message-input").disabled = true;
                        let nowTime  = new Date()
                        let timeElapsed = (nowTime.getTime() - startTime.getTime()) / 1000;
                        let wpm =  precise((wordList.length * 60)/timeElapsed);
                        document.getElementById("wpm").innerHTML = "You finished! Look below to see how you did!";
                        document.getElementById("chat-log").innerHTML = wordList.join(" ").bold();
                        //Submitting form without reloading page with ajax
                        e.preventDefault();
                        $.ajax({
                            type:'POST',
                            url:'/chat/add_stat/',
                            data:{
                                paragraphTitle: title, 
                                wpm:wpm,
                                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()

                            },
                            success:function(){
                                alert("Stat have been uploaded");
                            }
                        })
                    chatSocket.send(JSON.stringify({
                        'message': String(wpm),
                        'player': username,
                        'action': "playerFinished" 
                    }));    
                    }
                    else{
                    chatSocket.send(JSON.stringify({
                        'message': message,
                        'player': username,
                        'action': "wordEntered" 
                    }));
                    }
                    messageInputDom.value = '';    
                }
                else{
                    messageInputDom.value = messageInputDom.value.trim();
                }
            }
        };
        
        function StartGame(){
            chatSocket.send(JSON.stringify({
                        'message': "",
                        'player': username,
                        'action': "gameStarting" 
                    }));
        }
        
        function addCPU(){
            chatSocket.send(JSON.stringify({
                        'message': "addingCPU",
                        'player': username+"cpu",
                        'action': "addCPU" 
                    }));
            cpuInPlay = true;
            document.getElementById("cpuButton").disabled = true;
                    
        }

        function precise(x) {
            return Number.parseFloat(x).toPrecision(4);
        }

        chatSocket.onopen = function(e){
            chatSocket.send(JSON.stringify({
                        'message': "addingProgressBar",
                        'player': username,
                        'action': "playerEntered" 
                    }));
        }

        function setCPUInterval(){
            interval = setInterval(runCPU, 3000);
        }
        function runCPU(){
            if(wordList.length == cpuProgress +1){
                        //document.getElementById("chat-message-input").disabled = true;
                        let nowTime  = new Date()
                        let timeElapsed = (nowTime.getTime() - startTime.getTime()) / 1000;
                        let wpm =  precise((wordList.length * 60)/timeElapsed);

                        chatSocket.send(JSON.stringify({
                        'message': String(wpm),
                        'player': username + "cpu",
                        'action': "playerFinished" 
                        }));    
                        clearInterval(interval);
                    }
                    else{
                        chatSocket.send(JSON.stringify({
                        'message': wordList[cpuProgress],
                        'player': username + "cpu",
                        'action': "wordEntered" 
                        }));
                    }
 
            cpuProgress +=1;
            
            
        }

        function changeParagraph(name){
            wordList = allParagraphs[Number(name)]['paragraph'].split(" ");
            title = allParagraphs[Number(name)]['title']
            chatSocket.send(JSON.stringify({
                        'message': wordList,
                        'player': username,
                        'action': "newParagraph" 
                        }));
            chatSocket.send(JSON.stringify({
                        'message': title,
                        'player': username,
                        'action': "newTitle" 
                        }));
           
        }
        