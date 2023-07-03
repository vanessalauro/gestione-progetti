# Utilizza un'immagine di base per Node.js
FROM node:18
# Copia i file dell'applicazione nella directory di lavoro del container
COPY . /app
# Imposta la directory di lavoro del container
WORKDIR /app
# Installa le dipendenze dell'applicazione
RUN npm install
# Esponi una porta per l'applicazione
EXPOSE 3000
# Avvia l'applicazione quando il container viene eseguito
CMD ["npm", "start"]


# Utilizza un'immagine di base per MongoDB
FROM mongo:latest
# Copia il file di configurazione in /etc/mongo.conf
COPY mongo.conf /etc/mongo.conf
# Imposta la variabile d'ambiente per il file di configurazione
ENV MONGO_CONFIG_FILE=/etc/mongo.conf
# Esponi la porta di default per MongoDB
EXPOSE 27017
# Avvia il servizio MongoDB quando il container viene eseguito
CMD ["mongod", "--config", "$MONGO_CONFIG_FILE"]

# Usa un'immagine di base di Node.js
FROM node:18
# Imposta la directory di lavoro all'interno del container
WORKDIR /app
# Copia il file package.json nella directory di lavoro
COPY package*.json ./
# Installa le dipendenze dell'applicazione
RUN npm install
# Copia il resto del codice dell'applicazione nella directory di lavoro
COPY . .
# Compila l'applicazione Vue.js
RUN npm run build
# Esponi la porta 80 per l'applicazione
EXPOSE 80
# Avvia l'applicazione quando il container viene eseguito
CMD ["npm", "run", "start"]
