1.- instalar multer-storage-cloudinary / cloudinary / multer

2.- entrar en el dashboard de cloudinary y traerse las variables al .env

3.- requerimos cloudinary y configuramos el mismo con las variables de entorno

4.- Crear la carpeta middlewares y meter dentro el archivo file.js con la configuración del multer storage cloudinary

5.- en la ruta indicar que suba a cloudinary con upload.single y el campo al que tiene que subir, dentro de la función comprobará si viene un archivo o no y en caso de que venga un archivo se habrá subido a cloudinary y obtendremos la url de esa imagen para ponerla en el campo 

6.- crear la función deleteFile y en el controlador comprar si viene un archivo o no, en caso de que venga comprobaremos si el dato que estamos modificando (para ello lo buscamos por id en este caso) si ya tiene una imagen, en caso de ser así le pasamos la url de su antigua imagen a la función deleteFile