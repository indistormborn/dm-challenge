# Tech Challenge - Recipe List
API para busca de receitas baseadas em uma lista de ingredientes.

### Estrutura
Aplicação foi escrita em `NodeJS`, utilizando `Express` para o servidor e a biblioteca `Mocha` em conjunto com `Chai` para realizar os testes unitários. Para garantir a qualidade de código, seguindo os guias de estilo especificos para Javascript, fora utilizada a biblioteca `StandardJS`, por não necessitar arquivos externos de configuração. O deploy da API é feito através de uma conteinrização utilizando `Docker` e `Docker Compose`.

### APIs externas
A aplicação utiliza duas APIs externas como base para seus resultados: a [Recipe Puppy API](http://www.recipepuppy.com/about/api/), para retornar as receitas e a [Giphy API](https://developers.giphy.com/docs/) para retornar os gifs relativos às receitas.

Para utilizar a Giphy API é necessário criar uma chave de autenticação. Mais informações em https://developers.giphy.com/docs/api#quick-start-guide. 
Para a Recipe Puppy API não é necessária nenhuma autenticação.

### 1. Instalação

Para realizar os passos de instalação será necessario primeiramente clonar este repositorio, criar um arquivo de variáveis de ambiente e gerar uma imagem Docker, que será rodada utilizando um docker-compose.

#### 1.1 Variáveis de ambiente

Para rodar são necessarias as seguintes variáveis de ambiente, que devem ser adicionadas à um arquivo `.env` na raiz do projeto.
```
HTTP_PORT=8080
GIPHY_API_KEY= [ CHAVE DE API GERADA ]
RECIPEPUPPY_BASE_URL=http://www.recipepuppy.com/api/
GIPHY_BASE_URL=https://api.giphy.com/v1/gifs/
```
#### 1.2 Docker
Na raiz do projeto, execute os seguintes comandos para gerar e rodar a aplicação. Nenhuma configuração adicional para rodar o Docker será necessária, visto que o Compose já se encarrega disso (expor a porta, definir a imagem que vai rodar, etc).

1. Criar imagem docker
```
docker build . -t dm-challenge 
```
2. Rodar docker-compose
```
docker-compose up 
```

#### 1.3 Rodando localmente
Caso não queira rodar usando Docker, pode rodar direto na raiz do projeto usando Node. Também é necessário o arquivo de variaveis de ambiente.
```
node index.js
```

### 2. Utilização

1. No browser

```
http://localhost:8080/recipes/?i=tomato,eggs,ham
```

2. No terminal
```
curl http://localhost:8080/recipes/?i=tomato,eggs,ham
```

### 3. Test
Para rodar os testes, basta executar, na raiz do projeto.
```
npm test
```
O script irá rodar primeiro o `StandardJS` para validar a estrutura do código e após os testes unitários utilizando o `Mocha`.
