let gallery = document.getElementById("gallery");

let loadMessage = document.createElement("p");
loadMessage.innerText = "Laster galleri..."
gallery.appendChild(loadMessage);

let entries;
let viewing = -1;

fetch("../images/gallery/galleryindex.json")
    .then(response => response.json())
    .then(data => {
        gallery.removeChild(loadMessage);
        entries = data.map((obj, i, arr) => {
            let entry = document.createElement("div");
            entry.className = "gallery-entry";

            let pic = document.createElement("img");
            pic.src = `../images/gallery/${obj.filename}`;
            entry.append(pic);

            pic.addEventListener("click", event => {
                viewing = i;

                let overlay = document.createElement("div");
                overlay.className = "overlay";

                let preview = document.createElement("div");
                preview.className = "preview";
                
                let img = document.createElement("img");
                img.src = `../images/gallery/${obj.filename}`;

                let footer = document.createElement("div");
                footer.className = "footer";
                let leftButton = document.createElement("div");
                leftButton.className = "jumpButton";
                leftButton.innerHTML = "&#x23F4;";
                let rightButton = document.createElement("div");
                rightButton.className = "jumpButton";
                rightButton.innerHTML = "&#x23F5;";
                let description = document.createElement("span");
                description.innerHTML = `${obj.artist}: <i>${obj.title}</i>`;
                footer.append(leftButton, description, rightButton);

                preview.append(img, footer);
                overlay.append(preview);
                document.body.append(overlay);
                overlay.style.top = `${window.scrollY}px`;
                
                let close = event => {
                    overlay.removeEventListener("click", close);
                    preview.removeEventListener("click", shutterUpper);
                    window.removeEventListener("scroll", close);
                    leftButton.removeEventListener("click", jumpLeft);
                    rightButton.removeEventListener("click", jumpRight);
                    window.removeEventListener("keydown", keyPressed);
                    viewing = -1;
                    document.body.removeChild(overlay);
                };
                let jumpLeft = (event) => {
                    viewing = viewing === 0 ? arr.length - 1 : viewing - 1;
                    let prevObj = arr[viewing];
                    img.src = `../images/gallery/${prevObj.filename}`;
                    description.innerHTML = `${prevObj.artist}: <i>${prevObj.title}</i>`;
                }
                let jumpRight = (event) => {
                    viewing = viewing === arr.length - 1 ? 0 : viewing + 1;
                    let prevObj = arr[viewing];
                    img.src = `../images/gallery/${prevObj.filename}`;
                    description.innerHTML = `${prevObj.artist}: <i>${prevObj.title}</i>`;
                };
                let keyPressed = event => {
                    if (event.key === "ArrowLeft")
                        jumpLeft(event);
                    else if (event.key === "ArrowRight")
                        jumpRight(event);
                    else if (event.key === "Escape")
                        close(event);
                };
                let shutterUpper = event => {
                    event.stopPropagation();
                };
                overlay.addEventListener("click", close);
                preview.addEventListener("click", shutterUpper);
                window.addEventListener("scroll", close);
                leftButton.addEventListener("click", jumpLeft);
                rightButton.addEventListener("click", jumpRight);
                window.addEventListener("keydown", keyPressed);
            });

            return entry;
        });
    })
    .then(() => {
        entries.forEach(entry => {
            gallery.append(entry);
        })
    })
    .catch(error => {
        let msg = document.createElement("p");
        console.log(error)
        msg.innerText = "(Galleriet er tomt)";
        gallery.append(msg);
    });