<h1 align="center">Serverless API (API Gateway + Lambda + DynamoDB)</h1>

## ✨ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [Serverless Framework](serverless.com/)
- [Amazon API Gateway](https://aws.amazon.com/pt/api-gateway/)
- [Amazon Lambda](https://aws.amazon.com/pt/lambda/)
- [Amazon DynamoDB](https://aws.amazon.com/pt/api-gateway/)

## 💻 Projeto

O objetivo do projeto é demonstrar o conhecimento que adquiri durante os dias em que desenvolvi e aos que já possuia em relação ao desenvolvimento de backend

### Demonstração

Atráves da documentação você pode ter acesso ao projeto hospedado na AWS

### Documentação

https://documenter.getpostman.com/view/1670673/UzBmNTRL

### Modelo da tabela no DynamoDB

![](https://github.com/rafaelqw/stone-serverless-api/blob/master/images/readme/dynamodb-structure.png)

## 🚀 Como executar

- Clone o repositório e acesse o diretório
- Antes de fazer o deploy é necessário a configuração do [AWS CLI](https://aws.amazon.com/pt/cli/) em seu computador e o download do pacote [Serverless Framework](serverless.com/) de forma global com o [NPM](https://www.npmjs.com/)

### Para fazer o deploy

- Configurar as credenciais do usuário
- Rode `yarn deploy` ou `npm run deploy` para subir o projeto para AWS

Observação: Existem dois tipos de implementação, uma implementação simples da Lambda na pasta `src/functions` (comunidação com CountAPI) e uma implementação com os princípios SOLID aplicados na pasta `src/modules` e `src/shared` (módulo de usuário)

---
