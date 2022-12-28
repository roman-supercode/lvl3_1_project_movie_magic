// Importiere die 'express'-Bibliothek
import express from 'express';
// Importiere die 'axios'-Bibliothek
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Setze den Port auf 9999
const PORT = 9999;
// Erstelle eine neue express-Applikation
const app = express();

// Aktiviere EJS als View Engine
app.set('view engine', 'ejs');
// Verwende das 'public'-Verzeichnis als statischen Ordner
app.use(express.static("./public"));

// Middleware, um jeden Request auf der Konsole auszugeben
app.use((req, _, next) => {
    console.log('Ein neuer Request:', req.method, req.url);
    next();
});

// Route für GET-Requests auf '/'
app.get("/", (_, res) => {
    // Führe einen GET-Request mit Axios auf die angegebene URL aus
    axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}`)
        .then(response => {
            // console.log(response.data);

            // Render die 'home'-Seite und übergebe die Antwortdaten an das Template
            res.render('home', { movieData: response.data.results });
        });
});

// Starte den Server und gib eine Meldung aus, auf welchem Port der Server läuft
app.listen(PORT, () => console.log('Ich lausche auf Port', PORT));
