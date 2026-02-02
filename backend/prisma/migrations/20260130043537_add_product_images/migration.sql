/*
  Warnings:

  - You are about to drop the column `variantColorId` on the `CartHistoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `variantColorId` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `variantColorId` on the `OrderItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Color` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `variantColorPackPriceId` to the `CartHistoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variantColorPackPriceId` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variantColorPackPriceId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CartHistoryItem" DROP CONSTRAINT "CartHistoryItem_variantColorId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_variantColorId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_variantColorId_fkey";

-- DropIndex
DROP INDEX "CartItem_guestId_variantColorId_key";

-- DropIndex
DROP INDEX "CartItem_userId_variantColorId_key";

-- DropIndex
DROP INDEX "VariantColor_variantId_colorId_key";

-- AlterTable
ALTER TABLE "CartHistoryItem" DROP COLUMN "variantColorId",
ADD COLUMN     "variantColorPackPriceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "variantColorId",
ADD COLUMN     "variantColorPackPriceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "variantColorId",
ADD COLUMN     "variantColorPackPriceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VariantColor" ALTER COLUMN "stock" DROP DEFAULT;

-- CreateTable
CREATE TABLE "ProductImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCommonUse" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductCommonUse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductFeature" (
    "id" TEXT NOT NULL,
    "feature" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductFAQ" (
    "id" TEXT NOT NULL,
    "q" TEXT NOT NULL,
    "a" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductFAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductConclusion" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductConclusion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VariantColorPackPrice" (
    "id" TEXT NOT NULL,
    "packSize" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,
    "variantColorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VariantColorPackPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductConclusion_productId_key" ON "ProductConclusion"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Color_name_key" ON "Color"("name");

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCommonUse" ADD CONSTRAINT "ProductCommonUse_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductFeature" ADD CONSTRAINT "ProductFeature_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductFAQ" ADD CONSTRAINT "ProductFAQ_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductConclusion" ADD CONSTRAINT "ProductConclusion_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantColorPackPrice" ADD CONSTRAINT "VariantColorPackPrice_variantColorId_fkey" FOREIGN KEY ("variantColorId") REFERENCES "VariantColor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_variantColorPackPriceId_fkey" FOREIGN KEY ("variantColorPackPriceId") REFERENCES "VariantColorPackPrice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartHistoryItem" ADD CONSTRAINT "CartHistoryItem_variantColorPackPriceId_fkey" FOREIGN KEY ("variantColorPackPriceId") REFERENCES "VariantColorPackPrice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_variantColorPackPriceId_fkey" FOREIGN KEY ("variantColorPackPriceId") REFERENCES "VariantColorPackPrice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
