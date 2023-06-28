import { Fav, FavModel } from "./fav";
import { Played, PlayedModel } from "./played";
const ssr = import.meta.env.SSR;

class ModelExport {
  fav: FavModel;
  played: PlayedModel;
  constructor() {
    if (!ssr) {
      import("@ai-lion/liondb").then(({ Model }) => {
        Model.onReady(() => this.init());
      });
    }
  }
  private init() {
    this.fav = new FavModel();
    this.played = new PlayedModel();
    //Model.onReady(FavModel.Table, () => (this.fav = new FavModel()));
    //Model.onReady(PlayedModel.Table, () => (this.played = new PlayedModel()));
  }
}

export { Fav, Played };

export default new ModelExport();
