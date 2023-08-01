import { Fav, FavModel } from "./fav";
import { Played, PlayedModel } from "./played";
import { Video, VideoModel } from "./video";
import { Res as VideoRes, ResModel as VideoResModel } from "./res";

const ssr = import.meta.env.SSR;

class ModelExport {
  fav: FavModel;
  played: PlayedModel;
  video: VideoModel;
  videoRes: VideoResModel;
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
    this.videoRes = new VideoResModel();
    //Model.onReady(FavModel.Table, () => (this.fav = new FavModel()));
    //Model.onReady(PlayedModel.Table, () => (this.played = new PlayedModel()));
  }
}

export { Fav, Played, Video, VideoRes };

export default new ModelExport();
