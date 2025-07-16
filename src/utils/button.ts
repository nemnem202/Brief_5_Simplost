export default function createButton(
  innerText: string,
  id: string,
  onClick: () => void
): HTMLButtonElement {
  const button = document.createElement("button");
  button.className = "button";
  button.id = id;
  button.innerText = innerText;
  button.addEventListener("click", onClick);
  return button;
}
