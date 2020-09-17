export default (function () {
  function DraggableRect(
    svgCanvas,
    rect,
    style,
    mouseDownCallback,
    moveCallback
  ) {
    var _this = this;
    var _rect = rect;
    var _deltaPosition = { x: 0, y: 0 };
    var _isMouseDown = false;
    var _mouseDownPosition = { x: 0, y: 0 };
    var _mouseDownRect = { x: 0, y: 0, w: 0, h: 0 };

    var _centerPosition = {
      x: (_rect.w / 2) * -1 * _rect.drawCenter,
      y: (_rect.h / 2) * -1 * _rect.drawCenter
    };

    // create rect element
    var rectElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );

    rectElement.setAttribute("x", 0);
    rectElement.setAttribute("y", 0);
    rectElement.setAttribute("width", 100);
    rectElement.setAttribute("height", 100);
    rectElement.style = style;

    function updateMousDownRect() {
      console.log(_mouseDownRect, _rect);
      _mouseDownRect.x = _rect.x;
      _mouseDownRect.y = _rect.y;
      _mouseDownRect.w = _rect.w;
      _mouseDownRect.h = _rect.h;
    }

    updateMousDownRect();

    rectElement.addEventListener("click", function (event) {
      if (
        _rect.x <= event.pageX &&
        event.pageX <= _rect.x + _rect.w &&
        _rect.y <= event.pageY &&
        event.pageY <= _rect.y + _rect.h
      ) {
        console.log("click in area");
      }
      console.log("click", this);
    });

    rectElement.addEventListener("mousedown", function (event) {
      console.log("mousedown", event.pageX, event.pageY);
      _mouseDownPosition.x = event.pageX;
      _mouseDownPosition.y = event.pageY;

      updateMousDownRect();
      _isMouseDown = true;
      draw();
      mouseDownCallback();
    });

    rectElement.addEventListener("mouseup", function (event) {
      console.log("mouseup", event.pageX, event.pageY);
      updateMousDownRect();
      _isMouseDown = false;
      draw();
    });
    svgCanvas.addEventListener("mousemove", function (event) {
      if (_isMouseDown) {
        _updatePosition({ x: event.pageX, y: event.pageY });
        draw();
        // console.log(_this);
        moveCallback(_this);
      }
    });

    function _updatePosition(position) {
      console.log("updatePosition", position, _rect);
      _deltaPosition.x = position.x - _mouseDownPosition.x;
      _deltaPosition.y = position.y - _mouseDownPosition.y;
      _rect.x = _mouseDownRect.x + _deltaPosition.x;
      _rect.y = _mouseDownRect.y + _deltaPosition.y;
      setPosition({
        x: _mouseDownRect.x + _deltaPosition.x,
        y: _mouseDownRect.y + _deltaPosition.y
      });
      // setPosition();
      draw();
    }

    function setPosition(position) {
      console.log("setPosition", position, _rect);
      _rect.x = position.x;
      _rect.y = position.y;
      draw();
    }

    function updateRect(newRect) {
      console.log("updateRect", newRect);
      _rect.x = newRect.x;
      _rect.y = newRect.y;
      _rect.w = newRect.w;
      _rect.h = newRect.h;

      draw();
    }

    function draw() {
      // console.log("draw", rect);
      rectElement.setAttribute("x", _rect.x + _centerPosition.x);
      rectElement.setAttribute("y", _rect.y + _centerPosition.y);
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
    this.setPosition = setPosition;
    this.updateRect = updateRect;

    // todo
  }

  return DraggableRect;
})();
