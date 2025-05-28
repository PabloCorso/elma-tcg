-- CreateTable
CREATE TABLE "Card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cardType" TEXT NOT NULL,
    "type1" TEXT,
    "type2" TEXT,
    "pr1" REAL,
    "pr2" REAL,
    "pr3" REAL,
    "pr4" REAL,
    "pr5" REAL,
    "pr6" REAL,
    "battleLengthMin" INTEGER,
    "battleLengthMax" INTEGER,
    "flavorText" TEXT,
    "rarity" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Effect" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "text" TEXT,
    "italicText" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_CardToEffect" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CardToEffect_A_fkey" FOREIGN KEY ("A") REFERENCES "Card" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CardToEffect_B_fkey" FOREIGN KEY ("B") REFERENCES "Effect" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Effect_name_key" ON "Effect"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CardToEffect_AB_unique" ON "_CardToEffect"("A", "B");

-- CreateIndex
CREATE INDEX "_CardToEffect_B_index" ON "_CardToEffect"("B");
