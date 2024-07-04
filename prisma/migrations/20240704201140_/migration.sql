/*
  Warnings:

  - You are about to drop the column `id_access_levels` on the `Access_levels` table. All the data in the column will be lost.
  - You are about to drop the column `id_charge` on the `Charge` table. All the data in the column will be lost.
  - You are about to drop the column `id_civil_statuses` on the `Civil_statuses` table. All the data in the column will be lost.
  - You are about to drop the column `id_department` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `id_genders` on the `Genders` table. All the data in the column will be lost.
  - You are about to drop the column `id_hair_colors` on the `Hair_colors` table. All the data in the column will be lost.
  - You are about to drop the column `id_municipalities` on the `Municipalities` table. All the data in the column will be lost.
  - You are about to drop the column `id_parishes` on the `Parishes` table. All the data in the column will be lost.
  - You are about to drop the column `id_skin_colors` on the `Skin_colors` table. All the data in the column will be lost.
  - You are about to drop the column `id_state` on the `State` table. All the data in the column will be lost.
  - You are about to drop the column `id_status` on the `Status` table. All the data in the column will be lost.
  - You are about to drop the column `id_textures` on the `Textures` table. All the data in the column will be lost.
  - You are about to drop the column `id_type_creations` on the `Type_creations` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Access_levels" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Access_levels" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "Access_levels";
DROP TABLE "Access_levels";
ALTER TABLE "new_Access_levels" RENAME TO "Access_levels";
CREATE TABLE "new_Carnets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "lastname" TEXT,
    "card_code" TEXT,
    "expiration" DATETIME NOT NULL,
    "note" TEXT,
    "cedule" TEXT,
    "extent" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "cellpone" TEXT,
    "photo" TEXT,
    "qr" TEXT,
    "id_department" INTEGER,
    "id_charge" INTEGER,
    "id_type_creations" INTEGER,
    "id_textures" INTEGER,
    "id_status" INTEGER,
    "id_access_levels" INTEGER,
    "id_genders" INTEGER,
    "id_hair_colors" INTEGER,
    "id_state" INTEGER,
    "id_skin_colors" INTEGER,
    "id_civil_statuses" INTEGER,
    "id_municipalities" INTEGER,
    "id_parishes" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Carnets_id_department_fkey" FOREIGN KEY ("id_department") REFERENCES "Department" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Carnets_id_charge_fkey" FOREIGN KEY ("id_charge") REFERENCES "Charge" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Carnets_id_type_creations_fkey" FOREIGN KEY ("id_type_creations") REFERENCES "Type_creations" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Carnets_id_textures_fkey" FOREIGN KEY ("id_textures") REFERENCES "Textures" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Carnets_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "Status" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Carnets_id_access_levels_fkey" FOREIGN KEY ("id_access_levels") REFERENCES "Access_levels" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Carnets_id_genders_fkey" FOREIGN KEY ("id_genders") REFERENCES "Genders" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Carnets_id_department_fkey" FOREIGN KEY ("id_department") REFERENCES "Hair_colors" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Carnets_id_state_fkey" FOREIGN KEY ("id_state") REFERENCES "State" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Carnets_id_skin_colors_fkey" FOREIGN KEY ("id_skin_colors") REFERENCES "Skin_colors" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Carnets_id_civil_statuses_fkey" FOREIGN KEY ("id_civil_statuses") REFERENCES "Civil_statuses" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Carnets_id_municipalities_fkey" FOREIGN KEY ("id_municipalities") REFERENCES "Municipalities" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Carnets_id_parishes_fkey" FOREIGN KEY ("id_parishes") REFERENCES "Parishes" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Carnets" ("address", "card_code", "cedule", "cellpone", "created_at", "expiration", "extent", "id", "lastname", "name", "note", "phone", "photo", "qr", "updated_at") SELECT "address", "card_code", "cedule", "cellpone", "created_at", "expiration", "extent", "id", "lastname", "name", "note", "phone", "photo", "qr", "updated_at" FROM "Carnets";
DROP TABLE "Carnets";
ALTER TABLE "new_Carnets" RENAME TO "Carnets";
CREATE TABLE "new_Charge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Charge" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "Charge";
DROP TABLE "Charge";
ALTER TABLE "new_Charge" RENAME TO "Charge";
CREATE TABLE "new_Civil_statuses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Civil_statuses" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "Civil_statuses";
DROP TABLE "Civil_statuses";
ALTER TABLE "new_Civil_statuses" RENAME TO "Civil_statuses";
CREATE TABLE "new_Department" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Department" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "Department";
DROP TABLE "Department";
ALTER TABLE "new_Department" RENAME TO "Department";
CREATE TABLE "new_Genders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Genders" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "Genders";
DROP TABLE "Genders";
ALTER TABLE "new_Genders" RENAME TO "Genders";
CREATE TABLE "new_Hair_colors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Hair_colors" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "Hair_colors";
DROP TABLE "Hair_colors";
ALTER TABLE "new_Hair_colors" RENAME TO "Hair_colors";
CREATE TABLE "new_Municipalities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Municipalities" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "Municipalities";
DROP TABLE "Municipalities";
ALTER TABLE "new_Municipalities" RENAME TO "Municipalities";
CREATE TABLE "new_Parishes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Parishes" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "Parishes";
DROP TABLE "Parishes";
ALTER TABLE "new_Parishes" RENAME TO "Parishes";
CREATE TABLE "new_Skin_colors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Skin_colors" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "Skin_colors";
DROP TABLE "Skin_colors";
ALTER TABLE "new_Skin_colors" RENAME TO "Skin_colors";
CREATE TABLE "new_State" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_State" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "State";
DROP TABLE "State";
ALTER TABLE "new_State" RENAME TO "State";
CREATE TABLE "new_Status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Status" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "Status";
DROP TABLE "Status";
ALTER TABLE "new_Status" RENAME TO "Status";
CREATE TABLE "new_Textures" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Textures" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "Textures";
DROP TABLE "Textures";
ALTER TABLE "new_Textures" RENAME TO "Textures";
CREATE TABLE "new_Type_creations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Type_creations" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "Type_creations";
DROP TABLE "Type_creations";
ALTER TABLE "new_Type_creations" RENAME TO "Type_creations";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
