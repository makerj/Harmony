create database harmony;
create user 'tonic' identified by 'tonic12345';
grant all privileges on harmony.* to 'tonic'@'%';

create table harmony.workspace (
	id int primary key auto_increment,
	puzzleSet varchar(1000)
);

insert into harmony.workspace values('1', '');

commit;