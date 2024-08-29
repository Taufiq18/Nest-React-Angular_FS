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
                stage('Install BE-Express') {
                    steps {
                        dir('BE-Express') {
                            bat 'npm install'
                        }
                    }
                }
                stage('Install BE-NestJS') {
                    steps {
                        dir('BE-NestJS') {
                            bat 'npm install'
                        }
                    }
                }
                stage('Install FE-React') {
                    steps {
                        dir('FE-React') {
                            bat 'npm install'
                        }
                    }
                }
            }
        }

        stage('Start Applications') {
            parallel {
                stage('Start BE-Express') {
                    steps {
                        dir('BE-Express') {
                            bat 'start /B npm start'
                        }
                    }
                }
                stage('Start BE-NestJS') {
                    steps {
                        dir('BE-NestJS') {
                            bat 'start /B npm start'
                        }
                    }
                }
                stage('Start FE-React') {
                    steps {
                        dir('FE-React') {
                            bat 'start /B npm run preview'
                        }
                    }
                }
            }
        }
    }
}