import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  tags: string[];
  readingTime: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export interface BlogPostPreview {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  tags: string[];
  readingTime: string;
}

const contentDirectory = path.join(process.cwd(), "content/blog");

function getPostsDirectory(locale: string = "sv"): string {
  return path.join(contentDirectory, locale);
}

export function getAllPosts(locale: string = "sv"): BlogPostPreview[] {
  try {
    const postsDirectory = getPostsDirectory(locale);
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter((name) => name.endsWith(".md"))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);

        return {
          slug,
          title: matterResult.data.title,
          excerpt: matterResult.data.excerpt,
          publishedAt: matterResult.data.publishedAt,
          author: matterResult.data.author,
          tags: matterResult.data.tags || [],
          readingTime: matterResult.data.readingTime,
        } as BlogPostPreview;
      });

    // Sort posts by date (newest first)
    return allPostsData.sort((a, b) => {
      if (a.publishedAt < b.publishedAt) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

export async function getPostBySlug(
  slug: string,
  locale: string = "sv"
): Promise<BlogPost | null> {
  try {
    const postsDirectory = getPostsDirectory(locale);
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: matterResult.data.title,
      excerpt: matterResult.data.excerpt,
      content: contentHtml,
      publishedAt: matterResult.data.publishedAt,
      author: matterResult.data.author,
      tags: matterResult.data.tags || [],
      readingTime: matterResult.data.readingTime,
      seo: matterResult.data.seo || {
        metaTitle: matterResult.data.title,
        metaDescription: matterResult.data.excerpt,
        keywords: matterResult.data.tags || [],
      },
    };
  } catch (error) {
    console.error("Error reading blog post:", error);
    return null;
  }
}

export function getPostSlugs(locale: string = "sv"): string[] {
  try {
    const postsDirectory = getPostsDirectory(locale);
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((name) => name.endsWith(".md"))
      .map((name) => name.replace(/\.md$/, ""));
  } catch (error) {
    console.error("Error reading post slugs:", error);
    return [];
  }
}

export function getFeaturedPosts(
  limit: number = 3,
  locale: string = "sv"
): BlogPostPreview[] {
  const allPosts = getAllPosts(locale);
  return allPosts.slice(0, limit);
}
