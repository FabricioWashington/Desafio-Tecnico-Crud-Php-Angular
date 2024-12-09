insert into categorias (id, nome) values ('1', 'Aluguel');
insert into categorias (id, nome) values ('2', 'Compras');
insert into categorias (id, nome) values ('3', 'Higiene');
insert into categorias (id, nome) values ('4', 'Bem-Estar');
insert into categorias(id, nome) values ('5', 'Pagamento');




insert into transacoes(id, descricao, valor, tipo, idCategoria, data) values ('1', 'Conta de Luz', '60.00', 'Despesa', '1', '2024-11-24');
insert into transacoes(id, descricao, valor, tipo, idCategoria, data) values ('2', 'Conta de Água', '200.00','Despesa', '1', '2024-11-24');
insert into transacoes(id, descricao, valor, tipo, idCategoria, data) values ('3', 'Salario', '10.000', 'Receita', '5', '2024-12-24');


select * from transacoes;