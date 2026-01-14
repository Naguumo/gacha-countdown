CREATE TYPE "game_platform" AS ENUM('ios', 'android', 'pc', 'console');--> statement-breakpoint
CREATE TYPE "game_status" AS ENUM('upcoming', 'beta', 'released', 'end_of_service');--> statement-breakpoint
CREATE TABLE "gacha_games" (
	"id" uuid PRIMARY KEY,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"developer" text NOT NULL,
	"release" text NOT NULL,
	"image_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"status" "game_status" DEFAULT 'upcoming'::"game_status" NOT NULL,
	"platforms" "game_platform"[]
);
--> statement-breakpoint
ALTER TABLE "gacha_games" ENABLE ROW LEVEL SECURITY;