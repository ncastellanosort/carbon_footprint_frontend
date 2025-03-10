<script setup>
import Navbar from "@/components/Navbar.vue"

</script>

<template>
  <Navbar />
  <section class="bg-gradient-to-r from-green-100 to-blue-100 min-h-screen flex items-center justify-center p-6">
    <div class="max-w-3xl w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <h2 class="text-3xl font-bold text-center text-gray-700 mb-6">🌱 Calculadora de Huella de Carbono</h2>
      <p class="text-gray-600 text-center mb-6">
        Esta calculadora te ayudará a estimar tu impacto ambiental en función de tu estilo de vida. Responde algunas
        preguntas y descubre cómo reducir tu huella de carbono.
      </p>
      <div class="flex justify-center">
        <router-link to="/calculadora">
          <button class="bg-lime-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-lime-600 transition font-medium">
            Empezar
          </button>
        </router-link>
      </div>
    </div>
  </section>
</template>
