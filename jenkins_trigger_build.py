import urllib.request, urllib.error, base64, json, http.cookiejar

BASE = "http://localhost:8080"
USER = "muhterem"
TOKEN = "***REMOVED***"
auth = base64.b64encode(f"{USER}:{TOKEN}".encode()).decode()
cj = http.cookiejar.CookieJar()
op = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))

r = urllib.request.Request(BASE + "/crumbIssuer/api/json", headers={"Authorization": "Basic " + auth})
crumb = json.load(op.open(r))["crumb"]

# buildWithParameters with TEST_SUITE=smoke
data = urllib.parse.urlencode({"TEST_SUITE": "smoke"}).encode()
r2 = urllib.request.Request(
    BASE + "/job/zincbank-e2e/buildWithParameters",
    data=data,
    headers={"Authorization": "Basic " + auth, "Jenkins-Crumb": crumb, "Content-Type": "application/x-www-form-urlencoded"},
    method="POST",
)
try:
    resp = op.open(r2)
    print("build trigger status:", resp.status)
except urllib.error.HTTPError as e:
    print("build trigger status:", e.code)
    print(e.read().decode()[:300])
