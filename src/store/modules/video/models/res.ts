import { Column, IsNotEmpty, Model, Schema } from "@ai-lion/liondb";

export class Res extends Schema {
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
  @Column({ type: "string" })
  url: string;
  @Column({ type: "string" })
  vid: string;
}

export class ResModel extends Model<Res> {
  static readonly Table = "res";
  constructor() {
    super({
      table: ResModel.Table,
      indexs: [],
      SchemaClass: Res,
    });
    //console.info("create table", this.table);
  }
  async get(id: string): Promise<Res> {
    let val = await super.get(id);
    if (val) {
      let lines = await this.masterdb.get("lines-" + val.vid);
      val.lines = lines;
    }
    return val;
  }
  async insert(data: Res): Promise<Res> {
    data.updateAt = new Date();
    data = await super.insert(data);
    
    return data;
  }

  async save(id: string, data: { [key: string]: any }): Promise<Res> {
    data.updateAt = new Date();
    let edata = await super.save(id, data);
    this.masterdb.set("lines-" + data.vid, data.lines || []);
    return edata;
  }
}
