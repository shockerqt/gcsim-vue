CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`discordId` text NOT NULL,
	`name` text NOT NULL,
	`avatar` text NOT NULL,
	`role` text DEFAULT 'user' NOT NULL
);
