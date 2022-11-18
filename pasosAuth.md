1.- instalar las librerías necesarias npm i bcrypt jsonwebtoken mongoose-unique-validator express-validator

2.- Crear la colección de usuarios (modelo) -> antes de guardar el modelo vamos a encriptar la contraseña

3.- Generar en el .env la clave con la que vamos a generar nuestro JWT -> JWT_SECRET=fklwertj32498Fsdf

4.- Crear dos funciones de jwt -> src/utils/jwt/jwt.js  -> generateSign - generar nuestro token, generateSign va a recibir dos parámetros, van a ser, el id del usuario, y un campo único, en este caso el email.
Con el id, el email y la clave secreta, podemos generar el token que es lo que retorna mi función generatesign
verifyJwt - verifica que nuestro token está hecho con la misma clave secreta que usamos nosotros para hacer los tokens (plantilla).

5.- Crear las rutas de los usuarios, su get... post... podemos hacer un crud.

6.- Crear una ruta con el método post que sea la de login, que necesita esta ruta -> un usuario (email) y una contraseña, de existir el usuario (email) lo cogerá de la bbdd y podremos acceder a todos sus campos.
Como la contraseña está encriptada, no podemos comparar si la contraseña que está introduciendo es igual a la contraseña que tiene registrada en la bbdd para eso utilizamos bcryp.compareSync(la contraseña que le manda el usuario en la peticion (req.body), la contraseña del usuario de la bbdd (userDB.password));
Si todo está correcto me generarás el token, eso lo hace nuestra función generateSign, la cual está en jwt, y requiere para funcionar de dos parámetros, el id del usuario, y el email del usuario;

7.- Vamos a crear un archivo auth.js en la carpeta middlewares, esta función va a ser un control de acceso, cuando yo a una ruta le indique que para ser ejecutada tenga que pasar por esta función (controlador), la función será la que decida si yo puedo pasar al contenido (me abre la puerta) o por el contrario decide no abrirme la puerta porque mi llave no sea correcta (no me abre la puerta)

8.- Privatizar una ruta, en cualquier ruta ya sea characters, movies, pokemons, yo voy a poder privatizar rutas ->  indicar a la ruta que para acceder a la funcionalidad de la misma debe pasar por el controlador (isAuth) que acabamos de crear