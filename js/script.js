const video = document.getElementById("video");

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("./model"),
    //faceapi.nets.faceLandmark68Net.loadFromUri("./model"),
    // faceapi.nets.faceRecognitionNet.loadFromUri("./model"),
    // faceapi.nets.faceExpressionNet.loadFromUri("./model")
    
]).then(startVideo)

async function startVideo(){
    // navigator.getUserMedia(
    //    {  video:{}}
    //    ,stream => video.scrObject = stream,
    //     err=> console.error(err)
    // )

    const stream = await navigator.mediaDevices.getUserMedia({ video: {} })
     
    video.srcObject = stream
}

video.addEventListener('play',()=>{
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);

    const displaySize = { width : video.width,height:video.height }
    faceapi.matchDimensions(canvas,displaySize)

    setInterval( async () => {
        
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        const resizedDetections = faceapi.resizeResults(detections,displaySize);
        canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);
        faceapi.draw.drawDetections(canvas,resizedDetections);
    }, 100);
})