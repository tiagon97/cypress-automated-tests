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

		
		stage('reports') {
    		steps {
    			script {
            		allure([
						includeProperties: false,
						jdk: '',
						properties: [],
						reportBuildPolicy: 'ALWAYS',
						results: [[path: 'cypress-pipeline/allure-results']]
            		])
    			}
    		}
		}
	
	}
}