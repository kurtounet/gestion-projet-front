import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface DropdownItem {
  imageSrc?: string;
  iconName?: string;
  alt: string;
  title: string;
  description: string;
  tag?: string;
  disabled?: boolean;
}

export interface DropdownGroup {
  title: string;
  items: DropdownItem[];
}

@Component({
  selector: 'app-view-add-dropdown',
  imports: [CommonModule],
  templateUrl: './view-add-dropdown.component.html',
  styleUrl: './view-add-dropdown.component.scss'
})
export class ViewAddDropdownComponent {
  @Input() groupsInput: DropdownGroup[] = [];
  groups = [
    {
      "title": "Populaire",
      "items": [
        {
          "imageSrc": "alien-svgrepo-com",
          "alt": "Liste",
          "title": "Liste",
          "description": "Suivez les tâches, les bugs, les personnes et plus encore",
          "disabled": false
        },
        {
          "imageSrc": "./media/30-W2QHOZTI.png",
          "alt": "Gantt",
          "title": "Gantt",
          "description": "Planifiez les dépendances et délais",
          "disabled": false
        },
        {
          "imageSrc": "./media/31-2OPHM4J6.png",
          "alt": "Calendrier",
          "title": "Calendrier",
          "description": "Planifiez, gérez et déléguez",
          "disabled": false
        },
        {
          "imageSrc": "./media/doc-UEJ5UPWZ.svg",
          "alt": "Document",
          "title": "Document",
          "description": "Collaborez et documentez tout ce que vous voulez",
          "disabled": false
        },
        {
          "imageSrc": "./media/32-WJ3QNKT6.png",
          "alt": "Tableau",
          "title": "Tableau – Kanban",
          "description": "Déplacez les tâches entre les colonnes",
          "disabled": false
        },
        {
          "imageSrc": "./media/form-H7E3J3FV.svg",
          "alt": "Formulaire",
          "title": "Formulaire",
          "description": "Collectez, suivez et rapportez des données",
          "tag": "Nouveau",
          "disabled": true
        }
      ]
    },
    {
      "title": "Plus de vues",
      "items": [
        {
          "imageSrc": "./media/33-BRGFW6ML.png",
          "alt": "Tableur",
          "title": "Tableur",
          "description": "Format de tableau structuré",
          "disabled": false
        },
        {
          "imageSrc": "./media/34-E7OQ523L.png",
          "alt": "Échéancier",
          "title": "Échéancier",
          "description": "Visualisez les tâches par date de début et date d’échéance",
          "disabled": false
        },
        {
          "imageSrc": "./media/35-66AP3VJN.png",
          "alt": "Activité",
          "title": "Activité",
          "description": "Fil d’activité en temps réel",
          "disabled": false
        },
        {
          "imageSrc": "./media/36-DLXCIMDE.png",
          "alt": "Charge de travail",
          "title": "Charge de travail",
          "description": "Visualisez la capacité de l’équipe",
          "disabled": false
        },
        {
          "imageSrc": "./media/whiteboard-4I2EFNR4.svg",
          "alt": "Whiteboard",
          "title": "Whiteboard",
          "description": "Visualisez et réfléchissez à des idées",
          "tag": "Nouveau",
          "disabled": false
        },
        {
          "imageSrc": "./media/37-ZNER635U.png",
          "alt": "Équipe",
          "title": "Équipe",
          "description": "Surveillez le travail en cours",
          "disabled": false
        },
        {
          "imageSrc": "./media/38-M4ZHVD72.png",
          "alt": "Carte mentale",
          "title": "Carte mentale",
          "description": "Visualisation d’idées",
          "disabled": false
        },
        {
          "imageSrc": "./media/40-NJOC4WQ5.png",
          "alt": "Discussion",
          "title": "Discussion",
          "description": "Communiquer avec votre équipe",
          "disabled": false
        },
        {
          "imageSrc": "./media/39-XDZLXKAB.png",
          "alt": "Plan",
          "title": "Plan",
          "description": "Tâches visualisées par adresse",
          "disabled": false
        }
      ]
    },
    {
      "title": "Intégrations",
      "items": [
        {
          "iconName": "cfWebsite",
          "alt": "N’importe quel site Web",
          "title": "N’importe quel site Web",
          "description": "Intégrez n’importe quel contenu Web",
          "disabled": false
        },
        {
          "iconName": "googleSheetsColored",
          "alt": "Google Sheets",
          "title": "Google Sheets",
          "description": "Synchronisez vos feuilles de calcul",
          "disabled": false
        },
        {
          "iconName": "googleDocsColored",
          "alt": "Google Docs",
          "title": "Google Docs",
          "description": "Synchronisez vos documents",
          "disabled": false
        },
        {
          "iconName": "googleCalendar",
          "alt": "Google Agenda",
          "title": "Google Agenda",
          "description": "Synchronisez les évènements de Google Agenda",
          "disabled": false
        },
        {
          "iconName": "googleMaps",
          "alt": "Google Maps",
          "title": "Google Maps",
          "description": "Repérez-vous",
          "disabled": false
        },
        {
          "iconName": "youtubeColored",
          "alt": "YouTube",
          "title": "YouTube",
          "description": "Partagez vos vidéos favorites",
          "disabled": false
        },
        {
          "iconName": "figma",
          "alt": "Figma",
          "title": "Figma",
          "description": "Affichez vos superbes créations",
          "disabled": false
        }
      ]
    }
  ];


}
