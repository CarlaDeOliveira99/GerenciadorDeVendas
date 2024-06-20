/**
*docker cp init.sql 83d00210c734:/init.sql   
*docker exec -it 83d00210c734  psql -U postgres -d Gerenciador_de_vendas  -f /init.sql
*/
/*categoria*/

create sequence id_categoria
start 1
increment 1;

CREATE TABLE categoria(
    id_categoria integer not null default nextval('id_categoria'),
    nome varchar(30) not null
);

alter table categoria add constraint pk_categoria primary key(id_categoria);


/*produto*/
create sequence id_produto
start 1
increment 1;


CREATE TABLE produto(
	id_produto integer not null default nextval('id_produto'),
	cod_barra integer not null,
	nome varchar(30) not null,
	descricao varchar(255),
	valor decimal(10,2) not null,
	desconto decimal(10,2),
	frete varchar(3) not null,
	id_categoria integer not null
);

alter table produto add constraint pk_produto primary key(id_produto);
alter table produto add constraint fk_produto_categoria FOREIGN KEY(id_categoria) references categoria (id_categoria);



/*estoque*/

CREATE TABLE estoque(
    id_estoque integer not null default nextval('id_estoque'),
    id_produto integer not null,
    quantidade integer,
    status varchar(12) 
);

alter table estoque add constraint pk_estoque primary key(id_estoque);
alter table estoque add constraint fk_estoque_produto FOREIGN KEY(id_produto) references produto (id_produto);


/*usuario*/
create sequence id_user
start 1
increment 1;


CREATE TABLE usuario(
	id_usuario integer not null default nextval('id_user'),
	email Varchar(100) not null,
	nome varchar(100) not null,
	senha varchar(100)not null,
	cpf varchar(100)not null,
	gestor smallint not null
);

alter table usuario add constraint pk_user primary key(id_usuario);
alter table usuario add constraint unique_usuario_cpf unique(cpf);
alter table usuario add constraint unique_usuario_email unique(email);



/*vendas*/
create sequence id_vendas
start 1
increment 1;


CREATE TABLE vendas(
	id_venda integer not null default nextval('id_vendas'),
	id_usuario integer not null,
	data_venda date not null
);

alter table vendas add constraint pk_vendas primary key(id_venda);
alter table vendas add constraint fk_vendas_usuario FOREIGN KEY(id_usuario) references usuario (id_usuario);



/*Item vendido*/

CREATE TABLE item_vendido(
	id_venda integer not null,
	sequencia_item integer not null,
	id_produto integer not null,
	quantidade integer not null
);

alter table item_vendido add constraint pk_item primary key(id_venda, sequencia_item);
alter table item_vendido add constraint fk_item_vendido_venda FOREIGN KEY(id_venda) references vendas (id_venda);
alter table item_vendido add constraint fk_item_vendido_produto FOREIGN KEY(id_produto) references produto (id_produto);


/*Tabelas de Imagem do produto*/
create sequence id_imagem
start 1
increment 1;

create table imagemproduto(
    id_imagem integer not null default nextval('id_imagem'),
    id_produto integer not null,
	caminho_imagem_prod varchar(900)
    caminho_imagem_absoluto varchar(900)
);

alter table imagemProduto add constraint pk_imagemProduto primary key(id_imagem);
alter table imagemProduto add constraint fk_produto_imagem FOREIGN KEY(id_produto) REFERENCES produto(id_produto);
