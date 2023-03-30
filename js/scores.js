// Récupération des données du tableau des scores depuis le stockage local
const data = JSON.parse(localStorage.getItem("tab_scores"));
const taille = data.length
let couleur = ""
let status = ""

// Ajout des données du stockage local dans le tableau de données
for(var j = 0; j < localStorage.getItem("tab_scores").length; j++) {
    data.push(localStorage.getItem("tab_scores")[j])
}

// Sélection de l'élément HTML correspondant au tableau des scores
const tableau = document.getElementById('tableau')

// Vérification s'il y a des données dans le tableau des scores
if(taille.length === 0) {
    // Si le tableau des scores est vide, affichage d'un message indiquant qu'aucune partie n'a été jouée
    tableau.insertAdjacentHTML('beforeend', <tr><td>Aucune partie joué</td><td>Aucune partie joué</td><td>Aucune partie joué</td></tr>)
} else {
    // Si le tableau des scores contient des données, ajout des données dans le tableau HTML correspondant
    for (var i = 0; i < taille; i++) {
        // Détermination de la couleur du texte en fonction du statut de la partie
        if(data[i].status === 'Gagné') {
            couleur = '#26cc26';
        } else {
            couleur = 'red'
        }
        // Détermination du statut de la partie (gagné ou perdu)
        if(data[i].r === true) {
            status = "Gagner"
        } else {
            status = "Perdu"
        }
        // Ajout des données dans le tableau HTML correspondant
        tableau.insertAdjacentHTML('beforeend', <tr><td>${data[i].pseudo}</td><td>${data[i].dificulte}</td><td>${data[i].nbrEssai}</td> <td style="background-color:${couleur}; color:#FFFFFF">${data[i].status}</td></tr>)
    }
}