/***************************** Generate Rendom Number  *****************************/

var rendomNumber = document.getElementById("rendomNumber");
var val = Math.floor(1000 + Math.random() * 9000);
rendomNumber.textContent = val;

/**********************************************************/

var currentTab = 0;
showTab(currentTab);

var values = {
  first: {
    name: "",
    age: "",
    mob: "",
    add: "",
  },
  second: {
    aadharCard: "",
    photo: "",
  },
};

/***************************** show next Prev Buttons  **********************************/

function nextPrev(n) {
  var x = document.getElementsByClassName("tab");
  let y = x[currentTab].getElementsByTagName("input");

  if (n == 1 && !validateForm()) return false;

  x[currentTab].style.display = "none";

  if (currentTab == 0) {
    (values.first.name = y[0].value),
      (values.first.age = y[1].value),
      (values.first.mob = y[2].value),
      (values.first.add = y[3].value);
  }

  if (currentTab == 1) {
    values.second.aadharCard = y[7].value;
    values.second.photo = y[6].value;

    let docs = [];
    let checkboxes = document.getElementsByName("document");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked == true) {
        docs.push(checkboxes[i].id);
      }
    }
    if (docs == "") {
      docs.push("null");
    }
    documentValue.textContent = docs;
    console.log(docs, "document selected ");
  }

  console.log(values);
  document.getElementById("nameValue").textContent = values.first.name;
  document.getElementById("ageValue").textContent = values.first.age;
  document.getElementById("mobileValue").textContent = values.first.mob;
  document.getElementById("cityValue").textContent = values.first.add;
  document.getElementById("aadharCardValue").textContent = values.second.aadharCard;
  document.getElementById("photoValue").textContent = values.second.photo;

  currentTab = currentTab + n;

  if (currentTab >= x.length) {
    document.getElementById("regForm").onclick(function (e) {
      e.preventDefault();
      alert("form is submitted");
    });
    return false;
  }
  showTab(currentTab);
}

/***************************** show Input  **********************************/

function showInput() {
  var drivingLicenceValue = document.getElementById("drivingLicence");
  var pancardValue = document.getElementById("pancard");
  var passportValue = document.getElementById("passport");

  if (pancardValue.checked == true) {
    document.getElementById("checkbox1").style.display = "block";
  } else {
    document.getElementById("checkbox1").style.display = "none";
  }

  if (drivingLicenceValue.checked == true) {
    document.getElementById("checkbox2").style.display = "block";
  } else {
    document.getElementById("checkbox2").style.display = "none";
  }

  if (passportValue.checked == true) {
    document.getElementById("checkbox3").style.display = "block";
  } else {
    document.getElementById("checkbox3").style.display = "none";
  }
}

/***************************** show Tab  **********************************/

function showTab(n) {
  var x = document.getElementsByClassName("tab");

  x[n].style.display = "block";

  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }

  fixStepIndicator(n);
}

/***************************** validations  **********************************/

function validateForm() {
  var x,
  valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");

  var name = document.getElementById("name");
  var age = document.getElementById("age");
  var mobile = document.getElementById("mobile");
  var address = document.getElementById("address");

  if (currentTab == 0) {
    if (name.value == "") {
      document.getElementById("nameErr").textContent = "Please Enter Your Name";
      valid = false;
    } else {
      valid = true;
      document.getElementById("nameErr").textContent = " ";
    }

    if (age.value == "") {
      document.getElementById("ageErr").textContent = "Please Enter Your age";
      valid = false;
    } else {
      valid = true;
      document.getElementById("ageErr").textContent = " ";
    }

    if (mobile.value == "") {
      document.getElementById("mobileErr").textContent =
        "Please Enter Your Mobile Number";
      valid = false;
    } else {
      valid = true;
      document.getElementById("mobileErr").textContent = " ";
    }

    if (address.value == "") {
      document.getElementById("addressErr").textContent =
        "Please Enter Your Address";
      valid = false;
    } else {
      valid = true;
      document.getElementById("addressErr").textContent = " ";
    }
  }

  if (currentTab == 1) {
    var photo = document.getElementById("photo");
    if (photo.value == "") {
      document.getElementById("photoErr").textContent =
        "Please Upload Your Photo";
      valid = false;
    } else {
      document.getElementById("photoErr").textContent = " ";
      valid = true;
    }

    var aadharCard = document.getElementById("aadharCard").value;
    var regexp = /^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;

    if (regexp.test(aadharCard)) {
      document.getElementById("AadharCardErr").textContent = " ";
      valid = true;
    } else {
      document.getElementById("AadharCardErr").textContent =
        "Please Enter Your Aadhar Number";
      valid = false;
    }
  }

  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid;
}

/***************************** Step Indicator **********************************/

function fixStepIndicator(n) {
  var i,
    step = document.getElementsByClassName("step");
  for (i = 0; i < step.length; i++) {
    step[i].className = step[i].className.replace(" active", "");
  }
  step[n].className += " active";
}

/******************************    Video & Audio Recording     ******************************/

let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let start_button = document.querySelector("#start-record");
let stop_button = document.querySelector("#stop-record");
let download_link = document.querySelector("#download-video");

let camera_stream = null;
let media_recorder = null;
let blobs_recorded = [];

// camera_button.addEventListener("click", async function () {
//   camera_stream = await navigator.mediaDevices.getUserMedia({
//     video: true,
//     audio: true,
//   });
//   video.srcObject = camera_stream;
//   window.localStream = camera_stream;
// });

start_button.addEventListener("click", async function () {
  camera_stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  video.srcObject = camera_stream;
  window.localStream = camera_stream;

  media_recorder = new MediaRecorder(camera_stream, { mimeType: "video/webm" });
  console.log(media_recorder, " media_recorder///////////");
  media_recorder.addEventListener("dataavailable", function (e) {
    blobs_recorded.push(e.data);
  });

  media_recorder.addEventListener("stop", function () {
    let video_local = URL.createObjectURL(
      new Blob(blobs_recorded, { type: "video/webm" })
    );
    download_link.href = video_local;
    if ((media_recorder.state = "inactive")) {
      media_recorder.stop();
    }
  });
  media_recorder.start();
});

stop_button.addEventListener("click", function () {
  camera_stream.getTracks() 
  .forEach((track) => track.stop());
  media_recorder.stop();
  localStream.getVideoTracks()[0].stop();
  video.src = "";
  video.style.display = "none";
});

/*****************************  E-Signature  **********************************/

(function () {
  window.requestAnimFrame = (function (callback) {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimaitonFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  var canvas = document.getElementById("sig-canvas");
  var ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#222222";
  ctx.lineWidth = 4;

  var drawing = false;
  var mousePos = {
    x: 0,
    y: 0,
  };
  var lastPos = mousePos;

  canvas.addEventListener(
    "mousedown",
    function (e) {
      drawing = true;
      lastPos = getMousePos(canvas, e);
    },
    false
  );

  canvas.addEventListener(
    "mouseup",
    function (e) {
      drawing = false;
    },
    false
  );

  canvas.addEventListener(
    "mousemove",
    function (e) {
      mousePos = getMousePos(canvas, e);
    },
    false
  );

  // Add touch event support for mobile
  canvas.addEventListener("touchstart", function (e) {}, false);

  canvas.addEventListener(
    "touchmove",
    function (e) {
      var touch = e.touches[0];
      var me = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      canvas.dispatchEvent(me);
    },
    false
  );

  canvas.addEventListener(
    "touchstart",
    function (e) {
      mousePos = getTouchPos(canvas, e);
      var touch = e.touches[0];
      var me = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      canvas.dispatchEvent(me);
    },
    false
  );

  canvas.addEventListener(
    "touchend",
    function (e) {
      var me = new MouseEvent("mouseup", {});
      canvas.dispatchEvent(me);
    },
    false
  );

  function getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top,
    };
  }

  function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top,
    };
  }

  function renderCanvas() {
    if (drawing) {
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(mousePos.x, mousePos.y);
      ctx.stroke();
      lastPos = mousePos;
    }
  }

  // Prevent scrolling when touching the canvas
  document.body.addEventListener(
    "touchstart",
    function (e) {
      if (e.target == canvas) {
        e.preventDefault();
      }
    },
    false
  );
  document.body.addEventListener(
    "touchend",
    function (e) {
      if (e.target == canvas) {
        // e.preventDefault();
      }
    },
    false
  );
  document.body.addEventListener(
    "touchmove",
    function (e) {
      if (e.target == canvas) {
        e.preventDefault();
      }
    },
    false
  );

  (function drawLoop() {
    requestAnimFrame(drawLoop);
    renderCanvas();
  })();

  function clearCanvas() {
    canvas.width = canvas.width;
  }

  // Set up the UI
  var sigText = document.getElementById("sig-dataUrl");
  var sigImage = document.getElementById("sig-image");
  var clearBtn = document.getElementById("sig-clearBtn");
  var submitBtn = document.getElementById("sig-submitBtn");
  //var signBtn = document.getElementById("signBtn");
  var signCanvas = document.getElementById("sig-canvas");
  var btnDiv = document.getElementById("btnDiv");
  var sigEditBtn = document.getElementById("sig-editBtn");

  // signBtn.addEventListener("click", function (e) {
  //   btnDiv.style.display = "none";
  // });

  signCanvas.style.display = "block";
  sigEditBtn.addEventListener("click", function (e) {
    signCanvas.style.display = "block";
    sigImage.style.display = "none";
  });

  clearBtn.addEventListener(
    "click",
    function (e) {
      clearCanvas();
      sigText.innerHTML = "Data URL for your signature will go here!";
      sigImage.setAttribute("src", "");
    },
    true
  );
  submitBtn.addEventListener(
    "click",
    function (e) {
      btnDiv.style.display = "block";
      signCanvas.style.display = "none";
      // signBtn.style.display = "none";
      sigImage.style.display = "block";

      var dataUrl = canvas.toDataURL();
      // sigText.innerHTML = dataUrl;
      sigImage.setAttribute("src", dataUrl);
    },
    false
  );
})();
