// Whether was pointer clicked between a keydown and a keyup event.
let pointerClicked = false;

function onClick(e) {
  pointerClicked = true;
}

function onKeydown(e) {
  pointerClicked = false;
}

function onKeyup(e) {
  if (pointerClicked) {
    console.log("🤔 Pointer was cicked while key was held, skip copying");
    return;
  }

  link = document.querySelector('a:hover');
  if (!link) {
    console.log("🤔 No link found under pointer");
    return;
  }

  selection = window.getSelection();
  if (selection.type === "Range" && link.contains(selection.anchorNode)) {
    console.log("🤔 User already selected the link, skip copying");
    return;
  }

  var text = "";
  if (e.key == "Meta") {
    text = link.innerText;
  }
  else if (e.key == "Control") {
    text = link.href;
  }
  else if (e.key == "Alt") {
    text = `[${link.innerText}](${link.href})`;
  }
  if (text != "") {
    console.log("📋 " + text);
    navigator.clipboard.writeText(text);
    blinkElement(link);
  }
}

// Blink the element by inverting its color and then reset
function blinkElement(element) {
  var prevFilter = element.style.filter;
  element.style.filter = 'invert(100%)';
  setTimeout(function() {
    element.style.filter = prevFilter;
  }, 100);
}

document.addEventListener("click", onClick);
document.addEventListener("keydown", onKeydown);
document.addEventListener("keyup", onKeyup);
