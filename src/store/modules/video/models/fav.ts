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
  /** 类目 */
  @Column({
    default: "tv",
    type: "string",
  })
  @IsNotEmpty()
  cata: Cata;

  @Column({ type: "string" })
  @IsNotEmpty()
  desc: string;

  @Column({ type: "number" })
  @IsNotEmpty()
  quality: number;
}

export class FavModel extends Model<Fav> {
  constructor() {
    super({
      table: "fav",
      indexs: [],
      SchemaClass: Fav,
    });
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
