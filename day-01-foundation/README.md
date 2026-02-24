# Day 1 — IP Addresses, OSI Model and TCP/UDP

## Overview

Foundational networking concepts for DevOps engineering.
All commands executed on Ubuntu 22.04 LTS and outputs saved for reference.

---

## Concepts Covered

### IP Addresses

- Private IP ranges: 10.x.x.x, 172.16-31.x.x, 192.168.x.x
- Public IP assigned by ISP or cloud provider
- NAT translates private IPs to public for outbound traffic
- Loopback 127.0.0.1 — machine communicates with itself

### CIDR Notation

| CIDR | Addresses | DevOps Use Case |
|------|-----------|-----------------|
| /32 | 1 | Single host security group rule |
| /24 | 256 | Standard subnet |
| /16 | 65,536 | Full VPC |

### OSI Model — DevOps Relevant Layers

| Layer | Name | Tools |
|-------|------|-------|
| 7 | Application | curl, dig |
| 4 | Transport | ss, netcat |
| 3 | Network | ping, traceroute, ip route |

### TCP vs UDP

| TCP | UDP |
|-----|-----|
| Reliable, ordered | Fast, no guarantee |
| HTTP, SSH, databases | DNS, monitoring |

### Critical Port Numbers

| Port | Service |
|------|---------|
| 22 | SSH |
| 80 | HTTP |
| 443 | HTTPS |
| 3306 | MySQL |
| 5432 | PostgreSQL |
| 6379 | Redis |
| 6443 | Kubernetes API |

### Key Troubleshooting Distinction

| Error | Meaning | Cause |
|-------|---------|-------|
| Connection refused | Packet arrived, nothing listening | App crashed or wrong port |
| Connection timed out | Packet never arrived | Firewall or routing issue |

---

## Commands Executed

| Command | Output File | Purpose |
|---------|-------------|---------|
| ip a | ip-a-output.txt | View interfaces and private IP |
| ip route | ip-route-output.txt | View routing table |
| curl ifconfig.me | public-ip.txt | View public IP |
| ping -c 4 8.8.8.8 | ping-output.txt | Test Layer 3 connectivity |
| traceroute google.com | traceroute-output.txt | Trace every network hop |
| ss -tuln | ss-tuln-output.txt | View all listening ports |
| curl -v https://google.com | curl-v-output.txt | Full HTTP and TLS conversation |
| ip link show | mac-addresses.txt | View MAC addresses |
| arp -n | arp-table.txt | View ARP table |

---

## Key Findings

- Private IP assigned to eth0 interface
- Default gateway identified in routing table
- Port 22 confirmed listening — SSH active
- Traceroute showed full path to Google with each hop
- curl -v revealed TLS handshake and HTTP/2 response headers

---

## Date Completed

February 2026
