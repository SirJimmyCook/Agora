const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function startDrawing(e) {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
  isDrawing = false;
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

function handleTouch(e) {
  const touch = e.touches[0];
  const mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY,
  });
  canvas.dispatchEvent(mouseEvent);
}

canvas.addEventListener("touchstart", (e) => {
  startDrawing({
    offsetX: e.touches[0].clientX,
    offsetY: e.touches[0].clientY,
  });
});
canvas.addEventListener("touchmove", handleTouch);
canvas.addEventListener("touchend", stopDrawing);

function setLineColor(color) {
  ctx.strokeStyle = color;
}

function setLineWidth(width) {
  ctx.lineWidth = width;
}

function enableEraser() {
  ctx.globalCompositeOperation = "destination-out";
}

function disableEraser() {
  ctx.globalCompositeOperation = "source-over";
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
