/*
  Warnings:

  - Added the required column `paymentMethod` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderPaymentMethod" AS ENUM ('PIX', 'MONEY');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentMethod" "OrderPaymentMethod" NOT NULL;
