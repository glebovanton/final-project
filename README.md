
1756049163142
if dynamic IP than change 
ip in ~/.ssh/config
SSH_HOST https://github.com/glebovanton/final-project/settings/secrets/actions
server_name `sudo nano /etc/nginx/sites-available/glebovanton.com`
Change A record https://dcc.godaddy.com/control/dnsmanagement

ping glebovanton.com

### Let’s Encrypt (with static ip)
`sudo apt install -y certbot python3-certbot-nginx`
`sudo certbot --nginx -d glebovanton.com`
`sudo certbot --nginx -d devops-grafana.glebovanton.com`

`cd /var/www/glebovanton.com`
`docker compose up -d`