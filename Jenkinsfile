pipeline {
    agent any
    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install -g @nestjs/cli'
                    sh 'cd express-service && npm install'
                    sh 'cd nest-service && npm install'
                    sh 'cd front-end-service && npm install'
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    sh 'cd front-end-service && npm run build'
                    sh 'cd nest-service && npm run build'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    sh '''
                    # Start PostgreSQL (assuming it's installed on the host)
                    sudo -u postgres psql -c "CREATE DATABASE mydatabase;"
                    sudo -u postgres psql -c "CREATE USER myuser WITH PASSWORD 'mypassword';"
                    sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser;"
                    
                    # Start Express service
                    cd express-service
                    DB_HOST=localhost DB_USER=myuser DB_PASSWORD=mypassword DB_NAME=mydatabase nohup node server.js > express.log 2>&1 &
                    
                    # Start Nest service
                    cd ../nest-service
                    DB_HOST=localhost DB_USER=myuser DB_PASSWORD=mypassword DB_NAME=mydatabase nohup npm run start:prod > nest.log 2>&1 &
                    
                    # Start front-end service
                    cd ../front-end-service
                    nohup npm run dev > frontend.log 2>&1 &
                    '''
                }
            }
        }
    }
}