import Compressor from "compressorjs";

const compressImage = (file: File, quality: number): Promise<File> => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: quality,
      success(result) {
        resolve(result as File);
      },
      error(err) {
        reject(err);
      },
    });
  });
};

export default compressImage;
