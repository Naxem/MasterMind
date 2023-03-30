// Définition de la fonction "userDif" avec un paramètre "dif" (dif = difficulté)
function userDif(dif) {
    // Stockage de la difficulté dans le stockage local du navigateur
    localStorage.setItem('dificulte', dif);
  
    // Récupération du pseudo de l'utilisateur à partir d'un champ de saisie
    var pseudo = document.getElementById("pseudoInput").value;
    // Stockage du pseudo dans le stockage local du navigateur
    localStorage.setItem('pseudo', pseudo);
  
    // Redirection de l'utilisateur vers la page de jeu
    window.location.href = "jeu";
  }  