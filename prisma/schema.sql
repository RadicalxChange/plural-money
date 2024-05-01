CREATE TABLE "public"."Account" (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255),
    is_member BOOLEAN NOT NULL DEFAULT FALSE,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE "public"."Transaction" (
    id SERIAL PRIMARY KEY NOT NULL,
    amount INTEGER NOT NULL,
    message VARCHAR,
    sender INTEGER NOT NULL,
    recipient INTEGER NOT NULL,
    FOREIGN KEY ("sender") REFERENCES "public"."Account"(id),
    FOREIGN KEY ("recipient") REFERENCES "public"."Account"(id)
);