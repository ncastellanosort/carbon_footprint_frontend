<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import { register } from '../services/AuthService'
import manageToken from '../services/ManageToken'


manageToken.removeToken()

const router = useRouter()
const isLoading = ref(false)
const errorM = ref('')
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
  errorM.value = ''
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
      
      const response = await register({
        name: form.name,
        lastName: form.lastName,
        username: form.email,
        password: form.password,
        docType: form.docType,
        docNumber: form.docNumber,
        country: form.country,
        birthday: form.birthday
      })

      console.log("Registro exitoso:", response.data)

      await new Promise(resolve => setTimeout(resolve, 1000))

      router.push('/login')
    } catch (error) {
      errorM.value=error.response.data.message
      console.error("Error completo", error.response.data.message)
    } finally {
      isLoading.value = false
    }
}
</script>

<template>
  <Navbar />

  <div class="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex justify-center items-center px-4">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto mt-5 mb-5">
      <h2 class="text-2xl font-semibold text-green-800 mb-6 text-center">Crear cuenta</h2>

      <form @submit.prevent="handleSubmit" class="grid grid-cols-2 gap-x-6 gap-y-4">
        <div class="flex flex-col">
          <label for="name" class="text-sm font-medium text-gray-700">Nombre</label>
          <input id="name" v-model="form.name" type="text" placeholder="Tu nombre" required
            class="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-500" />
        </div>

        <div class="flex flex-col">
          <label for="lastName" class="text-sm font-medium text-gray-700">Apellido</label>
          <input id="lastName" v-model="form.lastName" type="text" placeholder="Tu apellido" required
            class="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-500" />
        </div>

        <div class="flex flex-col">
          <label for="country" class="text-sm font-medium text-gray-700">País</label>
          <select id="country" v-model="form.country" required
            class="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-500">
            <option value="" selected>Seleccione un país</option>
            <option value="MX">México</option>
            <option value="CO">Colombia</option>
            <option value="ES">España</option>
            <option value="US">Estados Unidos</option>
          </select>
        </div>

        <div class="flex flex-col">
          <label for="docType" class="text-sm font-medium text-gray-700">Tipo de documento</label>
          <select id="docType" v-model="form.docType" required
            class="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-500">
            <option value="" selected>Seleccione</option>
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="TI">Tarjeta de Identidad</option>
          </select>
        </div>

        <div class="flex flex-col">
          <label for="docNumber" class="text-sm font-medium text-gray-700">Número de documento</label>
          <input id="docNumber" v-model="form.docNumber" type="number" placeholder="123456789" required
            class="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-500" />
        </div>

        <div class="flex flex-col">
          <label for="birthday" class="text-sm font-medium text-gray-700">Fecha de nacimiento</label>
          <input type="date" id="birthday" v-model="form.birthday" required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
        </div>

        <div class="flex flex-col">
          <label for="email" class="text-sm font-medium text-gray-700">Correo electrónico</label>
          <input id="email" v-model="form.email" type="email" placeholder="tu@ejemplo.com" required
            class="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-500" />
        </div>

        <div class="flex flex-col">
          <label for="password" class="text-sm font-medium text-gray-700">Contraseña</label>
          <input id="password" v-model="form.password" type="password" required
            class="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-500"
            :class="{ 'border-red-500': passwordError }" />
          <p class="text-xs text-gray-500">Debe tener al menos 8 caracteres</p>
        </div>

        <div class="flex flex-col">
          <label for="confirmPassword" class="text-sm font-medium text-gray-700">Confirmar contraseña</label>
          <input id="confirmPassword" v-model="form.confirmPassword" type="password" required
            class="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-500"
            :class="{ 'border-red-500': passwordError }" />
          <p v-if="passwordError" class="text-xs text-red-600">{{ passwordError }}</p>
        </div>

        <div class="col-span-2 flex items-center space-x-2">
          <input id="terms" v-model="form.terms" type="checkbox" required
            class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
          <label for="terms" class="text-sm">
            Acepto los <a href="/terms" class="text-green-600 hover:text-green-800 underline">términos y condiciones</a>
          </label>
        </div>

        

        <div class="col-span-2">
          <div v-if="errorM"
        class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center gap-2 mt-4 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <p class="text-sm">{{ errorM }}</p>
      </div>

          <button type="submit"
            class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
            :disabled="isLoading">
            {{ isLoading ? "Creando cuenta..." : "Crear cuenta" }}
          </button>
        </div>

        <div class="col-span-2 text-center">
          <p class="text-sm text-gray-700">¿Ya tienes una cuenta?
            <router-link to="/login" class="text-green-600 hover:text-green-800 underline">Inicia sesión</router-link>
          </p>
        </div>
      </form>

      
    </div>
  </div>
</template>



