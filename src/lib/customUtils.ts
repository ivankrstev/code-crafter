const resizeSelectToFitText = (selectElement: HTMLSelectElement) => {
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  var oStyles = getComputedStyle(selectedOption);
  const tmpElement = document.createElement("span");
  tmpElement.style.visibility = "hidden";
  tmpElement.style.whiteSpace = "nowrap";
  tmpElement.style.position = "absolute";
  tmpElement.style.fontFamily = oStyles.fontFamily;
  tmpElement.style.fontStyle = oStyles.fontStyle;
  tmpElement.style.fontWeight = oStyles.fontWeight;
  tmpElement.style.fontSize = oStyles.fontSize;
  tmpElement.textContent = selectedOption.textContent;
  document.body.appendChild(tmpElement);
  const width = tmpElement.offsetWidth;
  document.body.removeChild(tmpElement);
  selectElement.style.minWidth = `${width + 25}px`;
  selectElement.style.width = `${width + 25}px`;
};

export { resizeSelectToFitText };

declare global {
  interface Window {
    resizeSelectToFitText: typeof resizeSelectToFitText;
  }
}
