pipeline {
    agent any

    environment {
        DB_HOST = 'localhost'
        DB_PORT = '5432'
        DB_USER = 'root'
        DB_PASSWORD = '1sampai8'
        DB_NAME = 'customer_db'
    }

    stages {
        stage('Setup') {
            steps {
                echo 'Setting up the environment...'
                sh 'npm install'
            }
        }

        stage('Build Express Service') {
            steps {
                dir('express-service') {
                    echo 'Building Express Service...'
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build NestJS Service') {
            steps {
                dir('nest-service') {
                    echo 'Building NestJS Service...'
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Front-End Service') {
            steps {
                dir('front-end-service') {
                    echo 'Building Front-End Service...'
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }


        stage('Deploy') {
            steps {
                echo 'Deploying services...'
                // Start each service
                sh 'pm2 start express-service/server.js'
                sh 'pm2 start nest-service/dist/main.js'
                sh 'pm2 start front-end-service/dist/index.js'

                // Optionally: Deploy to a remote server
                // sh 'scp -r ./dist user@remote_server:/path/to/deploy'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            // Clean up workspace if needed
            sh 'pm2 stop all'
        }

        success {
            echo 'Deployment successful!'
        }

        failure {
            echo 'Deployment failed.'
        }
    }
}
