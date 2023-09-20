export const preloadImage = (image: string) => {
  const preloadImageLink = document.createElement("link");
  preloadImageLink.href = image;
  preloadImageLink.rel = "preload";
  preloadImageLink.as = "image";
  document.head.appendChild(preloadImageLink);
};
