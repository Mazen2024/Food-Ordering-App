-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role" "UserRoles" NOT NULL DEFAULT 'USER';
