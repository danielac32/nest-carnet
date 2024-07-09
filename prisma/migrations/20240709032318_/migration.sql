-- CreateTable
CREATE TABLE "userEntity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "rol" TEXT NOT NULL DEFAULT 'user',
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Department" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Civil_statuses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "State" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Municipalities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Parishes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Charge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Type_creations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "id_carnet" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Type_creations_id_carnet_fkey" FOREIGN KEY ("id_carnet") REFERENCES "Carnets" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Textures" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Skin_colors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Genders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Hair_colors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Access_levels" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Carnets" (
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
    "id_textures" INTEGER,
    "id_status" INTEGER,
    "id_access_levels" INTEGER,
    "id_genders" INTEGER,
    "id_hair_colors" INTEGER,
    "id_state" INTEGER,
    "municipalities" TEXT,
    "parishes" TEXT,
    "id_skin_colors" INTEGER,
    "id_civil_statuses" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Carnets_id_department_fkey" FOREIGN KEY ("id_department") REFERENCES "Department" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Carnets_id_charge_fkey" FOREIGN KEY ("id_charge") REFERENCES "Charge" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Carnets_id_textures_fkey" FOREIGN KEY ("id_textures") REFERENCES "Textures" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Carnets_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "Status" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Carnets_id_access_levels_fkey" FOREIGN KEY ("id_access_levels") REFERENCES "Access_levels" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Carnets_id_genders_fkey" FOREIGN KEY ("id_genders") REFERENCES "Genders" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Carnets_id_hair_colors_fkey" FOREIGN KEY ("id_hair_colors") REFERENCES "Hair_colors" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Carnets_id_state_fkey" FOREIGN KEY ("id_state") REFERENCES "State" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Carnets_id_skin_colors_fkey" FOREIGN KEY ("id_skin_colors") REFERENCES "Skin_colors" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Carnets_id_civil_statuses_fkey" FOREIGN KEY ("id_civil_statuses") REFERENCES "Civil_statuses" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "userEntity_email_key" ON "userEntity"("email");
