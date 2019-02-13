export function showWindow(elem, ms = 150, display = "block") {
  let opacity = 0;
  elem.style.opacity = opacity;
  elem.style.display = display;

  let show = setInterval(function () {
    opacity += 0.1;
    opacity >= 1 && clearInterval(show);
    elem.style.opacity = opacity;
  }, ms / 10);
}

export function hideWindow(elem, ms = 150) {
  let opacity = 1;

  let hide = setInterval(function () {
    opacity -= 0.1;
    if (opacity <= 0) {
      clearInterval(hide);
      elem.style.display = "none";
    }
    elem.style.opacity = opacity;
  }, ms / 10);
}
