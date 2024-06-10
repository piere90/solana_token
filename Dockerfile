# Usa un'immagine base con Node.js 18
FROM node:18

# Imposta la directory di lavoro
WORKDIR /usr/src/app

# Copia il package.json e il package-lock.json
COPY package*.json ./

# Installa le dipendenze del progetto e ts-node globalmente
RUN npm install && npm install -g ts-node typescript

# Copia tutto il codice sorgente nel container
COPY . .

# Espone la porta 8080 (opzionale, se il progetto lo richiede)
EXPOSE 8080

# Comando di default per mantenere il container in esecuzione
CMD [ "tail", "-f", "/dev/null" ]
