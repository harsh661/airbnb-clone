export function getCloudinaryBlurURL(src: string) {
  if (!src) return "";

  return src.replace("/upload/", "/upload/e_blur:1000,q_10,w_10/");
}
