export interface GiphyType {
    results: Result[];
  }
  
  export interface Result {
    id:                  string;
    title:               string;
    media_formats:       MediaFormats;
    created:             number;
    url:                 string;
  }
  
  export interface MediaFormats {
    gif: GIF;
  }
  export interface Post {
    title:string;
    gif: string;
    description: string;
  }
  export interface GIF {
    url:      string;
    duration: number;
    preview:  string;
    dims:     number[];
    size:     number;
  }