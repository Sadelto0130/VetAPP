create table users(
	idDuenio serial,
	nombre varchar(30) not null,
	apellido varchar(50) not null,
	email varchar(30),
	pass varchar(8) not null,
	primary key(idDuenio)
);

create table mascotas(
	idPet serial,
	nombre varchar(30) not null,
	foto varchar(100),
	raza varchar(30) not null,
	edad smallint,
	tipo varchar(30) not null,
	idDuenio varchar(15) not null unique,
	ultDocAtendio varchar(15),
	primary key(idPet)
);

create table veterinaria(
	nombre varchar(40) not null,
	direccion varchar(50) not null,
	cuil varchar(20) not null,
	pass varchar(8) not null,
	primary key(cuil)
);

create table veterinario(
	nombre varchar(30) not null,
	apellido varchar(40) not null,
	email varchar(30),
	pass varchar(8),
	matricula varchar(10) not null,
	foto varchar(100),
	idVeterinaria smallint,
	primary key(matricula)
);

CREATE TABLE registro(
	id serial primary key,
	id_mascota varchar(255),
	id_duenio varchar(255),
	id_veterinario varchar(255),
	fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fecha_actualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	procedimiento varchar(255),
	procedimiento_descrip text,
	estado varchar(255)
);

