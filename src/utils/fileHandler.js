export async function detectMimeType(ext) {
  const type = signatures.find((sign) => ext === sign.extension);
  return type.mimeType;
}

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export async function fileEncoder(file) {
  return await toBase64(file);
}

export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

const signatures = [
  {
    extension: ".aac",
    mimeType: "audio/aac",
  },
  {
    extension: ".abw",
    mimeType: "application/x-abiword",
  },
  {
    extension: ".arc",
    mimeType: "application/x-freearc",
  },
  {
    extension: ".avif",
    mimeType: "image/avif",
  },
  {
    extension: ".avi",
    mimeType: "video/x-msvideo",
  },
  {
    extension: ".azw",
    mimeType: "application/vnd.amazon.ebook",
  },
  {
    extension: ".bin",
    mimeType: "application/octet-stream",
  },
  {
    extension: ".bmp",
    mimeType: "image/bmp",
  },
  {
    extension: ".bz",
    mimeType: "application/x-bzip",
  },
  {
    extension: ".bz2",
    mimeType: "application/x-bzip2",
  },
  {
    extension: ".cda",
    mimeType: "application/x-cdf",
  },
  {
    extension: ".csh",
    mimeType: "application/x-csh",
  },
  {
    extension: ".css",
    mimeType: "text/css",
  },
  {
    extension: ".csv",
    mimeType: "text/csv",
  },
  {
    extension: ".doc",
    mimeType: "application/msword",
  },
  {
    extension: ".docx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  {
    extension: ".eot",
    mimeType: "application/vnd.ms-fontobject",
  },
  {
    extension: ".epub",
    mimeType: "application/epub+zip",
  },
  {
    extension: ".gz",
    mimeType: "application/gzip",
  },
  {
    extension: ".gif",
    mimeType: "image/gif",
  },
  {
    extension: ".htm",
    mimeType: "text/html",
  },
  {
    extension: ".html",
    mimeType: "text/html",
  },
  {
    extension: ".ico",
    mimeType: "image/vnd.microsoft.icon",
  },
  {
    extension: ".ics",
    mimeType: "text/calendar",
  },
  {
    extension: ".jar",
    mimeType: "application/java-archive",
  },
  {
    extension: ".jpeg",
    mimeType: "image/jpeg",
  },
  {
    extension: ".jpg",
    mimeType: "image/jpeg",
  },
  {
    extension: ".js",
    mimeType: "text/javascript",
  },
  {
    extension: ".json",
    mimeType: "application/json",
  },
  {
    extension: ".jsonld",
    mimeType: "application/ld+json",
  },
  {
    extension: ".mjs",
    mimeType: "text/javascript",
  },
  {
    extension: ".mp3",
    mimeType: "audio/mpeg",
  },
  {
    extension: ".mp4",
    mimeType: "video/mp4",
  },
  {
    extension: ".mpeg",
    mimeType: "video/mpeg",
  },
  {
    extension: ".mpkg",
    mimeType: "application/vnd.apple.installer+xml",
  },
  {
    extension: ".odp",
    mimeType: "application/vnd.oasis.opendocument.presentation",
  },
  {
    extension: ".ods",
    mimeType: "application/vnd.oasis.opendocument.spreadsheet",
  },
  {
    extension: ".odt",
    mimeType: "application/vnd.oasis.opendocument.text",
  },
  {
    extension: ".oga",
    mimeType: "audio/ogg",
  },
  {
    extension: ".ogv",
    mimeType: "video/ogg",
  },
  {
    extension: ".ogx",
    mimeType: "application/ogg",
  },
  {
    extension: ".opus",
    mimeType: "audio/opus",
  },
  {
    extension: ".otf",
    mimeType: "font/otf",
  },
  {
    extension: ".png",
    mimeType: "image/png",
  },
  {
    extension: ".pdf",
    mimeType: "application/pdf",
  },
  {
    extension: ".php",
    mimeType: "application/x-httpd-php",
  },
  {
    extension: ".ppt",
    mimeType: "application/vnd.ms-powerpoint",
  },
  {
    extension: ".pptx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  },
  {
    extension: ".rar",
    mimeType: "application/vnd.rar",
  },
  {
    extension: ".rtf",
    mimeType: "application/rtf",
  },
  {
    extension: ".sh",
    mimeType: "application/x-sh",
  },
  {
    extension: ".svg",
    mimeType: "image/svg+xml",
  },
  {
    extension: ".tar",
    mimeType: "application/x-tar",
  },
  {
    extension: ".tif",
    mimeType: "image/tiff",
  },
  {
    extension: ".tiff",
    mimeType: "image/tiff",
  },
  {
    extension: ".ts",
    mimeType: "video/mp2t",
  },
  {
    extension: ".ttf",
    mimeType: "font/ttf",
  },
  {
    extension: ".txt",
    mimeType: "text/plain",
  },
  {
    extension: ".vsd",
    mimeType: "application/vnd.visio",
  },
  {
    extension: ".wav",
    mimeType: "audio/wav",
  },
  {
    extension: ".weba",
    mimeType: "audio/webm",
  },
  {
    extension: ".webm",
    mimeType: "video/webm",
  },
  {
    extension: ".webp",
    mimeType: "image/webp",
  },
  {
    extension: ".woff",
    mimeType: "font/woff",
  },
  {
    extension: ".woff2",
    mimeType: "font/woff2",
  },
  {
    extension: ".xhtml",
    mimeType: "application/xhtml+xml",
  },
  {
    extension: ".xls",
    mimeType: "application/vnd.ms-excel",
  },
  {
    extension: ".xlsx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },
  {
    extension: ".xml",
    mimeType: "application/xml",
  },
  {
    extension: ".xul",
    mimeType: "application/vnd.mozilla.xul+xml",
  },
  {
    extension: ".zip",
    mimeType: "application/zip",
  },
];
