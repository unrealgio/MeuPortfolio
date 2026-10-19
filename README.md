# Meu Portfólio

> Portfólio pessoal desenvolvido para apresentar minha experiência, projetos, habilidades e trajetória como Full Stack Web Developer.

**🔗 Acesse:** [giovanni-felipe-dev.vercel.app](https://giovanni-felipe-dev.vercel.app/)

## Sobre o projeto

Este projeto é meu portfólio pessoal, desenvolvido com foco em uma experiência moderna, responsiva e intuitiva.

O site reúne informações sobre minha trajetória profissional, principais habilidades, projetos desenvolvidos e formas de contato, funcionando como uma apresentação profissional do meu trabalho como desenvolvedor fullstack.

## Destaques

- **Animação de fundo em three.js**: efeito de warp/hiperespaço feito com shaders e instancing, calculado na GPU. Tem entrada em "salto", acelera com o scroll e reage ao mouse.
- **Performance**: o three.js é carregado sob demanda (lazy loading, em um chunk separado), a animação pausa fora da tela e usa menos estrelas em celulares; imagens em WebP com lazy loading.
- **Acessibilidade**: respeita `prefers-reduced-motion`, navegação por teclado e textos alternativos.
- **Bilíngue**: alternância entre português e inglês, com a preferência salva no navegador.
- **Responsivo**: layout adaptado para desktop, tablet e celular.

## Seções

- Apresentação (hero) com digitação animada e card de perfil em formato de código
- Sobre mim, experiência profissional, certificações e expertise técnica
- Projetos selecionados
- Contato

## Tecnologias

- React 19
- Vite
- JavaScript
- three.js
- CSS3
- ESLint e Prettier

## Scripts disponíveis

| Comando                | O que faz                                     |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento                   |
| `npm run build`        | Build de produção na pasta `dist/`            |
| `npm run preview`      | Serve o build de produção localmente          |
| `npm run lint`         | Verifica o código com o ESLint                |
| `npm run format`       | Formata o código com o Prettier               |
| `npm run format:check` | Verifica a formatação sem alterar os arquivos |

## Estrutura

```
src/
├── components/
│   ├── Hero.jsx            # Apresentação inicial
│   ├── HeroBackground.jsx  # Canvas da animação (carrega a cena sob demanda)
│   ├── warpScene.js        # Cena three.js do efeito warp
│   ├── About.jsx           # Sobre, experiência, certificações e tecnologias
│   ├── Projects.jsx        # Projetos selecionados
│   ├── Contact.jsx         # Contato e rodapé
│   └── Navbar.jsx          # Navegação e troca de idioma
├── context/
│   └── LanguageContext.jsx # Idioma (PT/EN)
├── App.jsx
├── main.jsx
└── index.css
```

## Contato

- LinkedIn: [giovanni-felipe-dev](https://www.linkedin.com/in/giovanni-felipe-dev/)
- E-mail: giovannifelipedev@gmail.com
