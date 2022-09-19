
# Shortly API

<p align="center">
   <img width=350 src="https://www.encurtador.com.br/img/encurtador-logo.png"/>
</p>

- Vamos ser francos: passar uma URL gigante de um meme, vídeo ou qualquer outra coisa na internet para um(a) amigo(a) é uma situação embaraçosa. Tudo piora quando a pessoa que recebe o link não tem como abri-lo diretamente e é obrigada a escrever o link caractere por caractere.
- Para evitar este tipo de situação e de quebra conseguir monitorar os acessos a este link, surgiu o Shortly

- [Veja meu deploy na heroku aqui](https://shortly-api-mj.herokuapp.com/)

***

## Como usar

Instale meu projeto, crie um banco de dados com os comandos SQL na pasta database e configure o .env como no exemplo

```bash
  git clone git@github.com:marcojr73/projeto16-shortly.git
```

```bash
  npm i
  
  npm run dev
```

***

##	 Tecnologias e Conceitos

- Node.js
- Express
- Criptografia de senhas
- Validação por token
- Joi
- layered architecture
- Postgres
- SQL

***
    
## API Reference

#### Sign-up

```
  POST /sign-up
```

| sent by |Parameter | Type     |             
| :-------- |:-------- | :------- | 
| `body` |`name` | `string` |
| `body` |`email` | `string` |
| `body` |`password` | `string` |
| `body` |`confirmPassword` | `string` |

#### Sign-in

```
  POST /sign-in
```

| sent by |Parameter | Type     |             
| :-------- |:-------- | :------- | 
| `body` |`email` | `string` |
| `body` |`password` | `string` |

#### create a short url

```
  POST /urls/shorten
```

| sent by |Parameter | Type     |             
| :-------- |:-------- | :------- | 
| `header` |`authorization` | `token` |
| `body` |`url` | `string` |

#### View stats url by id

```
  GET /urls:id
```

#### Opem url by short url

```
  GET /urls/opem/${shortURL}
```

#### Delete url by id

```
  POST /urls/${id}
```

| sent by |Parameter | Type     |              
| :-------- |:-------- | :------- | 
| `header` |`authorization` | `token` |

#### View stats urls by user

```
  GET /users/${userID}
```
| sent by |Parameter | Type     |              
| :-------- |:-------- | :------- | 
| `header` |`authorization` | `token` |

#### view ranking of urls with the most hits

```
  GET /ranking
```
| sent by |Parameter | Type     |              
| :-------- |:-------- | :------- | 
| `header` |`authorization` | `token` |