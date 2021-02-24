export interface BookType {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    description?: string;
  };
}

export interface ShelfBookType extends BookType {
  firebaseId: string;
}