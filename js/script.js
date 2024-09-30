document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de manera tradicional

    // Obtiene los valores de usuario y contraseña
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Muestra un mensaje de carga mientras se hace la solicitud
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = 'Iniciando sesión...';

    // Realiza la solicitud a la API de autenticación de Fake Store
    fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(json => {
        if (json.token) {
            // Si la respuesta contiene un token, el inicio de sesión fue exitoso
            messageDiv.textContent = 'Login exitoso!';

            // Redirige a la página de productos después de un corto retraso
            setTimeout(() => {
                window.location.href = 'productos.html';
            }, 1000); // Espera 1 segundo antes de redirigir
        } else {
            // Si no hay token, muestra un mensaje de error
            messageDiv.textContent = 'Error en el login: ' + (json.message || 'Credenciales incorrectas');
        }
    })
    .catch(error => {
        // Muestra un mensaje si hay un error en la conexión
        messageDiv.textContent = 'Error en la conexión: ' + error.message;
    });
});
