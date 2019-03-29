# MobUrbWeb
Esse repositório contém o site para visualização dos dados enviados pelo aplicativo para o banco de dados e download dos arquivos de simulação

|Ferramenta|Instalação (Linux)|Site|
|-------------------|---------------------------|-------------------------------------------------|
|Git|sudo apt-get install git|https://git-scm.com/downloads |

## Instalação

 - Clonar o projeto com o comando: git clone https://github.com/intcurb/MobUrbWeb.git

## Utilização do sistema
 - Dentro da pasta do projeto (raiz), abrir o arquivo maps.html em qualquer navegador e utilizar o site.
 
## Utilizaço dos dados de simulaço (SUMO)
|Ferramenta|Instalação (Linux)|Site|
|-------------------|---------------------------|-------------------------------------------------|
|SUMO|sudo apt-get install sumo sumo-tools sumo-doc|https://sumo.dlr.de/wiki/Installing |

- Após realizar o download do ".zip" contento os arquivos do sumo, descompactá-los em um diretório e executar o comando:
```
sumo-gui map.sumo.cfg
```
Com isso, a interface de simulaço do SUMO ser iniciada. Para uma melhor visualização dos dados, alterar o delay antes de iniciar a simulação.
 
> [!TIP]
> Caso aconteça de ocorrer um erro de Access-Control-Allow-Origin no momento da requisição, instalar o plugin (Google Chrome) Allow-Control-Allow-Origin: * disponível nesse link: https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en
