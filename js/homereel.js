let reel = document.getElementById("photreel");
let img = document.getElementById("photoreel-img");
img.style.backgroundPosition = "center";
img.style.backgroundRepeat = "no-repeat";
img.style.backgroundSize = "contain";
img.style.opacity = "0";

let imgUrls = [
    "./images/homereel/01.jpg",
    "./images/homereel/02.jpg",
    "./images/homereel/03.jpg",
    "./images/homereel/04.jpg",
    "./images/homereel/05.jpg",
    "./images/homereel/06.jpg"
];

function fadeInAndOut(inTime, outTime, dwellTime) {
    for (let i = 1; i <= 100; i++) {
        setTimeout(
            () => {
                img.style.opacity = `${i/100}`;
            },
            i*inTime*10);
        setTimeout(
            () => {
                img.style.opacity = `${i/100}`;
            },
            (dwellTime + inTime)*1000 + (1000 - 10*i)*outTime
        );
    }
}

function startLoop(inTime, outTime, dwellTime, loop) {
    let n = imgUrls.length;                             // Number of images
    let dt = (dwellTime + inTime + outTime)*1000;       // Time devoted to each image, in milliseconds

    imgUrls.forEach((url, i) => {
        setTimeout(
            () => {
                img.style.backgroundImage = `radial-gradient(ellipse 50% 50%, transparent 80%, white 100%), url("${url}")`;
                fadeInAndOut(inTime, outTime, dwellTime);
            },
            i*dt
        );
    });
    if (loop)
        setTimeout(
            () => {
                startLoop(inTime, outTime, dwellTime, true);
            },
            n*dt
        );
}

startLoop(2, 3, 2, true);