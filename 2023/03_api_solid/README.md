# App

GymPass style app.

## RFS (Requisitos funcionais)

- [] Deve ser possível se cadastrar;
- [] Deve ser possível se autenticar;
- [] Deve ser possível obter os perfil de um usuário logado;
- [] Deve ser possível obter o número de check-ins realizado pelo usuário logado;
- [] Deve ser possível o usuário obter seu histórico de check-ins;
- [] Deve ser possível o usuário buscar academias próximas;
- [] Deve ser possível o usuário buscar academias pelo nome;
- [] Deve ser possível o usuário realizar check-in em uma academia;
- [] Deve ser possível validar o check-in de um usuário
- [] Deve ser possível cadatrar uma academia;

## (RNS Regras de negócio)

- [] O usuário não deve poder se cadastrar com um e-mail duplicado; 
- [] O usuário não pode fazer 2 check-ins no mesmo dia;
- [] O usuário não pode fazer check-in se não estiver perto da academia (100m);
- [] O check-in só pode ser validado até 20 minutos após criado;
- [] O check-in só pode ser validado por administradores;
- [] A academia só pode ser casdastrada por administradores;

## RNFS (Requisitos não funcionais)

- [] A senha do usuário precisa estar criptografada;
- [] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;
- [] Todas listas de dados precisam estar paginadas com 20 items por páginas;
- [] O usuário deve ser identificado por um JWT (JSON Web Token);