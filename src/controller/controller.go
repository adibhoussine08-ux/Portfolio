package controller

import (
	"log"
	"net/http"
	"portfolio/src/temps"
)

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	err := temps.Templates.ExecuteTemplate(w, "Index.html", nil)
	if err != nil {
		log.Println("Erreur lors du rendu du template:", err)
		http.Error(w, "Erreur interne du serveur", http.StatusInternalServerError)
	}
}

func ContactHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		r.ParseForm()
		name := r.FormValue("name")
		email := r.FormValue("email")
		message := r.FormValue("message")

		// Traitement du message (ex: log, envoi mail, stockage…)
		log.Printf("Message reçu de %s (%s): %s", name, email, message)

		http.Redirect(w, r, "/", http.StatusSeeOther)
		return
	}

	http.Error(w, "Méthode non autorisée", http.StatusMethodNotAllowed)
}

func TodoHandler(w http.ResponseWriter, r *http.Request) {



	_ = temps.Templates.ExecuteTemplate(w, "todo.html", nil)
}
