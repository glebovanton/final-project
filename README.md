if dynamic IP than change 
ip in ~/.ssh/config
SSH_HOST https://github.com/glebovanton/final-project/settings/secrets/actions
server_name `sudo nano /etc/nginx/sites-available/devops-node-starter`
Change A record https://dcc.godaddy.com/control/dnsmanagement

ping glebovanton.com

### Let’s Encrypt (with static ip)
`sudo apt install -y certbot python3-certbot-nginx`
`sudo certbot --nginx -d glebovanton.com`
