const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.googleAuthCallback = (req, res, next) => {
    passport.authenticate('google', async (err, user, info) => {
        if (err) {
            console.error('Error en la autenticación:', err);
            if (err.code === 11000) {
                // Maneja el error de clave duplicada
                return res.redirect('/?error=El email ya está en uso');
            }
            return next(err);
        }
        if (!user) {
            console.log('Autenticación fallida o cancelada:', info);
            return res.redirect('/');
        }

        // Iniciar sesión
        req.logIn(user, async (err) => {
            if (err) {
                console.error('Error al iniciar sesión:', err);
                return next(err);
            }
            console.log(user);
            
            // Crear un token JWT para el usuario autenticado
            const token = jwt.sign(
                { userName: user.nick },  // o el campo que prefieras usar
                process.env.KEY_SECRET,
                { expiresIn: process.env.VITE_EXPRESS_EXPIRE }
            );
            

            // Guardar el token en la sesión
            req.session.token = `Bearer ${token}`;
            console.log('Token generado:', token);

            // Redirigir al usuario a la página deseada
            return res.redirect('http://localhost:3000/products'); 
        });
    })(req, res, next);
};
