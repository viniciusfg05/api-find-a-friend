### Regras da aplicação

- [x]Deve ser possível cadastrar um pet
  [x]Não pode ser possível cadastrar as imagens antes do dados do pet
- [x]Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x]Deve ser possível filtrar pets por suas características
- [x]Deve ser possível visualizar detalhes de um pet para adoção
- [x]Deve ser possível se cadastrar como uma ORG
    [x]Não pode ser possível  se cadastrar duplicado
- [x]Deve ser possível realizar login como uma ORG

### Regras de negócio

- [x]Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x]Uma ORG precisa ter um endereço e um número de WhatsApp
- [x]Um pet deve estar ligado a uma ORG
- [x]O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x]Todos os filtros, além da cidade, são opcionais
- [x]Para uma ORG acessar a aplicação como admin, ela precisa estar logada


### Iniciando projeto
  - [x] Usando versões exatas do NPM
    - Cria arquivo `.npmrc` e dentro `save-exact=true`
  - [x] Carregando variáveis ambiente
    - `npm i dotenv e zod`: Realizar as configurações de schema
  - [x] Configurando ESLint
  - [x] Importação padrão "@/arquivo"
  - [x] Criando docker - bitnami postgresql
    - `docker run --name api-find-a-friend -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=findafriend -p 5432:5432 bitnami/postgresql:latest`
  - [x] Criando docker compose


