# Pass.in

## Esta é uma API Rest desenvolvida durante a NLW Unite da Rocketseat de 04/2024, na trilha de Node js, para o gerenciamento de participantes de eventos presenciais. Maiores detalhes estão na documentação feita com swagger. Para acessa-la basta seguir estes passos: <br> 

- Copiar a url do projeto que está na página principal do repositório
- Abrir o git bash dentro do diretório escolhido para copiar o projeto
- Digitar `git clone <url-copiada>`
- Rodar no terminal o comando `npm i`
- Depois o comando `npm prisma generate` 
- E por fim `npm run start`
- Acessar no browser de sua preferência a url: http://localhost:3001/docs

### Funcionalidades:
1 - Cadastrar eventos<br>
2 - Cadastrar usuários<br>
3 - Obter informações dos eventos<br>
4 - Visualizar os usuários cadastrados em um evento<br>
5 - Pesquisar por usuários<br>
6 - Realizar o check-in do usuário<br>

### Comandos para banco de dados:
- Acesso à tabela: `npm run db:studio`
- Gerar migrations: `npm run db:migrate`
- Gerar seeds: `npx prisma db seed`
