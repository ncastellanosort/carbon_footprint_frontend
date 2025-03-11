<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Encabezado -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-orange-800 mb-2">Tu Huella de Carbono</h1>
        <p class="text-gray-600 text-lg">Basado en tus respuestas, hemos calculado tu impacto ambiental</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 items-start">
        <!-- Resultado y gráfico -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <div class="flex flex-col items-center mb-6">
            <!-- Medidor visual de la huella -->
            <div class="relative w-64 h-32 mb-6">
              <div class="absolute inset-0">
                <svg viewBox="0 0 200 100" class="w-full h-full">
                  <!-- Fondo del medidor -->
                  <path d="M20 80 A 60 60 0 0 1 180 80" stroke="#f1f5f9" stroke-width="16" fill="none" />

                  <!-- Secciones coloreadas del medidor -->
                  <path d="M20 80 A 60 60 0 0 1 60 32" stroke="#22c55e" stroke-width="16" fill="none" />
                  <path d="M60 32 A 60 60 0 0 1 100 20" stroke="#facc15" stroke-width="16" fill="none" />
                  <path d="M100 20 A 60 60 0 0 1 140 32" stroke="#f97316" stroke-width="16" fill="none" />
                  <path d="M140 32 A 60 60 0 0 1 180 80" stroke="#ef4444" stroke-width="16" fill="none" />

                  <!-- Indicador (aguja) -->
                  <line :x1="100" :y1="80" :x2="100 + 60 * Math.cos((huellaCarbono / maxHuella) * Math.PI)"
                    :y2="80 - 60 * Math.sin((huellaCarbono / maxHuella) * Math.PI)" stroke="#0f172a" stroke-width="3" />
                  <circle cx="100" cy="80" r="6" fill="#0f172a" />
                </svg>
              </div>

              <!-- Etiquetas del medidor -->
              <div class="absolute bottom-0 left-0 text-xs text-green-600 font-medium">Baja</div>
              <div class="absolute bottom-0 right-0 text-xs text-red-600 font-medium">Alta</div>
            </div>

            <div class="text-center">
              <div class="text-5xl font-bold text-orange-600 mb-2">{{ huellaCarbono.toFixed(1) }}</div>
              <div class="text-gray-500">toneladas de CO₂ al año</div>
            </div>
          </div>

          <!-- Desglose por categoría -->
          <div class="space-y-4 mt-8">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Desglose por categoría</h3>

            <div class="space-y-3">
              <div v-for="(item, index) in categorias" :key="index">
                <div class="flex justify-between mb-1">
                  <span class="text-gray-700">{{ item.nombre }}</span>
                  <span class="font-medium">{{ item.valor.toFixed(1) }} t</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div class="h-2.5 rounded-full" :class="item.color"
                    :style="{ width: `${(item.valor / huellaCarbono) * 100}%` }"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Comparativa -->
          <div class="mt-8 p-4 bg-orange-50 rounded-lg">
            <p class="text-gray-700">
              Tu huella está <span class="font-semibold" :class="comparacionClase">{{ comparacionTexto }}</span>
              que el promedio nacional de {{ promedioNacional }} toneladas de CO₂ al año.
            </p>
          </div>
        </div>

        <!-- Recomendaciones e imagen -->
        <div class="space-y-6">
          <div class="bg-white rounded-2xl shadow-xl p-8">
            <h2 class="text-2xl font-bold text-orange-800 mb-4">Recomendaciones Personalizadas</h2>

            <div class="space-y-4">
              <div v-for="(recomendacion, index) in recomendaciones" :key="index" class="flex gap-3">
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <span class="text-orange-600 text-lg">{{ index + 1 }}</span>
                </div>
                <div>
                  <h3 class="font-medium text-gray-800">{{ recomendacion.titulo }}</h3>
                  <p class="text-gray-600">{{ recomendacion.descripcion }}</p>
                </div>
              </div>
            </div>

            <div class="mt-6">
              <img
                src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                alt="Imagen de sostenibilidad" class="w-full h-auto rounded-xl object-cover" />
              <p class="text-sm text-gray-500 mt-2 text-center">Pequeños cambios en nuestros hábitos pueden tener un
                gran impacto positivo en el planeta</p>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-xl p-8">
            <h2 class="text-2xl font-bold text-orange-800 mb-4">¿Y ahora qué?</h2>
            <p class="text-gray-600 mb-6">
              Conocer tu huella de carbono es el primer paso para reducir tu impacto ambiental.
              Implementa las recomendaciones sugeridas y vuelve a calcular tu huella en unos meses para ver tu progreso.
            </p>

            <div class="flex flex-col sm:flex-row gap-4">
              <button @click="volverAlInicio"
                class="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex-1 text-center">
                Volver al inicio
              </button>
              <button
                class="px-6 py-3 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors flex-1 text-center">
                Compartir resultados
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Datos de ejemplo - en una aplicación real estos vendrían de los componentes anteriores
const huellaCarbono = ref(8.2)
const maxHuella = 20
const promedioNacional = 9.5

// Categorías de la huella
const categorias = [
  { nombre: 'Transporte', valor: 3.5, color: 'bg-orange-500' },
  { nombre: 'Consumo energético', valor: 2.8, color: 'bg-yellow-500' },
  { nombre: 'Alimentación', valor: 1.2, color: 'bg-green-500' },
  { nombre: 'Residuos', valor: 0.7, color: 'bg-blue-500' }
]

// Recomendaciones personalizadas
const recomendaciones = [
  {
    titulo: 'Reduce tu consumo energético',
    descripcion: 'Cambia a bombillas LED y apaga los electrodomésticos cuando no los uses.'
  },
  {
    titulo: 'Optimiza tus desplazamientos',
    descripcion: 'Utiliza transporte público o comparte coche siempre que sea posible.'
  },
  {
    titulo: 'Mejora la gestión de residuos',
    descripcion: 'Separa correctamente tus residuos y reduce el uso de plásticos de un solo uso.'
  },
  {
    titulo: 'Consume productos locales y de temporada',
    descripcion: 'Reducirás las emisiones asociadas al transporte de alimentos.'
  }
]

// Comparación con el promedio
const comparacionTexto = computed(() => {
  const diferencia = ((huellaCarbono.value - promedioNacional) / promedioNacional) * 100
  if (diferencia <= -20) return 'significativamente menor'
  if (diferencia < 0) return 'ligeramente menor'
  if (diferencia === 0) return 'igual'
  if (diferencia <= 20) return 'ligeramente mayor'
  return 'significativamente mayor'
})

const comparacionClase = computed(() => {
  if (huellaCarbono.value < promedioNacional) return 'text-green-600'
  if (huellaCarbono.value === promedioNacional) return 'text-yellow-600'
  return 'text-orange-600'
})

// Función para volver al inicio
const volverAlInicio = () => {
  // En una aplicación real, aquí iría la navegación
  console.log('Volviendo al inicio...')
}
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
