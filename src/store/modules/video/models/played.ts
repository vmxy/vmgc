import { Model, Schema } from "@ai-lion/liondb";

export class Played extends Schema {
  constructor(data) {
    super();
    data && this.reduce(data);
  }
  /** 播放位置 */
  playTime: number;
}

export class PlayedModel extends Model<Played> {
  static readonly Table = "played";
  constructor() {
    super({
      table: PlayedModel.Table,
      indexs: [],
      SchemaClass: Played,
    });
    //console.info("create table", this.table);
  }
  async hasPlayed(id: string) {
    let v = await this.get(id);
    return !!v && !!v.id;
  }
}
