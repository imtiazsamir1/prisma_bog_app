/*
  Warnings:

  - Added the required column `type` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "access_token" TEXT,
ADD COLUMN     "expires_at" INTEGER,
ADD COLUMN     "id_token" TEXT,
ADD COLUMN     "refresh_token" TEXT,
ADD COLUMN     "scope" TEXT,
ADD COLUMN     "session_state" TEXT,
ADD COLUMN     "token_type" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "accounts_userId_idx" ON "accounts"("userId");
