import { defineConfig } from 'vite'
import react from '@vitejs/vite-plugin-react' // or vue/svelte depending on your framework

export default defineConfig({
  plugins: [react()],
  base: '/Final-Kiosk-App/', // <-- Add this exact line right here!
})
