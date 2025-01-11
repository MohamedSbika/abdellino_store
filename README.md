
# Abdellino Store
![Capture d’écran 2025-01-10 022225](https://imgur.com/oSg3cje.png)

Abdellino Store est une plateforme e-commerce conçue pour démontrer une architecture moderne d'application, intégrant des technologies comme Docker, Kubernetes, Helm, Jenkins, Prometheus, et Grafana. Voici un guide étape par étape pour reproduire et comprendre notre processus.

### Prérequis
Pour travailler sur ce projet, assurez-vous d'avoir les outils suivants installés et configurés sur votre environnement :

- Docker
![Docker](https://tse1.mm.bing.net/th?id=OIP.dEgEQ0JBlwn323Q_i0spsgHaEK&pid=Api)

- Kubernetes
![Kubernetes](https://tse3.mm.bing.net/th?id=OIP.hX5n31GbzMronzp_9-CgzwHaHa&pid=Api)

- Helm
![Helm](https://tse4.mm.bing.net/th?id=OIP.jv3kTIyZxjXOR35mx-NorAHaIj&pid=Api)

- Jenkins
![Jenkins](https://tse4.mm.bing.net/th?id=OIP.PvfKNJXuMOdxBiNgin7wcAHaMD&pid=Api)

- ArgoCD
![ArgoCD](https://tse3.mm.bing.net/th?id=OIP.sc5TJ5rrvZEi7JJRZQI1KAHaE6&pid=Api)

- Prometheus
![Prometheus](https://tse4.mm.bing.net/th?id=OIP.Zzt2SPEVP1TILogoUGHVPQHaHV&pid=Api)

- Grafana
![Grafana](https://tse2.mm.bing.net/th?id=OIP.OG5X_ai5E1RTaqtxy_6mKAHaHj&pid=Api)

- Kubectl
![Kubectl](https://tse4.mm.bing.net/th?id=OIP.dVVaxPgiFvqSYW3w3k3mvwHaGu&pid=Api)

- Git
![Git](https://tse2.mm.bing.net/th?id=OIP.eFqZR5lmTVBWC5S_QqVm6QHaHa&pid=Api)


Étapes de réalisation

### 1. Création des Dockerfiles

- Backend (API) : Créez un fichier Dockerfile dans le dossier api.

- Frontend (Client) : Créez un fichier Dockerfile dans le dossier client.

- Chaque fichier contient les instructions nécessaires pour conteneuriser leurs composants respectifs.

### 2. Configuration avec Docker Compose
![Capture d’écran 2025-01-10 022225](https://imgur.com/EwHYFDa.png)

- Créez un fichier docker-compose.yml à la racine du projet pour orchestrer les conteneurs backend et frontend.

- Vérifiez que les services communiquent correctement.

### 3. Mise en place du CI avec Jenkins
![Capture d’écran 2025-01-10 022225](https://imgur.com/fNCrSiO.png)

- Pipeline CI

- Créez un fichier Jenkinsfile contenant les étapes suivantes :

- Start : Initialisation de la pipeline.

- Checkout SCM : Récupération du code source depuis le dépôt.

- Build Server Image : Construction de l'image Docker pour l'API.

- Build Client Image : Construction de l'image Docker pour le frontend.

- Test Docker Hub Connectivity : Vérification de la connexion au Docker Hub.

- Push Images to Docker Hub : Publication des images sur Docker Hub.

- End : Fin de la pipeline.

### 4. Mise en place du CD avec Kubernetes
![Capture d’écran 2025-01-10 022225](https://i.imgur.com/2OAmwC7.png)
- Manifests simples

- Créez les fichiers suivants dans le dossier kubernetes :

- api-deployment.yaml : Déploiement de l'API.

- api-service.yaml : Service exposant l'API avec un NodePort.

- Déploiement local

- Appliquez les manifests dans le cluster local :

```
 kubectl apply -f kubernetes/
```
- Vérifiez que le service est accessible via l'adresse du NodePort.

- Déploiement avec Helm et ArgoCD
![Capture d’écran 2025-01-10 022225](https://imgur.com/2hkgad3.png)

- Créez des Helm charts pour chaque composant dans le dossier helm-charts.

- Configurez ArgoCD pour suivre ces charts et gérer les déploiements.

- Vérifiez que les applications sont Healthy et Sync dans l'interface ArgoCD.

### 5. Monitoring avec Prometheus et Grafana
![Capture d’écran 2025-01-10 022225](https://imgur.com/IGFYvFx.png)

- Installez Prometheus et Grafana dans le namespace monitoring.

- Configurez Prometheus pour collecter les métriques des composants de l'application.

- Créez un tableau de bord dans Grafana pour visualiser ces métriques.
![Capture d’écran 2025-01-10 022225](https://imgur.com/KrWTpS2.png)

Résultat final

L'application Abdellino Store est déployée localement et dans un namespace avec Helm.

Les pipelines CI/CD fonctionnent avec Jenkins et ArgoCD.

Le monitoring est opérationnel avec des métriques visibles dans Grafana.

#### Structure du projet

```
abdellino-store/
|-- api/
|   |-- Dockerfile
|   |-- ...
|-- client/
|   |-- Dockerfile
|   |-- ...
|-- kubernetes/
|   |-- api-deployment.yaml
|   |-- api-service.yaml
|   | autres fichiers de deployments ... 
|-- helm-charts/
|   |-- api/
|   |-- client/
|   |-- mongodb/
|-- docker-compose.yml
|-- Jenkinsfile
```
Ce projet met en avant une intégration complète des outils DevOps pour gérer et superviser une application moderne.
