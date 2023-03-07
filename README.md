![rickandmorty](https://user-images.githubusercontent.com/66215200/223308926-7cb4d2e8-a68b-48ac-a462-371cfe4a4095.png)
# Desafio Front-end EngagED
### Link da aplicação: https://rickandmortyapi-josevictordev.netlify.app/

Algumas dicas para o desafio:

- Fique à vontade para voar alto e adicionar mais funcionalidades ao que fora proposto,
mas não se esqueça de garantir a qualidade na sua solução como um todo.
- Gostaríamos que você utilizasse a versão 3 do Vue, porém se você se sentir mais
confortável com outra versão fique à vontade para usá-la.
- Gostaríamos também que você utilizasse TypeScript, porém não faz mal não usar caso
não tenha conhecimento.
- Está em dúvida de qual UI Framework usar com Vue 3? Nossa sugestão é o [Quasar](http://quasar.dev/)!
- Esperamos que a entrega do desafio seja realizada através do GitHub.
- Adoramos quando é disponibilizado um link para acessarmos a aplicação rodando!

# Desafio

Consumindo a [API em GraphQL da série de animação Rick and Morty](https://rickandmortyapi.com/documentation) desenvolva as
seguintes interfaces.

## Página de listagem dos personagens

- Essa página, além da listagem dos personagens da série, deve permitir filtrar os
personagens por nome.
- Ao selecionar um personagem da lista, a interface deve direcionar o usuário para a
página desse personagem.

## Página do personagem

- Essa página deve exibir, além das informações do personagem, quais episódios ele
aparece.

---

## Etapas

### Etapa 1 - Configuração do ambiente

- [x]  Criar projeto → Vue3 + Vite + Typescript + Repositório
- [x]  Colocar em live no Netlify

### Etapa 2

- Página 1 - Listagem dos Personagens
    - [x]  Listar os personagens da série
    - [x]  Filtrar personagens por nome
    - [x]  Clicar num personagem e ir para a Página 2

### Etapa 3
- Página 2 - Informações do personagem
    - [x]  Exibir dados do personagem
    - [x]  Exibir em quais episódios ele aparece
    

### **Features adicionais**
- [x]  Indicador de Vida ou Morte(X) sobre a foto do personagem 
- [x]  Paginação
- [x]  Filtros adicional pelo Status
- [x]  Loading para imagens
- [x]  Loading para página

## Rodando o projeto

## Instalação das dependências

```sh
npm install
```

### Levantar servidor local

```sh
npm run dev
```

### Gerar o build da aplicação

```sh
npm run build
```
