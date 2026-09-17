# ABC Kids — execução local na rede da escola

O aplicativo foi preparado para rodar em uma única máquina da escola como servidor local. Os computadores, tablets e celulares conectados à mesma rede acessam o endereço IPv4 dessa máquina e compartilham os mesmos dados.

## Requisitos

Instale Node.js 20 ou superior na máquina que será o servidor. O projeto usa React, Vite, Express e TypeScript.

## Instalação e execução

No diretório do projeto, execute:

```bash
npm install
npm run dev
```

O servidor escuta em `0.0.0.0`, portanto aceita conexões da rede local. Para descobrir o IPv4 da máquina:

- Windows: `ipconfig`
- Linux: `ip addr`
- macOS: `ifconfig`

Em outro dispositivo da escola, abra:

```text
http://IPV4-DA-MAQUINA:3000
```

Por exemplo: `http://192.168.1.25:3000`.

Se o sistema operacional exibir um aviso de firewall, permita conexões de entrada na porta TCP 3000 apenas na rede privada/escolar. Todos os dados criados pelo app são gravados em `data/abc-kids.json` na máquina do servidor. Faça cópia desse arquivo para backup antes de alterações importantes.

## Observações de segurança

Este projeto é destinado à rede interna da escola. Não exponha a porta 3000 diretamente à internet. A máquina do servidor deve permanecer ligada enquanto os demais dispositivos estiverem usando o sistema.
