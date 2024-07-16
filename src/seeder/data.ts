import {Levels} from '../access_levels/interface/levels.interface'
import {Statuse} from '../statuses/interface/statuses.interface'

import {Departments} from '../department/interface/department.interface'
import {Genders} from '../genders/interface/genders.interface'
import {Hair_colors} from '../hair_colors/interface/hair_colors.interface'
import {Skin_colors} from '../skin_colors/interface/skin_colors.interface'
import {States} from '../state/interface/state.interface'
import {Status} from '../status/interface/status.interface'
import {Textures} from '../textures/interface/textures.interface'
//import {Type_creations} from '../statuses/interface/statuses.interface'
import {Carnet,Type_creations} from '../carnets/interface/carnets.interface'
import {User} from '../auth/interface/user.interface'
import { ValidRoles } from '../auth/interface/valid-roles';
import {Charges} from '../charge/interface/charge.interface'
import * as bcrypt from 'bcrypt';




export const charges:Charges[]=[
    { name: 'GERENTE'},
    { name: 'PRESIDENTE'},
    { name: 'VICEPRESIDENTE'},
    { name: 'GERENTE GENERAL'},
    { name: 'AUDITOR INTERNO'},
    { name: 'CONSULTOR JURIDICO'},
    { name: 'GERENTE DE AREA'},
    { name: 'GERENTE DE LINEA'},
    { name: 'COORDINADOR'},
    { name: 'ANALISTA'},
    { name: 'OBRERO'},
    { name: 'PERSONAL MEDICO'},
    { name: 'OFICIAL DE SEGURIDAD'},
    { name: 'ESCOLTA'},
    { name: 'SUPERVISOR DE SEGURIDAD'},
    { name: 'OTRO'},
]


export const users:User[] = [
        {
          name: 'daniel quintero',
          email: 'danielquinteroac32@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          rol: ValidRoles.admin,
        },
        {
          name: 'admin',
          email: 'admin@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          rol: ValidRoles.user,
        },
    ];


export const levels:Levels[]=[
  { name: 'Acceso Total' },
  { name: 'Alto Nivel' },
  { name: 'Area Privada' },
  { name: 'PB / Sótano' },
  { name: 'Piso 1' },
  { name: 'Piso 2' },
  { name: 'Piso 3' },
  { name: 'Piso 4' },
  { name: 'Piso 5' },
  { name: 'Piso 6' },
  { name: 'Piso 7' },
  { name: 'Piso 8' },
  { name: 'Piso 9' }
]


export const statuse:Statuse[]=[
  { name: 'Soltero(a)' },
  { name: 'Casado(a)' },
  { name: 'Area Privada' },
  { name: 'Divorciado(a)' },
  { name: 'Concubino(a)' },
  { name: 'Viudo(a)' }
]

export const departments:Departments[]=[
  { name: 'GERENCIA DE ADMINISTRACION' },
  { name: 'AUDITORIA' },
  { name: 'CONSULTORÍA JURÍDICA' },
  { name: 'DELEGACIONES PRESIDENCIALES' },
  { name: 'DIRECCIÓN GENERAL' },
  { name: 'DESPACHO DE LA VICEPRESIDENCIA' },
  { name: 'GESTIÓN COMUNICACIONAL' },
  { name: 'SEGURIDAD INTEGRAL' },
  { name: 'PLANIFICACIÓN Y PRESUPUESTO' },
  { name: 'PROMOCION DE INVERSION' },
  { name: 'PROYECTOS' },
  { name: 'RECURSOS HUMANOS' },
  { name: 'SEGUIMIENTO Y CONTROL' },
  { name: 'TECNOLOGÍA DE LA INFORMACIÓN' }
]

export const genders:Genders[]=[
  { name: 'Masculino' },
  { name: 'Femenino' },
]

export const hair_colors:Hair_colors[]=[
  { name: 'Negro' },
  { name: 'Canoso' },
  { name: 'Castaño claro' },
  { name: 'Castaño obscuro' },
  { name: 'Rubio' },
  { name: 'Rojo' },
  { name: 'Teñido' },
]


export const skin_colors:Skin_colors[]=[
  { name: 'Blanca' },
  { name: 'Negra' },
  { name: 'Morena' },
]


export const states:States[]=[
  { name: 'Amazonas' },
  { name: 'Anzoátegui' },
  { name: 'Apure' },
  { name: 'Aragua' },
  { name: 'Barinas' },
  { name: 'Bolívar' },
  { name: 'Carabobo' },
  { name: 'Cojedes' },
  { name: 'Delta Amacuro' },
  { name: 'Falcón' },
  { name: 'Guárico' },
  { name: 'Lara' },
  { name: 'Mérida' },
  { name: 'Miranda' },
  { name: 'Monagas' },
  { name: 'Nueva Esparta' },
  { name: 'Portuguesa' },
  { name: 'Sucre' },
  { name: 'Táchira' },
  { name: 'Trujillo' },
  { name: 'Vargas' },
  { name: 'Yaracuy' },
  { name: 'Zulia' },
  { name: 'Distrito Capital' },
  { name: 'Dependencias Federales' }
]


export const status:Status[]=[
  { name: 'Activo' },
  { name: 'Inactivo' },
]


export const textures:Textures[]=[
  { name: 'Delgada' },
  { name: 'Mediana' },
  { name: 'Gruesa' },
]


export const type_creations:Type_creations[]=[
  { name: 'Ingreso' },
  { name: 'Renovación' },
  { name: 'Extravío' },
]


const carnets: Carnet[] = [
    {
        //id: 1,
        name: "John",
        lastname: "Doe",
        card_code: "ABC123",
        expiration: new Date('2025-12-31'),
        note: "This is a note.",
        cedule: "V-12345678",
        extent: "Caracas",
        address: "123 Main St",
        phone: "0212-1234567",
        cellpone: "0412-1234567",
        photo: "john_doe.png",
        qr: "qr_code.png",
        department: { id: 1, name: "ADMINISTRACION" },
        charge: { id: 1, name: "Manager" },
        type_creations: [
            { id: 1, name: "Ingreso" },
            //{ id: 2, name: "Renovación" }
        ],
        textures: { id: 1, name: "Delgada" },
        status: { id: 1, name: "Activo" },
        access_levels: { id: 1, name: "Acceso Total" },
        genders: { id: 1, name: "Masculino" },
        hair_colors: { id: 1, name: "Negro" },
        state: { id: 1, name: "Distrito Capital" },
        municipalities: "Libertador",
        parishes: "El Paraíso",
        skin_colors: { id: 1, name: "Blanca" },
        civil_statuses: { id: 1, name: "Soltero(a)" },
        created_at: new Date('2023-01-01'),
        updated_at: new Date('2024-01-01')
    },
    {
        //id: 2,
        name: "Jane",
        lastname: "Smith",
        card_code: "DEF456",
        expiration: new Date('2026-06-30'),
        note: "Another note.",
        cedule: "V-87654321",
        extent: "Maracaibo",
        address: "456 Another St",
        phone: "0261-7654321",
        cellpone: "0426-7654321",
        photo: "jane_smith.png",
        qr: "qr_code_2.png",
        department: { id: 2, name: "FINANZAS" },
        charge: { id: 2, name: "Analyst" },
        type_creations: [
            { id: 1, name: "Ingreso" }
        ],
        textures: { id: 2, name: "Mediana" },
        status: { id: 2, name: "Inactivo" },
        access_levels: { id: 2, name: "Alto Nivel" },
        genders: { id: 2, name: "Femenino" },
        hair_colors: { id: 2, name: "Rubio" },
        state: { id: 2, name: "Zulia" },
        municipalities: "Maracaibo",
        parishes: "Santa Lucía",
        skin_colors: { id: 2, name: "Morena" },
        civil_statuses: { id: 2, name: "Casado(a)" },
        created_at: new Date('2023-06-01'),
        updated_at: new Date('2024-06-01')
    }
];

/*
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const carnets: Carnet[] = [
  {
    name: "John",
    lastname: "Doe",
    card_code: "ABC123",
    expiration: new Date('2025-12-31'),
    note: "This is a note.",
    cedule: "V-12345678",
    extent: "Caracas",
    address: "123 Main St",
    phone: "0212-1234567",
    cellpone: "0412-1234567",
    photo: "john_doe.png",
    qr: "qr_code.png",
    department: { id: 1, name: "ADMINISTRACION" },
    id_charge: 1,
    charge: { id: 1, name: "Manager" },
    type_creations: [
      { id: 1, name: "Ingreso" },
      { id: 2, name: "Renovación" }
    ],
    textures: { id: 1, name: "Delgada" },
    status: { id: 1, name: "Activo" },
    access_levels: { id: 1, name: "Acceso Total" },
    genders: { id: 1, name: "Masculino" },
    hair_colors: { id: 1, name: "Negro" },
    state: { id: 1, name: "Distrito Capital" },
    municipalities: "Libertador",
    parishes: "El Paraíso",
    skin_colors: { id: 1, name: "Blanca" },
    civil_statuses: { id: 1, name: "Soltero(a)" },
    created_at: new Date('2023-01-01'),
    updated_at: new Date('2024-01-01')
  },
  {
    name: "Jane",
    lastname: "Smith",
    card_code: "DEF456",
    expiration: new Date('2026-06-30'),
    note: "Another note.",
    cedule: "V-87654321",
    extent: "Maracaibo",
    address: "456 Another St",
    phone: "0261-7654321",
    cellpone: "0426-7654321",
    photo: "jane_smith.png",
    qr: "qr_code_2.png",
    department: { id: 2, name: "FINANZAS" },
    id_charge: 2,
    charge: { id: 2, name: "Analyst" },
    type_creations: [
      { id: 1, name: "Ingreso" }
    ],
    textures: { id: 2, name: "Mediana" },
    status: { id: 2, name: "Inactivo" },
    access_levels: { id: 2, name: "Alto Nivel" },
    genders: { id: 2, name: "Femenino" },
    hair_colors: { id: 2, name: "Rubio" },
    state: { id: 2, name: "Zulia" },
    municipalities: "Maracaibo",
    parishes: "Santa Lucía",
    skin_colors: { id: 2, name: "Morena" },
    civil_statuses: { id: 2, name: "Casado(a)" },
    created_at: new Date('2023-06-01'),
    updated_at: new Date('2024-06-01')
  }
];

async function main() {
  for (const carnet of carnets) {
    await prisma.carnet.create({
      data: {
        name: carnet.name,
        lastname: carnet.lastname,
        card_code: carnet.card_code,
        expiration: carnet.expiration,
        note: carnet.note,
        cedule: carnet.cedule,
        extent: carnet.extent,
        address: carnet.address,
        phone: carnet.phone,
        cellpone: carnet.cellpone,
        photo: carnet.photo,
        qr: carnet.qr,
        department: {
          connect: { id: carnet.department.id }
        },
        charge: {
          connect: { id: carnet.id_charge }
        },
        type_creations: {
          connect: carnet.type_creations.map(tc => ({ id: tc.id }))
        },
        textures: {
          connect: { id: carnet.textures.id }
        },
        status: {
          connect: { id: carnet.status.id }
        },
        access_levels: {
          connect: { id: carnet.access_levels.id }
        },
        genders: {
          connect: { id: carnet.genders.id }
        },
        hair_colors: {
          connect: { id: carnet.hair_colors.id }
        },
        state: {
          connect: { id: carnet.state.id }
        },
        municipalities: carnet.municipalities,
        parishes: carnet.parishes,
        skin_colors: {
          connect: { id: carnet.skin_colors.id }
        },
        civil_statuses: {
          connect: { id: carnet.civil_statuses.id }
        },
        created_at: carnet.created_at,
        updated_at: carnet.updated_at,
      },
    });
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

*/