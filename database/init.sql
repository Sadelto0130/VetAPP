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
	id integer NOT NULL DEFAULT nextval('registro_id_seq'::regclass),
	id_mascota character varying(255) COLLATE pg_catalog."default",
	id_duenio character varying(255) COLLATE pg_catalog."default",
	id_veterinario character varying(255) COLLATE pg_catalog."default",
	fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	fecha_actualizado timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	procedimiento character varying(255) COLLATE pg_catalog."default",
	procedimiento_descrip text COLLATE pg_catalog."default",
	estado character varying(255) COLLATE pg_catalog."default",
	CONSTRAINT registro_pkey PRIMARY KEY (id)
);

CREATE OR REPLACE TRIGGER trigger_actualizar_fecha
    BEFORE UPDATE 
    ON public.registro
    FOR EACH ROW
    EXECUTE FUNCTION public.actualizar_fecha_actualizado();

