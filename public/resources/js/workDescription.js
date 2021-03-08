const expandImg = document.getElementById("expandedImg");

const imageDefault = document.getElementById('imageDefault');

const urlImage = imageDefault.textContent;
imageDefault.style.display = "none";
expandImg.src = `/img/imagePoster/${urlImage}`;
expandImg.parentElement.style.display = "inline-block";

function showPhoto(imgs) {
    const expandImg = document.getElementById("expandedImg");
    expandImg.src = imgs.src;
    expandImg.parentElement.style.display = "inline-block";
}