document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".sidebar li");
  const mainContent = document.getElementById("main-content");

  const loadPage = (page) => {
    fetch(`pages/${page}.html`)
      .then((res) => res.text())
      .then((html) => {
        mainContent.innerHTML = html;
      })
      .catch(() => {
        mainContent.innerHTML = "<p>Página não encontrada.</p>";
      });
  };

  // Carrega Dashboard por padrão
  loadPage("dashboard");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const page = item.getAttribute("data-page");
      loadPage(page);
    });
  });
});

function carregarPagina(pagina) {
  fetch(`pages/${pagina}.html`)
    .then(response => response.text())
    .then(html => {
      document.getElementById('main-content').innerHTML = html;
    })
    .catch(error => {
      console.error('Erro ao carregar a página:', error);
    });
}

// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function () {
  // Máscara para CPF
  const cpfInput = document.querySelector("#cpf");
  if (cpfInput) {
    Inputmask({ mask: "999.999.999-99" }).mask(cpfInput);
  }

  // Máscara para telefone
  const telefoneInput = document.querySelector("#telefone");
  if (telefoneInput) {
    Inputmask({ 
      mask: ["(99) 9999-9999", "(99) 99999-9999"], 
      keepStatic: true 
    }).mask(telefoneInput);
  }
});
