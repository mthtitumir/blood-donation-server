/*
  Warnings:

  - The values [APPROVED] on the enum `RequestStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RequestStatus_new" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');
ALTER TABLE "requests" ALTER COLUMN "requestStatus" DROP DEFAULT;
ALTER TABLE "requests" ALTER COLUMN "requestStatus" TYPE "RequestStatus_new" USING ("requestStatus"::text::"RequestStatus_new");
ALTER TYPE "RequestStatus" RENAME TO "RequestStatus_old";
ALTER TYPE "RequestStatus_new" RENAME TO "RequestStatus";
DROP TYPE "RequestStatus_old";
ALTER TABLE "requests" ALTER COLUMN "requestStatus" SET DEFAULT 'PENDING';
COMMIT;
