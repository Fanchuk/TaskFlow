/*
  Warnings:

  - You are about to drop the column `body` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "body",
ADD COLUMN     "fileName" TEXT,
ADD COLUMN     "fileType" TEXT,
ADD COLUMN     "fileUrl" TEXT,
ADD COLUMN     "receiverId" TEXT,
ADD COLUMN     "text" TEXT;

-- CreateIndex
CREATE INDEX "Message_receiverId_idx" ON "Message"("receiverId");
