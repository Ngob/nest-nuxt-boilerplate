# Planet Porpose - Experigame

View Makefile for your usual commands:

```
make db-mig-diff
make migrate
```

Respectively create a migration and run migration. Becarefull, it may run deleted migration (due to their existences in the /dist directory) or take deleted entities into account