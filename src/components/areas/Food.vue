<template>
  <Navbar />
  <div class="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 p-6">
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start">
      <!-- Formulario de Alimentación -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <div class="flex items-center gap-4 mb-8">
          <div class="bg-red-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-600" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <path d="M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3M12 19v-7M8 19v-7M16 19v-7M4 8h16M7 5h10" />
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-red-800">Alimentación</h2>
        </div>

        <div class="space-y-8">
          <!-- Carne Roja -->
          <div class="space-y-2">
            <label class="block text-lg font-medium text-gray-700">
              ¿Cuántas veces consumes carne roja a la semana?
            </label>
            <div class="relative pt-6">
              <input type="range" v-model="redMeat" min="0" max="14" step="1"
                class="w-full h-3 bg-red-200 rounded-lg appearance-none cursor-pointer" />
              <div class="absolute top-0 left-0 w-full flex justify-between text-sm text-gray-600">
                <span>0</span>
                <span>7</span>
                <span>14</span>
              </div>
            </div>
            <p class="text-center text-lg font-semibold text-red-600">{{ redMeat }} veces</p>
          </div>

          <!-- Carne Blanca -->
          <div class="space-y-2">
            <label class="block text-lg font-medium text-gray-700">
              ¿Cuántas veces consumes carne blanca (pollo, pescado) a la semana?
            </label>
            <div class="relative pt-6">
              <input type="range" v-model="whiteMeat" min="0" max="14" step="1"
                class="w-full h-3 bg-red-200 rounded-lg appearance-none cursor-pointer" />
              <div class="absolute top-0 left-0 w-full flex justify-between text-sm text-gray-600">
                <span>0</span>
                <span>7</span>
                <span>14</span>
              </div>
            </div>
            <p class="text-center text-lg font-semibold text-red-600">{{ whiteMeat }} veces</p>
          </div>

          <!-- Lácteos -->
          <div class="space-y-2">
            <label class="block text-lg font-medium text-gray-700">
              ¿Cuántas veces consumes productos lácteos a la semana?
            </label>
            <div class="relative pt-6">
              <input type="range" v-model="dairy" min="0" max="21" step="1"
                class="w-full h-3 bg-red-200 rounded-lg appearance-none cursor-pointer" />
              <div class="absolute top-0 left-0 w-full flex justify-between text-sm text-gray-600">
                <span>0</span>
                <span>10</span>
                <span>21</span>
              </div>
            </div>
            <p class="text-center text-lg font-semibold text-red-600">{{ dairy }} veces</p>
          </div>

          <!-- Comidas Vegetarianas -->
          <div class="space-y-2">
            <label class="block text-lg font-medium text-gray-700">
              ¿Cuántas comidas a la semana son completamente vegetarianas?
            </label>
            <div class="relative pt-6">
              <input type="range" v-model="vegetarian" min="0" max="21" step="1"
                class="w-full h-3 bg-red-200 rounded-lg appearance-none cursor-pointer" />
              <div class="absolute top-0 left-0 w-full flex justify-between text-sm text-gray-600">
                <span>0</span>
                <span>10</span>
                <span>21</span>
              </div>
            </div>
            <p class="text-center text-lg font-semibold text-red-600">{{ vegetarian }} comidas</p>
          </div>
        </div>

        <div class="mt-8 flex justify-between gap-4">
          <router-link to="/transport">

            <button class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              Atrás
            </button>
          </router-link>
          <router-link to="/energy">

            <button @click="nextStep" class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Siguiente
            </button>
          </router-link>
        </div>
      </div>

      <!-- Ilustración -->
      <div class="hidden md:block">
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <img
            :src="food_image"
            alt="Ilustración de impacto alimentario global" class="w-full h-auto rounded-xl mb-6" />
          <div class="space-y-4">
            <h3 class="text-2xl font-bold text-red-800">Impacto de la Alimentación</h3>
            <p class="text-gray-600">
              La producción de alimentos, especialmente la carne roja, es responsable de una parte significativa
              de las emisiones de gases de efecto invernadero. Optar por una dieta más basada en plantas puede
              reducir significativamente tu huella de carbono.
            </p>
            <div class="p-4 bg-red-50 rounded-lg">
              <p class="text-sm text-red-800">
                💡 Tip: Intenta implementar un día sin carne a la semana o explorar alternativas vegetales
                para reducir tu impacto ambiental.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref } from "vue";
import { useSurveyStore } from "@/service/surveyStore";
import { useRouter } from "vue-router";
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import food_image from '@/assets/food_image.jpg'

const store = useSurveyStore();
const router = useRouter();

const redMeat = ref(0)
const whiteMeat = ref(0)
const dairy = ref(0)
const vegetarian = ref(0)

const nextStep = () => {
  store.setFoodData({
    redMeat: redMeat.value,
    whiteMeat: whiteMeat.value,
    dairy: dairy.value,
    vegetarian: vegetarian.value,
  });
  router.push("/Transport");
};
</script>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  height: 12px;
  background: #fecaca;
  border-radius: 8px;
  background-image: linear-gradient(#dc2626, #dc2626);
  background-repeat: no-repeat;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: #b91c1c;
  cursor: pointer;
  box-shadow: 0 0 2px 0 #555;
  transition: background .3s ease-in-out;
}

input[type="range"]::-webkit-slider-thumb:hover {
  background: #991b1b;
}

input[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}
</style>
