<script>
import axios from 'axios';
import UserService from '@/core/services/UserService'

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        await UserService.login(this.username, this.password);
        this.$router.push('/user/dashboard');
      } catch (error) {
        console.error('Login error:', error);

        const errorData = error.response?.data || {};
        const errorMessage = errorData.error || 'An unexpected error occurred';
        const errorDetails = errorData.details ? `Details: ${errorData.details}` : '';

        alert(`Login failed:\n${errorMessage}\n${errorDetails}`);
      }
    },
  },
};
</script>

<template>
  <div class="login-page">
    <!-- Login Card -->
    <div class="login-container">
      <div class="card p-4 shadow-sm">
        <h2 class="card-title center text-center mb-4">
          <strong>Login</strong>
        </h2>
        <form @submit.prevent="handleLogin">
          <!-- Username field -->
          <div class="mb-3">
            <label for="username" class="form-label">USERNAME</label>
            <input
              v-model="username"
              type="text"
              class="form-control"
              placeholder="Type your username"
              required
            />
          </div>

          <!-- Password field -->
          <div class="mb-3">
            <label for="password" class="form-label">PASSWORD</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Type your password"
              required
            />
          </div>

          <!-- Login button -->
          <div class="center">
            <button type="submit" class="btn btn-primary w-100" @click="handleLogin">Login</button>
          </div>
        </form>
        <!-- Register link -->
        <p class="center text-center mt-3">
          <router-link to="/user/register" class="register-link center"
            >Are you an admin? Register here</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.center {
  text-align: center;
}
/* Fundo da página */
.login-page {
  background-image: url("/main_background.webp");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  margin: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

/* Container central */
.login-container {
  display: flex;
  justify-content: center; /* Garante que o conteúdo fique centralizado */
  align-items: center;
  width: 150%;
  max-width: 450px; /* Limita a largura do container */
}

/* Card de login */
.card {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 2rem;
}

/* Título do card */
.card-title {
  font-size: 40px;
  margin-bottom: 1rem;
  color: #000000;
}

/* Inputs de texto */
.form-label {
  letter-spacing: 2px;
  font-size: small;
  color: #313131; /* Cinza */
  display: block; /* Mantém o label acima do input */
  margin-bottom: 0.5rem; /* Espaço entre o label e a caixa de texto */
  font-weight: normal; /* Remove o negrito */
}

.form-control {
  padding: 1rem;
  font-size: 1.2rem; /* Aumenta o tamanho da fonte */
  border: none; /* Remove as bordas padrão */
  border-radius: 9px; /* Bordas caixa de texto */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Suave sombra */
  outline: none; /* Remove o contorno azul padrão ao focar */
  width: 80%; /* Garante que as caixas de texto ocupem toda a largura disponível */
}

.form-control:focus {
  border: 2px solid #808080; /* Bordas visíveis ao focar */
}

/* Espaçamento entre os campos */
.mb-3 {
  margin-top: 1.5rem; /* Espaço entre os campos */
}

/* Botão de login */
.btn-primary {
  background-color: #000000;
  color: #ffffff; /* Torna o texto do botão branco */
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Suave sombra */
  margin-top: 1.5rem; /* Espaço entre o botão e os campos acima */
}

.btn-primary:hover {
  background-color: #575757;
  cursor: pointer;
}

/* Link de registro */
.register-link {
  color: #1b518b;
  text-decoration: none;
  font-size: x-small;
}

.register-link:hover {
  text-decoration: underline;
}
</style>
