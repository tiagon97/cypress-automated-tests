pipeline {
	agent any
    
	stages {
		stage('Clone Git Repo'){
				steps{
					git 'https://github.com/tiagon97/cypress-automated-tests.git'
		    }
		}
		stage('Install Dependencies'){
				steps{
					bat 'npm install'
				}
		}
		stage('Run Tests'){
				steps{
					bat 'npm test'
				}
		}
        stage("Publish allure report"){
            steps{
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
	
	}
}