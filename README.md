# ABC Kids

Aplicativo educativo local para apoiar a alfabetização de crianças por meio de jogos, atividades e acompanhamento do desempenho pela professora.

O sistema foi desenvolvido para ser executado em **uma máquina da escola**. Essa máquina funciona como servidor local e os demais computadores, tablets e celulares acessam o app pelo **IPv4 da máquina servidora**.

> **Importante:** o app não precisa ser publicado na internet para funcionar na escola. Todos os dispositivos devem estar conectados à mesma rede local.

---

## Sumário

- [O que o aplicativo oferece](#o-que-o-aplicativo-oferece)
- [Requisitos](#requisitos)
- [Baixar o projeto](#baixar-o-projeto)
- [Instalar as dependências](#instalar-as-dependências)
- [Executar no computador servidor](#executar-no-computador-servidor)
- [Acessar por outros dispositivos usando IPv4](#acessar-por-outros-dispositivos-usando-ipv4)
- [Dados e persistência](#dados-e-persistência)
- [Acessos iniciais](#acessos-iniciais)
- [Comandos úteis](#comandos-úteis)
- [Atualizar o projeto](#atualizar-o-projeto)
- [Testar e gerar build](#testar-e-gerar-build)
- [Solução de problemas](#solução-de-problemas)
- [Estrutura principal do projeto](#estrutura-principal-do-projeto)
- [Segurança e recomendações](#segurança-e-recomendações)

---

## O que o aplicativo oferece

### Área do aluno

- Acesso aos jogos de alfabetização.
- Níveis **Silábico-alfabético** e **Alfabético** separados.
- Percentual de desempenho independente para cada nível.
- Jogos com digitação, arrastar e soltar, rimas, sílabas, palavras e sons.
- Personalização do personagem.
- Registro das atividades realizadas.

### Área da professora

- Cadastro e gerenciamento de alunos.
- Criação e visualização de turmas.
- Busca de alunos por nome.
- Filtros por nível e desempenho.
- Liberação do nível Alfabético.
- Edição da senha dos alunos.
- Visualização do progresso individual e da turma.

### Jogos disponíveis

1. Complete a palavra
2. Coloque a letra
3. Batalha de sílabas
4. Troca-Letra
5. Caça-sílabas
6. Legendas
7. Letras móveis
8. Escuta palavra
9. Rima ou Não Rima
10. Caça-palavras
11. Lanterna Mágica
12. Alimente o monstrinho

---

## Requisitos

Na máquina que será o servidor, instale:

- **Node.js 20 ou superior**
- **npm** (instalado junto com o Node.js)
- **Git** (necessário para clonar e atualizar o projeto)
- Acesso à rede local da escola

Verifique as versões instaladas:

```bash
node --version
npm --version
git --version
```

O resultado do Node deve ser `v20` ou superior.

### Instalar o Node.js

Baixe pelo site oficial:

<https://nodejs.org/>

No Windows, escolha a versão **LTS** e marque a opção para adicionar o Node ao PATH durante a instalação.

---

## Baixar o projeto

Abra o terminal, PowerShell ou o terminal integrado do VS Code e execute:

```bash
git clone https://github.com/chicleti2450/abc-kids-local-app.git
cd abc-kids-local-app
```

Para abrir o projeto no VS Code:

```bash
code .
```

Se o comando `code` não estiver disponível, abra o VS Code manualmente e selecione **File > Open Folder**. Escolha a pasta `abc-kids-local-app`.

---

## Instalar as dependências

Dentro da pasta do projeto, execute:

```bash
npm install
```

### Para que serve esse comando?

`npm install` lê o arquivo `package.json` e instala todas as bibliotecas necessárias do aplicativo dentro da pasta `node_modules`.

Esse comando precisa ser executado:

- Na primeira instalação do projeto.
- Depois de clonar o projeto novamente.
- Quando o arquivo `package.json` for atualizado.

A pasta `node_modules` não deve ser enviada ao GitHub. Ela é recriada pelo `npm install`.

---

## Executar no computador servidor

Depois de instalar as dependências, execute:

```bash
npm run dev
```

### Para que serve esse comando?

`npm run dev` inicia o servidor de desenvolvimento do ABC Kids. Ele:

- Inicializa o backend local.
- Inicializa o frontend React/Vite.
- Abre a comunicação pela rede local.
- Salva os dados no computador servidor.
- Atualiza o navegador automaticamente quando o código é alterado.

O terminal deverá exibir uma mensagem parecida com:

```text
Server running on http://localhost:3000/
```

Mantenha esse terminal aberto enquanto a escola estiver usando o aplicativo.

### Abrir no próprio computador servidor

No navegador da máquina servidora, acesse:

```text
http://localhost:3000
```

Também é possível usar:

```text
http://127.0.0.1:3000
```

Para encerrar o servidor, pressione:

```text
Ctrl + C
```

Encerrar o servidor não apaga os dados salvos.

---

## Acessar por outros dispositivos usando IPv4

O computador servidor e os dispositivos dos alunos devem estar conectados à **mesma rede Wi-Fi ou rede cabeada**.

### 1. Descobrir o IPv4 do computador servidor

#### Windows

Abra o PowerShell ou Prompt de Comando:

```powershell
ipconfig
```

Procure o campo **IPv4 Address** ou **Endereço IPv4**, por exemplo:

```text
192.168.1.25
```

#### Linux

```bash
hostname -I
```

Ou:

```bash
ip addr
```

#### macOS

```bash
ipconfig getifaddr en0
```

Se estiver usando outra interface de rede, também pode consultar:

```bash
ifconfig
```

### 2. Abrir o aplicativo em outro dispositivo

Em outro computador, tablet ou celular conectado à mesma rede, abra o navegador e digite:

```text
http://IPV4-DO-SERVIDOR:3000
```

Exemplo:

```text
http://192.168.1.25:3000
```

Não use `localhost` no celular ou em outro computador. Nesses dispositivos, `localhost` aponta para o próprio dispositivo, não para o computador servidor.

### Se a porta 3000 estiver ocupada

O aplicativo procura automaticamente outra porta disponível, normalmente `3001`, `3002` ou outra próxima.

Observe no terminal qual porta foi informada pelo servidor e use essa porta no endereço IPv4:

```text
http://192.168.1.25:3001
```

### Liberar no firewall do Windows

Se outros dispositivos não conseguirem acessar o app:

1. Mantenha o `npm run dev` em execução.
2. Quando o Windows perguntar, permita o Node.js em **redes privadas**.
3. Não habilite redes públicas sem necessidade.
4. Se necessário, crie uma regra para permitir a porta TCP usada pelo app somente na rede privada da escola.

---

## Dados e persistência

Os dados são salvos no computador que executa o servidor, dentro da pasta do projeto:

```text
data/abc-kids.json
```

Esse arquivo contém, entre outras informações:

- Cadastros de alunos.
- Cadastro da professora.
- Turmas e vínculos dos alunos.
- Senhas.
- Personagens personalizados.
- Jogos realizados.
- Acertos e erros.
- Percentuais dos níveis.
- Atividades e progresso.

**Os dados continuam salvos depois que o servidor é encerrado.** Quando o comando `npm run dev` for executado novamente, o sistema lê o mesmo arquivo.

O aplicativo também mantém um backup automático:

```text
data/abc-kids.json.bak
```

A gravação é feita de forma atômica para reduzir o risco de corrupção se o computador for desligado durante uma gravação.

### Fazer backup manual

Antes de atualizações importantes, copie a pasta `data` para outro local:

#### Windows PowerShell

```powershell
Copy-Item -Recurse data data-backup
```

#### Linux/macOS

```bash
cp -R data data-backup
```

### Usar uma pasta permanente específica

Por padrão, os dados ficam em `data` dentro do projeto. Para salvar em uma pasta própria da escola, defina `ABC_KIDS_DATA_DIR` antes de iniciar.

#### Windows PowerShell

```powershell
$env:ABC_KIDS_DATA_DIR = "C:\ABC-Kids-data"
npm run dev
```

#### Windows Prompt de Comando

```cmd
set ABC_KIDS_DATA_DIR=C:\ABC-Kids-data
npm run dev
```

#### Linux/macOS

```bash
ABC_KIDS_DATA_DIR=/var/lib/abc-kids npm run dev
```

A pasta escolhida deve existir ou permitir que o aplicativo a crie. Faça backup periódico dessa pasta.

> O arquivo `data/abc-kids.json` não é enviado ao GitHub, pois contém dados da escola. Ao clonar o projeto em outro computador, os dados não são transferidos automaticamente. Para levar os dados para outra máquina, copie a pasta `data` usando um meio seguro.

---

## Acessos iniciais

A seed inicial cria uma professora e uma turma de exemplo para o primeiro uso.

### Professora

```text
Nome: Silvana
Senha: SESI1234
```

### Turma

```text
1ºEF
```

### Alunos

Os alunos da turma recebem senhas no formato sequencial:

```text
EDU01
EDU02
EDU03
...
EDU34
```

A professora pode editar a senha de cada aluno dentro do painel do professor.

> Em um ambiente real, troque as senhas iniciais e mantenha os dados somente na rede interna da escola.

---

## Comandos úteis

Todos os comandos abaixo devem ser executados dentro da pasta do projeto.

### Iniciar o app

```bash
npm run dev
```

### Instalar ou atualizar dependências

```bash
npm install
```

### Verificar tipos TypeScript

```bash
npm run check
```

Esse comando verifica erros de tipagem sem gerar arquivos de produção.

### Executar os testes

```bash
npm test
```

Os testes verificam, entre outras coisas:

- Persistência de atividades.
- Conclusão de atividades.
- Seed da professora e dos alunos.
- Regras de desempenho.
- Fluxos principais do armazenamento.

### Gerar uma versão de produção

```bash
npm run build
```

Esse comando cria os arquivos compilados nas pastas de build. Ele não substitui o `npm run dev` durante o desenvolvimento da escola.

### Executar a versão compilada

Depois de executar o build:

```bash
npm start
```

Use essa opção quando quiser executar a versão compilada, sem o modo de desenvolvimento do Vite.

### Formatar o código

```bash
npm run format
```

---

## Atualizar o projeto

Antes de atualizar, faça backup dos dados:

```bash
# verifique se a pasta data existe e faça uma cópia antes de continuar
```

Depois, encerre o servidor com `Ctrl + C` e execute:

```bash
git pull origin main
npm install
npm run check
npm test
npm run dev
```

Se o repositório estiver configurado com o remoto `github`, use:

```bash
git pull github main
```

### Atualização segura no Windows PowerShell

```powershell
Copy-Item -Recurse data data-backup-antes-da-atualizacao
git pull origin main
npm install
npm run check
npm test
npm run dev
```

---

## Solução de problemas

### `npm` não é reconhecido

Feche e abra novamente o terminal depois de instalar o Node.js. Depois confirme:

```bash
node --version
npm --version
```

Se ainda não funcionar, reinstale o Node.js LTS e habilite a opção de adicionar ao PATH.

### `'NODE_ENV' não é reconhecido`

O projeto já usa `cross-env` para funcionar no Windows. Atualize as dependências:

```bash
npm install
npm run dev
```

### A porta 3000 está ocupada

Não é necessário encerrar imediatamente o outro programa: o ABC Kids procura outra porta disponível. Use no navegador a porta mostrada no terminal.

Para descobrir qual processo está usando a porta 3000 no Windows:

```powershell
netstat -ano | findstr :3000
```

No Linux/macOS:

```bash
lsof -i :3000
```

### O celular não abre o endereço IPv4

Confira:

1. Celular e servidor estão na mesma rede.
2. O endereço usa o IPv4 correto do servidor.
3. A porta usada é a mesma mostrada no terminal.
4. O firewall permitiu o Node.js em rede privada.
5. O servidor ainda está rodando no terminal.
6. A rede da escola não possui isolamento entre dispositivos Wi-Fi.

### Os dados parecem vazios

Verifique se está usando a mesma máquina e a mesma pasta do projeto. Confira se este arquivo existe:

```text
data/abc-kids.json
```

Se a aplicação estiver usando uma pasta definida por `ABC_KIDS_DATA_DIR`, verifique essa variável:

#### Windows PowerShell

```powershell
echo $env:ABC_KIDS_DATA_DIR
```

#### Linux/macOS

```bash
echo $ABC_KIDS_DATA_DIR
```

### O projeto foi clonado em outro computador

O código vem do GitHub, mas os dados locais não vêm junto, por segurança. Copie a pasta `data` do computador antigo para o novo ou configure `ABC_KIDS_DATA_DIR` apontando para uma cópia segura dos dados.

---

## Estrutura principal do projeto

```text
abc-kids-local-app/
├─ client/
│  └─ src/
│     ├─ components/       # Componentes visuais compartilhados
│     ├─ games/            # Jogos e mecânicas das atividades
│     ├─ screens/          # Telas de aluno e professora
│     ├─ lib/              # Estado, regras e sincronização local
│     └─ App.tsx           # Entrada e rotas do frontend
├─ data/
│  ├─ abc-kids.json        # Dados locais da escola, não versionado
│  └─ abc-kids.json.bak    # Backup automático, não versionado
├─ server/
│  ├─ localStore.ts        # Leitura, gravação e recuperação dos dados
│  ├─ seed.ts              # Dados iniciais da professora e dos alunos
│  └─ _core/index.ts       # Servidor local e acesso pela rede
├─ package.json             # Scripts e dependências
├─ package-lock.json        # Versões instaladas pelo npm
├─ LOCAL-RUN.md             # Guia resumido de execução na rede local
└─ README.md                # Este guia completo
```

---

## Segurança e recomendações

- Use o app somente na rede interna da escola.
- Não encaminhe a porta 3000 para a internet.
- Não publique `data/abc-kids.json` no GitHub.
- Faça backup da pasta de dados regularmente.
- Evite compartilhar as senhas dos alunos em mensagens públicas.
- Mantenha a máquina servidora ligada durante o uso dos demais dispositivos.
- Use uma conta de usuário protegida no computador servidor.
- Ao finalizar o expediente, encerre o servidor somente depois que os dados tenham sido sincronizados.

---

## Licença e desenvolvimento

O projeto é uma aplicação React com TypeScript, Vite, Express e persistência local em arquivo JSON. Para alterar o código:

```bash
git checkout -b minha-alteracao
npm install
npm run check
npm test
npm run dev
```

Depois de validar uma alteração, faça o commit:

```bash
git add .
git commit -m "descreva a alteração"
git push origin minha-alteracao
```
