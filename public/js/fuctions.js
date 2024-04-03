function togglePasswordVisibility() {
    var passwordField = document.getElementById("contrasena");
    var toggleButton = document.getElementById("togglePassword");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleButton.textContent = "Ocultar";
    } else {
        passwordField.type = "password";
        toggleButton.textContent = "Mostrar";
    }
}

function togglePasswordVisibility2() {
    var passwordField = document.getElementById("contrasena2");
    var toggleButton = document.getElementById("togglePassword2");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleButton.textContent = "Ocultar";
    } else {
        passwordField.type = "password";
        toggleButton.textContent = "Mostrar";
    }
}

function checkboxChanged(checkboxNumber) {
    var checkbox = document.getElementById('checkbox' + checkboxNumber);
    var infoDiv = document.getElementById('info' + checkboxNumber);

    var otherCheckboxNumber = checkboxNumber === 1 ? 2 : 1;
    var otherCheckbox = document.getElementById('checkbox' + otherCheckboxNumber);

    otherCheckbox.disabled = checkbox.checked;

    if (checkbox.checked) {
        infoDiv.style.display = 'block';
    } else {
        infoDiv.style.display = 'none';
    }
}

function actualizarValor() {
    var select = document.getElementById("carrera");
}