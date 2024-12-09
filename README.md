Documentação do Backend - Gerenciamento de Categorias e Transações

Visão Geral

Este é um projeto backend desenvolvido em Laravel para gerenciar categorias e transações financeiras. Ele oferece funcionalidades de CRUD para categorias e transações, incluindo validações, relações entre modelos e suporte a APIs RESTful.

Requisitos

Angular CLI 18.2.12

PHP >= 8.3

Composer >= 2.8.3

Laravel >= 11.0

Banco de Dados: MySQL ou outro suportado pelo Laravel

Instalação

Clone o repositório:

git clone <URL_DO_REPOSITORIO>

Acesse o diretório do projeto:

cd <NOME_DO_DIRETORIO>

Instale as dependências:

composer install

Crie um arquivo .env com base no arquivo de exemplo:

cp .env.example .env

Configure as variáveis de ambiente no arquivo .env:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nome_do_banco
DB_USERNAME=usuario
DB_PASSWORD=senha

Gere a chave da aplicação:

php artisan key:generate

Execute as migrações para criar as tabelas no banco de dados:

php artisan migrate

Executando o Projeto

Inicie o servidor de desenvolvimento:

php artisan serve

O servidor estará disponível em: http://127.0.0.1:8000

Endpoints Disponíveis ou Acesse:
http://localhost:8000/api/documentation (após rodar o projeto).

Categorias

Listar Categorias

Rota: GET /categorias

Resposta:

{
    "status": true,
    "message": "Lista de categorias",
    "data": [
        {
            "id": 1,
            "nome": "Alimentação"
        }

Criar Categoria

Rota: POST /categorias

Corpo da Requisição:

{
    "nome": "Transporte"
}

Resposta:

{
    "status": true,
    "message": "Categoria criada com sucesso!",
    "data": {
        "id": 2,
        "nome": "Transporte"      
    }


Atualizar Categoria

Rota: PUT /categorias/{id}

Corpo da Requisição:

{
    "nome": "Educação"
}

Deletar Categoria

Rota: DELETE /categorias/{id}

Resposta:

{
    "status": true,
    "message": "Categoria excluída com sucesso!"
}

Transações

Listar Transações

Rota: GET /transacoes

Resposta:

{
    "status": true,
    "message": "Lista de transações",
    "data": [
        {
            "id": 1,
            "descricao": "Compra de materiais",
            "valor": 150.75,
            "tipo": "Despesa",
            "idCategoria": 1,
            "data": "2024-01-01",
            "categoria": {
                "id": 1,
                "nome": "Alimentação"
            }
        }
    ]
}

Criar Transação

Rota: POST /transacoes

Corpo da Requisição:

{
    "descricao": "Venda de produtos",
    "valor": 200.00,
    "tipo": "Receita",
    "idCategoria": 1,
    "data": "2024-01-02"
}

Resposta:

{
    "status": true,
    "message": "Transação criada com sucesso!",
    "data": {
        "id": 2,
        "descricao": "Venda de produtos",
        "valor": 200.00,
        "tipo": "Receita",
        "idCategoria": 1,
        "data": "2024-01-02"
}

Atualizar Transação

Rota: PUT /transacoes/{id}

Corpo da Requisição:

{
    "descricao": "Atualização de transação",
    "valor": 250.00,
    "tipo": "Despesa",
    "idCategoria": 2,
    "data": "2024-01-03"
}

Deletar Transação

Rota: DELETE /transacoes/{id}

Resposta:

{
    "status": true,
    "message": "Transação excluída com sucesso!"
}

Testes

Use Postman ou outro cliente REST para testar os endpoints.

Certifique-se de que as migrações foram executadas e o banco de dados está populado corretamente.

Verifique os logs do Laravel para identificar erros:

tail -f storage/logs/laravel.log

Para limpar os logs:

> storage/logs/laravel.log

Observações

Garanta que o servidor MySQL esteja ativo e configurado.

Utilize o comando php artisan tinker para testar modelos interativamente.

Se tiver alguma dúvida, entre em contato com o desenvolvedor responsável.

