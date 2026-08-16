# 1 - Build du site jekyll

FROM ruby:3.3-alpine AS builder

WORKDIR /app

# dépendances pour jekyll, pas important
RUN apk add --no-cache \
    build-base \
    git \
    yaml-dev \
    libffi-dev

# copier d'abord les fichiers de dépendances pour profiter du cache de docker
COPY Gemfile Gemfile.lock ./

# installer les gems du projet
RUN bundle install

# copier le reste du projet
COPY . .

# Générer le site statique dans app/_site
RUN bundle exec jekyll build

# 2 - Serveur Nginx

FROM nginx:alpine

# Prend le résultat de Jekyll et le met dans le dossier que Nginx utilise par défaut pour servir des fichiers web
COPY --from=builder /app/_site/ /usr/share/nginx/html/

EXPOSE 80
