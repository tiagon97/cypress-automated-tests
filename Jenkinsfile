pipeline {
    agent any

    stages {
        stage('install dependencies') {
            steps {
                sh 'npm i'
            }
        }
       stage('run tests'){
           steps{
               sh 'npm test'
           }
       }
    }
}