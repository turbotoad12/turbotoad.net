<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-black">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-neon-purple/20">
      <div class="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="text-2xl font-bold text-glow">
          turbotoad
        </NuxtLink>

        <!-- Nav Links -->
        <div class="flex gap-8 items-center">
          <NuxtLink
            to="/"
            class="hover:text-neon-cyan transition-colors font-semibold"
            active-class="text-neon-pink"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/projects"
            class="hover:text-neon-cyan transition-colors font-semibold"
            active-class="text-neon-pink"
          >
            Projects
          </NuxtLink>
          <NuxtLink
            to="/blog"
            class="hover:text-neon-cyan transition-colors font-semibold"
            active-class="text-neon-pink"
          >
            Blog
          </NuxtLink>
          <a
            href="#contact"
            class="btn-neon text-sm"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-1 pt-20">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="border-t border-neon-purple/20 bg-black/50 py-8 mt-20">
      <div class="max-w-6xl mx-auto px-4 md:px-8 text-center text-gray-400">
        <p>&copy; 2026 turbotoad. Built with Nuxt + TailwindCSS 🚀</p>
        <div class="flex gap-4 justify-center mt-4">
          <a href="#" class="hover:text-neon-pink transition-colors">GitHub</a>
          <a href="#" class="hover:text-neon-pink transition-colors">Twitter</a>
          <a href="#" class="hover:text-neon-pink transition-colors">Email</a>
        </div>
      </div>
    </footer>
  </div>
</template>

