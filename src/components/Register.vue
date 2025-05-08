<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const router = useRouter()
const isLoading = ref(false)
const error = ref('')
const passwordError = ref('')

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false
})

async function handleSubmit() {
  isLoading.value = true
  error.value = ''
  passwordError.value = ''

  // Validar que las contraseñas coincidan
  if (form.password !== form.confirmPassword) {
    passwordError.value = "Las contraseñas no coinciden"
    isLoading.value = false
    return
  }

  try {
    // Aquí integrarías con tu servicio de autenticación
    // Por ejemplo: const response = await createUser(form.name, form.email, form.password)

    // Simulamos un retraso de autenticación
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Para fines de demostración, simplemente redirigimos al dashboard
    // En una aplicación real, verificarías la respuesta y manejarías los errores
    router.push('/dashboard')
  } catch (err) {
    error.value = "No se pudo crear la cuenta. Por favor intenta de nuevo."
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <Navbar />

  <div
    class="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex justify-center items-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-1/3">
      <h2 class="text-2xl font-semibold text-green-800 mb-6">Crear cuenta</h2>

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
          <label for="name" class="block text-sm font-medium text-gray-700">Nombre completo</label>
          <input id="name" v-model="form.name" type="text" placeholder="Tu nombre" required
            class="w-full px-3 py-2 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
        </div>

        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <input id="email" v-model="form.email" type="email" placeholder="tu@ejemplo.com" required
            class="w-full px-3 py-2 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
        </div>

        <div class="space-y-2">
          <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
          <input id="password" v-model="form.password" type="password" required
            class="w-full px-3 py-2 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            :class="{ 'border-red-500': passwordError }" />
          <p class="text-xs text-gray-500">La contraseña debe tener al menos 8 caracteres</p>
        </div>

        <div class="space-y-2">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
          <input id="confirmPassword" v-model="form.confirmPassword" type="password" required
            class="w-full px-3 py-2 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            :class="{ 'border-red-500': passwordError }" />
          <p v-if="passwordError" class="text-xs text-red-600">{{ passwordError }}</p>
        </div>

        <div class="flex items-center space-x-2">
          <input id="terms" v-model="form.terms" type="checkbox" required
            class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
          <label for="terms" class="text-sm font-normal">
            Acepto los <a href="/terms" class="text-green-600 hover:text-green-800 underline">términos y
              condiciones</a>
          </label>
        </div>

        <button type="submit"
          class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          :disabled="isLoading">
          {{ isLoading ? "Creando cuenta..." : "Crear cuenta" }}
        </button>
        <div class="space-y-2">
          <div class="flex items-center">
            <label for="password" class="block text-sm font-medium text-gray-700">¿Ya tienes una cuenta? </label>
            <router-link to="/login" class="text-sm text-green-600 hover:text-green-800">
              Inicia sesión
            </router-link>
          </div>
        </div>

      </form>
    </div>
  </div>
  <Footer />
</template>
