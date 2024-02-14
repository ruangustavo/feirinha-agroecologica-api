/*
  Warnings:

  - You are about to drop the column `stockId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Stock` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `stockQuantity` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stockUnit` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StockUnit" AS ENUM ('KG', 'UNITY');

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_stockId_fkey";

-- DropIndex
DROP INDEX "Product_stockId_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "stockId",
ADD COLUMN     "stockQuantity" INTEGER NOT NULL,
ADD COLUMN     "stockUnit" "StockUnit" NOT NULL;

-- DropTable
DROP TABLE "Stock";

-- DropEnum
DROP TYPE "StockType";
