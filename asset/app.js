const speedDisplay = document.getElementById("current-speed");
const canvas = document.getElementById("trainCanvas");
const ctx = canvas.getContext("2d");
console.log(ctx);
const trainImage = new Image();
trainImage.src = "../images2/pngwing.com (3).png";
// Provide the correct path to your train imageS
let trainX = 50;
let speed = 2;
let backgroundIndex = 0;
const backgrounds = [
  // "../images/eoo2_27z5_210511.jpg", // Provide correct paths to your background images
  // "../images/my5v_5w0i_210504.jpg",
  // "../images/omyg_e5a8_210318.jpg",
  // "../images/vn6j_t2go_210318.jpg",
  "../images2/31084.jpg",
  "../images2/31806.jpg",
  "../images2/wjqy_i2bo_190607.jpg",
];

function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // console.log(ctx.clearRect(330, 330, canvas.width, canvas.height));
  // Draw the background
  //yhan tak
  const background = new Image();

  background.src = backgrounds[backgroundIndex];
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  // ctx.drawImage(trainTrack, trainX, -50);
  if (backgroundIndex === 1) {
    console.log("yes");
    ctx.drawImage(trainImage, trainX, trainImage.height - canvas.height - 62);
  } else if (backgroundIndex === 2) {
    console.log("school");
    ctx.drawImage(trainImage, trainX, trainImage.height - canvas.height - 98);
  } else {
    // Draw the train
    ctx.drawImage(trainImage, trainX, trainImage.height - canvas.height - 102);
  }
  // Move the train
  trainX += speed;

  // Check if the train has reached the end of the canvas
  if (trainX > canvas.width) {
    trainX = -trainImage.width; // Move the train back to the beginning
    backgroundIndex = (backgroundIndex + 1) % backgrounds.length; // Switch background
    console.log("yeah its reached");
  }

  // Request animation frame for the next frame
  requestAnimationFrame(draw);
}

// Load images and start the animation after all images are loaded
Promise.all([trainImageLoadPromise(), ...backgrounds.map(loadImage)]).then(
  () => {
    draw();
  }
);

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function trainImageLoadPromise() {
  return new Promise((resolve, reject) => {
    trainImage.onload = resolve;
    trainImage.onerror = reject;
  });
}
function dec() {
  if (speedDisplay.textContent >= 2) {
    speed -= 2;
    updateSpeedDisplay();
  }
}
function inc() {
  speed += 2;
  updateSpeedDisplay();
}
function updateSpeedDisplay() {
  speedDisplay.textContent = speed;
}
