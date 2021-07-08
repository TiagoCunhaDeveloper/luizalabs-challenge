## Luizalabs Desafio

    Essa api foi desenvolvida para fazer o controle de clientes e sua lista de produtos favoritos

### Estrutura do Projeto

    Este projeto tem uma estrutura de pastas simples, para que todos os que trabalharão neste projeto
    entenderem à primeira vista.

> controller -> Onde nossos endpoints estão localizados, tambem onde usamos os DTOs para validação de dados vindas do payload</br>
> domain -> Onde nossas models / schemas estão localizados, eles irão abstrair e estruturar todos os dados da aplicação </br>
> dtos -> Responsável por como os dados de entrada devem ser estruturados </br>
> migrations -> Onde esta o modulo de migração de dados </br>
> providers -> Onde estão as conexões com serviços de terceiros (tratamento de exceções, interceptores e guardas)</br>
> repositories -> Camada responsável pela persistência em banco de dados (utilizando o MongoDB Atlas)</br>
> service -> Onde vamos conectar os dados de entrada, aplicar alguma lógica a eles e retornar o resultado com base em nossos modelos</br>
> resources -> Onde estão os dados usados nas migrações</br>

<img src="https://user-images.githubusercontent.com/46055504/124670658-ae890300-de8a-11eb-9641-45c0cbdaa9aa.png" align="center" />


### Documentação
Todas as rotas precisam de autenticação exceto o cadastro do cliente e a autenticação(login)
![image](https://user-images.githubusercontent.com/46055504/124674192-a6cc5d00-de90-11eb-9d18-724c381a2433.png)
![image](https://user-images.githubusercontent.com/46055504/124673657-a7182880-de8f-11eb-9294-9be3ff127a57.png)

Cliente
- Salvar
![image](https://user-images.githubusercontent.com/46055504/124673838-feb69400-de8f-11eb-8aaa-fe9490445483.png)

- Listar pelo email
![image](https://user-images.githubusercontent.com/46055504/124674013-4ccb9780-de90-11eb-8685-c1a1401de0ee.png)

- Listar todos
![image](https://user-images.githubusercontent.com/46055504/124674449-20fce180-de91-11eb-8910-f0bb8ce64028.png)

- Atualizar dados
![image](https://user-images.githubusercontent.com/46055504/124674499-3e31b000-de91-11eb-977a-d9210c91067e.png)

- Excluir
![image](https://user-images.githubusercontent.com/46055504/124674546-573a6100-de91-11eb-8910-9b73be4fd3b3.png)

Autenticação
- Autenticação
![image](https://user-images.githubusercontent.com/46055504/124674702-9e285680-de91-11eb-9a46-26e33526e90c.png)

Favoritos (o id do cliente e' pego direto pelo token de autorização)
- Salvar
![image](https://user-images.githubusercontent.com/46055504/124682971-75f52380-dea2-11eb-835d-b0fe7fe364e6.png)
- Listar pelo id do cliente
![image](https://user-images.githubusercontent.com/46055504/124683316-219e7380-dea3-11eb-968b-b244a8932870.png)


Produtos
- Listar pelo id
![image](https://user-images.githubusercontent.com/46055504/124675134-74236400-de92-11eb-8a77-6283619a549d.png)
- Listar por pagina (por padrão irão vir 2 produtos por página)
![image](https://user-images.githubusercontent.com/46055504/124675202-9ddc8b00-de92-11eb-80e9-704ab7511bae.png)

### Padronizações e validações
Todas as rotas possuem validações e padronizações de retorno
- Padronizações (Foi criado um interceptor para padronizar o retorno da API, tanto para erros e/ou sucessos)
![image](https://user-images.githubusercontent.com/46055504/124677525-0af21f80-de97-11eb-8b6e-a905065ed674.png)
![image](https://user-images.githubusercontent.com/46055504/124677575-29f0b180-de97-11eb-8c03-cc1ca6a87a96.png)
![image](https://user-images.githubusercontent.com/46055504/124677946-e0ed2d00-de97-11eb-9336-f635927f6c4a.png)

- Validações
![image](https://user-images.githubusercontent.com/46055504/124677650-4c82ca80-de97-11eb-8880-873ce5b83119.png)

### Testes
Foi desenvolvido testes unitários para validar os serviços
![image](https://user-images.githubusercontent.com/46055504/124687022-8ad5b500-deaa-11eb-8645-7871b95f9277.png)

### Execução
Foi usado docker para execução do projeto, ao rodar ele já executa as migrations
```bash
npm install
bash run.sh
```