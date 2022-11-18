const { mongoose } = require("mongoose");
const Character = require('../../api/characters/characters.model');

const characters = [
  {
    name: "Goku",
    race: "saiyan",
    img: "https://media.revistagq.com/photos/5f45010acb266484bb785c78/master/pass/dragon-ball-z.jpg",
    universe: 7,
    transform: true,
    genre: "male",
  },
  {
    name: "Piccolo",
    race: "namekian",
    img: "https://cloudfront-us-east-1.images.arcpublishing.com/metroworldnews/MMI362E4LJALVD5M6DOF4TVUZU.jpg",
    universe: 7,
    transform: true,
    genre: "namekian",
  },
  {
    name: "Cabba",
    race: "saiyan",
    img: "https://gcdn.lanetaneta.com/wp-content/uploads/2019/01/39Dragon-Ball-Heroes39-finalmente-re%C3%BAne-a-Cabba-Vegeta.jpeg",
    universe: 6,
    transform: true,
    genre: "male",
  },
  {
    name: "Kale",
    race: "saiyan",
    img: "https://i.pinimg.com/originals/35/24/ac/3524ac391e6c4711daf35c00021617a6.jpg",
    universe: 6,
    transform: true,
    genre: "female",
  },
  {
    name: "A18",
    race: "android",
    img: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2020/09/dragon-ball-z-18-2077799.jpg?itok=601CcwMm",
    universe: 7,
    transform: false,
    genre: "female",
  },
  {
    name: "Krillin",
    race: "human",
    img: "https://cdn.alfabetajuega.com/alfabetajuega/2022/02/dragon-ball-krillin-padres.jpg",
    universe: 7,
    transform: false,
    genre: "male",
  },
  {
    name: "Jiren",
    race: "unknown",
    img: "https://media.vandal.net/i/1200x630/1-2019/20191161049583_1.jpg",
    universe: 11,
    transform: false,
    genre: "male",
  },
  {
    name: "Zen-oh",
    race: "unknown",
    img: "https://images4.alphacoders.com/855/855914.png",
    universe: 0,
    transform: false,
    genre: "genderless",
  },
];

/**
 * 1. Conectaremos con la db
 * 2. Haremos una búsqueda para ver si tenemos personajes
 *     2.1 si NO tenemos personajes -> continuamos al siguiente paso
 *     2.2 si SI tenemos personajes -> Borramos la colección (drop)
 * 3. Escribir los personajes del array characters
 * 4. Informaremos que hemos escrito los personajes
 * 5. Desconectaremos de la base de datos.
 */

mongoose.connect("mongodb+srv://root:root@cluster0.ijor32s.mongodb.net/JuanProyect?retryWrites=true&w=majority")
  .then(async () => {
    const allCharacters = await Character.find().lean();
    
    if(!allCharacters.length) {
      console.log('[seed]: No se encuentran personajes, continuo...')
    } else {
      console.log(`[seed]: Encontrados ${allCharacters.length} personajes.`);
      await Character.collection.drop();
      console.log('[seed]: Colección Characters eliminada correctamente');
    }
  })
  .catch((error) => console.log('[seed]: Error eliminando la colección -->', error))
  .then(async() => {
    await Character.insertMany(characters);
    console.log('[seed]: Nuevos personajes añadidos con éxito');
  })
  .catch((error) => console.log('[seed]: Error añadiendo los personajes', error))
  .finally(() => mongoose.disconnect());