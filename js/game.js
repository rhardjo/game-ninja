var step1 = new Audio("music/step1.ogg"); // buffers automatically when created
var step2 = new Audio("music/step2.ogg");
var breath = new Audio("music/Breathh.ogg");
var jump = new Audio("music/jump.ogg");
var inhale = new Audio("music/inhale.ogg");
var exhale = new Audio("music/exhale.ogg");

var KEY = {
  LEFT: 37,
  RIGHT: 39,
  UP: 32
}

var WORLD = {
  POSITIEX: 0,
  EXTRAX: 15,
  WALKX: 7.5,
  POSITIEY: 0,
  EXTRAY: 5
}

var MR = {
  RFRAMES: 8,
  CURRENTRFRAME: 1,
  SFRAMES: 2,
  CURRENTSFRAME: 1,
  JFRAMES: 3,
  CURRENTJFRAME: 1,
  WFRAMES: 3,
  CURRENTWFRAME: 1,
  GROUND: parseInt($('img').css('bottom'), 10),
  RPATH: "ninja-frames/running/r",
  SPATH: "ninja-frames/standing/s",
  JPATH: "ninja-frames/jumping/j",
  WPATH: "ninja-frames/walking/w",
  STAND: function() {
    if((this.CURRENTSFRAME + 1)>this.SFRAMES) {
      this.CURRENTSFRAME = 1;
      inhale.play();
      inhale.currentTime=0;
    } else {
      this.CURRENTSFRAME++;
      exhale.play();
      exhale.currentTime=0;
    }
    $("img").attr("src", this.SPATH + this.CURRENTSFRAME + ".png");
  },
  RUN: function() {
    if((this.CURRENTRFRAME + 1)>this.RFRAMES) {
      this.CURRENTRFRAME = 1;
    } else {
      this.CURRENTRFRAME++;
    }
    $("img").attr("src", this.RPATH + this.CURRENTRFRAME + ".png");
  },
  WALK: function(){
    if((this.CURRENTWFRAME + 1)>this.WFRAMES) {
      this.CURRENTWFRAME = 1;
    } else {
      this.CURRENTWFRAME++;
    }
    $("img").attr("src", this.WPATH + this.CURRENTWFRAME + ".png");
  },
  STEP: function() {
    switch(this.CURRENTRFRAME) {
        case 3:
          step1.play();
          step1.currentTime=0;
          break;
//        case 6:
//          breath.play();
//          breath.currentTime=0;
//          break;
        case 7:
          step2.play();
          step2.currentTime=0;
          break;
    }
  },
  JUMP: function() {
    var jumping = setTimeout(function () {
      for (this.CURRENTJFRAME; this.CURRENTJFRAME < this.JFRAMES; this.CURRENTJFRAME++) {
//        $("img").attr("src", this.JPATH + this.CURRENTJFRAME + ".png");
      }
    }, 50);
    $("img").attr("src", this.JPATH + this.CURRENTJFRAME + ".png");
    jump.play();
    jump.currentTime=0;
  }
}

var IdleStance = 0; //Global var for interval

function setResetInterval(bool){ //Toggles interval on/off
  if(bool){ //if true
    IdleStance = setInterval("MR.STAND()", 1000); //loop idle stance
  }else{
    clearInterval(IdleStance); // stop the loop
  }
}

$(function(){
  $(document).keydown(function(e){
    switch(e.which){
      case KEY.RIGHT:
        if (e.shiftKey) {
          setResetInterval(false);
          WORLD.POSITIEX -= WORLD.EXTRAX;
          $("div").css("background-position", WORLD.POSITIEX + "px 0px");
          $("img").removeClass("flipped");
          MR.RUN();
          MR.STEP();
        } else {
          setResetInterval(false);
          WORLD.POSITIEX -= WORLD.WALKX;
          $("div").css("background-position", WORLD.POSITIEX + "px 0px");
          $("img").removeClass("flipped");
          MR.WALK();
          MR.STEP();
        }
        break;
      case KEY.LEFT:
        if (e.shiftKey) {
          setResetInterval(false);
          WORLD.POSITIEX += WORLD.EXTRAX;
          $("div").css("background-position", WORLD.POSITIEX + "px 0px");
          $("img").addClass("flipped");
          MR.RUN();
          MR.STEP();
        } else {
          setResetInterval(false);
          WORLD.POSITIEX += WORLD.WALKX;
          $("div").css("background-position", WORLD.POSITIEX + "px 0px");
          $("img").addClass("flipped");
          MR.WALK();
          MR.STEP();
        }
        break;
      case KEY.UP:
//        setResetInterval(false);
        $("img").css("bottom", + WORLD.POSITIEX + 'px ' + WORLD.POSITIEY +'px');
        MR.JUMP();
        break;
    }
  });
    $(document).keyup(function(e){
    switch(e.which){
      case KEY.RIGHT:
        setResetInterval(true);
        $("img").removeClass("flipped");
        break;
      case KEY.LEFT:
        setResetInterval(true);
        $("img").addClass("flipped");
        break;
    }
  });
});