pipeline {
    agent any

    environment {
        DATABASE_URL = "${env.DATABASE_URL}"
        NEXTAUTH_URL = "http://localhost:3000"
        NEXTAUTH_SECRET = "dev-secret-key"
    }

    stages {
        stage('Clone') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            when {
                branch 'main'
            }
            steps {
                sh 'docker compose run --rm app npm install'
            }
        }

        stage('Build') {
            when {
                branch 'main'
            }
            steps {
                sh 'docker compose run --rm app npm run build'
            }
        }

        stage('Test') {
            when {
                branch 'main'
            }
            steps {
                sh 'docker compose run --rm app npm test || true'
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh 'docker compose up -d'
            }
        }
    }

    post {
        always {
            echo 'Pipeline terminé.'
        }
    }
}
