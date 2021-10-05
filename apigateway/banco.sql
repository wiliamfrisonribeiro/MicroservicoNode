-- Criar um banco de dados chamado produtos_api 

-- Criar a tabela produtos

create table usuarios (
id serial not null primary key, 
nome varchar(50) not null, 
senha varchar(25) not null, 
email varchar(100) not null
)

-- inserir alguns registros
insert into usuarios (nome, senha, email) values ('wiliam','123', "wiliam@gmail.com");
