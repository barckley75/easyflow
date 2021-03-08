let spinTime = setTimeout(showPage, 500);
function showPage() {
    document.querySelector(".loader").style.display = "none";
    document.querySelector(".show").style.display = "block";
}

function setActive() {
    aObj = document.getElementById('nav').getElementsByTagName('a');
    const address = document.location.href.substring(document.location.href.lastIndexOf('/'));
    if (address === '/') {
        aObj[0].className = 'active';
        aObj[0].style.border = '2px solid #fff';
    }
    if (address === '/works') {
        aObj[1].className = 'active';
        aObj[1].style.border = '2px solid #fff';
    }
    if (address === '/cart') {
        aObj[2].className = 'active';
        aObj[2].style.border = '2px solid #fff';
    }
    if (address === '/blog') {
        aObj[3].className = 'active';
        aObj[3].style.border = '2px solid #fff';
    }
    if (address === '/contacts') {
        aObj[4].className = 'active';
        aObj[4].style.border = '2px solid #fff';
    }

}

setActive();