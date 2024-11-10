This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Ubuntu Server Initial Setup Guide

This guide will walk you through setting up a new user, configuring SSH for improved security, and disabling root and password-based SSH login.

## Generating SSH key

```
ssh-keygen -t rsa -b 4096 -C "sensepro-martin" -f ~/.ssh/id_rsa_sensepro-dev-digitalocean-martin
```

## Steps

### 1. Update and Upgrade the System

Start by updating the package list and upgrading any out-of-date packages:

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Add user

```bash
sudo adduser <username>
```

### 3. Add the New User to the Sudo Group

To allow the new user administrative privileges, add them to the sudo group:

```bash
sudo usermod -aG sudo <username>
```

### 4. Configure SSH for Security

To enhance SSH security, we’ll disable root login and password authentication.

#### Backup SSH configuration

```bash
cp /etc/ssh/sshd_config "/etc/ssh/sshd_config.bak"
```

#### Disable root login and password authentication

```bash
sed -i 's/^#?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/^#?PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/^#?UsePAM.*/UsePAM no/' /etc/ssh/sshd_config
```

#### Restart SSH service

```bash
sudo systemctl restart ssh
```
