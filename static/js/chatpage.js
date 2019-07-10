var botui = new BotUI('my-botui-app');

var i = 0;

$(document).ready(function(){
  $(".yes-no, .temp").hide();

  //trial
  bot_txt('hey');
  //accept_or_deny();
});

//bot messages
function bot_txt(msg){
  botui.message.bot({
    delay: 1100,
    loading: true,
    content: msg
  });
}

function accept_or_deny(){
  $(".yes-no").show();
  $('.footer').hide();
}

$("#yes").click(function(){
  human_txt('yes');
  $(".yes-no").hide();
  $('.footer').show();
});

$("#no").click(function(){
  human_txt('no');
  $(".yes-no").hide();
  $('.footer').show();
});

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

$(".amount-ip").on('input', function(){
  $("#val")[0].innerHTML = this.value;
});
