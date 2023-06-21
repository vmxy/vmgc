import { Fav, FavModel } from "./fav";
import { Played, PlayedModel } from "./played";

class ModelExport {
  fav: FavModel;
  played: PlayedModel;
  constructor() {
    setTimeout(() => {
      this.init();
    }, 1000);
  }
  private init() {
    this.fav = new FavModel();
    this.played = new PlayedModel();
  }
}

export { Fav, Played };

export default new ModelExport();
