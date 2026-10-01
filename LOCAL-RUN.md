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

Se o sistema operacional exibir um aviso de firewall, permita conexões de entrada na porta TCP 3000 apenas na rede privada/escolar.

## Persistência dos dados

Todos os cadastros, professores, turmas, senhas, personagens, desempenho, jogos e atividades são gravados na máquina que executa o servidor, em:

```text
data/abc-kids.json
```

**Encerrar `npm run dev` não apaga os dados.** Ao iniciar o servidor novamente, o app lê o mesmo arquivo. A gravação é feita de forma atômica e mantém também `data/abc-kids.json.bak` para recuperação caso o processo seja interrompido durante uma gravação.

Para usar uma pasta permanente específica da escola, defina `ABC_KIDS_DATA_DIR` antes de iniciar:

```powershell
$env:ABC_KIDS_DATA_DIR = "C:\ABC-Kids-data"
npm run dev
```

No Linux/macOS:

```bash
ABC_KIDS_DATA_DIR=/var/lib/abc-kids npm run dev
```

Faça cópias periódicas da pasta configurada para backup externo. Não apague `abc-kids.json` enquanto o servidor estiver em uso.

## Observações de segurança

Este projeto é destinado à rede interna da escola. Não exponha a porta 3000 diretamente à internet. A máquina do servidor deve permanecer ligada enquanto os demais dispositivos estiverem usando o sistema.
