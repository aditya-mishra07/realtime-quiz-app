-- AlterTable
CREATE SEQUENCE quiz_id_seq;
ALTER TABLE "Quiz" ALTER COLUMN "id" SET DEFAULT nextval('quiz_id_seq');
ALTER SEQUENCE quiz_id_seq OWNED BY "Quiz"."id";
