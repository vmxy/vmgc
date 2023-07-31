import { Fav, FavModel } from "./fav";
import { Played, PlayedModel } from "./played";
import { Video, VideoModel } from "./video";
import { Res, ResModel } from "./res";

const ssr = import.meta.env.SSR;

class ModelExport {
  fav: FavModel;
  played: PlayedModel;
  video: VideoModel;
  videoRes: ResModel;
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
    this.video = new VideoModel();
    this.videoRes = new ResModel();
    //Model.onReady(FavModel.Table, () => (this.fav = new FavModel()));
    //Model.onReady(PlayedModel.Table, () => (this.played = new PlayedModel()));
  }
}

export { Fav, Played, Video, Res };

export default new ModelExport();
