import urllib.request, urllib.error, base64, json, os

BASE = "http://localhost:8080"
USER = os.environ.get("JENKINS_USER", "muhterem")
TOKEN = os.environ.get("JENKINS_API_TOKEN", "")
if not TOKEN:
    raise SystemExit("JENKINS_API_TOKEN env var is not set")
auth = base64.b64encode(f"{USER}:{TOKEN}".encode()).decode()

script = """
def d = Jenkins.instance.getExtensionList(hudson.plugins.nodejs.NodeJSInstallation.DescriptorImpl.class)[0]
d.setInstallations(new hudson.plugins.nodejs.NodeJSInstallation('NodeJS', '', [new hudson.plugins.nodejs.NodeJSInstaller('NodeJS 22.11.0')]))
d.save()
println 'NodeJS tool added: ' + d.getInstallations().collect{it.name}
"""

data = urllib.parse.urlencode({"script": script}).encode()
r = urllib.request.Request(
    BASE + "/scriptText",
    data=data,
    headers={"Authorization": "Basic " + auth, "Content-Type": "application/x-www-form-urlencoded"},
    method="POST",
)
try:
    resp = urllib.request.urlopen(r)
    print("status:", resp.status)
    print(resp.read().decode())
except urllib.error.HTTPError as e:
    print("status:", e.code)
    print(e.read().decode()[:500])
