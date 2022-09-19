CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"createdAt" DATE NOT NULL DEFAULT NOW()
);
CREATE TABLE "urls" (
	"id" SERIAL PRIMARY KEY,	
	"userId" INTEGER NOT NULL REFERENCES "users"("id")
    "urlDefault" TEXT NOT NULL,
	"urlShorted" TEXT NOT NULL UNIQUE,
	"views" INTEGER NOT NULL DEFAULT 0,
	"createdAt" DATE NOT NULL DEFAULT NOW(),
);
CREATE TABLE "sessions" (
	"id" SERIAL PRIMARY KEY,
	"userId" INTEGER NOT NULL REFERENCES "users"("id"),
	"token" TEXT NOT NULL UNIQUE,
	"createdAt" DATE NOT NULL DEFAULT NOW()
);