<script setup>
import Navbar from "./NavbarAuth.vue";
import Footer from "@/components/Footer.vue";
import { ref } from "vue";
import { useMotion } from "@vueuse/motion";
</script>

<template>
  <Navbar />
  <div class="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col overflow-hidden">
    <main class="container mx-auto px-4 py-12 flex-1">
      <section class="text-center mb-16">
        <h1 class="text-4xl font-bold text-green-800 mb-4 animate-fadeIn">¡Bienvenido de nuevo!</h1>
        <p class="text-xl text-green-600 max-w-2xl mx-auto animate-fadeIn">
          Explora tu impacto ambiental, revisa tu historial y sigue reduciendo tu huella de carbono con acciones concretas.
        </p>
      </section>

      <section class="grid md:grid-cols-3 gap-12 text-center">
        <div v-motion="{ scale: 1.05 }">
          <router-link to="/calculate" class="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-green-600 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8m0-4h4m-4 0h-4" />
            </svg>
            <h2 class="text-2xl font-semibold text-green-800 mb-4">Calculadora</h2>
            <p class="text-gray-600">Haz una nueva evaluación y descubre cómo reducir tu impacto.</p>
          </router-link>
        </div>
        
        <div v-motion="{ scale: 1.05 }">
          <router-link to="/progress" class="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-green-600 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 3v18h18" />
              <path d="M19 9-5 5-4-4-3 3" />
            </svg>
            <h2 class="text-2xl font-semibold text-green-800 mb-4">Tu Progreso</h2>
            <p class="text-gray-600">Monitorea tu historial y ve tus mejoras a lo largo del tiempo.</p>
          </router-link>
        </div>

        <div v-motion="{ scale: 1.05 }">
          <router-link to="/tips" class="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-green-600 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <h2 class="text-2xl font-semibold text-green-800 mb-4">Consejos Sostenibles</h2>
            <p class="text-gray-600">Aprende nuevas formas de reducir tu huella con pequeños cambios.</p>
          </router-link>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.8s ease-out;
}
</style>
