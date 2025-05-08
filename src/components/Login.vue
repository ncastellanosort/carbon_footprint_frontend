<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const router = useRouter()
const isLoading = ref(false)
const error = ref('')

const form = reactive({
  email: '',
  password: '',
  remember: false
})

async function handleSubmit() {
  isLoading.value = true
  error.value = ''

  try {
    // Aquí integrarías con tu servicio de autenticación
    // Por ejemplo: const response = await signIn(form.email, form.password)

    // Simulamos un retraso de autenticación
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Para fines de demostración, simplemente redirigimos al dashboard
    // En una aplicación real, verificarías la respuesta y manejarías los errores
    router.push('/dashboard')
  } catch (err) {
    error.value = "Credenciales incorrectas. Por favor intenta de nuevo."
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <Navbar />
  <div class="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex justify-center items-center">

    <div class="bg-white p-8 rounded-lg shadow-md w-1/3">
      <h2 class="text-2xl font-semibold text-green-800 mb-6">Iniciar sesión</h2>

      <div v-if="error"
        class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center gap-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <p class="text-sm">{{ error }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <input id="email" v-model="form.email" type="email" placeholder="tu@ejemplo.com" required
            class="w-full px-3 py-2 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
        </div>

        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
            <router-link to="/forgot-password" class="text-sm text-green-600 hover:text-green-800">
              ¿Olvidaste tu contraseña?
            </router-link>
          </div>
          <input id="password" v-model="form.password" type="password" required
            class="w-full px-3 py-2 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
        </div>

        <div class="flex items-center space-x-2">
          <input id="remember" v-model="form.remember" type="checkbox"
            class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
          <label for="remember" class="text-sm font-normal">Recordarme</label>
        </div>

        <button type="submit"
          class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          :disabled="isLoading">
          {{ isLoading ? "Iniciando sesión..." : "Iniciar sesión" }}
        </button>

        <div class="space-y-2">
          <div class="flex items-center">
            <label for="password" class="block text-sm font-medium text-gray-700">¿No tienes una cuenta? </label>
            <router-link to="/register" class="text-sm text-green-600 hover:text-green-800">
              Registrate
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
  <Footer />
</template>
