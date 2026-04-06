function openNav() {
document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
document.getElementById("mySidenav").style.width = "0";
}


let discosData = []; // variável global para guardar os dados

  function slugify(text) {
    return text.toLowerCase()
               .replace(/\s+/g, '-')        
               .replace(/[^\w\-]+/g, '');   
  }

  // Carregar JSON
  fetch('js/discos.json')
    .then(response => response.json())
    .then(data => {
      discosData = data.discos; // guardar para pesquisa
      renderDiscos(discosData);
    });

  // Função para renderizar países e álbuns
  function renderDiscos(discos) {
    const listGroup = document.getElementById("list-tab");
    const tabContent = document.getElementById("nav-tabContent");
    listGroup.innerHTML = "";
    tabContent.innerHTML = "";

    discos.forEach((item, index) => {
      const slug = slugify(item.pais);

      // País na lista
      const a = document.createElement("a");
      a.className = "list-group-item list-group-item-action" + (index === 0 ? " active" : "");
      a.id = `list-${slug}-list`;
      a.setAttribute("data-bs-toggle", "list");
      a.href = `#list-${slug}`;
      a.role = "tab";
      a.textContent = item.pais;
      listGroup.appendChild(a);

      // Conteúdo da aba (grade de álbuns)
        const div = document.createElement("div");
        div.className = "tab-pane fade" + (index === 0 ? " show active" : "");
        div.id = `list-${slug}`;
        div.role = "tabpanel";

        // Adiciona o título do país antes da grade
        let htmlAlbuns = `<h4 class="text-center mb-4 text-white">${item.pais}</h4>`;
        htmlAlbuns += "<div class='row'>";

        item.albuns.forEach(album => {
        htmlAlbuns += `
            <div class="col-md-3 mb-4 text-center">
            <div class="album-card" style="cursor:pointer;">
                <img src="${album.capa}" alt="${album.nome}" class="img-fluid" style="max-height:250px;">
                <h6 class="mt-2">${album.nome}</h6>
            </div>
            </div>
        `;
        });

        htmlAlbuns += "</div>";
        div.innerHTML = htmlAlbuns;

      div.innerHTML = htmlAlbuns;
      tabContent.appendChild(div);

      // Eventos de clique para abrir SweetAlert2
      item.albuns.forEach(album => {
        const cards = div.querySelectorAll(".album-card");
        cards.forEach(card => {
          if (card.querySelector("h6").textContent === album.nome) {
            card.addEventListener("click", () => {
              Swal.fire({
                title: album.nome,
                html: `
                  <img src="${album.capa}" alt="${album.nome}" style="width:300px; margin-bottom:15px;">
                  <p><strong>Ano:</strong> ${album.ano}</p>
                  <p><strong>Artistas:</strong> ${album.artistas.join(", ")}</p>
                  <p><strong>Gêneros:</strong> ${album.generos.join(", ")}</p>
                  <p><em>${album.frase_definicao}</em></p>
                  <p>${album.contexto}</p>
                  <p><strong>Música destaque: ${album.musica_destaque.faixa}</strong> 
                    </p>
                    <p><a href="${album.musica_destaque.link}" target="_blank"><img src="img/botao-play.png" class="pt-3 mx-auto icone-play" alt="Ouvir Faixa Recomendada" title="Ouvir Faixa Recomendada"></a></p>
                `,
                width: 600,
                background: '#D6993E',
                confirmButtonText: 'Fechar',
                confirmButtonColor: '#25530E',
                color: '#ffffff',
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText: 'Fechar',
                showCloseButton: true
              });
            });
          }
        });
      });
    });
  }

  // Filtro de pesquisa
  document.getElementById("pesquisa").addEventListener("input", function() {
    const termo = this.value.toLowerCase();

    // Filtrar países e álbuns
    const filtrados = discosData.map(pais => {
      const albunsFiltrados = pais.albuns.filter(album =>
        album.nome.toLowerCase().includes(termo) ||
        album.artistas.some(artista => artista.toLowerCase().includes(termo)) ||
        album.generos.some(genero => genero.toLowerCase().includes(termo))
      );
      return { ...pais, albuns: albunsFiltrados };
    }).filter(pais => pais.albuns.length > 0);

    renderDiscos(filtrados);
  });

function escolherDiscoDoDia(discos) {
  const paisAleatorio = discos[Math.floor(Math.random() * discos.length)];
  const albumAleatorio = paisAleatorio.albuns[Math.floor(Math.random() * paisAleatorio.albuns.length)];
  return { pais: paisAleatorio.pais, album: albumAleatorio };
}

function renderDiscoDoDia(pais, album) {
  document.getElementById("frase-definicao").textContent = album.frase_definicao;
  document.getElementById("contexto").textContent = album.contexto;
  document.getElementById("capa-disco").src = album.capa;
  document.getElementById("capa-disco").alt = `Capa do disco ${album.nome}`;

  const info = `
    País: ${pais}<br>
    Artista(s): ${album.artistas.join(", ")}<br>
    Disco: ${album.nome}<br>
    Gênero(s): ${album.generos.join(", ")}<br>
    Ano: ${album.ano}<br>
    Faixa Recomendada: ${album.musica_destaque.faixa}
  `;
  document.querySelector("p.pt-5").innerHTML = info;

  const link = document.querySelector("a.pb-5");
  link.href = album.musica_destaque.link;
}

fetch('js/discos.json')
  .then(response => response.json())
  .then(data => {
    const hoje = new Date().toISOString().split("T")[0]; // formato YYYY-MM-DD
    const salvo = localStorage.getItem("discoDoDia");

    if (salvo) {
      const { dataSalva, pais, album } = JSON.parse(salvo);
      if (dataSalva === hoje) {
        // Já existe disco salvo para hoje
        renderDiscoDoDia(pais, album);
        return;
      }
    }

    // Sorteia novo disco
    const { pais, album } = escolherDiscoDoDia(data.discos);
    renderDiscoDoDia(pais, album);

    // Salva no localStorage com a data
    localStorage.setItem("discoDoDia", JSON.stringify({
      dataSalva: hoje,
      pais,
      album
    }));
  })
  .catch(error => console.error('Erro ao carregar JSON:', error));