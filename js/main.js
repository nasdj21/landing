let ready = () => {
    console.log("DOM está listo")
}

let loaded = (eventLoaded) => {
    let myform = document.getElementById("form")
    myform.addEventListener("submit", (eventSubmit) => {
        eventSubmit.preventDefault()
        const emailElement  = document.querySelector(".form-control-lg");
        const emailText = emailElement.value;

        if (emailText.length === 0) {
            emailElement.animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(50px)" },
                    { transform: "translateX(-50px)" },
                    { transform: "translateX(0)" }
                ],
                {
                    duration: 400,
                    easing: "linear",
                }
            )
        }
    })
}

window.addEventListener("DOMContentLoaded", ready)
window.addEventListener("load", loaded)