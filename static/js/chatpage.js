var botui = new BotUI('my-botui-app');

var i = 0;

var amount;

$(document).ready(function(){
  $(".yes-no, .temp, #cam-hidden, #gallery-hidden, .cam-gallery, .amt-ip").hide();

  amount = 45000;
  $("#emi")[0].innerHTML = 'EMI: &#8377 ' + calc_emi(amount, 18);
  //trial
  bot_txt('hey');
  //accept_or_deny();
  //cam_or_gallery();
  duration();
});

//bot messages
function bot_txt(msg){
  botui.message.bot({
    delay: 1100,
    loading: true,
    content: msg
  });
}

function calc_emi(amt, dur){
  interest = dur - 12 + 10;
  return Math.ceil(amt*(1 + interest/100)/dur);
}

function accept_or_deny(){
  $(".yes-no").show();
  $('.send-box').hide();
}

$("#yes").click(function(){
  human_txt('yes');
  $(".yes-no").hide();
  $('.send-box').show();
});

$("#no").click(function(){
  human_txt('no');
  $(".yes-no").hide();
  $('.send-box').show();
});

function cam_or_gallery(){
  $(".cam-gallery").show();
  $('.send-box').hide();
}

function cam_send(){
  fileObj = $('#cam-hidden')[0].files[0];
  const objectURL = window.URL.createObjectURL(fileObj);
  console.log(objectURL);
  $('.cam-gallery').hide();
  $('.send-box').show();
  human_img(objectURL);
}

function gallery_send(){
  fileObj = $('#gallery-hidden')[0].files[0];
  const objectURL = window.URL.createObjectURL(fileObj);
  console.log(objectURL);
  $('.cam-gallery').hide();
  $('.send-box').show();
  human_img(objectURL);
}

function duration(){
  $(".amt-ip").show();
  $('.send-box').hide();
}

function send_duration(){
  var dur = $("#myRange")[0].value;
  human_txt(dur + ' months');
  $('.amt-ip').hide();
  $('.send-box').show();
}

//function to send msg from text-box
$("#send-button").click(function(){
  var msg = $("#text-ip").val();
  $("#text-ip").val('');
  human_txt(msg);
});

function human_txt(msg){
  botui.message.human({
    content: msg
  });
  //insert logic to send msg to dialogflow
}

function human_img(src){
  botui.message.human({
    type: 'embed',
    content: src
});
}

function progress(){
  var elem = $(".progress-bar");
  var width = (elem[0].style.width).toString();
  width = width.substring(0, width.length - 1);   //converting percentage to number
  var steps = 0;
  var id = setInterval(frame, 10);
  console.log(width, steps);
  function frame() {
    if (width >= 100 | steps >= 25)
      clearInterval(id);
    else{
      width++;
      steps++;
      elem[0].style.width = width + '%';
    }
  }
}

$("#myRange").on('input', function(){
  dur  =this.value;
  let temp = amount;
  $("#emi")[0].innerHTML = 'EMI: &#8377 ' + calc_emi(temp, dur);
  $("#dur")[0].innerHTML = 'Duration: ' + dur + ' months';
});
