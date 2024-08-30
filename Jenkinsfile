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
        stage('Install Dependencies') {
            parallel {
                stage('Install express-service') {
                    steps {
                        dir('express-service') {
                            sh 'npm install'
                        }
                    }
                }
                stage('Install nest-service') {
                    steps {
                        dir('nest-service') {
                            sh 'npm install'
                        }
                    }
                }
                stage('Install front-end-service') {
                    steps {
                        dir('front-end-service') {
                            sh 'npm install'
                        }
                    }
                }
            }
        }

        stage('Start Applications') {
            parallel {
                stage('Start express-service') {
                    steps {
                        dir('express-service') {
                            sh 'nohup npm start &'
                        }
                    }
                }
                stage('Start nest-service') {
                    steps {
                        dir('nest-service') {
                            sh 'nohup npm start &'
                        }
                    }
                }
                stage('Start front-end-service') {
                    steps {
                        dir('front-end-service') {
                            sh 'nohup npm run preview &'
                        }
                    }
                }
            }
        }
    }
}
