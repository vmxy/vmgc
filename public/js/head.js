function trycatch(handle) {
  try {
    if (!handle) return;
    if (/function AsyncFunction/i.test(handle.constructor.toString())) {
      handle().catch((err) => console.error("trycatch error", err));
    } else {
      handle();
    }
  } catch (err) {
    console.error("trycatch error2", err);
  }
}

trycatch(async() => {});
