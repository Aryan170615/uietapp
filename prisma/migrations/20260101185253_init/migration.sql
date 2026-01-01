-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "subject" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lost" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Lost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Found" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Found_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subjectAttendace" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "subjectAttendace_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
