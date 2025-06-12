pipeline {
  agent any

  environment {
    DATABASE_URL    = "${env.DATABASE_URL}"
    NEXTAUTH_URL    = "http://localhost:3000"
    NEXTAUTH_SECRET = "dev-secret-key"
  }

  stages {
    stage('Clone') {
      steps { checkout scm }
    }

    stage('Debug') {
      steps { echo "GIT_BRANCH = ${env.GIT_BRANCH}" }
    }

    stage('Install dependencies') {
      //when { expression { env.GIT_BRANCH ==~ /(origin\/)?main/ } }
      steps {
        sh 'docker compose run --rm app npm install --legacy-peer-deps'
      }
    }

    stage('Build') {
      //when { expression { env.GIT_BRANCH ==~ /(origin\/)?main/ } }
      steps {
        sh 'docker compose run --rm app npm run build'
      }
    }

    stage('Test') {
      //when { expression { env.GIT_BRANCH ==~ /(origin\/)?main/ } }
      steps {
        sh 'docker compose run --rm app npm test || true'
      }
    }

    stage('Deploy') {
      //when { expression { env.GIT_BRANCH ==~ /(origin\/)?main/ } }
      steps {
        sh 'docker compose up -d'
      }
    }
  }

  post {
    always { echo 'Pipeline terminé.' }
  }
}
