-- CreateEnum
CREATE TYPE "EnergyLevel" AS ENUM ('Low', 'Moderate', 'Medium', 'High', 'VeryHigh');

-- CreateEnum
CREATE TYPE "LevelOfIndependence" AS ENUM ('Low', 'Moderate', 'Medium', 'High', 'VeryHigh');

-- CreateEnum
CREATE TYPE "Environment" AS ENUM ('Small', 'Medium', 'big');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('Tiny', 'Small', 'Medium', 'big', 'VeryLarge');

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT,
    "age" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "energyLevel" "EnergyLevel" NOT NULL,
    "levelOfIndependence" "LevelOfIndependence" NOT NULL,
    "environment" "Environment" NOT NULL,
    "organization_id" TEXT NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "file_name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Requirement" (
    "id" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "pet_id" TEXT,

    CONSTRAINT "Requirement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_email_key" ON "Organization"("email");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requirement" ADD CONSTRAINT "Requirement_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
