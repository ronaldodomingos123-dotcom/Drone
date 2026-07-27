# Instalar o Acompanhamento Diário como app no celular

Estes arquivos transformam o painel num **app instalável** (PWA): ícone na
tela inicial, tela cheia sem barra do navegador e funcionamento offline.

## Arquivos (mantenha todos na MESMA pasta)
- `acompanhamento-diario.html` — o app
- `manifest.webmanifest` — identidade do app (nome, ícone, cores)
- `sw.js` — funcionamento offline
- `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` — ícones

## Passo 1 — Colocar os arquivos num endereço web (obrigatório)
O modo app só ativa quando os arquivos são abertos por um endereço
`https://` — não funciona abrindo o arquivo direto do celular.
A forma mais fácil e gratuita:

1. Crie uma conta no **GitHub** (github.com).
2. Crie um repositório novo e envie todos os arquivos acima.
3. Em **Settings → Pages**, ative o GitHub Pages (branch `main`, pasta `/root`).
4. Em ~1 minuto o GitHub te dá um link `https://seu-usuario.github.io/...`.

Alternativas igualmente gratuitas para hospedar: **Netlify Drop**
(netlify.com/drop — é só arrastar a pasta) ou **Cloudflare Pages**.

## Passo 2 — Instalar no celular
Abra o link `https://...` no navegador do celular e:

**Android (Chrome):** toque no menu (⋮) → **Adicionar à tela inicial** /
**Instalar app**.

**iPhone (Safari):** toque em Compartilhar (□↑) → **Adicionar à Tela de Início**.

Pronto: vai aparecer o ícone do drone na tela inicial. Ao abrir, roda em
tela cheia como um app e funciona mesmo sem internet.

## Observações importantes
- **Os dados ficam salvos apenas no aparelho e navegador onde você instalar.**
  Não sincroniza entre celulares. Faça backup usando os botões de exportar
  (imagem / PDF / copiar) quando precisar guardar ou compartilhar.
- Ao atualizar o app no futuro, troque o número da versão dentro de `sw.js`
  (linha `var VERSAO = "acomp-v1";` → `"acomp-v2"`) para o celular baixar a
  versão nova.
