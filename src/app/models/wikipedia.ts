export interface WikiModel {
  pageid: number;
  ns: number;
  title: string;
  extract: string;
}

export interface Query {
  pages: any;
}

export interface WikiResult {
  batchcomplete: string;
  query: Query;
}
