<template>
  <div class="space-y-20 pb-20">
    <!-- Hero Section -->
    <section class="max-w-6xl mx-auto px-4 md:px-8 pt-10">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="space-y-6">
          <h1 class="text-5xl md:text-6xl font-black text-glow leading-tight">
            Hey, I'm turbotoad!
          </h1>
          <p class="text-xl text-gray-300 leading-relaxed">
            A creative developer passionate about building beautiful web experiences, taking photos, and contributing to open source. Welcome to my corner of the internet!
          </p>
          <div class="flex gap-4 flex-wrap pt-4">
            <NuxtLink to="/projects" class="btn-neon">
              View My Work →
            </NuxtLink>
            <a href="#" class="px-6 py-3 rounded-full font-bold text-lg border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all">
              Download Resume
            </a>
          </div>
        </div>

        <!-- Hero Image Placeholder -->
        <div class="relative">
          <div class="absolute inset-0 bg-gradient-retro rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
          <div class="relative bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 rounded-3xl p-12 border-2 border-neon-pink min-h-96 flex items-center justify-center">
            <div class="text-center">
              <div class="text-6xl mb-4">📸</div>
              <p class="text-gray-400">Your photo gallery will go here!</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Highlight Cards -->
    <section class="max-w-6xl mx-auto px-4 md:px-8">
      <h2 class="text-4xl font-black mb-12">
        <span class="text-glow">What I Do</span>
      </h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="card-glow">
          <div class="text-4xl mb-4">💻</div>
          <h3 class="text-xl font-bold mb-3 text-neon-cyan">Web Development</h3>
          <p class="text-gray-400">Creating stunning, modern websites with Nuxt, Vue, and TailwindCSS</p>
        </div>
        <div class="card-glow">
          <div class="text-4xl mb-4">📷</div>
          <h3 class="text-xl font-bold mb-3 text-neon-green">Photography</h3>
          <p class="text-gray-400">Capturing moments and exploring visual storytelling through the lens</p>
        </div>
        <div class="card-glow">
          <div class="text-4xl mb-4">🔓</div>
          <h3 class="text-xl font-bold mb-3 text-neon-orange">Open Source</h3>
          <p class="text-gray-400">Contributing to community projects and building tools for developers</p>
        </div>
      </div>
    </section>

    <!-- Recent Projects Preview -->
    <section class="max-w-6xl mx-auto px-4 md:px-8">
      <div class="flex items-center justify-between mb-12">
        <h2 class="text-4xl font-black">
          <span class="text-glow">Recent Projects</span>
        </h2>
        <NuxtLink to="/projects" class="text-neon-cyan hover:text-neon-pink transition-colors font-bold">
          See All →
        </NuxtLink>
      </div>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="card-glow group overflow-hidden">
          <div class="bg-gradient-warm h-40 mb-4 rounded-lg group-hover:scale-110 transition-transform duration-300"></div>
          <h3 class="text-xl font-bold text-neon-pink mb-2">Project Name</h3>
          <p class="text-gray-400 mb-4">Short description of your awesome project goes here</p>
          <div class="flex gap-2">
            <span class="text-xs px-3 py-1 rounded-full bg-neon-purple/20 text-neon-purple">Vue</span>
            <span class="text-xs px-3 py-1 rounded-full bg-neon-blue/20 text-neon-blue">Nuxt</span>
          </div>
        </div>
        <div class="card-glow group overflow-hidden">
          <div class="bg-gradient-cool h-40 mb-4 rounded-lg group-hover:scale-110 transition-transform duration-300"></div>
          <h3 class="text-xl font-bold text-neon-pink mb-2">Another Project</h3>
          <p class="text-gray-400 mb-4">Describe what makes this project special and unique</p>
          <div class="flex gap-2">
            <span class="text-xs px-3 py-1 rounded-full bg-neon-green/20 text-neon-green">Open Source</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="max-w-6xl mx-auto px-4 md:px-8">
      <div class="bg-gradient-to-r from-neon-pink/20 via-neon-purple/20 to-neon-blue/20 rounded-3xl p-12 border-2 border-neon-pink text-center">
        <h2 class="text-4xl font-black mb-4 text-glow">Let's Create Something Amazing</h2>
        <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Have a project in mind? I'd love to hear about it!</p>
        <a href="#" class="btn-neon inline-block">Get in Touch</a>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
