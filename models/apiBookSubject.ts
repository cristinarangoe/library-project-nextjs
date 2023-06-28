export interface Author {
    key: string;
    name: string;
  }
  
  export interface ApiBook {
    key: string;
    cover_edition_key?: string;
    title: string;
    authors: Author[];
  }
  
  export interface ApiData {
      work_count: number;
      works: ApiBook[];
  }
  