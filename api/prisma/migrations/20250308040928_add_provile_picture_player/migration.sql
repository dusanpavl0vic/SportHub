/*
  Warnings:

  - You are about to drop the column `BirthDate` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `City` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `City` on the `Team` table. All the data in the column will be lost.
  - Added the required column `city` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "BirthDate",
DROP COLUMN "City",
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "profilePicture" TEXT;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "City",
ADD COLUMN     "city" TEXT NOT NULL,
ALTER COLUMN "profilePicture" DROP NOT NULL,
ALTER COLUMN "coachName" DROP NOT NULL,
ALTER COLUMN "coachPhoneNumber" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL;
