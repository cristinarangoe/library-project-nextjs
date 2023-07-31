export interface ApiBook  {
    key: string;
    cover_edition_key?: string;
    title: string;
    author_name: string[];
  };
  
  export interface ApiData {
      docs: ApiBook[],
      numFound: number,
  }
  