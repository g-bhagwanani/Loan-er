var botui = new BotUI('my-botui-app');

var i = 0;

var intents = ['loan','get name', 'amount-1','loan period','email','pan','PAN pic upload', 'Aadhar number', 'Aadhar pic front','Aadhar pic back','Loan approved - yes','Bank details']
var ptr = 0;

var amount;

$(document).ready(function(){
  $(".yes-no, .temp, #cam-hidden, #gallery-hidden, .cam-gallery, .amt-ip, .bank-ip").hide();

  amount = 45000;
  $("#emi")[0].innerHTML = 'EMI: &#8377 ' + calc_emi(amount, 18);
  //trial
  bot_txt('hey');
  //accept_or_deny();
  //cam_or_gallery();
  // duration();
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
  human_img(objectURL, fileObj.toString());
}

function gallery_send(){
  fileObj = $('#gallery-hidden')[0].files[0];
  const objectURL = window.URL.createObjectURL(fileObj);
  console.log(objectURL);

  $('.cam-gallery').hide();
  $('.send-box').show();
  human_img(objectURL, fileObj);
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

function get_bank(){
  $(".bank-ip").show();
  $('.send-box').hide();
}

function send_bank(){
  var acc = $("#acc-no")[0].value;
  var ifsc = $("#ifsc")[0].value;
  human_txt('Account No.: ' + acc);
  human_txt('IFSC Code: ' + ifsc);
  $('.bank-ip').hide();
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
  send_to_server(msg);

}

function human_img(src, obj){
  botui.message.human({
    type: 'embed',
    content: src
  });
  send_to_server('xyz', true);
}

function send_to_server(msg, is_img=false){
    var url = window.location.href;
    url = url.slice(0,url.length-5)+'/myapi';

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            messages = (response.fulfillmentMessages);
            var intent_name = response.intent.displayName;
            console.log(intent_name);
            console.log(messages);
            for (var response in messages) {
                response = messages[response].text.text;
                bot_txt(response[0]);
            }
            if(intent_name != 'Default Fallback Intent'){
                ptr += 1;
                if(ptr<intents.length)
                    nextIntent = intents[ptr];
                switch (nextIntent) {
                    case 'loan period':
                        //db call for amount
                        duration();
                        break;
                    case 'PAN pic upload':
                    case 'Aadhar pic front':
                    case 'Aadhar pic back':
                        cam_or_gallery();
                        break;
                    case 'Loan approved - yes':
                        accept_or_deny();
                        break;
                    case 'Bank details':
                        get_bank();
                        break;
                }
            }
        }
    };
    xhttp.open("POST", url, true);
    if(is_img)
        xhttp.setRequestHeader('file_type','image')
    xhttp.send(msg);

    console.log('Some shit');
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
