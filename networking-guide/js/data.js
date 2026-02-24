const DAYS = [
  {
    id: 'day1',
    num: '01',
    title: 'Foundation',
    sub: 'IP · OSI · TCP/UDP',
    eyebrow: 'DAY 01 — COMPLETED',
    heading: 'IP Addresses, OSI Model',
    headingEm: 'and TCP/UDP',
    desc: 'Foundational networking for DevOps engineers. Every concept here maps directly to something you configure, debug, or troubleshoot in production.',
    completed: true,
    sections: [
      {
        id: 'd1-network',
        title: 'What Is a Network',
        color: '',
        content: 'network'
      },
      {
        id: 'd1-ip',
        title: 'IP Addresses',
        color: '',
        content: 'ip'
      },
      {
        id: 'd1-mac',
        title: 'MAC Address',
        color: 'green',
        content: 'mac'
      },
      {
        id: 'd1-osi',
        title: 'OSI Model',
        color: 'purple',
        content: 'osi'
      },
      {
        id: 'd1-tcp',
        title: 'TCP vs UDP',
        color: 'yellow',
        content: 'tcp'
      },
      {
        id: 'd1-ports',
        title: 'Port Numbers',
        color: '',
        content: 'ports'
      },
      {
        id: 'd1-errors',
        title: 'Connection Errors',
        color: 'red',
        content: 'errors'
      },
      {
        id: 'd1-commands',
        title: 'Commands Run',
        color: 'green',
        content: 'commands1'
      }
    ]
  },
  {
    id: 'day2',
    num: '02',
    title: 'Subnetting',
    sub: 'CIDR · VPC Design',
    eyebrow: 'DAY 02 — SUBNETTING',
    heading: 'Subnetting and',
    headingEm: 'CIDR Notation',
    desc: 'The most tested networking topic in DevOps and cloud interviews. Every VPC, subnet, and security group rule in AWS requires reading and designing CIDR ranges correctly.',
    completed: false,
    sections: [
      { id: 'd2-cidr', title: 'CIDR Reference', color: '', content: 'cidr' },
      { id: 'd2-reading', title: 'Reading a Subnet', color: 'green', content: 'reading' },
      { id: 'd2-design', title: 'VPC Subnet Design', color: 'purple', content: 'design' },
      { id: 'd2-public', title: 'Public vs Private', color: 'yellow', content: 'publicprivate' },
      { id: 'd2-commands', title: 'Commands Run', color: 'green', content: 'commands2' }
    ]
  },
  {
    id: 'day3',
    num: '03',
    title: 'DNS',
    sub: 'Records · Resolution',
    eyebrow: 'DAY 03 — DNS',
    heading: 'DNS — Records,',
    headingEm: 'Resolution and TTL',
    desc: 'DNS is the most common root cause of broken deployments. Understanding the full resolution chain separates engineers who guess from engineers who diagnose.',
    completed: false,
    sections: [
      { id: 'd3-records', title: 'Record Types', color: '', content: 'dnsrecords' },
      { id: 'd3-resolution', title: 'Resolution Chain', color: 'purple', content: 'dnsresolution' },
      { id: 'd3-ttl', title: 'TTL', color: 'yellow', content: 'dnsttl' },
      { id: 'd3-k8s', title: 'Kubernetes DNS', color: 'green', content: 'k8sdns' },
      { id: 'd3-commands', title: 'Commands Run', color: 'green', content: 'commands3' }
    ]
  },
  {
    id: 'day4',
    num: '04',
    title: 'Routing & Firewalls',
    sub: 'iptables · ufw · SG',
    eyebrow: 'DAY 04 — ROUTING & FIREWALLS',
    heading: 'Routing Tables,',
    headingEm: 'Firewalls and Security Groups',
    desc: 'Controlling where traffic goes and what is allowed to pass. This is where you enforce security in both Linux and cloud environments.',
    completed: false,
    sections: [
      { id: 'd4-routing', title: 'Routing Tables', color: '', content: 'routing' },
      { id: 'd4-firewall', title: 'Linux Firewall', color: 'yellow', content: 'firewall' },
      { id: 'd4-sg', title: 'Security Groups vs NACLs', color: 'red', content: 'sgnacl' },
      { id: 'd4-commands', title: 'Commands Run', color: 'green', content: 'commands4' }
    ]
  },
  {
    id: 'day5',
    num: '05',
    title: 'LB · NAT · VPN',
    sub: 'ALB · NLB · Gateway',
    eyebrow: 'DAY 05 — LOAD BALANCERS · NAT · VPN',
    heading: 'Load Balancers,',
    headingEm: 'NAT Gateway and VPN',
    desc: 'Three components that appear in almost every production cloud architecture and every system design interview question.',
    completed: false,
    sections: [
      { id: 'd5-lb', title: 'Load Balancers', color: '', content: 'lb' },
      { id: 'd5-nat', title: 'NAT Gateway', color: 'green', content: 'nat' },
      { id: 'd5-vpn', title: 'VPN', color: 'purple', content: 'vpn' }
    ]
  },
  {
    id: 'day6',
    num: '06',
    title: 'HTTP & TLS',
    sub: 'curl · tcpdump · openssl',
    eyebrow: 'DAY 06 — HTTP & TLS',
    heading: 'HTTP, TLS and',
    headingEm: 'Network Troubleshooting',
    desc: 'The full HTTP conversation from request to response, and the complete toolkit for diagnosing any network problem in production.',
    completed: false,
    sections: [
      { id: 'd6-http', title: 'HTTP Methods', color: '', content: 'http' },
      { id: 'd6-status', title: 'Status Codes', color: 'yellow', content: 'status' },
      { id: 'd6-tls', title: 'TLS Handshake', color: 'purple', content: 'tls' },
      { id: 'd6-toolkit', title: 'Troubleshooting Toolkit', color: 'green', content: 'toolkit' }
    ]
  },
  {
    id: 'day7',
    num: '07',
    title: 'AWS VPC',
    sub: 'Terraform · Architecture',
    eyebrow: 'DAY 07 — AWS VPC',
    heading: 'Full AWS VPC',
    headingEm: 'Architecture',
    desc: 'Everything from Days 1 through 6 applied to a real cloud environment. Build the complete 3-tier architecture from scratch using Terraform.',
    completed: false,
    sections: [
      { id: 'd7-arch', title: 'VPC Architecture', color: '', content: 'vpcarch' },
      { id: 'd7-components', title: 'Components', color: 'green', content: 'vpccomponents' },
      { id: 'd7-routes', title: 'Route Tables', color: 'purple', content: 'vpcroutes' },
      { id: 'd7-sg', title: 'Security Groups', color: 'yellow', content: 'vpcsg' },
      { id: 'd7-terraform', title: 'Terraform', color: 'green', content: 'terraform' }
    ]
  }
];
