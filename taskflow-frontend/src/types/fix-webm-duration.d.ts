declare module 'fix-webm-duration' {
  function fixWebmDuration(
    blob: Blob,
    duration: number,
    callback: (fixedBlob: Blob) => void
  ): void;
  export default fixWebmDuration;
}