// Jenkins CI/CD Pipeline für das ZincBank Cucumber BDD E2E-Projekt
// Voraussetzungen im Jenkins:
//   - Plugins: NodeJS, Allure, Pipeline, Timestamper, Build Discarder
//   - Global Tool Configuration: NodeJS-Installation mit dem Namen "NodeJS"
//   - Credentials (optional): zincbank-email, zincbank-password
//     (sonst werden die Fallback-Werte aus support/common.steps.ts verwendet)

pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 60, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '5'))
        disableConcurrentBuilds()
    }

    parameters {
        choice(
            name: 'TEST_SUITE',
            choices: ['full', 'smoke', 'regression'],
            description: 'Welche Test-Suite soll ausgeführt werden?'
        )
    }

    environment {
        // Testdaten kommen aus support/common.steps.ts (Fallback).
        // Optional: Jenkins-Credentials "zincbank-email" / "zincbank-password" anlegen
        // und die Zeilen unten einkommentieren, um sie zu überschreiben.
        // ZINCBANK_EMAIL   = credentials('zincbank-email')
        // ZINCBANK_PASSWORD = credentials('zincbank-password')
        HEADED = 'false'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup Node') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS') {
                    sh 'node --version && npm --version'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS') {
                    sh 'npm ci'
                }
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS') {
                    // Windows: --with-deps wird nicht unterstützt
                    sh 'npx playwright install chromium'
                }
            }
        }

        stage('Run Cucumber Tests') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS') {
                    script {
                        def cmd = params.TEST_SUITE == 'smoke' ? 'npm run test:smoke'
                                : params.TEST_SUITE == 'regression' ? 'npm run test:regression'
                                : 'npm run test:cucumber'
                        sh cmd
                    }
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS') {
                    sh 'npm run allure:generate'
                }
            }
        }
    }

    post {
        always {
            // Berichte als Build-Artefakte archivieren
            archiveArtifacts artifacts: 'cucumber-report.html, cucumber-report.json, allure-report/**', allowEmptyArchive: true

            // Allure-Report im Jenkins veröffentlichen
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
        }
        success {
            echo '✅ Alle Tests bestanden.'
        }
        failure {
            echo '❌ Mindestens ein Test ist fehlgeschlagen. Details im Allure-Report.'
        }
    }
}
