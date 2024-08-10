/*
  Warnings:

  - Made the column `pin` on table `Device` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Device" ALTER COLUMN "pin" SET NOT NULL;
