# Sangue Latino

## 📖 Sobre o projeto
**Sangue Latino**, além de homenagear a música de *Secos & Molhados*, como o nome evidencia, é um projeto que busca evocar a identidade das raízes sul-americanas por meio daquilo que mais nos aproxima e conecta: nossa música.

Inspirado no conceito de **“América Invertida”**, criado em 1935 pelo artista uruguaio Joaquín Torres García, este trabalho propõe um olhar para o nosso continente a partir de uma perspectiva própria, onde o sul não é periferia, mas centro. Assim como Torres García desafiou a geografia simbólica ao virar o mapa de cabeça para baixo, aqui escolhemos o nosso norte cultural através da música — expressão viva das histórias, lutas e esperanças de nossos povos.

A seleção de **10 discos populares entre os 13 países e territórios da América do Sul** é mais que um inventário musical: é um gesto de afirmação. Cada álbum representa não apenas um estilo ou gênero, mas vozes coletivas, movimentos culturais e forças ancestrais que ecoam raízes indígenas, africanas, ribeirinhas e sertanejas, traduzindo a pluralidade que compõe o sangue latino.

> “Nosso norte é o sul” — Joaquín Torres García  
> Aqui reafirmamos: **nosso norte é a música**.

---

## 🛠️ Tecnologias e bibliotecas utilizadas
- [Bootstrap](https://getbootstrap.com/) → para layout responsivo e componentes visuais.
- [SweetAlert2](https://sweetalert2.github.io/) → para popups interativos e estilizados.
- [Google Fonts](https://fonts.google.com/) → tipografia personalizada:
  - Stardos Stencil
  - Poppins
  - Oswald
- [Gemini](https://deepmind.google/technologies/gemini/) e **Nano Banana (Google)** → utilizados para aprimorar algumas capas de discos.
- **JSON** → estrutura de dados que funciona como banco de informações dos discos.

---

## 📂 Estrutura de dados
O projeto utiliza um arquivo `discos.json` contendo informações de cada álbum:
- Nome do disco
- Ano de lançamento
- País
- Artistas
- Gêneros
- Frase de definição
- Contexto histórico
- Música destaque (faixa + link)

---

## 💻 Funcionalidades
- **Interface Web** para consultas:  
  - Navegação por país  
  - Exibição em grade das capas dos discos  
  - Popups com informações detalhadas via SweetAlert2  

- **Disco do Dia**:  
  - Ao abrir a página, um álbum é selecionado aleatoriamente como indicação.  
  - O resultado é salvo em `localStorage`, garantindo que o mesmo disco seja exibido durante todo o dia.  

- **Busca dinâmica**:  
  - Campo de pesquisa que filtra discos por nome, artista ou gênero em tempo real.  

---

## 🎶 Significado
Este projeto busca revelar como a música sul-americana é capaz de atravessar fronteiras, unir diferenças e construir uma narrativa própria, independente das hierarquias impostas pelo olhar externo.

É uma celebração da pluralidade cultural e da força da música como fio que costura identidades e nos devolve o poder de contar nossa própria história.

---

## 📜 Licença
Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).  
Isso significa que você pode usar, modificar e distribuir livremente, desde que mantenha a atribuição ao autor original.
