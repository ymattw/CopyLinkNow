let linkElement = null;

function onKeydown(e) {
  if (["Control", "Alt", "Meta"].includes(e.key)) {
    linkElement = null;
    document.addEventListener("mousemove", onMousemove);
  }
}

function onKeyup(e) {
  if (!linkElement) {
    return;
  }

  var text = "";
  if (e.key == "Control") {
    text = linkElement.innerText;
  }
  else if (e.key == "Alt") {
    text = linkElement.href;
  }
  else if (e.key == "Meta") {
    text = `[${linkElement.innerText}](${linkElement.href})`;
  }
  if (text != "") {
    console.log("Copying: " + text);
    document.removeEventListener("mousemove", onMousemove);
    navigator.clipboard.writeText(text);
    blinkElement(linkElement);
  }
}

function onMousemove(e) {
  linkElement = e.target.closest('a');
}

// Blink the element by inverting its color
function blinkElement(element) {
  var prevFilter = element.style.filter;
  element.style.filter = 'invert(100%)';
  setTimeout(function() {
    element.style.filter = prevFilter;
  }, 100);
}

document.addEventListener("keydown", onKeydown);
document.addEventListener("keyup", onKeyup);
