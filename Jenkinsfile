pipeline {
    agent any

    triggers {
        pollSCM('H/5 * * * *')  
    }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub') 
        IMAGE_NAME_SERVER = 'sbika/apiAbdelli'  
        IMAGE_NAME_CLIENT = 'sbika/clientAbdelli'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/MohamedSbika/abdellino_store'
            }
        }

        stage('Build and Push Docker Images') {
            steps {
                script {
                    // Vérification si le daemon Docker est opérationnel
                    sh 'docker info'

                    // Build les images via Docker Compose
                    sh """
                    docker-compose -f docker-compose.yml build
                    echo "${DOCKERHUB_CREDENTIALS_PSW}" | docker login -u "${DOCKERHUB_CREDENTIALS_USR}" --password-stdin
                    docker tag apiAbdelli ${IMAGE_NAME_SERVER}
                    docker tag webAbdelli ${IMAGE_NAME_CLIENT}
                    docker push ${IMAGE_NAME_SERVER}
                    docker push ${IMAGE_NAME_CLIENT}
                    """
                }
            }
        }

        stage('Deploy Services') {
            steps {
                script {
                    // Déployer les services avec Docker Compose
                    sh """
                    docker-compose down
                    docker-compose up -d
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs for errors.'
        }
    }
}
