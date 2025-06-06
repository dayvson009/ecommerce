// Função para verificar se o usuário já aceitou os cookies
function verificarCookiesAceitos() {
  return localStorage.getItem("cookiesAceitos") === "true";
}

// Função para exibir o banner de cookies
function exibirBannerCookies() {
  const cookieBanner = document.getElementById("cookie-banner");
  cookieBanner.style.display = "block";
}

// Função para aceitar cookies
function aceitarCookies() {
  localStorage.setItem("cookiesAceitos", "true");
  const cookieBanner = document.getElementById("cookie-banner");
  cookieBanner.style.display = "none";
}

// Verificar se o banner de cookies deve ser exibido
if (!verificarCookiesAceitos()) {
  exibirBannerCookies();
}