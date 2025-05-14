-- CreateEnum
CREATE TYPE "PlayerStatus" AS ENUM ('NO_TEAM', 'PENDING', 'APPROVED');

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "status" "PlayerStatus" NOT NULL DEFAULT 'NO_TEAM';
