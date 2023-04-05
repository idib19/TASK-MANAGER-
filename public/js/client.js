let textInput = document.getElementById('texbox-tache');
let formulaire = document.getElementById('form-tache');
let cases = document.querySelectorAll('#liste-taches input');


const ajouterTache = async () => {

    let donnee = {
        texte: textInput.value
    }

    await fetch('api/tache', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donnee)
    });
    console.log('requette envoye');
}

const cocherTache = async (event) => {
    let donnee = {
        id: event.currentTarget.dataset.id
    }

    event.currentTarget.checked = !event.currentTarget.checked

     let response = await fetch ('/api/tache', {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(donnee)
    });

    if (response.ok) {
        let data = await response.json();
        console.log(data);
        let lescases = document.querySelector(`input[data-id ="${data.id}"]`);
        lescases.checked = !lescases.checked;
    }
}

if (formulaire) {
    formulaire.addEventListener('submit', ajouterTache)
}

for (let pour_chaque_case of cases){
    pour_chaque_case.addEventListener('change', cocherTache);
}