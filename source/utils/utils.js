export const ScreenOptions = {
    NOT_SELECTED: -1,
    JOBBER: 0,
    QC_CHECK: 1
};


export const FILE_TYPE = Object.freeze({
  IMAGE: 'image',
  VIDEO: 'video',
  DOCUMENT: 'document',
});

export const getFileType = (mimetype) => {
  if (!mimetype) return FILE_TYPE.OTHER;

  if (mimetype.startsWith('image/')) return FILE_TYPE.IMAGE;
  if (mimetype.startsWith('video/')) return FILE_TYPE.VIDEO;
  if (
    mimetype.includes('pdf') ||
    mimetype.includes('doc') ||
    mimetype.includes('application')
  ) return FILE_TYPE.DOCUMENT;

  return FILE_TYPE.OTHER;
};