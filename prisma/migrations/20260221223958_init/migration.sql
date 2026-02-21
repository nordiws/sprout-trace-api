-- CreateEnum
CREATE TYPE "NutrientApplicationMethod" AS ENUM ('SOIL', 'FOLIAR', 'HYDROPONIC');

-- CreateEnum
CREATE TYPE "TrainingTechnique" AS ENUM ('TOPPING', 'FIM', 'LST', 'HST', 'SCROG', 'DEFOLIATION');

-- CreateEnum
CREATE TYPE "TrainingIntensity" AS ENUM ('LIGHT', 'MODERATE', 'AGGRESSIVE');

-- CreateEnum
CREATE TYPE "PestType" AS ENUM ('MITES', 'THRIPS', 'APHIDS', 'FUNGUS_GNATS', 'MOLD', 'MILDEW', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "PestSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "TreatmentType" AS ENUM ('ROOT_STIMULANT', 'FUNGICIDE', 'INSECTICIDE', 'HORMONE', 'STRESS_RECOVERY', 'DEFICIENCY_CORRECTION');

-- CreateEnum
CREATE TYPE "PlantGrowthLogType" AS ENUM ('MEASUREMENT', 'NUTRIENTS', 'SPECIAL_TREATMENT', 'PEST_ISSUE', 'TRAINING');

-- CreateEnum
CREATE TYPE "PlantStatus" AS ENUM ('SEEDLING', 'VEGETATIVE', 'FLOWERING', 'READY_TO_HARVEST', 'HARVESTED');

-- CreateEnum
CREATE TYPE "PlantHealth" AS ENUM ('EXCELLENT', 'GOOD', 'FAIR', 'POOR');

-- CreateEnum
CREATE TYPE "PlantPhase" AS ENUM ('SEEDLING', 'VEGETATIVE', 'FLOWERING');

-- CreateEnum
CREATE TYPE "StrainType" AS ENUM ('INDICA', 'SATIVA', 'HYBRID', 'INDICA_DOMINANT', 'SATIVA_DOMINANT');

-- CreateEnum
CREATE TYPE "HarvestStatus" AS ENUM ('COMPLETED', 'IN_PROGRESS');

-- CreateEnum
CREATE TYPE "HarvestType" AS ENUM ('FOTO_PERIODICA', 'AUTOMATICA');

-- CreateEnum
CREATE TYPE "QualityGrade" AS ENUM ('PREMIUM', 'EXCELLENT', 'GOOD', 'FAIR', 'POOR');

-- CreateEnum
CREATE TYPE "GrowDifficulty" AS ENUM ('EASY', 'MODERATE', 'DIFFICULT');

-- CreateEnum
CREATE TYPE "YieldLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "HarvestTimelineEvent" AS ENUM ('SEED_PLANTED', 'PLANTED_IN_POT', 'MOVED_TO_SOIL', 'VEGETATIVE_STARTED', 'FLOWERING_STARTED', 'HARVEST_STARTED', 'WET_TRIM_COMPLETE', 'DRYING_STARTED', 'DRYING_COMPLETE', 'DRY_TRIM', 'CURING_STARTED', 'CURING_COMPLETE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "email" TEXT,
    "telephone" TEXT,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Strain" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "StrainType" NOT NULL,
    "genetics" TEXT NOT NULL,
    "thc" TEXT NOT NULL,
    "cbd" TEXT NOT NULL,
    "floweringTime" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dateAdded" TIMESTAMP(3) NOT NULL,
    "origin" TEXT,
    "breeder" TEXT,
    "difficulty" "GrowDifficulty",
    "yield" "YieldLevel",
    "preferredEnv" TEXT,
    "resistance" TEXT,
    "growthPattern" TEXT,
    "gennetics" TEXT,
    "effects" TEXT,
    "terpenes" TEXT,
    "medicalUses" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Strain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seed" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nombreCultivar" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "harvestYear" TEXT NOT NULL,
    "inscriptionCode" TEXT NOT NULL,
    "flavour" TEXT NOT NULL,
    "daysTillHarvest" TEXT NOT NULL,
    "dateAdded" TIMESTAMP(3) NOT NULL,
    "totalSeeds" INTEGER NOT NULL,
    "germinationRate" TEXT,
    "supplier" TEXT,
    "batchNumber" TEXT,
    "feminized" BOOLEAN,
    "autoflowering" BOOLEAN,
    "viabilityTest" TEXT,
    "storageConditions" TEXT,
    "expirationDate" TIMESTAMP(3),
    "parentGeneration" TEXT,
    "collectionMethod" TEXT,
    "processingDate" TIMESTAMP(3),
    "flavorProfile" TEXT,
    "strainId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Seed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Harvest" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "status" "HarvestStatus" NOT NULL,
    "harvestType" "HarvestType" NOT NULL,
    "notes" TEXT,
    "harvestMethod" TEXT,
    "dryingMethod" TEXT,
    "dryingLocation" TEXT,
    "curingMethod" TEXT,
    "qualityGrade" "QualityGrade",
    "totalYield" TEXT,
    "dryingTemperature" TEXT,
    "dryingHumidity" TEXT,
    "moistureContent" TEXT,
    "trimLoss" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Harvest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HarvestTimeline" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "event" "HarvestTimelineEvent" NOT NULL,
    "description" TEXT,
    "harvestId" TEXT NOT NULL,

    CONSTRAINT "HarvestTimeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plant" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" "PlantStatus" NOT NULL,
    "plantedDate" TIMESTAMP(3) NOT NULL,
    "floweringDate" TIMESTAMP(3),
    "expectedHarvest" TIMESTAMP(3) NOT NULL,
    "height" INTEGER,
    "health" "PlantHealth" NOT NULL,
    "location" TEXT NOT NULL,
    "notes" TEXT,
    "image" TEXT,
    "age" INTEGER,
    "currentWeek" TEXT,
    "lightCycle" TEXT,
    "nutrients" TEXT,
    "ph" TEXT,
    "ec" TEXT,
    "temperature" TEXT,
    "humidity" TEXT,
    "training" TEXT,
    "lastWatered" TIMESTAMP(3),
    "nextWatering" TIMESTAMP(3),
    "expectedFlowering" TIMESTAMP(3),
    "potSize" TEXT,
    "wetWeight" TEXT,
    "dryWeight" TEXT,
    "quality" "QualityGrade",
    "strainId" TEXT NOT NULL,
    "harvestId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "seedId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantGrowthLog" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "PlantGrowthLogType" NOT NULL,
    "phase" "PlantPhase" NOT NULL,
    "notes" TEXT,
    "plantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlantGrowthLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrowthMeasurement" (
    "id" TEXT NOT NULL,
    "heightCm" INTEGER,
    "widthCm" INTEGER,
    "nodeCount" INTEGER,
    "leafColor" TEXT,
    "vigorScore" INTEGER,
    "temperature" TEXT,
    "humidity" TEXT,
    "ph" TEXT,
    "ec" TEXT,
    "logId" TEXT NOT NULL,

    CONSTRAINT "GrowthMeasurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NutrientLog" (
    "id" TEXT NOT NULL,
    "nutrientName" TEXT NOT NULL,
    "brand" TEXT,
    "dosage" TEXT NOT NULL,
    "method" "NutrientApplicationMethod" NOT NULL,
    "phAdjusted" BOOLEAN,
    "ecValue" TEXT,
    "runoffObserved" BOOLEAN,
    "logId" TEXT NOT NULL,

    CONSTRAINT "NutrientLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreatmentLog" (
    "id" TEXT NOT NULL,
    "treatmentType" "TreatmentType" NOT NULL,
    "productName" TEXT,
    "reason" TEXT NOT NULL,
    "dosage" TEXT,
    "appliedBy" TEXT,
    "logId" TEXT NOT NULL,

    CONSTRAINT "TreatmentLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PestLog" (
    "id" TEXT NOT NULL,
    "pestType" "PestType" NOT NULL,
    "severity" "PestSeverity" NOT NULL,
    "affectedArea" TEXT,
    "symptoms" TEXT NOT NULL,
    "actionTaken" TEXT,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "logId" TEXT NOT NULL,

    CONSTRAINT "PestLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingLog" (
    "id" TEXT NOT NULL,
    "technique" "TrainingTechnique" NOT NULL,
    "intensity" "TrainingIntensity",
    "description" TEXT,
    "logId" TEXT NOT NULL,

    CONSTRAINT "TrainingLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_externalId_key" ON "User"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_id_idx" ON "User"("id");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_externalId_idx" ON "User"("externalId");

-- CreateIndex
CREATE INDEX "User_active_idx" ON "User"("active");

-- CreateIndex
CREATE UNIQUE INDEX "Strain_code_key" ON "Strain"("code");

-- CreateIndex
CREATE INDEX "Strain_code_idx" ON "Strain"("code");

-- CreateIndex
CREATE INDEX "Strain_userId_idx" ON "Strain"("userId");

-- CreateIndex
CREATE INDEX "Strain_userId_active_idx" ON "Strain"("userId", "active");

-- CreateIndex
CREATE UNIQUE INDEX "Strain_userId_name_key" ON "Strain"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Seed_code_key" ON "Seed"("code");

-- CreateIndex
CREATE INDEX "Seed_code_idx" ON "Seed"("code");

-- CreateIndex
CREATE INDEX "Seed_userId_idx" ON "Seed"("userId");

-- CreateIndex
CREATE INDEX "Seed_strainId_idx" ON "Seed"("strainId");

-- CreateIndex
CREATE INDEX "Seed_userId_active_idx" ON "Seed"("userId", "active");

-- CreateIndex
CREATE UNIQUE INDEX "Harvest_code_key" ON "Harvest"("code");

-- CreateIndex
CREATE INDEX "Harvest_code_idx" ON "Harvest"("code");

-- CreateIndex
CREATE INDEX "Harvest_userId_idx" ON "Harvest"("userId");

-- CreateIndex
CREATE INDEX "Harvest_userId_active_createdAt_idx" ON "Harvest"("userId", "active", "createdAt");

-- CreateIndex
CREATE INDEX "HarvestTimeline_harvestId_idx" ON "HarvestTimeline"("harvestId");

-- CreateIndex
CREATE UNIQUE INDEX "Plant_code_key" ON "Plant"("code");

-- CreateIndex
CREATE INDEX "Plant_code_idx" ON "Plant"("code");

-- CreateIndex
CREATE INDEX "Plant_userId_idx" ON "Plant"("userId");

-- CreateIndex
CREATE INDEX "Plant_seedId_idx" ON "Plant"("seedId");

-- CreateIndex
CREATE INDEX "Plant_strainId_idx" ON "Plant"("strainId");

-- CreateIndex
CREATE INDEX "Plant_harvestId_idx" ON "Plant"("harvestId");

-- CreateIndex
CREATE INDEX "Plant_userId_active_idx" ON "Plant"("userId", "active");

-- CreateIndex
CREATE INDEX "PlantGrowthLog_plantId_idx" ON "PlantGrowthLog"("plantId");

-- CreateIndex
CREATE INDEX "PlantGrowthLog_type_idx" ON "PlantGrowthLog"("type");

-- CreateIndex
CREATE INDEX "PlantGrowthLog_date_idx" ON "PlantGrowthLog"("date");

-- CreateIndex
CREATE UNIQUE INDEX "GrowthMeasurement_logId_key" ON "GrowthMeasurement"("logId");

-- CreateIndex
CREATE UNIQUE INDEX "NutrientLog_logId_key" ON "NutrientLog"("logId");

-- CreateIndex
CREATE UNIQUE INDEX "TreatmentLog_logId_key" ON "TreatmentLog"("logId");

-- CreateIndex
CREATE UNIQUE INDEX "PestLog_logId_key" ON "PestLog"("logId");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingLog_logId_key" ON "TrainingLog"("logId");

-- AddForeignKey
ALTER TABLE "Strain" ADD CONSTRAINT "Strain_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seed" ADD CONSTRAINT "Seed_strainId_fkey" FOREIGN KEY ("strainId") REFERENCES "Strain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seed" ADD CONSTRAINT "Seed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Harvest" ADD CONSTRAINT "Harvest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HarvestTimeline" ADD CONSTRAINT "HarvestTimeline_harvestId_fkey" FOREIGN KEY ("harvestId") REFERENCES "Harvest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_strainId_fkey" FOREIGN KEY ("strainId") REFERENCES "Strain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_harvestId_fkey" FOREIGN KEY ("harvestId") REFERENCES "Harvest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_seedId_fkey" FOREIGN KEY ("seedId") REFERENCES "Seed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantGrowthLog" ADD CONSTRAINT "PlantGrowthLog_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrowthMeasurement" ADD CONSTRAINT "GrowthMeasurement_logId_fkey" FOREIGN KEY ("logId") REFERENCES "PlantGrowthLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutrientLog" ADD CONSTRAINT "NutrientLog_logId_fkey" FOREIGN KEY ("logId") REFERENCES "PlantGrowthLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreatmentLog" ADD CONSTRAINT "TreatmentLog_logId_fkey" FOREIGN KEY ("logId") REFERENCES "PlantGrowthLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PestLog" ADD CONSTRAINT "PestLog_logId_fkey" FOREIGN KEY ("logId") REFERENCES "PlantGrowthLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingLog" ADD CONSTRAINT "TrainingLog_logId_fkey" FOREIGN KEY ("logId") REFERENCES "PlantGrowthLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
