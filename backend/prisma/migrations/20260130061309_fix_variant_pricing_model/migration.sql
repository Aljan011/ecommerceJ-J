/*
  Warnings:

  - You are about to drop the column `price` on the `VariantColor` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `VariantColor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VariantColor" DROP COLUMN "price",
DROP COLUMN "stock";
