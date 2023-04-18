# Utiliser une image de base avec PHP et Nginx préinstallé (Version de developpement
FROM webdevops/php-nginx-dev:8.2

# Installer le serveur SSH
RUN apt-get update && apt-get install -y openssh-server

# Créer le répertoire nécessaire pour le serveur SSH
RUN mkdir /var/run/sshd

# Configurer le serveur SSH pour permettre l'accès root (facultatif, à utiliser avec prudence)
RUN echo 'PermitRootLogin yes' >> /etc/ssh/sshd_config

# Exposer le port SSH
##### attention ce n'est qu'informatif, ça ne fait rien en fait, plutot mettre ça juste avant le ENTRYPOINT (a la fin)
EXPOSE 22

RUN echo 'root:root' | chpasswd


# Installer Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

# Copier les fichiers du projet dans le conteneur
##### cette ligne va changer a chaque fois que tu ajouteras du code
##### donc tres souvent. Tout ce qui suit sera rejoué a chaque fois que cette ligne va changer,
##### mets le plus haut possible tout ce qui ne change presque jamais, et le plus bas ce qui change tres souvent
COPY . /app

##### monter ces lignes avant le copy . ./app 
# Installer les dépendances pour Symfony avec Composer
WORKDIR /app/back-end
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader

##### idem, ici tu vas rejouer le npm install a chaque fois que tu changes une ligne de code, meme lorsque
##### tes librairies ne changeront pas
# Installer les dépendances pour React avec npm
WORKDIR /app/front-end
RUN npm install
RUN npm run build

##### monter ces lignes avant le copy . ./app 
# Configurer Nginx pour servir l'application Symfony et React
COPY docker/nginx/default.conf /etc/nginx/sites-enabled/default.conf

# Lancer SSH
##### utiliser ENTRYPOINT plutot, voir la doc docker
CMD ["/usr/sbin/sshd", "-D"]
