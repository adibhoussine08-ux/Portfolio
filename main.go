package main

import (
	"log"
	"portfolio/src/router"
	"portfolio/src/temps"

	"github.com/joho/godotenv"
)

func main() {
	// Chargement des variables d’environnement
	if err := godotenv.Load(); err != nil {
		log.Println("Fichier .env non trouvé ou erreur de chargement (optionnel)")
	}

	// Initialisation des templates
	temps.InitTemps()

	// Lancement du serveur
	router.InitServ()
}
