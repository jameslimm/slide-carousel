const carousel = (() => {
  const carouselDots = document.querySelector(".carousel__dots");
  const nextButton = document.querySelector(".carousel__button--right");
  const prevButton = document.querySelector(".carousel__button--left");
  const images = [...document.querySelector(".carousel__image-container").children];

  let timeOutId;
  let autoIntervalId;
  let imageWidth;
  let curImage;

  // on page load or resize, reposition slide images based on new width
  // and set current image to the start.
  const init = () => {
    imageWidth = images[0].getBoundingClientRect().width;
    images.forEach((img, i) => (img.style.left = `${imageWidth * i}px`));
    setCurImage(0);
  };

  // moving between images
  const setCurImage = (n) => {
    if (curImage !== n) {
    }
    curImage = n;
    activateAutoDelay();
    render();
  };

  const nextImage = () => !atEnd() && setCurImage(curImage + 1);
  const prevImage = () => !atStart() && setCurImage(curImage - 1);
  const nextImageAndRestart = () => setCurImage(!atEnd() ? curImage + 1 : 0);

  // helper functions to determine bounds of the carousel.
  const atEnd = () => curImage === images.length - 1;
  const atStart = () => curImage === 0;

  // set up auto move through images.  Every 5 seconds, reset
  // each time there is manual user input.
  const activateAutoDelay = () => {
    clearInterval(autoIntervalId);
    autoIntervalId = setInterval(nextImageAndRestart, 5000);
  };

  const render = () => {
    // position slide images
    images.forEach((img) => (img.style.translate = `${curImage * imageWidth * -1}px 0`));

    // build carousel dots
    carouselDots.innerHTML = "";
    images.forEach((_, i) => {
      const dot = document.createElement("button");
      if (curImage === i) dot.className = "viewing";
      dot.addEventListener("click", () => setCurImage(i));
      carouselDots.appendChild(dot);
    });

    // hide next and previous buttons if needed
    nextButton.classList.toggle("hide", atEnd());
    prevButton.classList.toggle("hide", atStart());
  };

  // set up event listeners
  nextButton.addEventListener("click", nextImage);
  prevButton.addEventListener("click", prevImage);

  window.addEventListener("resize", () => {
    clearTimeout(timeOutId);
    timeOutId = setTimeout(init, 100);
  });

  init();
})();
