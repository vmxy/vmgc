import { Column, IsNotEmpty, Model, Schema } from "@ai-lion/liondb";
export type Cata = "movie" | "tv" | "anime" | "variety" | "sport" | "doc";

export class Video extends Schema {
  constructor(data) {
    super();
    data && this.reduce(data);
  }

  @Column({ type: "string" })
  class: string;
  @Column({ type: "string" })
  desc: string;
  @Column({ type: "string" })
  @Column({ type: "array" })
  directors: string[] = [];
  //@Column({ type: "array" })
  lines: { id: string; label: string; items: { id: string; label: string }[] }[] = [];
  @Column({ type: "string" })
  logo: string;
  @Column({ type: "number" })
  quality: number;
  @Column({ type: "string" })
  title: string;
  @Column({ type: "array" })
  types: string[] = [];
  @Column({ type: "string" })
  year: string;
}

export class VideoModel extends Model<Video> {
  static readonly Table = "video";
  constructor() {
    super({
      table: VideoModel.Table,
      indexs: [],
      SchemaClass: Video,
    });
    //console.info("create table", this.table);
  }
  async get(id: string): Promise<Video | undefined> {
    let val = await super.get(id);
    if (val) {
      let lines = await this.masterdb.get("lines-" + id);
      val.lines = lines;
    }
    return val;
  }
  async insert(data: Video): Promise<Video> {
    data.updateAt = new Date();
    data = await super.insert(data);
    return data;
  }

  async save(id: string, data: { [key: string]: any }): Promise<Video> {
    data.updateAt = new Date();
    let edata = await super.save(id, data);
    this.masterdb.set("lines-" + id, data.lines || []);
    return edata;
  }
}
