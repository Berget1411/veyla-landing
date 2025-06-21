import { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getTranslations, getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home.blog.meta");
  const keywords = t.raw("keywords") as string[];

  return {
    title: t("title"),
    description: t("description"),
    keywords: keywords,
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
    },
  };
}

export default async function BlogPage() {
  const t = await getTranslations("home.blog");
  const locale = await getLocale();
  const posts = getAllPosts(locale);

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <div className='bg-gradient-to-b from-gray-50 to-background border-b'>
        <div className='container mx-auto px-4 py-16'>
          <div className='text-center max-w-3xl mx-auto'>
            <h1 className='text-4xl md:text-5xl font-bold mb-4'>
              {t("title")}
            </h1>
            <p className='text-xl text-muted-foreground'>{t("subtitle")}</p>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className='container mx-auto px-4 py-16'>
        {posts.length === 0 ? (
          <div className='text-center py-16'>
            <p className='text-muted-foreground'>{t("noPostsFound")}</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className='h-full hover:shadow-lg transition-all duration-300 group cursor-pointer'>
                  <CardHeader>
                    <div className='flex items-center gap-4 text-sm text-muted-foreground mb-3'>
                      <div className='flex items-center gap-1'>
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
                      <div className='flex items-center gap-1'>
                        <Clock className='w-4 h-4' />
                        <span>{post.readingTime}</span>
                      </div>
                    </div>
                    <CardTitle className='text-xl group-hover:text-[#0ea47a] transition-colors line-clamp-2'>
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <p className='text-muted-foreground leading-relaxed line-clamp-3'>
                      {post.excerpt}
                    </p>

                    {post.tags.length > 0 && (
                      <div className='flex flex-wrap gap-2'>
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant='secondary'
                            className='text-xs'
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className='pt-4'>
                      <Button
                        variant='ghost'
                        className='p-0 h-auto text-[#0ea47a] hover:text-[#0a7557] group-hover:translate-x-1 transition-transform'
                      >
                        {t("readArticle")}
                        <ArrowRight className='ml-2 w-4 h-4' />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className='mt-20 text-center'>
          <div className='bg-gradient-to-r from-[#0ea47a]/10 to-[#12d39d]/10 rounded-2xl p-8 md:p-12'>
            <h2 className='text-2xl md:text-3xl font-bold mb-4'>
              {t("ctaTitle")}
            </h2>
            <p className='text-muted-foreground text-lg mb-6 max-w-2xl mx-auto'>
              {t("ctaDescription")}
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
    </div>
  );
}
