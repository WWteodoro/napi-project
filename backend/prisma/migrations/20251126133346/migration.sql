-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Animal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Animal" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "Animal";
DROP TABLE "Animal";
ALTER TABLE "new_Animal" RENAME TO "Animal";
CREATE TABLE "new_AnimalList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_AnimalList" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "AnimalList";
DROP TABLE "AnimalList";
ALTER TABLE "new_AnimalList" RENAME TO "AnimalList";
CREATE TABLE "new_animalMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "animalId" TEXT NOT NULL,
    "animalListId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "animalMember_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "animalMember_animalListId_fkey" FOREIGN KEY ("animalListId") REFERENCES "AnimalList" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_animalMember" ("animalId", "animalListId", "createdAt", "id", "updatedAt") SELECT "animalId", "animalListId", "createdAt", "id", "updatedAt" FROM "animalMember";
DROP TABLE "animalMember";
ALTER TABLE "new_animalMember" RENAME TO "animalMember";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
