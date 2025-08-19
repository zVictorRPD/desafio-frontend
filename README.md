
# Desafio Frontend Oliveira Trust

Sistema de listagem de Carteiras de Bitcoin utilizando React, Vite, Typescript e Tailwindcss

Feito por: Victor de Oliveira Martins Azevedo - victor2007azevedo@hotmail.com

### Bibliotecas instaladas

- react v19.1.1
- vite v7.1.2
- typescript v5.8.3
- tailwindcss v4.1.12
- json-server v1.0.0-beta.3
- lucide-react v0.539.0
- react-query v5.85.3
- formik v2.4.6
- yup v1.7.0
- react-modal v3.16.3
- react-hot-toast v2.6.0

## Estrutura do projeto

```markdown
├── public/
│   └── images/                     # Imagens utilizadas 
└── src/                            # Arquivos globais de configuração da aplicação
    ├── api/                        # JSON com os dados das carteiras 
    ├── components/                 # Contém os componentes globais da aplicação 
    │   ├── layout/app/             # Layout do sistema (header, main, footer)
    │   └── ui/                     # Componentes da aplicação
    ├── pages/                      # Contém as páginas da aplicação 
    │   └── wallets/                # CRUD das carteiras
    │       ├── components/         # Componentes relacionados a carteira (filtro, modais, tabela, formulário)
    │       └── Index               # Página de listagem de carteiras
    └── styles/                     # Configuração global do css
    └── utils/                      # Funções e interfaces utilitárias para toda a aplicação  
        ├── forms/                  # Dados iniciais e validação dos formulários
        ├── functions/              # Funções de tratamento e manipulação de dados
        ├── interfaces/             # Interface das variaveis
        └── services/               # Configuração e chamadas a API
```
## Comandos de execução

Clone o projeto

```bash
  git clone https://github.com/zVictorRPD/desafio-frontend
```

Entre no diretório do projeto

```bash
  cd desafio-frontend
```

Instale as dependências

```bash
  npm install
```

Inicie a aplicação

```bash
  npm run dev
```

Inicie a API

```bash
  npm run api
```
## Observações

Por ser uma listagem de carteiras eu preferi utilizar "wallet" para se referir as entidades no lugar de "users" (mantive users na api para não alterar o JSON fornecido).

Fiquei um pouco confuso em relação aos campos do CRUD. No protótipo do figma estavam faltando alguns dados do JSON, optei por seguir o layout proposto, gerando uma hash aleatória para o campo "endereco_carteira", e deixando os campos de "data_nascimento" e "endereco" vazios, pois na minha interpretação, eles não são relevantes para o cadastro das carteiras.

