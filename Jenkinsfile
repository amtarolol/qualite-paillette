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

        stage('Debug') {
            steps {
                echo "Branche détectée : ${env.BRANCH_NAME}"
            }
        }

        stage('Install dependencies') {
            when {
                expression {
                    return env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'origin/main'
                }
            }
            steps {
                sh 'docker compose run --rm app npm install'
            }
        }

        stage('Build') {
            when {
                expression {
                    return env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'origin/main'
                }
            }
            steps {
                sh 'docker compose run --rm app npm run build'
            }
        }

        stage('Test') {
            when {
                expression {
                    return env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'origin/main'
                }
            }
            steps {
                sh 'docker compose run --rm app npm test || true'
            }
        }

        stage('Deploy') {
            when {
                expression {
                    return env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'origin/main'
                }
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
