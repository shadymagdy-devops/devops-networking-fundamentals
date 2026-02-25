# DNS Resolution Flow — Step by Step

## What Happens When You Type google.com
```
Browser → Local Cache → /etc/hosts → Recursive Resolver → Root NS → TLD NS → Authoritative NS
```

---

## Step-by-Step Breakdown

### Step 1 — Local Cache
Browser checks its own DNS cache first.
If found and TTL not expired → uses it immediately, no network call.

### Step 2 — /etc/hosts
OS checks /etc/hosts before sending any DNS query.
```
127.0.0.1  localhost
127.0.1.1  ubuntu-server
```
Any entry here overrides DNS entirely.

### Step 3 — Recursive Resolver
Machine queries its configured resolver (127.0.0.53 on this server — systemd-resolved).
The resolver does all the heavy lifting.

### Step 4 — Root Nameserver
Resolver asks a root nameserver: "Who handles .com?"
Root returns the address of the .com TLD nameservers.
There are 13 root nameserver sets (a.root-servers.net through m.root-servers.net).

### Step 5 — TLD Nameserver
.com TLD server is asked: "Who handles google.com?"
Returns the authoritative nameservers: ns1.google.com, ns2.google.com, ns3.google.com, ns4.google.com

### Step 6 — Authoritative Nameserver
google.com authoritative nameserver returns the actual A record:
```
google.com.  50  IN  A  142.251.140.110
```
Result is cached by the resolver for TTL=50 seconds.

---

## DNS Record Types Reference

| Record | Maps             | Example                          | DevOps Use Case              |
|--------|------------------|----------------------------------|------------------------------|
| A      | Domain → IPv4    | google.com → 142.251.140.110     | Point domain to server       |
| AAAA   | Domain → IPv6    | google.com → 2a00:1450::200e     | IPv6 equivalent of A         |
| CNAME  | Domain → Domain  | www → google.com                 | Aliases and subdomains       |
| MX     | Domain → Mail    | google.com → smtp.google.com     | Email routing                |
| TXT    | Domain → Text    | v=spf1 include:_spf.google.com   | Verification, SPF, DKIM      |
| NS     | Domain → NS      | google.com → ns1.google.com      | Who controls this domain     |
| PTR    | IP → Domain      | 8.8.8.8 → dns.google             | Reverse lookup, email verify |
| SRV    | Service location | _http._tcp → host:port           | Kubernetes service discovery |

---

## TTL — Time To Live

TTL controls how long resolvers cache a DNS result.
```
google.com.  50  IN  A  142.251.140.110
             ↑
             TTL = 50 seconds
```

### Before a deployment — always lower TTL first:
1. Set TTL to 60 seconds — 24 hours before DNS change
2. Make the DNS change
3. Old result expires in 60 seconds everywhere
4. Restore TTL to 3600 after confirming traffic is healthy

### Finding out TTL:
```bash
dig google.com | grep -A2 "ANSWER SECTION"
```

---

## Kubernetes Internal DNS

Every Kubernetes service gets an automatic DNS name.

Format:
```
<service-name>.<namespace>.svc.cluster.local
```

Examples:
```
api.default.svc.cluster.local
database.production.svc.cluster.local
redis.staging.svc.cluster.local
```

Within the same namespace, just the service name works:
```bash
curl http://api
curl http://database:5432
```

---

## Key Commands
```bash
dig google.com                    # Full A record lookup with TTL
dig google.com +short             # IP address only
dig google.com MX                 # Mail server records
dig google.com NS                 # Nameserver records
dig google.com TXT                # TXT records (SPF, DKIM, verification)
dig -x 8.8.8.8                   # Reverse DNS — IP to hostname
nslookup google.com 1.1.1.1      # Query specific resolver
cat /etc/hosts                    # Local overrides — checked before DNS
cat /etc/resolv.conf              # Configured DNS server for this machine
```

---

## Common DNS Failures in DevOps

| Symptom | Cause | Fix |
|---------|-------|-----|
| Can ping IP but not domain | DNS not working | Check /etc/resolv.conf |
| Old IP after deployment | TTL not expired | Wait for TTL or lower it next time |
| Works locally, fails in container | /etc/hosts not copied | Use service DNS names |
| Kubernetes pod can't find service | Wrong namespace in DNS name | Use full FQDN |
