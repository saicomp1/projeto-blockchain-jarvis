import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Card } from '@components/ui';
import blogPosts from '@data/mock/blog.json';

/**
 * Blog - Blog listing page
 * Shows featured and all blog posts
 */

export default function Blog() {
  const featured = blogPosts.filter((post) => post.featured);
  const allPosts = blogPosts;

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Insights, tutoriais e notícias sobre tecnologia blockchain, Web3 e segurança.
          </p>
        </div>

        {/* Featured Posts */}
        {featured.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Posts em Destaque</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featured.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <Card className="p-0 overflow-hidden h-full hover:shadow-lg transition-shadow group">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-bitcoin transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-2 text-bitcoin font-medium">
                        Leia Mais <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Todos os Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`}>
                <Card className="p-0 overflow-hidden h-full hover:shadow-lg transition-shadow group">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-2 text-xs text-gray-600 dark:text-gray-400">
                      <span>{post.author.name}</span>
                      <span>·</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-bitcoin transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
