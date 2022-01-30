var video = document.getElementById("myVideo"); 
var constrains = { video: true, audio: false, facingMode: "user"};

navigator.mediaDevices
    .getUserMedia(constrains)
    .then(function(stream) {
    video.srcObject = stream; 
    video.play();
    })
    .catch(function(err) {
        console.log("An error occured! " + err);
    });

function take_picture() {
    var canvas = document.getElementById("picture");	// videoのstreamをcanvasに書き出す方法
    var ctx = canvas.getContext("2d");
    var w = video.offsetWidth * 0.5;	
    var h = video.offsetHeight * 0.5;	
    canvas.setAttribute("width", w);	
    canvas.setAttribute("height", h);	
    ctx.drawImage(video, 0, 0, w, h);	// videoの画像をcanvasに書き出し

    var base64 = canvas.toDataURL('image/jpg');	// canvas上の画像をbase64に変換
    var picture = base64.replace(/^data:\w+\/\w+;base64,/, '');	// base64変換したデータのプレフィクスを削除

    // リクエスト送信
    var form = document.createElement("form");
    var request = document.createElement("input");
    
    form.method = "POST";
    form.action = "/send_message";

    request.type = "hidden";
    request.name = "image";
    request.value = picture;

    form.appendChild(request);
    document.body.appendChild(form);

    form.submit();
}

setInterval(btnAble , 1500);

function btnAble(){  
    document.getElementById("btn").disabled = false;
    clearInterval(statusAble);
}
