<template>
  <div class="space-y-12 pb-20">
    <!-- Header -->
    <section class="max-w-6xl mx-auto px-4 md:px-8 pt-10">
      <h1 class="text-5xl md:text-6xl font-black mb-4">
        <span class="text-glow">My Blog</span>
      </h1>
      <p class="text-xl text-gray-300 max-w-2xl">
        Thoughts, tutorials, and stories about web development, design, and creative coding
      </p>
    </section>

    <!-- Featured Post -->
    <section class="max-w-6xl mx-auto px-4 md:px-8">
      <div class="card-glow overflow-hidden group">
        <div class="grid md:grid-cols-2 gap-8">
          <div class="relative h-64 md:h-full min-h-96 bg-gradient-retro rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
            <div class="absolute inset-0 flex items-center justify-center text-6xl">📝</div>
          </div>
          <div class="flex flex-col justify-center space-y-4">
            <div class="flex items-center gap-3">
              <span class="text-xs px-3 py-1 rounded-full bg-neon-pink/20 text-neon-pink font-semibold">FEATURED</span>
              <span class="text-sm text-gray-400">May 8, 2026</span>
            </div>
            <h2 class="text-3xl md:text-4xl font-black text-neon-cyan">Latest Blog Post Title</h2>
            <p class="text-gray-300 text-lg leading-relaxed">
              This is where the excerpt of your featured blog post goes. Share your latest insights, tutorials, or stories with your readers. Make it compelling and interesting!
            </p>
            <div class="pt-4 flex gap-4">
              <a href="#" class="btn-neon">Read Full Article →</a>
              <span class="text-sm text-gray-400 self-center">5 min read</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Posts Grid -->
    <section class="max-w-6xl mx-auto px-4 md:px-8">
      <h2 class="text-3xl font-black mb-8">All Articles</h2>
      <div class="space-y-6">
        <!-- Blog Post Card -->
        <div
          v-for="(post, index) in blogPosts"
          :key="index"
          class="card-glow group hover:shadow-lg hover:shadow-neon-pink/30 transition-all"
        >
          <div class="grid md:grid-cols-3 gap-6">
            <!-- Thumbnail -->
            <div class="relative h-48 md:h-full md:min-h-32 rounded-lg overflow-hidden"
              :style="{ backgroundImage: `linear-gradient(135deg, ${post.gradient.from}, ${post.gradient.to})` }">
              <div class="absolute inset-0 flex items-center justify-center text-4xl">{{ post.emoji }}</div>
            </div>

            <!-- Content -->
            <div class="md:col-span-2 flex flex-col justify-between">
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <span class="text-xs px-2 py-1 rounded bg-neon-purple/20 text-neon-purple font-semibold">{{ post.category }}</span>
                  <span class="text-sm text-gray-400">{{ post.date }}</span>
                </div>
                <h3 class="text-xl font-bold text-neon-pink hover:text-neon-cyan transition-colors cursor-pointer">
                  {{ post.title }}
                </h3>
                <p class="text-gray-400">{{ post.excerpt }}</p>
              </div>
              <div class="pt-4 flex items-center justify-between border-t border-neon-purple/20">
                <div class="flex gap-2">
                  <span
                    v-for="tag in post.tags"
                    :key="tag"
                    class="text-xs text-gray-400"
                  >
                    #{{ tag }}
                  </span>
                </div>
                <span class="text-sm text-neon-green">{{ post.readTime }} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Signup -->
    <section class="max-w-6xl mx-auto px-4 md:px-8">
      <div class="bg-gradient-to-r from-neon-purple/20 via-neon-blue/20 to-neon-cyan/20 rounded-3xl p-12 border-2 border-neon-cyan text-center space-y-6">
        <h2 class="text-4xl font-black text-glow">Stay Updated</h2>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
          Subscribe to my newsletter and get notified when I publish new articles
        </p>
        <div class="flex gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            class="flex-1 px-4 py-3 rounded-full bg-black/50 border-2 border-neon-cyan/30 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan transition-colors"
          />
          <button class="btn-neon">Subscribe</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const blogPosts = ref([
  {
    title: 'Getting Started with Nuxt 4 and TailwindCSS',
    excerpt: 'Learn how to build modern, fast websites using Nuxt 4 and TailwindCSS. A complete beginner-friendly guide.',
    date: 'May 1, 2026',
    category: 'Tutorial',
    readTime: 8,
    emoji: '🚀',
    gradient: { from: '#FF6B35', to: '#FFE500' },
    tags: ['nuxt', 'tailwind', 'web-dev']
  },
  {
    title: 'The 2010s Design Resurgence in Web Design',
    excerpt: 'Exploring why 2010s aesthetics are making a comeback in modern web design and how to use them effectively.',
    date: 'April 28, 2026',
    category: 'Design',
    readTime: 6,
    emoji: '🎨',
    gradient: { from: '#9D4EDD', to: '#3A86FF' },
    tags: ['design', 'aesthetic', 'web-design']
  },
  {
    title: 'Photography Tips for Creative Developers',
    excerpt: 'Combining your technical skills with visual storytelling. A guide to improving your photography game.',
    date: 'April 20, 2026',
    category: 'Creative',
    readTime: 7,
    emoji: '📷',
    gradient: { from: '#3A86FF', to: '#00D9FF' },
    tags: ['photography', 'creative', 'visual']
  },
  {
    title: 'Open Source Contributions: Getting Started',
    excerpt: 'Everything you need to know about contributing to open source projects and making your first PR.',
    date: 'April 15, 2026',
    category: 'Community',
    readTime: 10,
    emoji: '🔓',
    gradient: { from: '#06FFA5', to: '#00D9FF' },
    tags: ['open-source', 'github', 'community']
  }
])
</script>
