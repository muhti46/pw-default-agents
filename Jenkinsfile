// Jenkins CI/CD Pipeline für das ZincBank Cucumber BDD E2E-Projekt
// Voraussetzungen im Jenkins:
//   - Plugins: NodeJS, Allure, Pipeline, Timestamper, Build Discarder, Email Extension
//   - Global Tool Configuration: NodeJS-Installation mit dem Namen "NodeJS"
//   - Credentials (optional): zincbank-email, zincbank-password
//     (sonst werden die Fallback-Werte aus support/common.steps.ts verwendet)
//
// Zeitplan:
//   - Werktags (Mo-Fr) um 08:00  -> Smoke-Suite
//   - Samstag    um 08:00        -> Regression-Suite
//   - Manueller Start            -> TEST_SUITE Parameter (full/smoke/regression)
// Ergebnis wird per E-Mail an E2E_NOTIFY_TO gemeldet.

// Wählt die Test-Suite: bei cron-gesteuertem Build je nach Wochentag,
// bei manuellem Build den Parameter TEST_SUITE.
def selectSuite() {
    def isTimer = currentBuild.getBuildCauses('hudson.triggers.TimerTrigger$TimerTriggerCause').size() > 0
    if (!isTimer) {
        return params.TEST_SUITE
    }
    // Calendar.DAY_OF_WEEK: 1=Sonntag, 2=Mo, 3=Di, 4=Mi, 5=Do, 6=Fr, 7=Sa
    def dow = Calendar.instance.get(Calendar.DAY_OF_WEEK)
    return (dow == 7) ? 'regression' : 'smoke'
}

pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 60, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '5'))
        disableConcurrentBuilds()
    }

    triggers {
        // 1=Pazartesi ... 6=Cumartesi, um 08:00 Uhr (Server-Zeitzone)
        cron('0 8 * * 1-6')
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
        // Empfänger der Ergebnis-Mail (kommagetrennt für mehrere Adressen)
        E2E_NOTIFY_TO = 'muhteremdemir@gmail.com'
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
                    bat 'node --version && npm --version'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS') {
                    bat 'npm ci'
                }
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS') {
                    // Windows: --with-deps wird nicht unterstützt
                    bat 'npx playwright install chromium'
                }
            }
        }

        stage('Run Cucumber Tests') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS') {
                    script {
                        def suite = selectSuite()
                        echo "Ausgeführte Test-Suite: ${suite}"
                        def cmd = suite == 'smoke' ? 'npm run test:smoke'
                                : suite == 'regression' ? 'npm run test:regression'
                                : 'npm run test:cucumber'
                        bat cmd
                    }
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS') {
                    bat 'npm run allure:generate'
                }
            }
        }
    }

    post {
        always {
            // Berichte als Build-Artefakte archivieren
            archiveArtifacts artifacts: 'cucumber-report.html, cucumber-report.json, allure-report/**', allowEmptyArchive: true

            // Allure-Report im Jenkins veröffentlichen (nur wenn Allure CLI konfiguriert ist)
            script {
                try {
                    allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
                } catch (Exception e) {
                    echo "Allure-Report übersprungen: ${e.message}"
                }
            }
        }
        success {
            echo '✅ Alle Tests bestanden.'
            script {
                def suite = selectSuite()
                emailext(
                    subject: "✅ ZincBank E2E [${suite.toUpperCase()}] #${env.BUILD_NUMBER} - ERFOLGREICH",
                    to: env.E2E_NOTIFY_TO,
                    from: 'zincbank-e2e@localhost',
                    replyTo: env.E2E_NOTIFY_TO,
                    mimeType: 'text/html',
                    body: """<h2>ZincBank E2E Tests - ERFOLGREICH ✅</h2>
<p><b>Job:</b> ${env.JOB_NAME}</p>
<p><b>Build:</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
<p><b>Suite:</b> ${suite.toUpperCase()}</p>
<p><b>Status:</b> <span style="color:green;font-weight:bold">Alle Tests bestanden</span></p>
<p><b>Allure Report:</b> <a href="${env.BUILD_URL}allure">${env.BUILD_URL}allure</a></p>
"""
                )
            }
        }
        failure {
            echo '❌ Mindestens ein Test ist fehlgeschlagen. Details im Allure-Report.'
            script {
                def suite = selectSuite()
                emailext(
                    subject: "❌ ZincBank E2E [${suite.toUpperCase()}] #${env.BUILD_NUMBER} - FEHLGESCHLAGEN",
                    to: env.E2E_NOTIFY_TO,
                    from: 'zincbank-e2e@localhost',
                    replyTo: env.E2E_NOTIFY_TO,
                    mimeType: 'text/html',
                    body: """<h2>ZincBank E2E Tests - FEHLGESCHLAGEN ❌</h2>
<p><b>Job:</b> ${env.JOB_NAME}</p>
<p><b>Build:</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
<p><b>Suite:</b> ${suite.toUpperCase()}</p>
<p><b>Status:</b> <span style="color:red;font-weight:bold">Tests fehlgeschlagen</span></p>
<p><b>Konsole:</b> <a href="${env.BUILD_URL}console">${env.BUILD_URL}console</a></p>
<p><b>Allure Report:</b> <a href="${env.BUILD_URL}allure">${env.BUILD_URL}allure</a></p>
"""
                )
            }
        }
    }
}
