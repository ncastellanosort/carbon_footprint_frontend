<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-lime-100 p-6 flex items-center justify-center">
    <div class="max-w-5xl mx-auto">
      <div class="grid md:grid-cols-2 gap-8 items-center">
        <div class="bg-white rounded-2xl shadow-xl p-8 order-2 md:order-1">
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="bg-green-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h1 class="text-3xl font-bold text-green-800">Calculadora de Huella de Carbono</h1>
            </div>

            <p class="text-gray-700 text-lg">
              Descubre cuál es tu impacto en el planeta a través de esta sencilla prueba que evalúa tus hábitos diarios.
            </p>

            <div class="bg-green-50 rounded-lg p-4">
              <h2 class="font-semibold text-green-800 mb-2">¿Qué es la huella de carbono?</h2>
              <p class="text-gray-700">
                La huella de carbono es la cantidad total de gases de efecto invernadero que generamos con nuestras
                actividades diarias. Conocerla es el primer paso para reducir nuestro impacto ambiental.
              </p>
            </div>

            <div class="space-y-3">
              <h2 class="font-semibold text-gray-800">La prueba evalúa 4 áreas principales:</h2>
              <div class="grid grid-cols-2 gap-3">
                <div class="flex items-center gap-2">
                  <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-600" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" stroke-width="2">
                      <path
                        d="M5 17h14M5 17a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2M5 17l-2 4h18l-2-4M12 4v16" />
                    </svg>
                  </div>
                  <span class="text-gray-700">Transporte</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-600" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4" />
                      <path d="M18 2v4h4" />
                      <path d="M18 6L9 15" />
                    </svg>
                  </div>
                  <span class="text-gray-700">Residuos</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-600" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  <span class="text-gray-700">Energía</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-600" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 3v18M3 12h18" />
                    </svg>
                  </div>
                  <span class="text-gray-700">Alimentación</span>
                </div>
              </div>
            </div>

            <div class="space-y-2">
              <p class="text-gray-700">
                La prueba toma aproximadamente 5 minutos en completarse y al finalizar recibirás recomendaciones
                personalizadas.
              </p>
              <p class="text-sm text-gray-500">
                Tus datos son confidenciales y solo se utilizan para calcular tu huella de carbono.
              </p>
            </div>

            <button @click="comenzarPrueba"
              class="w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium">
              Comenzar la prueba
            </button>
          </div>
        </div>

        <div class="order-1 md:order-2">
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
            <img
              src="https://media.istockphoto.com/id/1441625773/es/vector/icono-vectorial-de-huella-de-co2.jpg?s=612x612&w=0&k=20&c=LrnyT2DMYbRewPTu6w01nEGrlfhE4rivrZB76dGsAKI="
              alt="Planeta Tierra" class="w-full h-auto object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-bold text-green-800 mb-2">¿Por qué es importante?</h3>
              <p class="text-gray-600">
                Conocer y reducir nuestra huella de carbono es fundamental para combatir el cambio climático. Cada
                pequeña acción cuenta y juntos podemos marcar la diferencia.
              </p>
              <div class="mt-4 flex items-center gap-2 text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
                <span>Basado en estándares internacionales de medición de huella de carbono</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Función para comenzar la prueba
const comenzarPrueba = () => {
  // En una aplicación real, aquí iría la navegación a la primera sección
  console.log('Comenzando la prueba...')
}
</script>

