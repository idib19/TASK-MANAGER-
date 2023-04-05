import 'dotenv/config'
// Importation du module express 
import express, { json } from "express";

// Importation du moteur handlebar
import { engine } from 'express-handlebars';
import { recupererTaches_bd, ajouterTache_bd,terminerTache_bd } from './src/fonctionsource.js';

// Creation de notre application express
const app = express();


app.engine('handlebars', engine()); // installation du moteur handlebar sur notre serveur

app.set('view engine', 'handlebars'); // defnir le moteur de vue de l'app sur handlebars

app.set('views', './views'); //  configuration du repertoire a utiliser pour obtenir les templates handlebars




// AJOUT DES MIDLEWARES
app.use(json());


//Indication du dossier public
app.use(express.static('public'));

// ROUTAGE
app.get('/', async (request, response) => {

    response.render('taches', {
        titre: 'VOS TACHES',
        styles: ['/css/tache.css'],
        scripts: ['/js/client.js'],
        taches: await recupererTaches_bd()
    });
});

app.get('/apropos', async (request, response) => {

    response.render('apropos', {
        titre: 'A PROPOS'
    });
});

app.post('/api/tache', async (request, response) => {
    console.log(request.body.texte)
    await ajouterTache_bd(request.body.texte);
    response.status(201).end();
})

app.patch('/api/tache', async (request, response) =>{
    console.log('requette recu')
    await terminerTache_bd(request.body.id);
console.log(request.body.id)
    response.status(200).json({
        id: request.body.id
    });
})

// Demarrage du serveur et mise a l'ecoute de requettes
if (process.env.NODE_ENV === 'development') {
    app.listen(process.env.PORT);

    console.log(
        "application de tache a l'ecoute a http://localhost:" + process.env.PORT);
}



