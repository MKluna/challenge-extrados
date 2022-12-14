
# Extrados-Challenge

En este repositorio se desarrolla un challenge presentado por la gente de extrados.



## Descripción del desafio

Diseñar una base de datos que guarde la información de usuarios coleccionistas
de cartas de baseball, cartas de baseball coleccionables, y qué cartas tiene cada
usuario.

### Esquemas utilizados en este repositorio

- CARDS [idCard,playerName,playerLastName,playerRole,teamName,rarity]
- PACK  [dateOfPacking,idsCards,idPackage]
- USER  [username,email,password,role,deck]

Detalles a tener en cuenta: En las series se deberá guardar la fecha en la que salió cada serie y que
tarjetas pertenecen a cada serie. Tener en cuenta que un jugador puede
aparecer en 2 o más series con información distinta (ej: jugador X pertenece
al equipo A en la serie 1 y al equipo B en la serie 2).
Cada coleccionista debe poder marcar qué cartas tiene. Debe poder obtener la lista
de todas las cartas, y también la lista de las cartas que solo él tiene. Al momento
de hacer la petición a todas las cartas, se debe indicar cuáles de esas cartas ya
tiene.

## Instalación

Para comenzar a utilizar este proyecto debemos ejecutar:

```bash
  npm install
```
Antes de comenzar podemos ejecutar el siguiente comando para crear un usuario administrador para poder utilizarlo durante el uso del proyecto

```bash
  npm run createadmin
```
Luego levantaremos el servidor con el comando    

```bash
  npm run dev
```

Deberiamos ver el siguiente mensaje: 
```sh
Application ready in http://localhost:8080/api
The database is successfully connected
```

## Dependencias utilizadas

| Dependencies               |
| -------------------------- |
| bcryptjs| 
| cors| 
| dotenv| 
| express| 
| express-validator| 
| jsonwebtoken | 
| mongoose| 
| mongoose-delete| 
| nodemon| 


## API Reference

#### Create a user

```http
  POST /api/auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**.  User's name|
| `email` | `string` | **Required**. User's email |
| `password` | `string` | **Required**. User's password |

#### Login

```http
  POST /api/auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. User's email |
| `password` | `string` | **Required**. User's password |

#### GET Cards

```http
  GET /api/cards
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Bearer Token` | `token` | **Required**. Token obtained after login , Role admin - collectionist   |

#### GET Card By Id Card

```http
  GET /api/cards/idCard
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `idCard` | `string` | **Required**. idCard is not a mongo id|

#### POST Card

```http
  POST /api/cards
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Bearer Token` | `token` | **Required**. Token obtained after login , Role admin   |
| `playerName` | `token` | **Required**. Player's name|
| `playerLastName` | `string` | **Required**.  Player's last name|
| `playerRole` | `string` | **Required**.  Player's role in the team|
| `teamName` | `string` | **Required**.  Team name|
| `rarity` | `array` | **Required**.  Valid values :  (bronce,plata,oro,platino).|

#### PUT Card By Id Card

```http
  PUT /api/cards/idCard
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Bearer Token` | `token` | **Required**. Token obtained after login , Role admin   |
| `idCard` | `string` | **Required**. idCard is not a mongo id|
| `playerName` | `token` | **Required**. Player's name|
| `playerLastName` | `string` | **Required**.  Player's last name|
| `playerRole` | `string` | **Required**.  Player's role in the team|
| `teamName` | `string` | **Required**.  Team name|
| `rarity` | `array` | **Required**.  Valid values :  (bronce,plata,oro,platino).|

#### DELETE Card By Id Card

```http
  DELETE /api/cards/idCard
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Bearer Token` | `token` | **Required**. Token obtained after login , Role admin   |
| `idCard` | `string` | **Required**. idCard is not a mongo id|

#### PUT Insert Card In Deck

```http
  PUT /api/deck/insertcardindeck
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Bearer Token` | `token` | **Required**. Token obtained after login , Role collectionist  |
| `cards` | `array` | **Required**. Contains mongo IDS list of cards|

#### DELETE Cards in deck

```http
  DELETE /api/deck/removecards
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Bearer Token` | `token` | **Required**. Token obtained after login , Role collectionist  |
| `cards` | `array` | **Required**. Contains mongo IDS list of cards|


#### GET Cards in my deck

```http
  GET /api/deck/mydeck
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Bearer Token` | `token` | **Required**. Token obtained after login , Role collectionist  |

#### POST Pack

```http
  POST /api/pack
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Bearer Token` | `token` | **Required**. Token obtained after login , Role admin   |
| `dateOfPacking` | `date` | **Required**. Package creation date - Format: dd/mm/yyyy|
| `idsCards` | `array` | **Required**.  List of card ids, idCard is not a mongo id |


#### GET Pack By idPackage

```http
  GET /api/pack/idPackage
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Bearer Token` | `token` | **Required**. Token obtained after login , Role admin   |
| `idPackage` | `string` | **Required**. idPackage is not a mongo id|

#### GET Packs

```http
  GET /api/pack/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Bearer Token` | `token` | **Required**. Token obtained after login , Role admin   |

#### PUT Pack By idPackage

```http
  PUT /api/pack/idPackage
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Bearer Token` | `token` | **Required**. Token obtained after login , Role admin   |
| `idPackage` | `string` | **Required**. idPackage is not a mongo id|
| `dateOfPacking` | `date` |  Package creation date - Format: dd/mm/yyyy|
| `idsCards` | `array` |   List of card ids, idCard is not a mongo id |

#### DELETE Pack By idPackage

```http
  DELETE /api/pack/idPackage
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Bearer Token` | `token` | **Required**. Token obtained after login , Role admin   |

#### DELETE Card In Pack

```http
  DELETE /api/pack/idPackage/idCard
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Bearer Token` | `token` | **Required**. Token obtained after login , Role admin   |
| `idPackage` | `string` | **Required**. idPackage is not a mongo id|
| `idCard` | `string` | **Required**. idCard is not a mongo id|


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` - Port where the project will run

`DB_URI` - Url of the mongodb database

`SECRET` - Secret for signing tokens


