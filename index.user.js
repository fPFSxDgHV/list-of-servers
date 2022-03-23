// ==UserScript==
// @name        New script - quake4.net
// @namespace   Violentmonkey Scripts
// @match       https://quake4.net/servers/
// @grant       none
// @version     1.0
// @author      -
// @description 23/03/2022, 23:28:00
// ==/UserScript==
const $ = jQuery;
const config = {
  imagePath: 'https://quake4.net/assets/',
  styles: {
    serverContainer: {
      borderColor: '',
      backgroundColor: '',
    },
    serverBlock: {
      flagSize: '20px'
    }
  }
}

const styles = `
.server-wrapper {
  background-color: #edfff3;
  border: 1px solid #73b077;
  border-radius: 4px;
  margin-bottom: 10px;
}

.server-top-row {
  display: flex;
  flex-direction: row;
}

.serverName-wrapper {
  display: flex;
  flex-direction: row;
  align-items: end;
}

.serverName-wrapper img {
  width: 20px;
  margin-right: 10px;
}

.player-list-header {
  display: flex;
  flex-direction: row;
}

.player-list-wrapper {
  display: flex;
  flex-direction: row;
}

.server-bottom-wrapper {
  display: flex;
  flex-direction: row;
}

.server-bottom-wrapper img {
  width: 150px;
  height: 80px;
}
`

function removeOldStuff() {
  $('.uk-article').find('a,p,div').each((i, e) => {
    $(e).remove()
  })
}

function injectStyles() {
  const style = document.createElement('style');
  style.textContent = styles;
  document.head.append(style);
}

class DataLoader {
  static async fetchTestData() {
    const data = [
      {
        "protocol": "q4s",
        "address": "se.quake4.net:28004",
        "status": "online",
        "hostname": "se.quake4.net:28004",
        "name": "WwW Quake.net Northern EU",
        "gametype": "q4max",
        "map": "mp/l4dm2_1",
        "numplayers": 1,
        "maxplayers": 14,
        "numspectators": 0,
        "maxspectators": 0,
        "ping": 0,
        "retries": 0,
        "players": [
          {
            "number": 0,
            "name": "958wylsa",
            "score": 0,
            "clan": "WwW",
            "type": "player",
            "rate": "16000",
            "ping": 54
          },
          {
            "number": 999,
            "name": "GOD OF WAR SANCHEZ",
            "score": 999,
            "clan": "WwW",
            "type": "player",
            "rate": "16000",
            "ping": 0,
          },

        ]
      },
      {
        "protocol": "q4s",
        "address": "msk.quake4.net:28004",
        "status": "online",
        "hostname": "msk.quake4.net:28004",
        "name": "WwW Quake.net Moscow",
        "gametype": "q4max",
        "map": "mp/q4dm2tmp",
        "numplayers": 0,
        "maxplayers": 10,
        "numspectators": 0,
        "maxspectators": 0,
        "ping": 20,
        "retries": 0,
        "players": [

        ]
      },
      {
        "protocol": "q4s",
        "address": "eu.quake4.net:28004",
        "status": "online",
        "hostname": "eu.quake4.net:28004",
        "name": "WwW Quake.net Europe",
        "gametype": "q4max",
        "map": "mp/l4dm2_1",
        "numplayers": 0,
        "maxplayers": 10,
        "numspectators": 0,
        "maxspectators": 0,
        "ping": 29,
        "retries": 0,
        "players": [

        ]
      },
      {
        "protocol": "q4s",
        "address": "uk1.quake4.net:28004",
        "status": "online",
        "hostname": "uk1.quake4.net:28004",
        "name": "WwW Quake.net United Kingdom",
        "gametype": "q4max",
        "map": "mp/wvwq4dm1",
        "numplayers": 0,
        "maxplayers": 10,
        "numspectators": 0,
        "maxspectators": 0,
        "ping": 31,
        "retries": 0,
        "players": [

        ]
      },
      {
        "protocol": "q4s",
        "address": "ua.quake4.net:28004",
        "status": "online",
        "hostname": "ua.quake4.net:28004",
        "name": "WwW Quake.net Ukraine",
        "gametype": "q4max",
        "map": "mp/l4dm2_1",
        "numplayers": 0,
        "maxplayers": 16,
        "numspectators": 0,
        "maxspectators": 0,
        "ping": 53,
        "retries": 0,
        "players": [

        ]
      },
      {
        "protocol": "q4s",
        "address": "uk2.quake4.net:28004",
        "status": "online",
        "hostname": "uk2.quake4.net:28004",
        "name": "WwW Quake.net United Kingdom",
        "gametype": "q4max",
        "map": "mp/l4dm2_1",
        "numplayers": 0,
        "maxplayers": 10,
        "numspectators": 0,
        "maxspectators": 0,
        "ping": 41,
        "retries": 0,
        "players": [

        ]
      },
      {
        "protocol": "q4s",
        "address": "useast.quake4.net:28004",
        "status": "online",
        "hostname": "useast.quake4.net:28004",
        "name": "WwW Quake.net New Jersey",
        "gametype": "q4max",
        "map": "mp/l4dm2_1",
        "numplayers": 0,
        "maxplayers": 12,
        "numspectators": 0,
        "maxspectators": 0,
        "ping": 98,
        "retries": 0,
        "players": [

        ]
      },
      {
        "protocol": "q4s",
        "address": "uscentral.quake4.net:28004",
        "status": "timeout",
        "hostname": "uscentral.quake4.net:28004"
      }
    ]

    return Promise.resolve(data)
  }
}

class Server {
  static getMapImgSrc(serverData) {
    const map = serverData.map?.replace('mp/', '')
    if (!map) {
      return null
    }
    return `${config.imagePath}mappics/${map}.png`
  }

  static getMapImg(serverData) {
    const src = Server.getMapImgSrc(serverData)
    return `
    <div>
        <img src="${src}" />
    </div>
    `
  }

  static getServerFlagUrl(serverData) {
    const flag = serverData?.address?.split('.', 1)?.[0]
    const flagMap = {
      msk: 'ru',
      useast: 'us',
      uk1: 'uk',
      uk2: 'uk',
      uscentral: 'us',
      se: 'se',
      eu: 'eu',
      ua: 'ua',
    }

    return `${config.imagePath}flags/${flagMap[flag]}.svg`
  }

  static getFlag(serverData) {
    const serverFlagUrl = Server.getServerFlagUrl(serverData)

    return `<img src="${serverFlagUrl}" width="${config.styles.serverBlock.flagSize}" />`
  }

  static getModeRow() {
    return `
        <div>
            <div>Mode</div>
            <div>Duel</div>
        </div>
      
    `
  }

  static getServerRow(serverData) {
    const flag = Server.getFlag(serverData)
    const { name, address } = serverData

    return `
        <div>
            <div>Server</div>
            <div class="serverName-wrapper">
                ${flag}
                <div>
                    <div>${name}</div>
                    <div>${address}</div>
                </div>
            </div>  
        </div>  
    `
  }

  static getMapRow(serverData) {
    const mapName = serverData.map
    return `
      <div>
        <div>Map</div>
        <div>${mapName}</div>
      </div>
    `
  }

  static getPlayerList(serverData) {
    let result = ''
    serverData?.players?.map(player => result += `
        <div class="player-list-wrapper">
            <div>${player.name}</div>
            <div>${player.ping}</div>
        </div>`)

    return result
  }

  static getPlayersRow(serverData) {
    const { numplayers, maxplayers } = serverData
    const playersCount = `
        <div class="player-list-header">
            <div>Players: ${numplayers}/${maxplayers}</div>
            <div>Ping</div>
        </div>`
    const playerList = Server.getPlayerList(serverData)
    return `
      <div>
        ${playersCount}
        ${playerList}
      </div>
    `
  }

  static render(serverData) {
    const server = Server.getServerRow(serverData)
    const mode = Server.getModeRow(serverData)
    const map = Server.getMapRow(serverData)
    const players = Server.getPlayersRow(serverData)
    const mapImg = Server.getMapImg(serverData)

    return `
      <div class="server-wrapper">
        <div class="server-top-row">
          ${server}
          ${mode}
          ${map}
        </div>
        <div class="server-bottom-wrapper">
          ${players}
          ${mapImg}
        </div>
      </div>
`
  }
}

class ListOfServers {
  static getListOfServersElements(serversData) {
    const elementsToRender = serversData.map(Server.render)
    return elementsToRender
  }

  static render(serversData) {
    const elements = ListOfServers.getListOfServersElements(serversData)
    $('article').append(elements)
  }
}

async function init() {
  removeOldStuff()
  injectStyles()
  const data = await DataLoader.fetchTestData()
  ListOfServers.render(data)
  console.log(data)
}

init()
