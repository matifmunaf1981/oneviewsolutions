var data_sid = document.currentScript.getAttribute('data-sid') == null ? '' : document.currentScript.getAttribute('data-sid');
var data_url = document.currentScript.getAttribute('data-url') == null ? '' : document.currentScript.getAttribute('data-url');
if (data_url=="") {
    data_url="OVSwebExtension/";
}
var isInvitation = false;
var devicePermissions = '';
var popup;
var chatBtn;


var canUserCall = false;
var hasCamera = false;
var redirectURL = '';

window.onload = function () {
  console.log('window loaded');

  /* Adding CSS style sheet */
  var head = document.getElementsByTagName('HEAD')[0];
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = data_url + 'css/index.css';
  head.appendChild(link);

  link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = data_url + 'lib/jquery/jquery-ui.min.css';
  head.appendChild(link);

  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
  head.appendChild(link);


  let s1 = document.createElement("script");
  s1 = document.createElement("script");
  s1.type = "text/javascript";
  s1.src = data_url + "lib/jquery/jquery-3.3.1.min.js";
  s1.addEventListener('load', (event) => {console.log(s1.src   + ' file has been loaded');});
  head.appendChild(s1);
  console.log(s1.src + " done");

  let s2 = document.createElement("script");
  s2 = document.createElement("script");
  s2.type = "text/javascript";
  s2.src = data_url + "lib/jquery/jquery.md5-min.js";
  s2.addEventListener('load', (event) => {console.log(s2.src   + ' file has been loaded');});
  head.appendChild(s2);
  console.log(s2.src + " done");

  let s3 = document.createElement("script");
  s3 = document.createElement("script");
  s3.type = "text/javascript";
  s3.src = data_url + "lib/jquery/jquery-ui.min.js";
  s3.addEventListener('load', (event) => {console.log(s3.src   + ' file has been loaded');});
  head.appendChild(s3);
  console.log(s3.src + " done");



  var chatpopup = '<div id="example-account-id"><button class="chat-btn"><i class="material-icons">phone </i></button><div id="chat-pop-box" class="chat-popup chat-popup-form"></div></div>';
  
  document.body.innerHTML += chatpopup;

  /*  */
  popup = document.querySelector('.chat-popup');
  chatBtn = document.querySelector('.chat-btn');

  //   Chat Button Toggler
  chatBtn.addEventListener('click', () => {
    console.log("chatBtn addEventListener(click) Start");
    OpenAsWindow();
    console.log("chatBtn addEventListener(click) End");
  });
  if (isInvitation) {
    chatBtn.click();
  };
}


function closeIFrame() {
  var frame = document.getElementById("Chatter");
  frame.parentNode.removeChild(frame);
  popup.classList.remove('show');
  $(".chat-btn").hide();
  try {
    Android.showUser("Disconnected");
    console.log('Android disconnected event fired.');
  } catch (err) {
    console.log('Android disconnected event fire error.');
  }
  if (redirectURL != '' && isValidHttpUrl(redirectURL)) {
    window.location.replace(redirectURL);
  }
}

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}


/* Listening messages from child iFrame */
window.onmessage = function (e) {

  t = e.data;
  console.log('Parent event listner : ' + t);

  if (typeof window[t] === "function") {
    /* Executing requested function */
    return window[t]();
  }

}



function doConfirm() {
  return confirm("Do you really want to drop this call?");
}

function formIFrame() {

  $("#chat-pop-box").removeClass("chat-popup-call");
  $("#chat-pop-box").addClass("chat-popup-form");
}

function callIFrame() {
  $("#chat-pop-box").removeClass("chat-popup-form");
  $("#chat-pop-box").addClass("chat-popup-call");
}
function OpenAsWindow(){
  console.log("OpenAsWindow Start");

  var chatServiceURL = '';
  chatServiceURL = chatServiceURL + data_url + 'index.html';
  function get(n) {
    var half = location.search.split('&' + n + '=')[1];
    if (!half) half = location.search.split('?' + n + '=')[1];
    return half !== undefined ? decodeURIComponent(half.split('&')[0]) : null;
  }
  chatServiceURL = chatServiceURL + '?extension=' + get("extension");


  let windowObj = null;
  let width = 400;
  let height = 700;

  if(windowObj != null){
      windowObj.dialog("close");
      windowObj = null;
  }

  var iframe = $('<iframe/>');
  iframe.css("width", "100%");
  iframe.css("height", "100%");
  iframe.attr("frameborder", "0");
  console.log("...chatServiceURL:" + chatServiceURL)
  iframe.attr("src", chatServiceURL);

  // Create Window
  windowObj = $('<div/>').html(iframe).dialog({
      autoOpen: false,
      title: "OVS webExtension",
      modal: true,
      width: width,
      height: height,
      resizable: true,
      close: function(event, ui) {
          $(this).dialog("destroy");
          windowObj = null;
      }
  });

  windowObj.dialog("open");

  var windowWidth = $(window).outerWidth();
  var windowHeight = $(window).outerHeight();
  var offsetTextHeight = windowObj.parent().outerHeight();

  windowObj.parent().css('left', windowWidth/2 - width/2 + 'px');
  windowObj.parent().css('top', windowHeight/2 - offsetTextHeight/2 + 'px');

  if(windowWidth <= width) {
      windowObj.parent().css('left', '0px');
  } 
  if(windowHeight <= offsetTextHeight) {
      windowObj.parent().css('top', '0px');
  }
  console.log("OpenAsWindow End");
}
