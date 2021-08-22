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

		stage('Publish HTML Report'){
				steps{
					publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'cypress-pipeline/allure-report', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: ''])
				}
		}
	
	}
}