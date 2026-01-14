/*
  Warnings:

  - A unique constraint covering the columns `[guestId,variantId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `cartitem` DROP FOREIGN KEY `CartItem_userId_fkey`;

-- AlterTable
ALTER TABLE `carthistory` ADD COLUMN `guestId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `cartitem` ADD COLUMN `guestId` VARCHAR(191) NULL,
    MODIFY `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `userType` VARCHAR(191) NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX `CartItem_guestId_variantId_key` ON `CartItem`(`guestId`, `variantId`);

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
