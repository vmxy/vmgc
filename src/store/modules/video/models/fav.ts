import { Column, IsNotEmpty, Model, Schema } from "@ai-lion/liondb";
export type Cata = "movie" | "tv" | "anime" | "variety" | "sport" | "doc";

export class Fav extends Schema {
  constructor(data) {
    super();
    data && this.reduce(data);
  }
  /** 标题 */
  @Column({ type: "string" })
  @IsNotEmpty()
  title: string;
  @Column({
    type: "string",
    default: "/images/thumb.png",
  })
  @IsNotEmpty()
  logo: string;

  @Column({ type: "string" })
  desc: string;

  @Column({ type: "number", default: 0 })
  @IsNotEmpty()
  quality: number;
}

export class FavModel extends Model<Fav> {
  static readonly Table = "fav";
  constructor() {
    super({
      table: FavModel.Table,
      indexs: [],
      SchemaClass: Fav,
    });
    //console.info("create table", this.table);
  }

  async insert(data: Fav): Promise<Fav> {
    data.updateAt = new Date();
    data = await super.insert(data);
    console.info("add video", data.id, data.title);
    return data;
  }

  async save(id: string, data: { [key: string]: any }): Promise<Fav> {
    data.updateAt = new Date();
    let edata = await super.save(id, data);
    return edata;
  }

  async list(opts: { start: number; limit: number }) {
    let list = await this.find(opts);
    list = list.filter((v) => {
      if (!v || !v.title) {
        this.delete(v.id);
        return false;
      }
      return true;
    });
    return list;
  }
  async listCount() {
    let count = 0;
    await this.masterdb.iterator({ key: this.masterKey("*") }, (key, val) => {
      if (val) count++;
    });
    return count;
  }
}
