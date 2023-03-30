const conbinaison = [] // tableau vide pour stocker les couleurs aléatoires à deviner
const conbinaison_user = [] // tableau vide pour stocker les couleurs choisies par l'utilisateur
const round_couleurs = document.getElementsByClassName("color"); // récupère les éléments HTML avec la classe "color"
let color = "" // variable pour stocker la couleur aléatoire générée
var i = 0 // compteur pour remplir le tableau de combinaison aléatoire
var pseudo = localStorage.getItem("pseudo") // récupère le pseudo stocké dans le local storage
let scores = JSON.parse(localStorage.getItem("tab_scores")) || [] // récupère le tableau de scores stocké dans le local storage, s'il n'existe pas alors initialiser un tableau vide

while(i < 4) { // boucle pour générer une combinaison aléatoire de 4 couleurs différentes
    color = getRandomInt(4) // génère un nombre aléatoire entre 1 et 4 pour obtenir une couleur aléatoire
    if(conbinaison.includes(color)) { // vérifie si la couleur générée est déjà dans le tableau de combinaison aléatoire
        i-- // si la couleur existe déjà, décrémente le compteur pour éviter de remplir le tableau avec une couleur dupliquée
        conbinaison.pop() // supprime la dernière couleur ajoutée au tableau
    } else {
        conbinaison.push(color) // ajoute la couleur générée au tableau de combinaison aléatoire
        i++ // incrémente le compteur pour passer à la couleur suivante
    }
}
let nbJeu = false // booléen pour déterminer si l'utilisateur a choisi 4 couleurs pour tester la réponse
let nbchoice = 0 // compteur pour enregistrer le nombre de choix de l'utilisateur
let dificulte = localStorage.getItem('dificulte') // récupère la difficulté stockée dans le local storage

// appelle la fonction pour créer un tableau de jeu selon la difficulté choisie
tab(dificulte)

// fonction pour générer un nombre aléatoire entre 1 et max pour obtenir une couleur aléatoire
function getRandomInt(max) {
    var color = Math.floor(Math.random() * max) + 1;
    //4 couleur possible : bleu, jaune, rouge et vert
    switch(color) { // convertit le nombre en une couleur
        case 1 :
            color = "blue"
            break
        case 2 :
            color = "red"
            break
        case 3 :
            color = "yellow"
            break
        case 4 :
            color = "green"
            break
        default :
            color = "blue"
            break
    }
    return color // renvoie la couleur aléatoire générée
}

// fonction pour enregistrer les choix de l'utilisateur dans le tableau et vérifier si l'utilisateur a choisi 4 couleurs pour tester la réponse
function userInput(colorInput) {
    test = nbchoice%4 // vérifie si l'utilisateur a choisi 4 couleurs
    if(test == 3) {nbJeu = true} // si l'utilisateur a choisi 4 couleurs, met le booléen à true pour tester la réponse
    round_couleurs[nbchoice].style.backgroundColor = colorInput // change la couleur de l'élément HTML correspondant au choix de l'utilisateur

    conbinaison_user.push(colorInput) // ajoute la couleur choisie par l'utilisateur au tableau de combinaisons de l'utilisateur
    nbchoice++ // incrémente le compteur de choix de l'utilisateur
    if(nbJeu == true) { // si l'utilisateur a choisi 4 couleurs
        test_reponse() // appelle la fonction pour tester la réponse
        nbJeu = false // remet le booléen à false pour préparer la prochaine partie
    }
}

// fonction pour tester la réponse de l'utilisateur
function test_reponse() {
    let good = 0 // compteur pour les couleurs correctement placées
    let wrong = 0 // compteur pour les couleurs incorrectement placées
    var nb_essai = nbchoice / 4 // calcule le nombre d'essais de l'utilisateur
    console.log(conbinaison) // affiche la combinaison choisie
    //console.log(conbinaison_user) // décommenter pour afficher la combinaison choisie par l'utilisateur
    for(var i = 0; i < 4; i++) { // boucle pour comparer les couleurs choisies par l'utilisateur et la combinaison à trouver
        if(conbinaison[i] == conbinaison_user[i]) { // si la couleur est correctement placée
            good++ // incrémente le compteur pour les couleurs correctement placées
        } else { // sinon
            wrong++ // incrémente le compteur pour les couleurs incorrectement placées
        }
    }
    conbinaison_user.splice(conbinaison) // vide le tableau des combinaisons de l'utilisateur pour préparer la prochaine partie
    const good_result = document.getElementById("bonne-reponse"); // récupère l'élément HTML pour afficher le nombre de bonnes réponses
    const wrong_result = document.getElementById("mauvaise-reponse"); // récupère l'élément HTML pour afficher le nombre de mauvaises réponses
    good_result.innerText = ("Tu as " + good + " de bonne réponse") // affiche le nombre de bonnes réponses
    wrong_result.innerText = ("Tu as " + wrong + " de mauvaise réponse") // affiche le nombre de mauvaises réponses

    // Vérifie si l'utilisateur a trouvé la combinaison secrète (4 couleurs identiques dans le bon ordre)
    if(good == 4) {
        let r = true
        scores.push({pseudo: pseudo, nbrEssai: nb_essai, dificulte: dificulte, status: r}) // Enregistre le score du joueur avec les informations nécessaires
        localStorage.setItem('tab_scores', JSON.stringify(scores)) // Stocke le score dans le navigateur du joueur
        alert("Tu as gagné !!!" + conbinaison) // Affiche une alerte indiquant que le joueur a gagné
        location.reload() // Recharge la page pour recommencer une partie
    }
    // Vérifie si l'utilisateur n'a pas réussi à trouver la combinaison secrète dans le nombre d'essais autorisés
    if(nbchoice == round_couleurs.length) {
        let r = false
        scores.push({pseudo: pseudo, nbrEssai: nb_essai, dificulte: dificulte, status: r}) // Enregistre le score du joueur avec les informations nécessaires
        localStorage.setItem('tab_scores', JSON.stringify(scores)) // Stocke le score dans le navigateur du joueur
        alert("Tu as perdu !!!" + conbinaison) // Affiche une alerte indiquant que le joueur a perdu
        location.reload() // Recharge la page pour recommencer une partie
    }
}

// Fonction qui redirige vers la page d'accueil
function retourF() {
    window.location.href = "index"
}
    
    // Fonction qui crée un tableau de lignes et de couleurs selon le niveau de difficulté choisi
function tab(dif) {
    let nbLigne = 0
    let ifuse = false
    const tab = document.getElementById("tab")
    // Switch pour déterminer le nombre de lignes en fonction du niveau de difficulté choisi
    switch(dif) {
        case "facile" :
            nbLigne = 10
            break
        case "intermediare" :
            nbLigne = 7
            break
        case "dificile" :
            nbLigne = 5
            break
        default :
            nbLigne = 10
            break
    }

    ifuse = true

    // Boucle pour créer les lignes et les couleurs
    for(var i = 0; i < nbLigne; i++) {
        if(ifuse == true) {
            // Création d'une ligne avec 4 couleurs identiques
            tab.innerHTML = '<div class="ligne"><div class="color"></div><div class="color"></div><div class="color"></div><div class="color"></div></div>'
            ifuse = false
        } else {
            // Ajout d'une ligne avec 4 couleurs identiques à la fin du tableau
            tab.insertAdjacentHTML('beforeend', '<div class="ligne"><div class="color"></div><div class="color"></div><div class="color"></div><div class="color"></div></div>')
        }
    } 
}