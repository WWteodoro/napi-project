/*
  Warnings:

  - You are about to drop the column `location` on the `Note` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" REAL NOT NULL,
    "dateTime" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "animal" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "time" REAL NOT NULL,
    "videoId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Note_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Note" ("animal", "content", "createdAt", "dateTime", "id", "quantity", "time", "updatedAt", "userId", "videoId") SELECT "animal", "content", "createdAt", "dateTime", "id", "quantity", "time", "updatedAt", "userId", "videoId" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
CREATE UNIQUE INDEX "Note_videoId_key" ON "Note"("videoId");
CREATE TABLE "new_Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "animalListId" TEXT NOT NULL,
    "totalVideos" INTEGER NOT NULL DEFAULT 0,
    "processedVideos" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "placeId" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_animalListId_fkey" FOREIGN KEY ("animalListId") REFERENCES "AnimalList" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Session_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("animalListId", "createdAt", "id", "name", "processedVideos", "totalVideos", "updatedAt", "userId") SELECT "animalListId", "createdAt", "id", "name", "processedVideos", "totalVideos", "updatedAt", "userId" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
CREATE TABLE "new_Video" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "hasAnimals" BOOLEAN NOT NULL,
    "isAnnotated" BOOLEAN NOT NULL DEFAULT false,
    "frameStride" INTEGER NOT NULL DEFAULT 1,
    "totalFrames" INTEGER NOT NULL,
    "fps" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Video_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Video" ("createdAt", "fps", "frameStride", "hasAnimals", "id", "sessionId", "totalFrames", "updatedAt", "url") SELECT "createdAt", "fps", "frameStride", "hasAnimals", "id", "sessionId", "totalFrames", "updatedAt", "url" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Place_name_key" ON "Place"("name");
