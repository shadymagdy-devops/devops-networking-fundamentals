# Day 3 — DNS: Records, Resolution and TTL

## Overview

DNS is the most common root cause of broken deployments.
Understanding the full resolution chain separates engineers who guess from engineers who diagnose.

---

## Concepts Covered

### DNS Record Types

| Record | Purpose |
|--------|---------|
| A | Maps domain to IPv4 address |
| AAAA | Maps domain to IPv6 address |
| CNAME | Maps domain to another domain (alias) |
| MX | Defines mail servers for the domain |
| TXT | Stores verification tokens, SPF, DKIM |
| NS | Identifies authoritative nameservers |
| PTR | Reverse lookup — IP to domain |
| SRV | Service discovery with port and priority |

### Resolution Chain
```
Browser Cache → /etc/hosts → Recursive Resolver → Root NS → TLD NS → Authoritative NS
```

Each step only runs if the previous step did not return an answer.

### TTL (Time To Live)

How long a DNS result is cached after a record is returned.
A TTL of 300 means the result is cached for 5 minutes everywhere.
Always lower TTL before making DNS changes.

### Kubernetes Internal DNS

Format: `<service>.<namespace>.svc.cluster.local`

Pods reference services by DNS name — never by IP.
Pod IPs change on restart. DNS names stay stable.

---

## Commands Executed

| Command | Output File | Purpose |
|---------|-------------|---------|
| dig google.com | dig-outputs.txt | Full A record with TTL |
| dig google.com +short | dig-outputs.txt | IP address only |
| dig google.com MX | dig-outputs.txt | Mail server records |
| dig google.com NS | dig-outputs.txt | Authoritative nameservers |
| dig google.com TXT | dig-outputs.txt | TXT verification records |
| dig -x 8.8.8.8 | dig-outputs.txt | Reverse DNS lookup |
| nslookup google.com | dig-outputs.txt | Alternative resolver query |
| cat /etc/resolv.conf | dig-outputs.txt | Machine DNS configuration |
| cat /etc/hosts | dig-outputs.txt | Local DNS overrides |

---

## Key Findings

- This machine uses systemd-resolved (127.0.0.53) as the local stub resolver
- google.com A record TTL was 50 seconds at time of query
- google.com has 4 authoritative nameservers (ns1-ns4.google.com)
- google.com has 12 TXT records including SPF and multiple site verifications
- Reverse DNS: 8.8.8.8 resolves to dns.google
- IPv6 address returned alongside IPv4 in nslookup

---

## Date Completed

February 2026
