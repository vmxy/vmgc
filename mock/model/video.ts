interface VideoModel extends NVideo.VideoDetail {}
export const banners = [
  {
    img: 'https://www.qfitv.com/upload/vod/20230413-1/c5ea21aefa10c4bd9d6fd8b75de08438.jpg',
    url: 'https://www.qq.com',
    label: 'ttit'
  }
];
export const videoModel: VideoModel[] = [];
for (let i = 0; i < 333; i++) {
  const detail: NVideo.VideoDetail = {
    type: '',
    id: `${i + 1}`,
    title: `盗门八将-${i + 1}`,
    desc: '民国初年，小镇青年陆展为寻失踪父亲，闯入大上海意外卷入盗门试炼，从此踏上与他父亲一样背负千斤重担，守护万千中华国宝的护宝之路。武丁青铜爵、曜变天目盏、敦煌宝藏……承载了中华文明的瑰宝一个个都变成洋人们的目标，还有国际掮客、买办组织、不法商人、军阀势力参与倒卖国宝。就连盗门内部，也是暗流涌动，纷争不断。在陆展到来之前，为追十二生肖兽首，盗门前辈几乎全军覆没。盗门试炼，实为诞生新的“盗门八将”，传承护宝之路',
    logo: 'https://img.ffzypic.com/upload/vod/20230429-1/c0b79479ab2003875b602759f672d21d.jpg',
    actors: '袁福福/张星瑶/王培根/马迪妮/郑筠芊/马畅/李佳繁'.split('/'),
    directors: ['杜亭君'],
    year: 2023,
    /** 地区 */
    area: '中国大陆',
    /** 分类 */
    class: '国产剧',
    updateAt: Date.now(),
    /** 线路 */
    lines: [],
    quality: 0
  };
  const lineCount = Math.ceil(Math.random() * 5);
  const quality = Math.ceil(Math.random() * 40);
  for (let i = 0; i < lineCount; i++) {
    const line: NVideo.Line = {
      id: `${i + 1}`,
      label: `线路-${i + 1}`,
      items: []
    };
    for (let x = 0; x < quality; x++) {
      line.items.push({
        id: `${x + 1}`,
        label: `${x + 1}`
      });
    }

    detail.lines.push(line);
  }
  if (detail.quality < quality) detail.quality = quality;
  videoModel.push(detail);
}
