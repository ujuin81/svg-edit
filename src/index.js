import "./styles.css";
var imageMapEditor = new ImageMapEditor("imageEditor");
setMenu();

function ImageMapEditor(imageMapEditorId) {
  var ime = document.getElementById(imageMapEditorId);
  var svgTemplate = document.getElementById("svgTemplate");
  var svgCanvas = createSVG();
  var intervalId;

  function createSVG() {
    var svgElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgElement.setAttribute("id", "svgCanvas");
    svgElement.setAttribute("width", ime.width);
    svgElement.setAttribute("height", ime.height);
    svgElement.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    svgElement.style =
      "position: absolute;z-index: 1000;overflow: hidden; " +
      " top: " +
      ime.offsetTop +
      "px; left: " +
      ime.offsetLeft +
      "px; border: 1px solid; ";

    ime.insertAdjacentElement("afterend", svgElement);
    return svgElement;
  }

  function addRectShape() {
    var rectShape = new RectShape(svgCanvas);
  }

  // todo - Map 생성 필요

  this.ime = ime;
  this.addRect = addRectShape;
  console.dir(this);

  // test
  addRectShape();
}

// function RectGroup(){
//   var rectGroup = document.createElement("g");
//   var rectArea = document.createElement("rect");
//   var nw = document.createElement("rect");
//   // append element
//   rectGroup.appendChild(rectArea);
//   rectGroup.appendChild(nw);
//   svgCanvas.appendChild(rectGroup);
// }

function RectShape(svgCanvas) {
  var _mouseDownRect = { x: 0, y: 0, w: 0, h: 0 };
  // face
  var faceRect = new DraggableRect(
    svgCanvas,
    { x: 0, y: 0, w: 100, h: 100 },
    "fill: rgb(255, 255, 255);  fill-opacity: 0.2;  stroke: red;  stroke-width: 2px;  cursor: move;",
    function () {
      _mouseDownRect.x = faceRect.rect.x;
      _mouseDownRect.y = faceRect.rect.y;
      _mouseDownRect.w = faceRect.rect.w;
      _mouseDownRect.h = faceRect.rect.h;
    },
    function () {
      vertextRect.updatePosition({
        x: faceRect.rect.x + faceRect.rect.w,
        y: faceRect.rect.y + faceRect.rect.h
      });
      // console.log("updated ", faceRect.deltaPosition, vertextRect);
      // vertextRect.updatePosition(faceRect.deltaPosition);
    }
  );
  // test
  // vertext
  var vertextRect = new DraggableRect(
    svgCanvas,
    { x: 100, y: 100, w: 10, h: 10 },
    "fill: rgb(255, 255, 255);stroke: rgb(0, 0, 0);stroke-width: 2px;cursor: nw-resize;",
    function () {
      console.log(faceRect.mouseDownRect);
      _mouseDownRect.x = faceRect.rect.x;
      _mouseDownRect.y = faceRect.rect.y;
      _mouseDownRect.w = faceRect.rect.w;
      _mouseDownRect.h = faceRect.rect.h;
    },
    function () {
      // console.log("updated ", vertextRect.deltaPosition);
      faceRect.updateRect({
        x: _mouseDownRect.x,
        y: _mouseDownRect.y,
        w: vertextRect.rect.x - _mouseDownRect.x,
        h: vertextRect.rect.y - _mouseDownRect.y
      });
      // faceRect.updateRect(
    }
  );

  svgCanvas.appendChild(faceRect.getRectElement());
  svgCanvas.appendChild(vertextRect.getRectElement());

  faceRect.draw();
  vertextRect.draw();
}

function DraggableRect(
  svgCanvas,
  rect,
  style,
  mouseDownCallback,
  moveCallback
) {
  var _rect = rect;
  var _deltaPosition = { x: 0, y: 0 };
  // var _rectWhenMouseDown={ x: 0, y: 0, w: 0, h: 0 };
  // var _moveCallback = moveCallback;
  console.log("RectGroup");
  var isMouseDown = false;
  var mouseDownPosition = { x: 0, y: 0 };
  var _mouseDownRect = { x: 0, y: 0, w: 0, h: 0 };
  var _mouseDownRectOffset = { x: 0, y: 0 };

  // creawte rect element
  // var rectElement = document.createElement("rect");
  var rectElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );
  console.dir(rectElement);

  rectElement.setAttribute("x", 0);
  rectElement.setAttribute("y", 0);
  rectElement.setAttribute("width", 100);
  rectElement.setAttribute("height", 100);
  rectElement.style = style;

  updateMousDownRect();

  function updateMousDownRect() {
    _mouseDownRect.x = _rect.x;
    _mouseDownRect.y = _rect.y;
    _mouseDownRect.w = _rect.w;
    _mouseDownRect.h = _rect.h;
  }

  // rectElement.addEventListener("click", function (event) {
  //   if (
  //     _rect.x <= event.pageX &&
  //     event.pageX <= _rect.x + _rect.w &&
  //     _rect.y <= event.pageY &&
  //     event.pageY <= _rect.y + _rect.h
  //   ) {
  //     console.log("click in area");
  //   }
  //   console.log("click", this);
  // });

  rectElement.addEventListener("mousedown", function (event) {
    console.log("mousedown", event.pageX, event.pageY);
    mouseDownPosition.x = event.pageX;
    mouseDownPosition.y = event.pageY;

    _mouseDownRectOffset.x = (event.pageX - _rect.x) * -1;
    _mouseDownRectOffset.y = (event.pageY - _rect.y) * -1;

    updateMousDownRect();
    isMouseDown = true;
    draw();
    mouseDownCallback();
  });

  rectElement.addEventListener("mouseup", function (event) {
    console.log("mouseup", event.pageX, event.pageY);
    _mouseDownRectOffset.x = 0;
    _mouseDownRectOffset.y = 0;

    updateMousDownRect();
    isMouseDown = false;
    draw();
  });
  svgCanvas.addEventListener("mousemove", function (event) {
    if (isMouseDown) {
      // todo
      updatePosition({ x: event.pageX, y: event.pageY });
      draw();
      moveCallback();
    }
  });

  function updatePosition(position) {
    _rect.x = position.x + _mouseDownRectOffset.x;
    _rect.y = position.y + _mouseDownRectOffset.y;
    // _deltaPosition.x = position.x - mouseDownPosition.x;
    // _deltaPosition.y = position.y - mouseDownPosition.y;
    // _rect.x = _mouseDownRect.x + _deltaPosition.x;
    // _rect.y = _mouseDownRect.y + _deltaPosition.y;
    // _rect.w = _mouseDownRect.w + _deltaPosition.x;
    // _rect.h = _mouseDownRect.h + _deltaPosition.y;
    draw();
  }

  function updateRect(newRect) {
    console.log("updateRect", newRect);
    _rect.x = newRect.x;
    _rect.y = newRect.y;
    _rect.w = newRect.w;
    _rect.h = newRect.h;

    draw();
    // rect.x = mouseDownRect.x + newRect.x;
    // rect.y = mouseDownRect.y + newRect.y;
    // rect.w = mouseDownRect.w + newRect.x;
    // rect.h = mouseDownRect.h + newRect.y;
  }

  function draw() {
    // console.log("draw", rect);
    rectElement.setAttribute("x", _rect.x);
    rectElement.setAttribute("y", _rect.y);
    rectElement.setAttribute("width", _rect.w);
    rectElement.setAttribute("height", _rect.h);
  }

  function getRectElement() {
    return rectElement;
  }

  // variable
  this.rect = _rect;
  this.deltaPosition = _deltaPosition;
  this.mouseDownRect = _mouseDownRect;
  // method
  this.draw = draw;
  this.getRectElement = getRectElement;
  this.updatePosition = updatePosition;
  this.updateRect = updateRect;
}

function setMenu() {
  var add = document.getElementById("addButton");
  add.addEventListener("click", function () {
    console.log("click");
    imageMapEditor.addRect();
  });
}
