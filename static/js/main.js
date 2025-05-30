document.addEventListener("DOMContentLoaded", function () {
    // Smooth scroll para enlaces con #
    document.querySelectorAll('nav ul li a[href^="#"]').forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            targetSection?.scrollIntoView({ behavior: "smooth" });
        });
    });


    // Acordeón de FAQs
    document.querySelectorAll(".faq-question").forEach((question) => {
        question.addEventListener("click", () => {
            const answer = question.nextElementSibling;
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // Botón "Subir arriba"
    const scrollToTopButton = document.getElementById("scrollToTop");
    window.addEventListener("scroll", function () {
        if (
            document.body.scrollTop > 100 ||
            document.documentElement.scrollTop > 100
        ) {
            scrollToTopButton.style.display = "block";
        } else {
            scrollToTopButton.style.display = "none";
        }
    });

    scrollToTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    // Lógica para el acordeón de servicios
    document.querySelectorAll('.servicio-titulo').forEach(titulo => {
        titulo.addEventListener('click', () => {
            const detalles = titulo.nextElementSibling;

            // Alternar la visibilidad de la respuesta con un solo clic
            if (detalles.style.maxHeight === "0px" || !detalles.style.maxHeight) {
                detalles.style.maxHeight = detalles.scrollHeight + "px"; // Expande el contenido
            } else {
                detalles.style.maxHeight = "0px"; // Colapsa el contenido
            }
        });
    });


    // Lógica para mostrar la ubicaciónAdd commentMore actions
    const modal = document.getElementById('locationModal');
    const sgoButton = document.getElementById('sgoButton');
    const jujuyButton = document.getElementById('jujuyButton');

    // Mostrar el modal al cargar la página
    modal.style.display = 'block';

    // Selección de Santiago del Estero
    sgoButton.addEventListener('click', function () {
        console.log("Santiago del Estero seleccionado"); // Debugging
        modal.style.display = 'none';
        togglePrices('sgo');
        updateContactLinks('sgo');
        sendLocationToGoogleApps('Santiago del Estero');
        showMap('sgo');
        mostrarImagenes('sgo'); // Asegúrate de llamar a mostrarImagenes aquí
    });

    function togglePrices(location) {
        // Aquí puedes implementar la lógica para mostrar u ocultar precios
        console.log("Toggle precios para: " + location);
        // Implementa la lógica necesaria aquí
    }

    jujuyButton.addEventListener('click', function () {
        console.log("Jujuy seleccionado"); // Debugging
        modal.style.display = 'none';
        togglePrices('jujuy');
        updateContactLinks('jujuy');
        sendLocationToGoogleApps('Jujuy');
        showMap('jujuy');
        mostrarImagenes('jujuy'); // Asegúrate de llamar a mostrarImagenes aquí
    });


    // Función para mostrar el mapa correspondiente
    function showMap(location) {
        const mapaSgo = document.getElementById('mapaSgo');
        const mapaJujuy = document.getElementById('mapaJujuy');

        // Muestra el mapa correspondiente según la ubicación
        if (location === 'sgo') {
            mapaSgo.style.display = 'block';
            mapaJujuy.style.display = 'none';
        } else {
            mapaSgo.style.display = 'none';
            mapaJujuy.style.display = 'block';
        }
    }

    // Función para actualizar los enlaces de contacto
    function updateContactLinks(location) {
        const links = document.querySelectorAll('.contact-link');

        links.forEach(link => {
            const sgoUrl = link.getAttribute('data-sgo');
            const jujuyUrl = link.getAttribute('data-jujuy');

            // Cambia el href según la ubicación
            link.href = location === 'sgo' ? sgoUrl : jujuyUrl;
        });
    }

    // Función para enviar la ubicación al Google Apps Script
    function sendLocationToGoogleApps(location) {
        fetch("https://script.google.com/macros/s/AKfycbxWRKSjAR5MymL0OGeh0JZxTkUfJqxm19FDzfOPN_pInhVXf9pXQQACjpgGxE9E7GUyUw/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ location: location }) // Enviando la ubicación seleccionada
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error en la solicitud: " + response.statusText);
                }
                return response.json(); // Convertir la respuesta a JSON
            })
            .then(data => {
                console.log("Respuesta del servidor:", data); // Manejar la respuesta
            })
            .catch(error => {
                console.error("Error al enviar la ubicación:", error); // Manejar errores
            });
    }

    // Función para mostrar el mapa correspondiente
    function showMap(location) {
        const mapaSgo = document.getElementById('mapaSgo');
        const mapaJujuy = document.getElementById('mapaJujuy');
        const textoLocalizacion = document.querySelector('.texto-localizacion');

        // Muestra el mapa correspondiente según la ubicación
        if (location === 'sgo') {
            mapaSgo.style.display = 'block';
            mapaJujuy.style.display = 'none';
            textoLocalizacion.textContent = 'Santiago del Estero, Capital'; // Actualiza el texto
        } else {
            mapaSgo.style.display = 'none';
            mapaJujuy.style.display = 'block';
            textoLocalizacion.textContent = 'Palpalá, Jujuy'; // Actualiza el texto
        }
    }
});
