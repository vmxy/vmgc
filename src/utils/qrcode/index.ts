import QRCode from "qrcode-with-logos";

export async function buileQRCode(opts: { content: string; logo?: string }) {
  let image = await new QRCode({
    //canvas: document.getElementById("canvas"),
    content: opts.content,
    width: 380,
    download: true,
    //image: document.getElementById("image"),
    logo: {
      src: opts.logo || "",
    },
  }).toImage();
  return image;
}
