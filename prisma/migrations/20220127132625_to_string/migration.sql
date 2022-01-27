-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_authorId_fkey";

-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "authorId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
