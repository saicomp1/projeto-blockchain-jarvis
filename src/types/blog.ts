// Blog and content types

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  category: string;
  coverImage?: string;
  readingTime: number; // in minutes
  featured?: boolean;
}

export interface BlogMetadata {
  totalPosts: number;
  categories: string[];
  tags: string[];
}
