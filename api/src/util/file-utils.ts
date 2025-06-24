import { existsSync, mkdirSync, readdirSync, renameSync, unlinkSync } from 'fs';
import { join } from 'path';
import { ANNOUNCEMENT_STORAGE_PATH, TEAM_PROFILEIMAGE_BASE_URL, TEAM_PROFILEIMAGE_STORAGE_PATH } from 'src/config/constants';

export function ensureDirectoryExists(path: string) {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}

export function moveFilesToAnnouncementFolder(teamId: number, announcementId: number, files: Express.Multer.File[]): string[] {
  const finalPath = join(
    process.cwd(),
    TEAM_PROFILEIMAGE_STORAGE_PATH,
    teamId.toString(),
    ANNOUNCEMENT_STORAGE_PATH,
    announcementId.toString(),
  );
  ensureDirectoryExists(finalPath);

  const urls: string[] = [];

  for (const file of files) {
    const dest = join(finalPath, file.filename);
    renameSync(file.path, dest);

    const url = `${TEAM_PROFILEIMAGE_BASE_URL}${teamId}/${ANNOUNCEMENT_STORAGE_PATH}${announcementId}/${file.filename}`;
    urls.push(url);
  }

  return urls;
}

export function deleteAnnouncementImages(teamId: number, announcementId: number) {
  const folderPath = join(
    process.cwd(),
    TEAM_PROFILEIMAGE_STORAGE_PATH,
    teamId.toString(),
    ANNOUNCEMENT_STORAGE_PATH,
    announcementId.toString(),
  );

  if (existsSync(folderPath)) {
    const files = readdirSync(folderPath);
    for (const file of files) {
      unlinkSync(join(folderPath, file));
    }
  }
}