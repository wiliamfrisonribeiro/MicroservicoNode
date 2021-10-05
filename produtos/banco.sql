-- Criar um banco de dados chamado produtos_api 

-- Criar a tabela produtos

create table mercadorias (
codigo serial not null primary key, 
nome varchar(50) not null, 
preco decimal(10,2) not null, 
)

-- inserir alguns registros
insert into mercadorias (nome, preco) values ('tenis nike', 350.00), ('tenis adiddas', 150.00);
