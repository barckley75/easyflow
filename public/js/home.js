export const hideLabel = () => {
    const volume = document.getElementById("photo");
    document.getElementById("mute").addEventListener("click", function () {
        video.muted ? (video.muted = !1, video.controls = !0, volume.src = "resources/img/icons/set0/volume1.svg") : (video.muted = !0, volume.src = "resources/img/icons/set0/volume2.svg");
    });

    // This function put display none to the text on homepage.
    setTimeout(() => {
        document.querySelector(".titleOverVideo").style.color = "rgba(255, 255, 255, 0)";
        document.getElementById("video").style.filter = "none";
    }, 5000);


    setTimeout(() => {
        document.querySelector(".titleOverVideo").style.display = "none";
        document.querySelector('.shopNow').style.opacity = "1";
    }, 8000);
};