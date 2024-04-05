const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/users'); // Importa el modelo de usuario desde la ruta especificada y lo asigna a la variable User.

module.exports = function (passport) {
    // Serializa al usuario en una sesión.
    passport.serializeUser(function(user, done){ 
        done(null, user.id);
    });

    // Deserializa al usuario de la sesión.
    passport.deserializeUser(function(id, done){
        User.findById(id) 
            .then(user => {
                done(null, user); 
            })
            .catch(err => {
                done(err, null);
            });
    });
    
    // Configura una estrategia de autenticación local para el registro de usuarios.
    passport.use('local-signup', new LocalStrategy({ // Define una estrategia de autenticación local para el registro de usuarios.
        usernameField: 'email', // Define el campo utilizado para el nombre de usuario como 'email'.
        passwordField: 'password', // Define el campo utilizado para la contraseña como 'password'.
        passReqToCallback: true // Permite pasar el objeto de solicitud a la función de devolución de llamada.
    },
    async function(req, email, password, done){ // Define la función de devolución de llamada para el registro de usuarios.
        try {
            const user = await User.findOne({'local.email': email}); // Busca un usuario en la base de datos por su dirección de correo electrónico.
            if (user) { // Si se encuentra un usuario con el correo electrónico proporcionado, se ejecuta esta condición.
                return done(null, false, req.flash('signupMessage', 'El correo ya ha sido usado.')); // Llama a la función de devolución de llamada con un mensaje de error.
                console.log('El correo ya existe');
            } else { // Si no se encuentra ningún usuario con el correo electrónico proporcionado, se ejecuta esta condición.
                var newUser = new User(); // Crea un nuevo objeto de usuario.
                newUser.local.email = email; // Asigna el correo electrónico proporcionado al campo 'email' del usuario.
                newUser.local.password = newUser.generateHash(password); // Genera un hash para la contraseña proporcionada y la asigna al campo 'password' del usuario.
                await newUser.save(); // Guarda el nuevo usuario en la base de datos.
                return done(null, newUser); // Llama a la función de devolución de llamada con el nuevo usuario.
            }
        } catch (err) { // Si ocurre un error durante el proceso, se ejecuta esta condición.
            return done(err); // Llama a la función de devolución de llamada con el error.
        }
    }));

    // Configura una estrategia de autenticación local para el inicio de sesión de usuarios.
    passport.use('local-login', new LocalStrategy({ // Define una estrategia de autenticación local para el inicio de sesión de usuarios.
        usernameField: 'email', // Define el campo utilizado para el nombre de usuario como 'email'.
        passwordField: 'password', // Define el campo utilizado para la contraseña como 'password'.
        passReqToCallback: true // Permite pasar el objeto de solicitud a la función de devolución de llamada.
    },
    async function(req, email, password, done){ // Define la función de devolución de llamada para el inicio de sesión de usuarios.
        try {
            const user = await User.findOne({'local.email': email}); // Busca un usuario en la base de datos por su dirección de correo electrónico.
            if (!user) { // Si no se encuentra ningún usuario con el correo electrónico proporcionado, se ejecuta esta condición.
                return done(null, false, req.flash('loginMessage', 'El correo no se ha encontrado.')); // Llama a la función de devolución de llamada con un mensaje de error.
            }
            if (!user.validatePassword(password)) { // Si la contraseña proporcionada no coincide con la contraseña almacenada en la base de datos, se ejecuta esta condición.
                return done(null, false, req.flash('loginMessage', 'La contraseña es incorrecta.')); // Llama a la función de devolución de llamada con un mensaje de error.
            }
            return done(null, user); // Si el inicio de sesión es exitoso, llama a la función de devolución de llamada con el usuario.
        } catch (err) { // Si ocurre un error durante el proceso, se ejecuta esta condición.
            return done(err); // Llama a la función de devolución de llamada con el error.
        }
    }));
};
