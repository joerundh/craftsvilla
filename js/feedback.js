let main = document.getElementsByTagName("main")[0];
let nameInput = document.getElementById("name");
let messageInput = document.getElementById("message-input");
let submitButton = document.getElementById("send-in");

function submitFeedback() {
    if (nameInput.value.length > 0 && messageInput.value.length > 0) {
        console.log(`"${nameInput.value}" skrev:`);
        console.log(`${messageInput.value}`);

        let header = document.createElement("h2");
        header.innerText = "Takk for deres tilbakemelding!";

        let message = document.createElement("p");
        message.innerText = "Vi setter stor pris på at dere er villige til å gi oss respons, og lover at deres eventuelle ønsker skal tas inn til etterretning!";

        let offer = document.createElement("p");
        offer.innerText = "Interessert i et nytt besøk?";

        let link = document.createElement("a");
        link.href = "./booking.html";
        link.innerHTML = "Se ledige timer her &#x279C;";

        main.innerHTML = "";
        main.append(header, message, offer, link);
    }
}

submitButton.addEventListener("click", event => {
    submitFeedback();
})