-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guilds" (
    "id" TEXT NOT NULL,
    "prefix" TEXT NOT NULL DEFAULT E'mx!',

    PRIMARY KEY ("id")
);
