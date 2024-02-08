/*
  Warnings:

  - You are about to drop the column `quantityInStock` on the `Product` table. All the data in the column will be lost.
  - Added the required column `stockId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StockType" AS ENUM ('KG', 'UNITY');

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "quantityInStock",
ADD COLUMN     "stockId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "QuantityInStock";

-- CreateTable
CREATE TABLE "Stock" (
    "id" TEXT NOT NULL,
    "type" "StockType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
