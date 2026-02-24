const QUIZ = [
  {
    q: "Your application returns a 502 error. What does this mean?",
    options: ["The application has a bug in the code", "The load balancer cannot reach a healthy instance", "The user is not authenticated", "The route table is misconfigured"],
    answer: 1,
    explanation: "502 Bad Gateway means the load balancer received an invalid response from the upstream server — the app is not listening or has crashed."
  },
  {
    q: "You try to SSH into a server and get 'Connection refused'. What is the most likely cause?",
    options: ["A firewall is blocking port 22", "The packet never arrived at the server", "The SSH service is not running on the server", "The routing table has no default gateway"],
    answer: 2,
    explanation: "Connection refused means the packet arrived but nothing is listening on that port. Connection timed out means the firewall is blocking it."
  },
  {
    q: "A /24 subnet has how many usable host addresses?",
    options: ["256", "254", "512", "248"],
    answer: 1,
    explanation: "A /24 has 256 total addresses. Subtract network address and broadcast address = 254 usable hosts."
  },
  {
    q: "What is the only technical difference between a public and private subnet in AWS?",
    options: ["Public subnets have larger CIDR ranges", "Public subnets route 0.0.0.0/0 to an Internet Gateway", "Public subnets have no security groups", "Public subnets use TCP and private use UDP"],
    answer: 1,
    explanation: "The only difference is the route table. Public subnets have 0.0.0.0/0 → Internet Gateway. Private subnets have 0.0.0.0/0 → NAT Gateway."
  },
  {
    q: "Which DNS record type maps a domain directly to an IPv4 address?",
    options: ["CNAME", "MX", "A", "PTR"],
    answer: 2,
    explanation: "An A record maps a domain name directly to an IPv4 address. CNAME maps domain to domain. PTR is the reverse."
  },
  {
    q: "Your server can ping 8.8.8.8 but cannot resolve google.com. What is the problem?",
    options: ["Port 443 is blocked", "DNS is not configured or unreachable", "The routing table is missing a route", "The server has no public IP"],
    answer: 1,
    explanation: "Ping works means Layer 3 is fine. Unable to resolve means DNS is failing — check /etc/resolv.conf for the DNS server address."
  },
  {
    q: "Port 80 is open in the Security Group but HTTP traffic is not reaching the EC2 instance. What should you check next?",
    options: ["The VPC CIDR range", "The Network ACL on the subnet", "The IAM role on the instance", "The Elastic IP configuration"],
    answer: 1,
    explanation: "Security Groups are stateful and instance-level. Network ACLs are stateless and subnet-level. The NACL might be blocking port 80 even though the SG allows it."
  },
  {
    q: "Which command shows all listening TCP and UDP ports on a Linux server?",
    options: ["ip route show", "ping -c 4 8.8.8.8", "ss -tuln", "dig +short"],
    answer: 2,
    explanation: "ss -tuln: t=TCP, u=UDP, l=listening, n=numeric (no DNS resolution). This is the primary port diagnostic command."
  },
  {
    q: "A private EC2 instance needs to download a software package from the internet. What must be configured?",
    options: ["An Internet Gateway attached to the private subnet", "A NAT Gateway in a public subnet with a route from the private subnet", "A VPN connection to the on-premises network", "An Elastic IP on the private instance"],
    answer: 1,
    explanation: "NAT Gateway sits in a public subnet and allows private instances to initiate outbound internet connections without being reachable inbound."
  },
  {
    q: "What does TTL mean in the context of DNS?",
    options: ["The time before a TCP connection closes", "How long a DNS result is cached before requiring a fresh lookup", "The maximum hops a packet can travel", "The timeout for TLS certificate validation"],
    answer: 1,
    explanation: "TTL (Time To Live) in DNS determines how long resolvers cache the result. A low TTL means changes propagate faster but creates more DNS queries."
  },
  {
    q: "You need to allow only your application servers to connect to the database on port 5432. What is the correct approach?",
    options: ["Open port 5432 to 0.0.0.0/0 in the database Security Group", "Reference the application server Security Group as the source in the database Security Group", "Create a NACL rule blocking all other traffic", "Use a VPN to connect the app servers to the database"],
    answer: 1,
    explanation: "Referencing the App-SG as the source in the DB-SG rule means only instances attached to App-SG can connect — this is more secure than using IP addresses."
  },
  {
    q: "What OSI layer does the IP protocol operate at?",
    options: ["Layer 2 — Data Link", "Layer 4 — Transport", "Layer 3 — Network", "Layer 7 — Application"],
    answer: 2,
    explanation: "IP operates at Layer 3 (Network). TCP/UDP are Layer 4. HTTP/DNS are Layer 7. MAC addresses and ARP are Layer 2."
  },
  {
    q: "Which load balancer type can route traffic based on the URL path?",
    options: ["Network Load Balancer (NLB)", "Application Load Balancer (ALB)", "Classic Load Balancer (CLB)", "Gateway Load Balancer (GWLB)"],
    answer: 1,
    explanation: "ALB operates at Layer 7 and can inspect HTTP headers, URL paths, and cookies to make routing decisions. NLB operates at Layer 4 (IP and port only)."
  },
  {
    q: "What is the Kubernetes internal DNS format for a service named 'api' in the 'production' namespace?",
    options: ["api.production.cluster.local", "api.production.svc.cluster.local", "production.api.svc.local", "api.svc.production.cluster"],
    answer: 1,
    explanation: "Kubernetes DNS format is: <service>.<namespace>.svc.cluster.local. This allows pods to find services by name without hardcoded IPs."
  },
  {
    q: "What does the traceroute command show you?",
    options: ["All open ports on the destination server", "Every router hop between your machine and the destination", "The DNS resolution chain for a domain", "The TLS certificate of the destination"],
    answer: 1,
    explanation: "traceroute sends packets with increasing TTL values to reveal each router hop. Each hop that responds shows its IP and response time, revealing the full network path."
  }
];
