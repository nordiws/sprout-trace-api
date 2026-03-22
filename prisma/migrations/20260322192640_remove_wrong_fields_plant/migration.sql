/*
  Warnings:

  - You are about to drop the column `ec` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `humidity` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `lastWatered` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `nextWatering` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `nutrients` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `ph` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `temperature` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `training` on the `Plant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "ec",
DROP COLUMN "humidity",
DROP COLUMN "lastWatered",
DROP COLUMN "nextWatering",
DROP COLUMN "nutrients",
DROP COLUMN "ph",
DROP COLUMN "temperature",
DROP COLUMN "training";
