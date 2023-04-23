function setup() {
  canvas = createCanvas(200,150);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier("MobileNet" ,modelLoaded);

}
function modelLoaded()
{
  console.log("Model loaded");
}
function draw(){
  image(video,0,0,300,300);
  classifier.classify(video,gotResult);
}
var previous_result=""
function gotResult(error,results){
if(error)
{
  console.log(error);
}else{
if((results[0].confidence > 0.5)&&(previous_result != results[0].label)){
console.log(results);
previous_result=results[0].label;
var synth=window.SpeechSynthesis;
speak_data="The Object Identified Is - "+results[0].label;
utterThis=new SpeechSynthesisUtterance(speak_data);
synth.speak(utterThis);
document.getElementById("result_object_name").innerHTML="The Object Identified Is - "+results[0].label;
document.getElementById("result_object_confidence").innerHTML="The Object Accuracy Is - "+results[0].confidence.toFixed(3);

}
}
}


