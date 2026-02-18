package temps

import (
	"html/template"
	"log"
)

var Templates *template.Template

func InitTemps() {
	pattern := "src/temps/*.html*"
	log.Println("Chargement des templates depuis:", pattern)

	tmpl, err := template.ParseGlob(pattern)
	if err != nil {
		log.Fatal("Erreur lors du chargement des templates:", err)
	}
	Templates = tmpl
}
