# Day 2 — Subnetting and CIDR Notation

## Overview

Subnetting is the most tested networking topic in DevOps and cloud interviews.
Every VPC, subnet, and security group rule in AWS requires understanding CIDR notation.

---

## Concepts Covered

| CIDR | Usable Hosts | DevOps Use Case |
|------|-------------|-----------------|
| /32 | 1 | Single host in a security group rule |
| /30 | 2 | Point-to-point links |
| /28 | 14 | Small subnet |
| /24 | 254 | Standard production subnet |
| /16 | 65,534 | Full VPC |

---

## Reading a Subnet — 10.0.1.0/24

| Detail | Value |
|--------|-------|
| Network Address | 10.0.1.0 |
| First Usable Host | 10.0.1.1 |
| Last Usable Host | 10.0.1.254 |
| Broadcast Address | 10.0.1.255 |
| Usable Hosts | 254 |

---

## Commands Executed

| Command | Output File | Purpose |
|---------|-------------|---------|
| ipcalc 10.0.0.0/16 | ipcalc-outputs.txt | VPC range breakdown |
| ipcalc 10.0.1.0/24 | ipcalc-outputs.txt | Standard subnet |
| ipcalc 10.0.1.0/28 | ipcalc-outputs.txt | Small subnet |
| ipcalc 10.0.1.0/30 | ipcalc-outputs.txt | Point-to-point |
| ipcalc 172.16.0.0/12 | ipcalc-outputs.txt | Docker range |
| ipcalc 10.0.1.5/32 | ipcalc-outputs.txt | Single host |

---

## Key Findings

- A /24 provides 254 usable hosts — standard for production subnets
- A /16 provides 65,534 addresses — appropriate for a full VPC
- Every time CIDR increases by 1, available hosts halve
- Docker default bridge network uses 172.16.0.0/12

---

## Date Completed

February 2026
