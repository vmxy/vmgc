export function initState(): NVideo.VideoState {
  return {
    tv: { list: [] },
    years: createYears(),
    sorts: [
      { label: "video.sort.time", value: "time" },
      { label: "video.sort.score", value: "score" },
      { label: "video.sort.hot", value: "hot" },
    ],
  };
}
export function createYears(): Code[] {
  let year = new Date().getFullYear();
  let years: Code[] = [{ label: "video.all", value: "all" }];
  for (let i = year; i >= year - 20; i--) {
    years.push({
      label: i + "",
      value: i,
    });
  }
  return years;
}
