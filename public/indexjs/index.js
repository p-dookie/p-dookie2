let smallImage = document.getElementsByClassName("small-img");
for (let i = 0; i < smallImage.length; i++) {
  let currentImage = smallImage[i];
  currentImage.onclick = function newle() {
    document.getElementsByClassName("main-itself")[0].src = currentImage.src;
    $(smallImage).removeClass("current");
    $(currentImage).addClass("current");
  }
  var c = 0;
  document.onkeydown = function(event) {
    switch (event.keyCode) {
      case 37:
        c = c - 1;
        if (c > i) {
          c = 0;
        } else if (c < 0) {
          c = i;
        };
        $(smallImage).removeClass("current");
        $(smallImage[c]).addClass("current");
        document.getElementsByClassName("main-itself")[0].src = smallImage[c].src;
        break;
      case 39:
        c = c + 1;
        if (c > i) {
          c = 0;
        } else if (c < 0) {
          c = i;
        }
        $(smallImage).removeClass("current");
        $(smallImage[c]).addClass("current");
        document.getElementsByClassName("main-itself")[0].src = smallImage[c].src;
        break;
      default:
        return false;
    }
  };
};
$(".button-dropdown").on("click", function() {
  $(".contact-form").slideToggle();
});
var memeNumber = Math.floor(Math.random() * 21 + 1);
$("#fail-img").attr("src", "/memeimgs/img" + memeNumber + ".png");
