import {existsSync} from 'fs';
import  sqlite3  from "sqlite3";
import { open } from "sqlite";

// Verifications de l'existence de la bd
const FILE_EXISTS =!existsSync(process.env.DB_FILE);

const createDatabase = async (promessConnexion) => {
    let connexion = await promessConnexion;

    await connexion.exec (
        
        `CREATE TABLE IF NOT EXISTS tache (
            id_tache INTEGER PRIMARY KEY,
            texte TEXT NOT NULL,
            est_coche INTEGER NOT NULL
            );

            INSERT INTO tache (texte, est_coche) VALUES
            ('Fait tes devois ce soir', '0'),
            ('Preparer a manger', '0'),
            ('Dormir pendant 6h', '0'),
            ('Recommencer le processus', '0');`
        )
    return connexion;
}

let promessConnexion = open({
    filename : process.env.DB_FILE,
    driver: sqlite3.Database
});

if (FILE_EXISTS){
    promessConnexion = createDatabase (promessConnexion);
}

export {promessConnexion}