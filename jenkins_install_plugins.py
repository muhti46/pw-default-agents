import urllib.request, urllib.error, json, http.cookiejar, base64, os

BASE = "http://localhost:8080"
USER = os.environ.get("JENKINS_USER", "muhterem")
TOKEN = os.environ.get("JENKINS_API_TOKEN", "")
if not TOKEN:
    raise SystemExit("JENKINS_API_TOKEN env var is not set")
auth = base64.b64encode(f"{USER}:{TOKEN}".encode()).decode()
cj = http.cookiejar.CookieJar()
op = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))

r = urllib.request.Request(BASE + "/crumbIssuer/api/json", headers={"Authorization": "Basic " + auth})
crumb = json.load(op.open(r))["crumb"]
print("crumb:", crumb[:16])

body = json.dumps({"dynamicLoad": False, "plugins": ["nodejs", "allure-jenkins-plugin"]}).encode()
r2 = urllib.request.Request(
    BASE + "/pluginManager/installNecessaryPlugins",
    data=body,
    headers={"Authorization": "Basic " + auth, "Content-Type": "application/json", "Jenkins-Crumb": crumb},
    method="POST",
)
try:
    resp = op.open(r2)
    print("status:", resp.status)
except urllib.error.HTTPError as e:
    print("status:", e.code)
    print(e.read().decode()[:300])
