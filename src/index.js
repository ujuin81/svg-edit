import "./styles.css";
import outer from "./Outer";
import ImageMapEditor from "./ImageMapEditor";
// require("./ImageMapEditor");

setMenu();

var imageMapEditor = new ImageMapEditor("imageEditor");
// test
imageMapEditor.addRectShape();

function setMenu() {
  var add = document.getElementById("addButton");
  add.addEventListener("click", function () {
    console.log("click");
    imageMapEditor.addRectShape();
  });
}

// test outer
var o = new outer();
o.fn2();
