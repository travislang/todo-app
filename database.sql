CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"note" VARCHAR(250) NOT NULL,
	"completed" BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO "tasks"("note")
VALUES ('walk the dog');

INSERT INTO "tasks"("note")
VALUES ('take out the trash');

INSERT INTO "tasks" ("note")
VALUES ('Do the dishes');