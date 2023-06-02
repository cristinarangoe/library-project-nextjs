interface Key {
    key: string;
  }
  export interface ApiAuthor {
    author: Key;
    type: Key;
  }
  interface ApiDateCreated {
    type: string;
    value: string;
  }
  interface ApiDescriptionValue {
    type: string;
    value: string;
  }
  export interface ApiBook {
    key: string;
    covers: number[];
    description: ApiDescriptionValue| string ;
    title: string;
    authors: ApiAuthor[];
    subjects: string[];
    created: ApiDateCreated;
    first_publish_date: string;
  }
  