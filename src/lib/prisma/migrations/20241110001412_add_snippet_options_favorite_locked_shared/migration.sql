-- AlterTable
ALTER TABLE "snippets" ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isLocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isShared" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "_UserFavoriteSnippets" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserFavoriteSnippets_AB_unique" ON "_UserFavoriteSnippets"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFavoriteSnippets_B_index" ON "_UserFavoriteSnippets"("B");

-- AddForeignKey
ALTER TABLE "_UserFavoriteSnippets" ADD CONSTRAINT "_UserFavoriteSnippets_A_fkey" FOREIGN KEY ("A") REFERENCES "snippets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavoriteSnippets" ADD CONSTRAINT "_UserFavoriteSnippets_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
