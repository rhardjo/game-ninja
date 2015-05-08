var step1 = new Audio("music/step1.ogg"); // buffers automatically when created
var step2 = new Audio("music/step2.ogg");

var KEY = {
  LEFT: 37,
  RIGHT: 39
}

var WORLD = {
  POSITIEX: 0,
  EXTRAX: 10
}

var MR = {
  AANTALFRAMES: 8,
  HUIDIGEFRAME: 1,
  PATH: "ninja-frames/f",
  WALK: function(){
    if((this.HUIDIGEFRAME + 1)>this.AANTALFRAMES) {
      this.HUIDIGEFRAME = 1;
    } else {
      this.HUIDIGEFRAME++;
    }
    $("img").attr("src", this.PATH + this.HUIDIGEFRAME + ".png");
  },
  STEP: function() {
    switch(this.HUIDIGEFRAME) {
        case 3:
          step1.play();
          step1.currentTime=0;
          break;
        case 7:
          step2.play();
          step2.currentTime=0;
          break;
    }
  }
}

$(function(){
  $(document).keydown(function(e){
    switch(e.which){
      case KEY.RIGHT:
        WORLD.POSITIEX -= WORLD.EXTRAX;
        $("div").css("background-position", WORLD.POSITIEX + "px 0px");
        $("img").removeClass("flipped");
        MR.WALK();
        MR.STEP();
        break;
      case KEY.LEFT:
        WORLD.POSITIEX += WORLD.EXTRAX;
        $("div").css("background-position", WORLD.POSITIEX + "px 0px");
        $("img").addClass("flipped");
        MR.WALK();
        MR.STEP();
        break;
    }
  });
});