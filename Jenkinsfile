pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                script {
                    sh 'docker build -t postgres:13 .'
                    sh 'docker build -t express-service ./express-service'
                    sh 'docker build -t nest-service ./nest-service'
                    sh 'docker build -t front-end-service ./front-end-service'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    sh '''
                    docker network create myapp-network || true
                    docker run -d --name postgres --network myapp-network -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=mydatabase -p 5432:5432 postgres:13
                    docker run -d --name express-service --network myapp-network -e DB_HOST=postgres -e DB_USER=myuser -e DB_PASSWORD=mypassword -e DB_NAME=mydatabase -p 3001:3001 express-service
                    docker run -d --name nest-service --network myapp-network -e DB_HOST=postgres -e DB_USER=myuser -e DB_PASSWORD=mypassword -e DB_NAME=mydatabase -p 3002:3002 nest-service
                    docker run -d --name front-end-service --network myapp-network -p 5173:5173 front-end-service
                    '''
                }
            }
        }
    }
}