import { promessConnexion } from "./connexion.js";


export const recupererTaches_bd = async () =>{

    let connexion = await promessConnexion;

    let resultat = await connexion.all('SELECT * FROM tache');

    return resultat;
}

export const ajouterTache_bd = async (texte) =>{

    let connexion = await promessConnexion;
    
     await connexion.run('INSERT INTO tache (texte, est_coche) VALUES(?,0)',
    [texte]);
    
};


export const terminerTache_bd = async (idtache) => {

    let connexion = await promessConnexion;

    await connexion.run(`UPDATE tache
    SET est_coche = NOT est_coche
    WHERE id_tache = (?)`, [idtache]);

}