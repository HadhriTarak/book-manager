# book-manager
Exemple d’implémentation d'une architecture hexagonale avec nest en illustrant la gestion d'une bibliothèque (juste pour avoir un contexte)

## contenu
le repo contient deux sous-projets
-library: api qui permet la saisie et la lecture des ressources
-statistics: Service qui permet de faire des statistiques sur la bibliothèque

## Organisation des fichiers
```
.
├── application                      # code métier
    ├── domain                       # domaine métier
        ├── businessLogic            # logique métier
        ├── entities                 # les entités logiques du domaine
        ├── mocks                    # les mocks des ports qui permettent de tester le code métier
        ├── ports                    # les ports d'entrée et de sortie
    ...
├── src                              # code applicatif (implémentation de nest)
    ├── domain                       # implémentation par domaine
        ├── database                 # dossier regroupant tous ce qui ce rapporte à la base de donnée (ici mongodb)
            ├── mappers              # les mappers permettent de faire le mapping entre les entité logique du métier et les mongo documents
            ├── repositories         # les repositories qui communiquent avec la base de donnée
            ├── schemas              # les schémas de la base de données
        ├── http                     # regroupe les API exposé par le domaine
            ├── controllers          # Les controllers qui font appels au business code
            ├── modules              # les modules nests pour les controllers
        ├── jobs                     # les schedules
        ├── mocks                    # les mocks pour tester le code applicatif
        ├── mq                       # implémentation rabbit mq
    ├── app.module.ts                # module nestjs pour l'api
    ├── main.ts                      # entry point pour l'API
    ├── jobs.module.ts               # module nest pour les schedules
    ├── jobs.main.ts                 # entry point pour les schedules
    ├── utils                        # ensemble des utilitaires JS
    
```
