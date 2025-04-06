## 🚀 PSQLab – Your In-Browser PostgreSQL Playground

[PSQLab](https://psqlab.neetigya.me/) is a **free, interactive UI built on top of [pglite](http://pglite.dev/)**, allowing you to run a full PostgreSQL database natively in your browser — no server or setup required.

### ✨ Features

- 🧠 **Jupyter-style interface** – Write and run SQL in multiple executable blocks.
- 🗃️ **Example social media schema** – Preloaded for hands-on experimentation.
- 💾 **Persistent storage** – Your data and changes are saved in browser local storage.
- ⚡ **Smart autocomplete** – Suggestions while typing to speed up querying.
- 🌗 **Light/Dark themes** – Customize the look to suit your vibe.
- 🐘 **Real PostgreSQL in-browser** – Built with pglite (WASM-based Postgres).

### 🎯 Who is it for?

- 👩‍🎓 **Students** – Learn and practice SQL without any installation.
- 👨‍💻 **Developers** – Quickly prototype or test queries.
- 🧑‍🏫 **Educators** – Use in classrooms as a lightweight teaching tool.
- 🤹 Anyone curious about databases.

### 💡 Contribute!

Want to help shape the future of in-browser SQL tools?
You can:

- Add AI-based query suggestions 🤖
- Improve UI/UX components 🧩
- Add multi-user or collaborative features 🔄

### 🔗 Useful Links

- 🔥 **Try it live**: [psqlab.neetigya.me](https://psqlab.neetigya.me/)
- 💻 **GitHub Repo**: [github.com/neetigyachahar/PSQLab](https://github.com/neetigyachahar/PSQLab)
- 🧑‍💼 **Connect on LinkedIn**: [Neetigya Chahar](https://www.linkedin.com/in/neetigyachahar)
- 🔗 **Learn more**: [PSQLab](https://dev.to/neetigyachahar/introducing-psqlab-your-in-browser-postgresql-playground-4anb)

Let’s build the future of database playgrounds together. Star ⭐️ the repo, use it, and contribute!

---

---

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react"

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
})
```
