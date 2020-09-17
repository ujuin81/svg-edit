// import DraggableRect from "./DraggableRect";s
import RectShape from "./RectShape";

export default (function () {
  function ImageMapEditor(imageMapEditorId) {
    console.dir(this);
    console.log("imageMapEditorId", imageMapEditorId);
    var ime = document.getElementById(imageMapEditorId);
    var svgCanvas = createSVG();

    console.log("ImageMapEditor", ime, svgCanvas);
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
      var rectShape = new RectShape(svgCanvas, {
        x: 50,
        y: 50,
        w: 100,
        h: 150
      });
    }

    // todo - Map 생성 필요

    this.ime = ime;
    this.addRectShape = addRectShape;
  }

  return ImageMapEditor;
})();
