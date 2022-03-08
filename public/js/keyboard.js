let keysPressed = [];
const showsKeys = document.querySelector("#show-keys");
let capsLock = false;

document.addEventListener("keydown", event => {
  event.preventDefault();
  keysPressed[event.code] = true;

  if (event.code === "CapsLock") {
    capsLock = !capsLock;
    document.querySelector("#led-capsLock").className = "led " + ("led-" + (capsLock ? "on" : "off"));
  }

  for (const key in keysPressed) {
    let keyElement = document.querySelector(`#${key}`);
    if (keyElement) keyElement.classList.add("active");
  }
});

document.activeElement.addEventListener("keyup", event => {
  for (const key in keysPressed) {
    let keyElement = document.querySelector(`#${key}`);
    if (keyElement) keyElement.classList.remove("active");
  }
  
  delete keysPressed[event.code];
});