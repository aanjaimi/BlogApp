NPM=npm
PRISMA=npx prisma

# production mode
up:
	$(PRISMA) generate
	$(PRISMA) db push
	$(NPM) install 
	$(NPM) run vercel-build 
	$(NPM) run start

# development mode
dev:
	$(PRISMA) generate
	$(PRISMA) db push
	$(NPM) install
	$(NPM) run dev