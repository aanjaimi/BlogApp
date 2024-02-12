NPM=npm
PRISMA=npx prisma

up:
	$(PRISMA) generate
	$(PRISMA) db push
	$(NPM) install 
	$(NPM) run build 
	$(NPM) run start

dev:
	$(PRISMA) generate
	$(PRISMA) db push
	$(NPM) install
	$(NPM) run dev