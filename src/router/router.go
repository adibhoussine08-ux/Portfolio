package router

import (
	"log"
	"net/http"
	"os"
	"portfolio/src/controller"
)

func InitServ() {
	// Fichiers statiques
	fs := http.FileServer(http.Dir("../static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	// Routes
	http.HandleFunc("/", controller.HomeHandler)
	http.HandleFunc("/contact", controller.ContactHandler)
	http.HandleFunc("/todo", controller.TodoHandler)

	// Démarrage
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Println("Serveur écoute sur :" + port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal("Erreur au démarrage du serveur:", err)
	}
}
