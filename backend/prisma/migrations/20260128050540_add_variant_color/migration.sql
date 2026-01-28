/*
  Warnings:

  - You are about to drop the column `variantId` on the `CartHistoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `variantId` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `variantId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Variant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,variantColorId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[guestId,variantColorId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `variantColorId` to the `CartHistoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variantColorId` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variantColorId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CartHistoryItem" DROP CONSTRAINT "CartHistoryItem_variantId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_variantId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_variantId_fkey";

-- DropIndex
DROP INDEX "CartItem_guestId_variantId_key";

-- DropIndex
DROP INDEX "CartItem_userId_variantId_key";

-- AlterTable
ALTER TABLE "CartHistoryItem" DROP COLUMN "variantId",
ADD COLUMN     "variantColorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "variantId",
ADD COLUMN     "variantColorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "variantId",
ADD COLUMN     "variantColorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "price",
DROP COLUMN "stock";

-- CreateTable
CREATE TABLE "Color" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hex" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VariantColor" (
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "variantId" TEXT NOT NULL,
    "colorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "VariantColor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VariantColor_variantId_colorId_key" ON "VariantColor"("variantId", "colorId");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_userId_variantColorId_key" ON "CartItem"("userId", "variantColorId");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_guestId_variantColorId_key" ON "CartItem"("guestId", "variantColorId");

-- AddForeignKey
ALTER TABLE "VariantColor" ADD CONSTRAINT "VariantColor_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantColor" ADD CONSTRAINT "VariantColor_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_variantColorId_fkey" FOREIGN KEY ("variantColorId") REFERENCES "VariantColor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartHistoryItem" ADD CONSTRAINT "CartHistoryItem_variantColorId_fkey" FOREIGN KEY ("variantColorId") REFERENCES "VariantColor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_variantColorId_fkey" FOREIGN KEY ("variantColorId") REFERENCES "VariantColor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
