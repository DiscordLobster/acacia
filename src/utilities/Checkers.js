module.isImage = (image) => {
  return /(?:(?:https?)+:\/\/+[a-zA-Z0-9/._-]{1,})+(?:(?:jpe?g|png|gif|webp))/.test(image);
};