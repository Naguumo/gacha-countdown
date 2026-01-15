ALTER TABLE "gacha_games" ALTER COLUMN "platforms" SET DEFAULT '{}'::"game_platform"[];--> statement-breakpoint
ALTER TABLE "gacha_games" ALTER COLUMN "platforms" SET NOT NULL;