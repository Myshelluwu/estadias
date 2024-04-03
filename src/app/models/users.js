const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// Define el esquema del usuario
const userSchema = new mongoose.Schema({
    // Define un objeto local en el esquema que contiene el email y la contraseña
    local:{
        email: String,
        password: String,
    }
});

// Método para cifrar la contraseña antes de guardarla en la base de datos
userSchema.methods.generateHash=function(password){
    // Utiliza bcrypt para generar un hash sincrónico de la contraseña con una sal generada dinámicamente
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Método para validar la contraseña ingresada comparándola con la contraseña almacenada
userSchema.methods.validatePassword= function(password) {
    // Utiliza bcrypt para comparar la contraseña ingresada con la contraseña almacenada en el esquema
    return bcrypt.compareSync(password, this.local.password);
}

// Exporta el modelo de usuario con el esquema definido
module.exports = mongoose.model('User', userSchema);
