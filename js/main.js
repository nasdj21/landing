const databaseURL = "https://landing-d867a-default-rtdb.firebaseio.com/coleccion.json";

const contadorRegion = {
    "Asia": 0,
    "Norte America": 0,
    "Centro America": 0,
    "Sudamerica": 0,
    "Africa": 0,
    "Europa": 0,
    "Oceania": 0
};

let sendData = () => {
    const form = document.getElementById("form");
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
    .then(() => {
        alert('¡Gracias por registrase!'); // Maneja la respuesta con un mensaje
        form.reset();
        updateContadorRegion(data.region);
        updateUI();

        // Recuperación de datos
        //getData()
    })
    .catch(error => {
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
    });
}

let updateContadorRegion = (opcion) => {
    if(contadorRegion[opcion] !== undefined){
        contadorRegion[opcion]++;
    }
}

let updateUI = () => {
    const resultsContainer = document.getElementById("suscriptoresPorRegion");
    resultsContainer.innerHTML = "";

    Object.entries(contadorRegion).forEach(([opcion, count]) => {
        const card = document.createElement("div");
        card.classList.add("result-card");
        card.innerHTML = `
            <p>${opcion}: <strong>${count}</strong></p>
        `;
        resultsContainer.appendChild(card);
    });
};

let getData = () => {  
    fetch(databaseURL, {method: "GET"})
    .then(response => {
        if(!response.ok){
            throw new Error(`Error al obtener los datos: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        if(data){
            Object.values(data).forEach(eleccion => {
                if(eleccion.region && contadorRegion[eleccion.region] !== undefined){
                    contadorRegion[eleccion.region]++;
                }
            });
        }
        updateUI();
    })
    .catch(error => {
        console.error("Error al cargar datos de inicio:", error);
        alert("Hubo un problema al cargar los datos. Intente nuevamente mas tarde");
        updateUI();
    });
};



let loaded = () => {
    const myform = document.getElementById("form");
    
    myform.addEventListener("submit", (eventSubmit) => {
        eventSubmit.preventDefault()
        sendData();
    });

    console.log("DOM is ready");
    getData();

   
};


window.addEventListener("load", loaded);

