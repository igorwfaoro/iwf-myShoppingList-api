create table Users (
  id bigint primary key not null auto_increment,
  name varchar(200) not null,
  email varchar(200) not null,
  password varchar(200) not null,
  createdAt datetime not null default current_timestamp,
  updatedAt datetime not null default current_timestamp on update current_timestamp,
  constraint UK_Users_email unique (email)
);

create table Products (
  id bigint primary key not null auto_increment,
  title varchar(200) not null,
  brand varchar(100) not null,
  image varchar(300),
  barcode varchar(40) not null,
  createdAt datetime not null default current_timestamp,
  updatedAt datetime not null default current_timestamp on update current_timestamp,
  constraint UK_Users_barcode unique (barcode)
);

create table ShoppingLists (
  id bigint primary key not null auto_increment,
  userId bigint not null,
  name varchar(100) not null,
  createdAt datetime not null default current_timestamp,
  updatedAt datetime not null default current_timestamp on update current_timestamp
);

alter table ShoppingLists
add constraint FK_ShoppingLists_Users
foreign key (userId) references Users(id);

create table ShoppingListProducts (
  id bigint primary key not null auto_increment,
  shoppingListId bigint not null,
  productId bigint not null,
  quantity int not null,
  createdAt datetime not null default current_timestamp,
  updatedAt datetime not null default current_timestamp on update current_timestamp
);

alter table ShoppingListProducts
add constraint FK_ShoppingListProducts_ShoppingLists
foreign key (shoppingListId) references ShoppingLists(id);

alter table ShoppingListProducts
add constraint FK_ShoppingListProducts_Products
foreign key (productId) references Products(id);