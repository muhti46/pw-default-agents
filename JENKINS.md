# Jenkins CI/CD Setup für das ZincBank E2E-Projekt

Dieses Projekt (Cucumber BDD + Playwright) wird über die `Jenkinsfile` im Projektstamm in eine
Jenkins-Pipeline integriert.

## Voraussetzungen in Jenkins

1. **Plugins installieren** (Manage Jenkins → Plugins):
   - NodeJS
   - Allure Jenkins Plugin
   - Pipeline
   - Timestamper
   - Build Discarder

2. **Node.js konfigurieren** (Manage Jenkins → Tools → NodeJS installations):
   - Name: `NodeJS` (muss exakt so heißen, wie in der `Jenkinsfile` referenziert)
   - Version: z. B. LTS (20.x oder 22.x)

3. **Credentials (optional)** (Manage Jenkins → Credentials):
   - `zincbank-email` (Secret text) → E-Mail für den ZincBank-Login
   - `zincbank-password` (Secret text) → Passwort für den ZincBank-Login
   - Werden die Credentials nicht angelegt, verwendet der Test die Fallback-Werte aus
     `support/common.steps.ts`.

## Pipeline anlegen

1. **New Item** → **Pipeline** → Name z. B. `zincbank-e2e`
2. Unter **Pipeline**:
   - Definition: **Pipeline script from SCM**
   - SCM: **Git**
   - Repository URL: URL deines Git-Repos (das Projekt muss in ein Git-Repo gepusht werden)
   - Script Path: `Jenkinsfile`
3. **Speichern** und **Build Now** ausführen.

## Parameter

Beim Build kann die Test-Suite gewählt werden:

| Wert        | Befehl                    | Beschreibung                     |
|-------------|---------------------------|----------------------------------|
| `full`      | `npm run test:cucumber`   | Alle Szenarien                   |
| `smoke`     | `npm run test:smoke`      | Nur `@smoke`-Szenarien           |
| `regression`| `npm run test:regression` | Nur `@regression`-Szenarien      |

## Artefakte & Reports

- **Allure-Report**: wird nach dem Lauf im Jenkins veröffentlicht (Link im Build-Menü).
- **cucumber-report.html / cucumber-report.json / allure-report/**: werden als Build-Artefakte archiviert.

## Hinweis


