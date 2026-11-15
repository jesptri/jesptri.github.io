# Portfolio — événements dans les logs des Pods

Le navigateur envoie deux types d'événements à Nginx : `arrival` au chargement
initial de chaque page et `click` sur les liens principaux (navigation, LinkedIn,
GitHub, CV, email, projets, articles et démo). Nginx répond 204 et écrit un JSON sur
stdout. Aucun backend, base de données ou service externe n'est ajouté.

Exemple de clic sur le dépôt GitHub d'un projet :

```json
{"type":"portfolio_event","timestamp":"2026-11-15T12:00:00+00:00","pod":"jules-website-xxx","event":"click","page":"projects","target":"github","content":"hpc-cuda","view_id":"a6be92219aed4c9fb0066cd8068f6081","browser":"Firefox","os":"Linux","device":"desktop_or_other","language":"fr","source":"direct"}
```

- `view_id` : identifiant aléatoire du chargement de page, commun à son arrivée et
  ses clics. Il change au rechargement ou à la navigation. Ce n'est pas une identité
  ni un identifiant persistant de visiteur ; pas de cookie ni de stockage local.
- `page` : onglet ou identifiant public de l'article affiché.
- `target` : action choisie ; `content` précise le projet ou l'article.
- `browser`, `os`, `device`, `language` : catégories déduites des en-têtes HTTP,
  approximatives et falsifiables. Aucun User-Agent brut n'est conservé.
- `source` : direct, internal, external, google, linkedin, github ou unknown.
  La provenance peut être absente selon les protections du navigateur.

Aucune mesure de durée, d'activité ou de départ. Une arrivée correspond à une
**page chargée**, pas à un visiteur unique. L'identité, l'IP, les URLs complètes,
les paramètres d'URL, les cookies, les tokens et le contenu des formulaires ne
font pas partie du format d'événement. Les paramètres reçus sont réduits côté
Nginx à des listes de libellés publics autorisés. Les accès HTTP généraux sont
silencieux pour éviter le format par défaut contenant IP, URL et Referer.
Les diagnostics natifs Nginx restent indépendants de ces événements.

`navigator.sendBeacon()` envoie un POST sans attendre sa réponse lors d'un clic ;
un repli fetch keepalive est prévu. Le clic n'est ni bloqué ni retardé. Les
événements peuvent manquer (JavaScript désactivé, réseau, bloqueur) ou être
falsifiés : ce n'est pas un journal d'audit ni une statistique exhaustive.

## Tester localement (Docker Desktop démarré)

```powershell
docker build -t jules-website:events .
docker run --rm jules-website:events nginx -t
docker run --rm --name portfolio-events -p 127.0.0.1:8080:80 jules-website:events
```

Dans un autre terminal :

```powershell
docker logs -f portfolio-events
```

Ouvrir http://127.0.0.1:8080, puis cliquer sur LinkedIn, le CV, un projet, un onglet
et la vidéo. Attendre une arrivée, puis les événements de clic correspondants.
Dans DevTools → Network, filtrer `__events` : les réponses doivent être 204.
Le JavaScript ne se contente plus de `console.info()` : les événements sont envoyés
au serveur, puis consultables dans Docker/Kubernetes, pas dans la console JS.
Un simple serveur Jekyll ou GitHub Pages ne fournit pas le point de réception.

Tester les listes autorisées avec des valeurs factices :

```powershell
curl.exe -i -X POST "http://127.0.0.1:8080/__events?event=click&page=projects&target=github&content=hpc-cuda&view=a6be92219aed4c9fb0066cd8068f6081&source=direct"
curl.exe -i -X POST "http://127.0.0.1:8080/__events?event=click&page=FAKE_SECRET&target=FAKE_SECRET&content=FAKE_SECRET&source=FAKE_SECRET"
curl.exe -i "http://127.0.0.1:8080/__events?event=click"
```

Attendre 204, 204 puis 400. Dans le deuxième événement, les champs deviennent
other/none/unknown ; `FAKE_SECRET` ne doit pas apparaître dans les événements.

## Publier puis consulter sur le VPS

```powershell
docker tag jules-website:events ghcr.io/jesptri/website:events-1
docker push ghcr.io/jesptri/website:events-1
```

Sur le VPS, avec le Secret GHCR privé déjà configuré :

```bash
sudo k3s kubectl -n portfolio set image deployment/jules-website jules-website=ghcr.io/jesptri/website:events-1
sudo k3s kubectl -n portfolio rollout status deployment/jules-website --timeout=180s
sudo k3s kubectl -n portfolio logs -l app=jules-website -c jules-website --prefix=true --tail=30 -f --max-log-requests=5
```

Le sélecteur inclut les deux réplicas. L'arrivée et le clic peuvent être reçus par
**des Pods différents** ; leur view_id reste identique sur une même page. Filtrer
sur `portfolio_event` pour isoler les événements. Relancer le suivi après un rollout.
Les logs sont soumis à rotation et ne sont pas archivés par cette solution.
Le routage Ingress existant `/` inclut déjà `/__events` : aucune modification de
Traefik, cert-manager ou des Services n'est nécessaire. Reporter le tag validé dans
`k8s/vps/deployment.yaml` pour garder Git cohérent ; aucun déploiement n'est effectué
par la modification des sources seule.

Pour ajouter des projets/articles, mettre à jour les listes de `nginx/default.conf`
avec leurs identifiants publics (sinon ils apparaissent comme other/none).

Références : [sendBeacon](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon),
[logs Nginx](https://nginx.org/en/docs/http/ngx_http_log_module.html),
[maps Nginx](https://nginx.org/en/docs/http/ngx_http_map_module.html).
