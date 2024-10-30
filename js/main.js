const databaseURL = "https://landing-d867a-default-rtdb.firebaseio.com/coleccion.json";

let sendData = () => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    data["saved"] = new Date().toLocaleDateString("es-CO", {timeZone: "America/Guayaquil"})

    fetch(databaseURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        return response.json(); // Procesa la respuesta como JSON
    })
    .then(result => {
        alert('Agradeciendo tu preferencia, nos mantenemos actualizados y enfocados en atenderte como mereces'); // Maneja la respuesta con un mensaje
        form.reset()
    })
    .catch(error => {
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
    });
}

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
            emailElement.focus()

            return;
            
        }

        sendData();
    })

   
}


window.addEventListener("DOMContentLoaded", ready)
window.addEventListener("load", loaded)

