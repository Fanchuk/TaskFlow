/*
  Warnings:

  - You are about to drop the `ProjectActivity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectActivity" DROP CONSTRAINT "ProjectActivity_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectActivity" DROP CONSTRAINT "ProjectActivity_userId_fkey";

-- DropIndex
DROP INDEX "Task_assigneeId_idx";

-- DropIndex
DROP INDEX "Task_projectId_idx";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "startDate" TIMESTAMP(3);

-- DropTable
DROP TABLE "ProjectActivity";
