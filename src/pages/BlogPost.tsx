import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Button } from '@components/ui';
import blogPosts from '@data/mock/blog.json';

/**
 * BlogPost - Single blog post page
 * Displays full blog post content
 */

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link to="/blog" className="inline-block mb-8">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Blog
          </Button>
        </Link>

        {/* Cover Image */}
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-96 object-cover rounded-2xl mb-8"
        />

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {post.author.name}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </header>

        {/* Content */}
        <article className="prose dark:prose-invert max-w-none">
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {post.excerpt}
          </p>

          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="space-y-6"
          />
        </article>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-bitcoin/10 dark:bg-bitcoin/20 text-bitcoin text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Posts */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-2xl font-bold mb-6">Mais Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts
              .filter((p) => p.id !== post.id)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`}>
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <h4 className="font-semibold mb-2">{relatedPost.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
