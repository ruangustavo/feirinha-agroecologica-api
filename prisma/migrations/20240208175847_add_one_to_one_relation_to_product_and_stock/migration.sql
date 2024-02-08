/*
  Warnings:

  - A unique constraint covering the columns `[stockId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_stockId_key" ON "Product"("stockId");
