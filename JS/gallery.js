let galleryImages = document.querySelectorAll(".gallery-img");
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

if (galleryImages) {
  galleryImages.forEach(function (image, index) {
    image.onclick = function () {
      let getElementCss = window.getComputedStyle(image);
      let getFullImgUrl = getElementCss.getPropertyValue("background-image");
      let getImgUrlPosition = getFullImgUrl.split("/img/thumbs/");
      let setNewImgUrl = getImgUrlPosition[1].replace('")', "");

      getLatestOpenedImg = index + 1;

      let container = document.body;
      let newImgWindow = document.createElement("div");
      container.appendChild(newImgWindow);
      newImgWindow.setAttribute("class", "img-window");
      newImgWindow.setAttribute("onclick", "closeImg()");

      let newImg = document.createElement("img");
      newImgWindow.appendChild(newImg);
      newImg.setAttribute("src", "img/" + setNewImgUrl);
      newImg.setAttribute("id", "current-img");

      newImg.onload = function () {
        let newPrevBtn = document.createElement("a");
        let btnPrevText = document.createTextNode("PREV");
        newPrevBtn.appendChild(btnPrevText);
        container.appendChild(newPrevBtn);
        newPrevBtn.setAttribute("class", "img-btn-prev");
        newPrevBtn.setAttribute("onclick", "changeImg(0)");

        let newNextBtn = document.createElement("a");
        let btnNextText = document.createTextNode("NEXT");
        newNextBtn.appendChild(btnNextText);
        container.appendChild(newNextBtn);
        newNextBtn.setAttribute("class", "img-btn-next");
        newNextBtn.setAttribute("onclick", "changeImg(1)");
      };
    };
  });

  function closeImg() {
    document.querySelector(".img-window").remove();
    document.querySelector(".img-btn-prev").remove();
    document.querySelector(".img-btn-next").remove();
  }
}

function changeImg(direction) {
  document.querySelector("#current-img").remove();
  let getImgWindow = document.querySelector(".img-window");
  let newImg = document.createElement("img");
  getImgWindow.appendChild(newImg);

  let calcNewImg;

  if (direction === 1) {
    calcNewImg = getLatestOpenedImg + 1;
    if (calcNewImg > galleryImages.length) {
      calcNewImg = 1;
    }
  } else if (direction === 0) {
    calcNewImg = getLatestOpenedImg - 1;
    if (calcNewImg <= 1) {
      calcNewImg = galleryImages.length;
    }
  }

  newImg.setAttribute("src", "img/img" + calcNewImg + ".jpg");
  newImg.setAttribute("id", "current-img");
  getLatestOpenedImg = calcNewImg;
}


