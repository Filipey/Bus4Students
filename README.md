# Bus4Students - Banco de Dados I e Engenharia de Software I


## Participantes
[Bruno Rabello Monteiro - Orientador](https://github.com/bruno-monteiro) <br/>
[Euler Horta Marinho - Orientador](https://www.escavador.com/sobre/4998090/euler-horta-marinho) <br/>
[Filipe Augusto Santos de Moura - Aluno](https://github.com/Filipey) <br/>
[Diogo Leite Lucas - Aluno](https://github.com/diogoleite87) <br/>
[Vitor Marques dos Santos - Aluno](https://github.com/MarqueVitor) <br/>


## Objetivos
- Aplicar os conhecimentos aprendidos nas disciplinas de Banco de Dados I e Engenharia de Software I  para resolver um problema real.
- Aprimorar as habilidades de programação e modelagem.
- Reforçar o aprendizado sobre Bancos de Dados relacionais, métodos ágeis e diagramas ER e UML.


## Motivação
Atualmente, segundo as leis brasileiras, municípios que não ofertam cursos superiores, sejam públicos ou privados, devem ofertar aos estudantes de seu município algum auxílio transporte para cidades próximas que ofertam este tipo de serviço. De acordo com testemunhos de estudantes da [UFOP](https://ufop.br) que sofrem deste problema, nós, criadores, analisamos a metodologia atual abordada como depreciada, tendo em vista que os processos são realizados todos de maneira física e manual, gerando uma grande inconssitencia de dados e um fluxo assícrono de informação quase inexistente. Com base nestes testemunhos, foi proposto a criação de um Dashboard, visando a computação de grande parte do processo e melhoria de pontos cruciais do mesmo. Esta ferramenta busca facilitar a alocação de recursos e a comunicação assíncrona entre estudantes e administradores do sistema, garantindo e facilitando acesso à informação e recursos para ambos atores.


## Sobre
Bus4Students é um Sistema Web voltado para alocação de recursos e comunicação assíncrona entre Estudantes e Administradores. A aplicação consiste em um Dashboard(SPA) em que o Estudante pode consultar os recursos recebidos pelos Administradores e então manuseá-los de acordo com suas necessidades. Os Administradores podem adicionar os recursos que existem fisicamente no sistema, e então gerenciá-los de acordo com as estratégias abordadas. O Bus4Students oferece visualizações para os recursos mais comumente utilizados neste cenário, como Ônibus municipais, Vales-Transporte e Carteiras de Transporte.


## Modelagem
Para a solução pensada, foram feitas as seguintes modelagens ER e Conceitual para o problema:
![ER](/img/er-example.png)
![CC](/img/logical-example.png)


### 🛠 Tecnologias
As seguintes tecnologias foram utilizadas na construção do projeto:


<details>
<summary>Backend</summary>

- [Java 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [SpringBoot](https://spring.io/projects/spring-boot)
- [Swagger](https://swagger.io)
- [PostgreSQL](https://www.postgresql.org)

</details>

<details>
<summary>Frontend</summary>

- [React 18](https://pt-br.reactjs.org)
- [Vite](https://vitejs.dev)
- [Styled Components](https://styled-components.com)
- [Material UI](https://mui.com/pt/material-ui/getting-started/overview/)
- [Axios](https://axios-http.com/ptbr/docs/intro)
- [React Router Dom](https://v5.reactrouter.com/web/guides/quick-start)

</details>


### Pré-Requisitos
Para rodar o projeto localmente, você precisa ter instalado na sua máquina as seguintes ferramentas: [Git](https://git-scm.com), [JDK17+](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html), [Maven](https://maven.apache.org), [Yarn](https://yarnpkg.com) e [NodeJS](https://nodejs.org/en/). Além disso, para trabalhar com o Frontend, recomendamos o [VsCode](https://code.visualstudio.com) e para o Backend o [IntelliJ](https://www.jetbrains.com/pt-br/idea/)


### Run 🏃‍

```bash
# Clone este repositório
$ git clone https://github.com/Filipey/Bus4Students.git

# Acessa a pasta do Backend no terminal
$ cd Bus4Students/backend

# Atualize os dados do usuário do seu usuário postgres
$ nano application.properties

# Instale as dependências
$ mvn install

# Compile o projeto para gerar o .jar
$ mvn clean package

# Execute a aplicação
$ java -jar .\Backend-1.0-SNAPSHOT.jar

# Volte para o root. O Servidor iniciará na porta 8080
$ cd ..

# Acesse a pasta do Frontend no terminal
$ cd frontend

# Instale as depencências
$ yarn

# Execute a aplicação em modo de desenvolvimento
$ yarn dev

# A aplicação iniciará na porta que estiver disponível em sua máquina

```

### License

MIT License ©


## Autores
 
<div >
  <a href="https://github.com/Filipey">
    <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/85424389?s=400&u=417925037da99d2637c3714599830ae00c07c99a&v=4" width="100px;" alt=""/>
    <sub><b> Flipe Moura</b></sub>
  </a>
  <a href="https://github.com/diogoleite87">
    <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/62341955?v=4" width="100px;" alt=""/>
    <sub><b> Diogo Leite</b></sub>
  </a>
  <a href="https://github.com/MarqueVitor">
    <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/98324955?v=4" width="100px;" alt=""/>
    <sub><b> Vitor Marques</b></sub>
  </a>
</div>