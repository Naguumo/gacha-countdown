CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY
);
--> statement-breakpoint
ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
-- Commented since this table is controlled by Supabase Auth
-- CREATE TABLE "auth"."users" (
-- 	"id" uuid PRIMARY KEY
-- );
--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_id_users_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;
