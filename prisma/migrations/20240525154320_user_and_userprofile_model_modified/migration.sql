/*
  Warnings:

  - You are about to drop the column `availability` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `bloodType` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - Added the required column `bloodType` to the `userprofiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `userprofiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `userprofiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userprofiles" ADD COLUMN     "availability" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "bloodType" "BloodGroup" NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "availability",
DROP COLUMN "bloodType",
DROP COLUMN "location",
DROP COLUMN "name";
