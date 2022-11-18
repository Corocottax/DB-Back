1.- Instalar cors -> Cross-Origin Resource Sharing -> tienen que estar de acuerdo las dos partes para compartir información.

2.- en el index.js requerimos las cors y las configuramos, también vale dejarlo vacío

3.- añadimos un campo imagen al modelo de los characters, con una imagen por defecto, de tipo string y required

4.- para desplegar en vercel nuestro backend, debemos pasarle el vercel.json para que interprete correctamente lo que le mandamos