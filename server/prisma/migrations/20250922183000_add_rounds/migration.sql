/*
  Warnings:

  - The primary key for the `Score` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `TapKey` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[roundId,userId]` on the table `Score` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Score" DROP CONSTRAINT "Score_pkey";

-- DropTable
DROP TABLE "public"."TapKey";

-- CreateIndex
CREATE UNIQUE INDEX "Score_roundId_userId_key" ON "public"."Score"("roundId", "userId");
