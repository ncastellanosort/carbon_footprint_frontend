<script setup>
  import Navbar from "@/components/Navbar.vue"
import Footer from "@/components/Footer.vue"
</script>

<template>
  <Navbar />
  <div class="min-h-screen bg-gradient-to-b from-green-50 to-green-100">

    <main class="container mx-auto px-4 py-12">
      <section class="text-center mb-16">
        <h1 class="text-4xl font-bold text-green-800 mb-4">Calcula y Reduce tu Huella de Carbono</h1>
        <p class="text-xl text-green-600 max-w-2xl mx-auto">Descubre el impacto de tus acciones diarias en el medio
        ambiente y aprende cómo reducirlo con EcoFootprint.</p>
      </section>

      <section class="grid md:grid-cols-2 gap-12 mb-16">
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold text-green-800 mb-4">¿Qué es la huella de carbono?</h2>
          <p class="text-gray-600">La huella de carbono es la cantidad total de gases de efecto invernadero que
          producimos directa o indirectamente a través de nuestras actividades diarias. Conocer tu huella de carbono
          es el primer paso para reducir tu impacto ambiental.</p>
        </div>
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold text-green-800 mb-4">¿Cómo funciona nuestra calculadora?</h2>
          <p class="text-gray-600">Nuestra calculadora analiza tus hábitos de consumo, transporte, alimentación y uso de
          energía para estimar tu huella de carbono anual. Te proporcionamos un desglose detallado y consejos
          personalizados para reducir tu impacto.</p>
        </div>
      </section>

      <section class="text-center mb-16">
        <h2 class="text-3xl font-bold text-green-800 mb-6">Características principales</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"
              fill="none" stroke="currentColor" class="h-12 w-12 text-green-600 mx-auto mb-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 20v-6M6 20V10M18 20V4" />
            </svg>         
            <h3 class="text-xl font-semibold text-green-800 mb-2">Cálculo Preciso</h3>
            <p class="text-gray-600">Algoritmos avanzados para una estimación precisa de tu huella de carbono.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              fill="currentColor" class="h-12 w-12 text-green-600 mx-auto mb-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 3v19" />
              <path d="M5 20h14" />
              <path d="M5 12h14" />
            </svg>
            <h3 class="text-xl font-semibold text-green-800 mb-2">Consejos Personalizados</h3>
            <p class="text-gray-600">Recomendaciones adaptadas a tu estilo de vida para reducir tu impacto.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" class="h-12 w-12 text-green-600 mx-auto mb-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 3v18h18" />
              <path d="m19 9-5 5-4-4-3 3" />
            </svg>
            <h3 class="text-xl font-semibold text-green-800 mb-2">Seguimiento de Progreso</h3>
            <p class="text-gray-600">Monitorea tus avances y observa cómo tus acciones reducen tu huella con el tiempo.
            </p>
          </div>
        </div>
      </section>

      <section class="text-center">
        <h2 class="text-3xl font-bold text-green-800 mb-6">Comienza tu viaje eco-friendly hoy</h2>
        <router-link to="/calculate"
          class="inline-block bg-green-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition duration-300">
          Calcula tu huella de carbono
        </router-link>
      </section>
    </main>
    <Footer />
  </div>
</template>
