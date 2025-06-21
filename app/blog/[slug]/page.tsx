import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs, getAllPosts } from "@/lib/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  // Generate for both languages
  const svSlugs = getPostSlugs("sv");
  const enSlugs = getPostSlugs("en");

  return [
    ...svSlugs.map((slug) => ({ slug })),
    ...enSlugs.map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("home.blog.post");

  // Try current locale first, then fallback
  let post = await getPostBySlug(slug, locale);
  if (!post && locale === "en") {
    post = await getPostBySlug(slug, "sv");
  } else if (!post && locale === "sv") {
    post = await getPostBySlug(slug, "en");
  }

  if (!post) {
    return {
      title: t("notFound"),
    };
  }

  return {
    title: post.seo.metaTitle,
    description: post.seo.metaDescription,
    keywords: Array.isArray(post.seo.keywords)
      ? post.seo.keywords
      : [post.seo.keywords],
    openGraph: {
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("home.blog");
  const tPost = await getTranslations("home.blog.post");

  // Try current locale first, then fallback
  let post = await getPostBySlug(slug, locale);
  let postLocale = locale;
  if (!post && locale === "en") {
    post = await getPostBySlug(slug, "sv");
    postLocale = "sv";
  } else if (!post && locale === "sv") {
    post = await getPostBySlug(slug, "en");
    postLocale = "en";
  }

  if (!post) {
    notFound();
  }

  // Get related posts (other recent posts)
  const allPosts = getAllPosts(postLocale);
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <div className='bg-gradient-to-b from-gray-50 to-background border-b'>
        <div className='container mx-auto px-4 py-8'>
          <Link href='/blog'>
            <Button variant='ghost' className='mb-6'>
              <ArrowLeft className='w-4 h-4 mr-2' />
              {tPost("backToBlog")}
            </Button>
          </Link>

          <div className='max-w-4xl mx-auto'>
            <div className='flex items-center gap-6 text-sm text-muted-foreground mb-6'>
              <div className='flex items-center gap-2'>
                <Calendar className='w-4 h-4' />
                <span>
                  {new Date(post.publishedAt).toLocaleDateString(
                    locale === "sv" ? "sv-SE" : "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Clock className='w-4 h-4' />
                <span>{post.readingTime}</span>
              </div>
              <div className='flex items-center gap-2'>
                <User className='w-4 h-4' />
                <span>{post.author}</span>
              </div>
            </div>

            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight'>
              {post.title}
            </h1>

            <p className='text-xl text-muted-foreground mb-8 leading-relaxed'>
              {post.excerpt}
            </p>

            {post.tags.length > 0 && (
              <div className='flex flex-wrap gap-2 mb-8'>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant='secondary'>
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className='container mx-auto px-4 py-16'>
        <div className='max-w-4xl mx-auto'>
          <article
            className='prose'
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA Section */}
          <div className='mt-16 p-8 bg-gradient-to-r from-[#0ea47a]/10 to-[#12d39d]/10 rounded-2xl text-center'>
            <h3 className='text-2xl font-bold mb-4'>{tPost("ctaTitle")}</h3>
            <p className='text-muted-foreground mb-6 max-w-2xl mx-auto'>
              {tPost("ctaDescription")}
            </p>
            <Link href='/'>
              <Button
                size='lg'
                className='bg-[#0ea47a] hover:bg-[#0a7557] text-white'
              >
                {t("ctaButton")}
                <ArrowRight className='ml-2 w-5 h-5' />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className='bg-gray-50 py-16'>
          <div className='container mx-auto px-4'>
            <div className='max-w-6xl mx-auto'>
              <h2 className='text-2xl md:text-3xl font-bold mb-8 text-center'>
                {tPost("relatedArticles")}
              </h2>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                  >
                    <Card className='h-full hover:shadow-lg transition-all duration-300 group cursor-pointer'>
                      <CardHeader>
                        <div className='flex items-center gap-2 text-xs text-muted-foreground mb-2'>
                          <Calendar className='w-3 h-3' />
                          <span>
                            {new Date(
                              relatedPost.publishedAt
                            ).toLocaleDateString(
                              locale === "sv" ? "sv-SE" : "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                          <span>•</span>
                          <span>{relatedPost.readingTime}</span>
                        </div>
                        <CardTitle className='text-lg group-hover:text-[#0ea47a] transition-colors line-clamp-2'>
                          {relatedPost.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className='text-muted-foreground text-sm leading-relaxed line-clamp-3'>
                          {relatedPost.excerpt}
                        </p>
                        <div className='mt-4'>
                          <Button
                            variant='ghost'
                            className='p-0 h-auto text-[#0ea47a] hover:text-[#0a7557] text-sm'
                          >
                            {t("readMore")}
                            <ArrowRight className='ml-1 w-3 h-3' />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
