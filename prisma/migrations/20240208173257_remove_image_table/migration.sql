/*
  Warnings:

  - You are about to drop the column `imageId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `image` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_imageId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "imageId",
ADD COLUMN     "image" TEXT NOT NULL;

-- DropTable
DROP TABLE "Image";
