# Installer le serveur SSH
RUN apt-get update && apt-get install -y openssh-server

# Créer le répertoire nécessaire pour le serveur SSH
RUN mkdir /var/run/sshd

# Configurer le serveur SSH pour permettre l'accès root
RUN echo 'PermitRootLogin yes' >> /etc/ssh/sshd_config

# Exposer le port SSH
EXPOSE 22

# Utiliser une image de base avec PHP et Nginx
FROM webdevops/php-nginx:8.0

# Installer Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

# Copier les fichiers du projet dans le conteneur
COPY . /app

# Installer les dépendances pour Symfony avec Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader

# Installer les dépendances pour React avec npm
WORKDIR /app/front-end
RUN npm install
RUN npm run build

# Configurer Nginx pour servir l'application Symfony et React
COPY docker/nginx/default.conf /etc/nginx/sites-enabled/default.conf

