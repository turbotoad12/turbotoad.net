<template>
  <div class="space-y-12 pb-20">
    <!-- Header -->
    <section class="max-w-6xl mx-auto px-4 md:px-8 pt-10">
      <h1 class="text-5xl md:text-6xl font-black mb-4">
        <span class="text-glow">My Projects</span>
      </h1>
      <p class="text-xl text-gray-300 max-w-2xl">
        A collection of open source projects, personal experiments, and work I'm proud of
      </p>
    </section>

    <!-- Filter Tags -->
    <section class="max-w-6xl mx-auto px-4 md:px-8">
      <div class="flex gap-3 flex-wrap">
        <button
          v-for="tag in ['All', 'Web Dev', 'Open Source', 'Photography']"
          :key="tag"
          class="px-4 py-2 rounded-full font-semibold transition-all duration-300"
          :class="selectedTag === tag
            ? 'bg-gradient-to-r from-neon-pink to-neon-purple text-white'
            : 'border-2 border-neon-purple/30 text-neon-purple hover:border-neon-purple'"
          @click="selectedTag = tag"
        >
          {{ tag }}
        </button>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="max-w-6xl mx-auto px-4 md:px-8">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Project Card Template -->
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="card-glow group cursor-pointer overflow-hidden"
        >
          <!-- Project Image -->
          <div class="relative h-48 mb-4 rounded-lg overflow-hidden bg-gradient-warm">
            <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <span class="text-5xl opacity-60 group-hover:opacity-100 transition-opacity">{{ project.emoji }}</span>
            </div>
          </div>

          <!-- Project Info -->
          <h3 class="text-xl font-bold text-neon-cyan mb-2">{{ project.title }}</h3>
          <p class="text-gray-400 mb-4 line-clamp-2">{{ project.description }}</p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="tech in project.tech"
              :key="tech"
              class="text-xs px-3 py-1 rounded-full bg-neon-purple/20 text-neon-purple"
            >
              {{ tech }}
            </span>
          </div>

          <!-- Links -->
          <div class="flex gap-3 pt-4 border-t border-neon-purple/20">
            <a
              href="#"
              class="text-neon-pink hover:text-neon-cyan transition-colors text-sm font-semibold flex-1"
            >
              View Project →
            </a>
            <a
              href="#"
              class="text-neon-green hover:text-neon-cyan transition-colors"
            >
              ★
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section class="max-w-6xl mx-auto px-4 md:px-8">
      <h2 class="text-4xl font-black mb-12">
        <span class="text-glow">Photo Gallery</span>
      </h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="i in 6"
          :key="i"
          class="relative group overflow-hidden rounded-xl h-64 bg-gradient-cool hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
          <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
            <span class="text-6xl opacity-50 group-hover:opacity-100 transition-opacity">📷</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedTag = ref('All')

const projects = ref([
  {
    title: 'Project One',
    description: 'An awesome project that showcases modern web development',
    tech: ['Vue', 'Nuxt', 'TailwindCSS'],
    emoji: '🚀',
    link: '#'
  },
  {
    title: 'Project Two',
    description: 'Open source contribution helping the community',
    tech: ['JavaScript', 'Open Source'],
    emoji: '🔓',
    link: '#'
  },
  {
    title: 'Project Three',
    description: 'Creative exploration in web design and animation',
    tech: ['CSS Animation', 'Design'],
    emoji: '✨',
    link: '#'
  },
  {
    title: 'Project Four',
    description: 'Photography project or visual experiment',
    tech: ['Photography', 'Visual'],
    emoji: '🎨',
    link: '#'
  },
  {
    title: 'Project Five',
    description: 'Collaboration or community-driven initiative',
    tech: ['Team', 'Community'],
    emoji: '🤝',
    link: '#'
  },
  {
    title: 'Project Six',
    description: 'Latest work or experimental feature',
    tech: ['Experimental', 'New'],
    emoji: '🧪',
    link: '#'
  }
])
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
