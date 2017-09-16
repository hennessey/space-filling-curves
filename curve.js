const canvas = document.getElementById("curve-canvas");
const context = canvas.getContext("2d");

let orientation = "south";
const position = { x: 1, y: 399 };
let curve = [position];

const start = 0;

const zig = step => {
  if (step === 1) {
    turnLeft(orientation);
    advance(20);

    turnLeft(orientation);
    advance(20);
  } else {
    zig(step / 2);
    zag(step / 2);
    zig(step / 2);
    zag(step / 2);
  }
};

const zag = step => {
  if (step === 1) {
    turnRight(orientation);
    advance(20);

    turnRight(orientation);
    advance(20);

    turnLeft(orientation);
    advance(20);
  } else {
    zag(step / 2);
    zag(step / 2);
    zig(step / 2);
    zag(step / 2);
  }
};

const advance = d => {
  if (orientation === "north") curve.push(north(d));
  if (orientation === "west") curve.push(west(d));
  if (orientation === "south") curve.push(south(d));
  if (orientation === "east") curve.push(east(d));
};

//currentDirection => nextDirection
const turnLeft = currentDirection => {
  if (currentDirection === "north") orientation = "west";
  if (currentDirection === "west") orientation = "south";
  if (currentDirection === "south") orientation = "east";
  if (currentDirection === "east") orientation = "north";
};

const turnRight = currentDirection => {
  if (currentDirection === "north") orientation = "east";
  if (currentDirection === "east") orientation = "south";
  if (currentDirection === "south") orientation = "west";
  if (currentDirection === "west") orientation = "north";
};

const north = d => {
  const lastPos = curve[curve.length - 1];
  const nextStep = { x: lastPos.x, y: lastPos.y - d };
  return nextStep;
};

const south = d => {
  const lastPos = curve[curve.length - 1];
  const nextStep = { x: lastPos.x, y: lastPos.y + d };
  return nextStep;
};

const west = d => {
  const lastPos = curve[curve.length - 1];
  const nextStep = { x: lastPos.x - d, y: lastPos.y };
  return nextStep;
};

const east = d => {
  const lastPos = curve[curve.length - 1];
  const nextStep = { x: lastPos.x + d, y: lastPos.y };
  return nextStep;
};

const draw = context => {
  context.beginPath();

  let coords = curve;

  coords.map(pair => setTimeout(context.lineTo(pair.x, pair.y), 50));

  context.stroke();
};

function Draw2(prev, curr) {
  context.beginPath();
  context.moveTo(prev.x, prev.y);
  context.lineTo(curr.x, curr.y);
  context.stroke();
}

zig(8);
zig(8);

const fps = 10;

function Animate2(timestamp, prevIndex, currIndex) {
  let coords = curve;

  context.beginPath();
  context.moveTo(coords[prevIndex].x, coords[prevIndex].y);
  context.lineTo(coords[currIndex].x, coords[currIndex].y);
  context.stroke();

  if (currIndex < coords.length - 1) {
    setTimeout(function() {
      requestAnimationFrame(function(timestamp) {
        Animate2(timestamp, currIndex, currIndex + 1);
      });
    }, 1000 / fps);
  }
}

requestAnimationFrame(function(timestamp) {
  starttime = timestamp;
  Animate2(timestamp, 0, 0, 400, 4000);
});
