import DraggableRect from "./DraggableRect";

export default (function () {
  function RectShape(svgCanvas, rect) {
    var _mouseDownRect = { x: 0, y: 0, w: 0, h: 0 };
    // face
    var _faceRect = new DraggableRect(
      svgCanvas,
      { x: rect.x, y: rect.y, w: rect.w, h: rect.h, drawCenter: 0 },
      "fill: rgb(255, 255, 255);  fill-opacity: 0.2;  stroke: red;  stroke-width: 2px;  cursor: move;",
      saveFaceRect,
      faceRectMove
    );
    // vertext
    var _vertextRect = new DraggableRect(
      svgCanvas,
      { x: 0, y: 0, w: 10, h: 10, drawCenter: 1 },
      "fill: rgb(255, 255, 255);stroke: rgb(0, 0, 0);stroke-width: 2px;cursor: nw-resize;",
      saveFaceRect,
      function () {
        console.log("move vertextRect ");
        _faceRect.updateRect({
          x: _mouseDownRect.x,
          y: _mouseDownRect.y,
          w: _vertextRect.rect.x - _faceRect.rect.x,
          h: _vertextRect.rect.y - _faceRect.rect.y
        });
      }
    );

    function saveFaceRect() {
      _mouseDownRect.x = _faceRect.rect.x;
      _mouseDownRect.y = _faceRect.rect.y;
      _mouseDownRect.w = _faceRect.rect.w;
      _mouseDownRect.h = _faceRect.rect.h;
    }

    function faceRectMove() {
      console.log("move _faceRect ");
      //vertextRect.updatePosition;
      // console.log("updated ", faceRect.deltaPosition, vertextRect);
      _vertextRect.setPosition({
        x: _faceRect.rect.x + _faceRect.rect.w,
        y: _faceRect.rect.y + _faceRect.rect.h
      });
    }
    svgCanvas.appendChild(_faceRect.getRectElement());
    svgCanvas.appendChild(_vertextRect.getRectElement());

    _faceRect.draw();
    _vertextRect.draw();
    saveFaceRect();
    faceRectMove();
  }

  return RectShape;
})();
