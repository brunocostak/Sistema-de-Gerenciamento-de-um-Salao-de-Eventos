-- AlterTable
ALTER TABLE "events" ADD COLUMN     "event_password" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';
