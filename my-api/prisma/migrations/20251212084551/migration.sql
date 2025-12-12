-- RenameIndex
ALTER TABLE `cartlines` RENAME INDEX `cartlines_posterId_fkey` TO `idx_posterId`;

-- RenameIndex
ALTER TABLE `cartlines` RENAME INDEX `cartlines_userId_fkey` TO `idx_userId`;

-- RenameIndex
ALTER TABLE `userratings` RENAME INDEX `userratings_posterId_fkey` TO `idx_posterId`;

-- RenameIndex
ALTER TABLE `userratings` RENAME INDEX `userratings_userId_fkey` TO `idx_userId`;
