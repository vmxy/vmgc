import { Fav, FavModel } from "./fav";

class ModelExport {
  fav: FavModel;
  constructor() {
    setTimeout(() => {
      this.init();
    }, 1000);
  }
  private init() {
    this.fav = new FavModel();
  }
}

export { Fav };

export default new ModelExport();
