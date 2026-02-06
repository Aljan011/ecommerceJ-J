-- AlterTable
ALTER TABLE "Color" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ProductImage" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "VariantColorPackPrice" ADD COLUMN     "deletedAt" TIMESTAMP(3);
