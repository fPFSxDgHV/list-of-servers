const $ = jQuery
const config = {
  imagePath: 'https://quake4.net/assets/', styles: {
    serverContainer: {
      borderColor: '', backgroundColor: '',
    }
  }
}

function removeOldStuff() {
  $('.uk-article').find('a,p,div').each((i, e) => {
    $(e).remove()
  })
}

class DataLoader {
  static async fetchData() {
    const url = 'https://stats.quake4.net/qstat/output.json'

    try {
      const response = await fetch(url)
      return await response.json()
    } catch (e) {
      console.error('failed to fetch stats', e)
      return []
    }
  }
}

class Players {
  static getPlayerName(name) {
    try {
      return Server.clearRBGcolors(name)
    } catch (e) {
      console.error(e)
      return name
    }
  }

  static getPlayers(serverData) {
    let result = ''
    serverData?.players?.map(player => result += `
        <div class="player-list-wrapper">
            <div class="player-text-wrapper">${ Players.getPlayerName(player.name) }</div>
        </div>`)

    return result
  }

  static getPlayersRow(serverData) {
    const { numplayers, maxplayers } = serverData
    const playersCount = `
        <div class="player-list-header">
            <div>Players: ${ numplayers }/${ maxplayers }</div>
        </div>`
    const playerList = Players.getPlayers(serverData)
    return `
      <div>
        ${ playersCount }
        ${ playerList }
      </div>
    `
  }
}

class Clan {
  static getClans(serverData) {
    let result = ''
    serverData?.players?.map(player => result += `
        <div class="player-list-wrapper">
            <div>${ Server.clearRBGcolors(player.clan) }</div>
        </div>`)

    return result
  }

  static getClansRow(serverData) {
    const clans = Clan.getClans(serverData)
    const clansHeader = `
        <div class="player-list-header">
            <div>Clan</div>
        </div>`

    return `
      <div>
        ${ clansHeader }
        ${ clans }
      </div>
    `
  }
}

class Ping {
  static getPing(serverData) {
    let result = ''
    serverData?.players?.map(player => result += `
        <div class="player-list-wrapper">
            <div>${ player.ping }</div>
        </div>`)

    return result
  }

  static getPingRow(serverData) {
    const ping = Ping.getPing(serverData)
    const pingHeader = `
        <div class="player-list-header">
            <div>Ping</div>
        </div>`

    return `
      <div>
        ${ pingHeader }
        ${ ping }
      </div>
    `
  }
}

class Time {
  static getTimeRow(serverData) {
    const timeHeader = `
        <div class="player-list-header">
            <div>Time</div>
        </div>`

    const time = serverData?.rules?.['.Score_Time'] || `<span class="time-infinity">&#8734;</span>`

    const currentTime = `
        <div class="player-list-wrapper">
            <div>${ time }</div>
        </div>`

    return `
      <div>
        ${ timeHeader }
        ${ currentTime }
      </div>
    `
  }
}

class Mode {
  static getModeRow(serverData) {
    const modeHeader = `
        <div class="player-list-header">
            <div>Mode</div>
        </div>`

    const currentMode = `
        <div class="player-list-wrapper">
            <div>${ serverData?.rules?.si_gameType }</div>
        </div>`

    return `
      <div>
        ${ modeHeader }
        ${ currentMode }
      </div>
    `
  }
}

class Map {
  static getRealName(mapName) {
    const maps = {
      'jumpimjackstrap': 'JumpinJackStrap',
      'ktonq4dm2': 'Torment by killat0n',
      'ktonq4dm4': 'Ravage by killat0n',
      'l4ctf2_beta4': 'RUINER [beta4]',
      'l4dm1_1': 'GALANG [1.1] by LUKIN',
      'l4dm1_2': 'GALANG [1.2 beta]',
      'l4dm2_1': 'MONSOON [1.1] by LUKIN',
      'l4dm3_1': 'RUINER [1.1] by LUKIN',
      'l4dm4': 'A MAN CALLED SUN by LUKIN',
      'l4dm5': 'SPIRAL by LUKIN',
      'l4dm5_tmp': '[TMP] SPIRAL by LUKIN',
      'ppplq4dm1b3_1b': 'MATROSKA [beta 3.1b] by pppL',
      'q4aero_QL_beta': 'Aerowalk [Revised] beta',
      'q4amphi': 'amphi',
      'q4ctf1': 'HEARTLESS',
      'q4ctf1_norg_perf': 'Heartless noRG [PERFIX]',
      'q4ctf2': 'DEATH BEFORE DISHONOR',
      'q4ctf2_perfix': 'Death before Dishonor [PERFIX]',
      'q4ctf3': 'SPEED TRAP',
      'q4ctf4': 'RELATIVITY',
      'q4ctf5': 'XAERO GRAVITY',
      'q4ctf6': 'MIND THE GAP',
      'q4ctf7': 'TREMORS',
      'q4ctf8': 'DOUBLE EDGED',
      'q4dm1': 'FRAGGING YARD',
      'q4dm1tmp': '[TMP] FRAGGING YARD',
      'q4dm2': 'SANDSTORM',
      'q4dm2tmp': '[TMP] SANDSTORM',
      'q4dm3': 'THE LOST FLEET',
      'q4dm3tmp': '[TMP] THE LOST FLEET',
      'q4dm4': 'BLOODWORK',
      'q4dm4tmp': '[TMP] BLOODWORK',
      'q4dm5': 'THE ROSE',
      'q4dm5tmp': '[TMP] THE ROSE',
      'q4dm6': 'NO DOCTORS',
      'q4dm6tmp': '[TMP] NO DOCTORS',
      'q4dm7': 'OVER THE EDGE',
      'q4dm7tmp': '[TMP] OVER THE EDGE',
      'q4dm8': 'THE LONGEST DAY',
      'q4dm9': 'CAMPGROUNDS REDUX',
      'q4dm10': 'OUTPATIENT',
      'q4dm11': 'SKELETON CREW',
      'q4dm11v1': 'FRAGGING YARD 1v1',
      'q4dm11v1tmp': '[TMP] FRAGGING YARD 1v1',
      'q4dz1': 'HEARTLESS',
      'q4dz2': 'DEATH BEFORE DISHONOR',
      'q4dz3': 'SPEED TRAP',
      'q4dz4': 'THE ROSE',
      'q4tourney1': 'RAILED',
      'q4wcp9fixed1': 'Spider Crossings [PERFIX]',
      'q4wcp14_perf': 'Camper Crossings [PERFIX]',
      'q4wxs1': 'q4wxs1',
      'q4xctf6': 'CAVERNOUS CRYONICS',
      'q4xdm10': 'CENTRAL INDUSTRIAL',
      'q4xdm11': 'WARFORGED',
      'q4xdm13': 'STROYENT RED',
      'q4xdm14': 'RETROPHOBOPOLIS',
      'q4xdm15': 'FIREWALL',
      'q4xtourney1': 'STROGGENOMENON',
      'q4xtourney2': 'VERTICON',
      'se4dm1': 'REPENT by SyncError',
      'swq4dm1': 'PHRANTIC',
      'tj_h0m3': 'TJ\'s H0m3 [Beta2]',
      'ts_q4dm3_fa': 'Rail Trouble by TymoN',
      'wvwq4dm1': 'PLACEBO EFFECT',
      'xtrafe': 'EKM XTRAFE MAP'
    }
    const mapWithoutMp = mapName?.replace('mp/', '')
    return maps[mapWithoutMp] || ''
  }

  static getMapRow(serverData) {
    const mapName = serverData.map
    return `
        <div>
            <div class="player-list-header">
                <div>Map</div>
            </div>
            <div class="player-list-wrapper">
                <div>${ Map.getRealName(mapName) }</div>
            </div>
        </div>
    `
  }
}

class TimeoutServer {
  static getTimeRow() {
    const timeHeader = `
        <div class="player-list-header">
            <div>Time</div>
        </div>`
    const currentTime = `
        <div class="player-list-wrapper">
            <div>${ '--' }</div>
        </div>`

    return `
      <div>
        ${ timeHeader }
        ${ currentTime }
      </div>
    `
  }

  static getPlayersRow(serverData) {
    const playersCount = `
        <div class="player-list-header">
            <div>Players: ${ 0 }/${ 0 }</div>
        </div>`
    return `
      <div>
        ${ playersCount }
      </div>
    `
  }

  static getServerRow(serverData) {
    const flag = Server.getFlag(serverData)
    const address = Server.getServerAddress(serverData)

    return `
        <div>
            <div class="server-name-header-wrapper">
                <div>Server</div>
            </div>
            <div class="server-name-mode-wrapper">
              <div class="serverName-wrapper">
                ${ flag }
                <div>
                    <div class="row-server-address">${ address }</div>
                </div>
              </div>
            </div>
        </div>  
    `
  }

  static getModeRow() {
    const modeHeader = `
        <div class="player-list-header">
            <div>Mode</div>
        </div>`

    const currentMode = `
        <div class="player-list-wrapper">
            <div>${ '--' }</div>
        </div>`

    return `
      <div>
        ${ modeHeader }
        ${ currentMode }
      </div>
    `
  }

  static getMapRow() {
    return `
        <div>
            <div class="player-list-header">
                <div>Map</div>
            </div>
            <div class="player-list-wrapper">
                <div>--</div>
            </div>
        </div>
    `
  }

  static getMapImg() {
    const src = 'https://quake4.net/assets/mappics/splash.png'
    return `
    <div class="map-image-wrapper">
    <div class="server-img-wrapper">
        <img src="${ src }" />
    </div>
    </div>
    `
  }

  static render(serverData) {
    const server = TimeoutServer.getServerRow(serverData)
    const players = TimeoutServer.getPlayersRow(serverData)
    const mode = TimeoutServer.getModeRow()
    const map = TimeoutServer.getMapRow(serverData)
    const mapImg = TimeoutServer.getMapImg()
    const clan = Clan.getClansRow(serverData)
    const ping = Ping.getPingRow(serverData)
    const time = TimeoutServer.getTimeRow()

    return `
      <div class="timeout-server-wrapper">
        <div class="server-column-wrapper">
            <div class="server-top-row-wrapper">
                ${ server }
            </div>
            <div>
                ${ players }
            </div>
        </div>
        <div class="server-column-wrapper">
            <div class="server-top-row-wrapper">
                ${ mode }
            </div>
            <div>${ clan }</div>
        </div>
        <div class="server-column-wrapper">
            <div class="server-top-row-wrapper">
                ${ time }
            </div>
            <div>${ ping }</div>
        </div>
        <div class="server-column-wrapper">
            <div class="server-top-row-wrapper">
                ${ map }
            </div>
            <div>${ mapImg }</div>
        </div>
      </div>
`
  }

  static isServerTimeout(serverData) {
    return serverData?.status === 'timeout' || serverData?.status === 'offline'
  }
}

class Server {
  static clearRBGcolors(name) {
    return name?.replaceAll(/\^[Cc]*\d{1,3}/g, '')
  }

  static getMapImgSrc(serverData) {
    const map = serverData.map?.replace('mp/', '')
    if (!map) {
      return null
    }
    return `${ config.imagePath }mappics/${ map }.png`
  }

  static getMapImg(serverData) {
    const src = Server.getMapImgSrc(serverData)
    return `
    <div class="map-image-wrapper">
    <div class="server-img-wrapper">
        <img src="${ src }" />
    </div>
    </div>
    `
  }

  static getServerFlagUrl(serverData) {
    const flag = serverData?.address?.split('.', 1)?.[0]
    const flagMap = {
      msk: 'ru', useast: 'us', uk1: 'uk', uk2: 'uk', uscentral: 'us', se: 'se', eu: 'eu', ua: 'ua',
    }

    return `${ config.imagePath }flags/${ flagMap[flag] }.svg`
  }

  static getFlag(serverData) {
    const serverFlagUrl = Server.getServerFlagUrl(serverData)

    return `<img src="${ serverFlagUrl }" width="${ '20px' }" />`
  }

  static getServerAddress(serverData) {
    const { address } = serverData
    if (address.includes(':')) {
      return serverData?.address?.split(':')?.[0]
    }
    return address
  }

  static getServerNameData(name) {
    try {
      return Server.clearRBGcolors(name)
    } catch (e) {
      return name``
    }
  }

  static getServerRow(serverData) {
    const flag = Server.getFlag(serverData)
    const { name } = serverData
    const address = Server.getServerAddress(serverData)
    const serverName = Server.getServerNameData(name)

    return `
        <div>
            <div class="server-name-header-wrapper">
                <div>Server</div>
            </div>
            <div class="server-name-mode-wrapper">
              <div class="serverName-wrapper">
                ${ flag }
                <div>
                    <div class="row-server-name">${ serverName }</div>
                    <div class="row-server-address">${ address }</div>
                </div>
              </div>
            </div>
        </div>  
    `
  }

  static render(serverData) {
    if (TimeoutServer.isServerTimeout(serverData)) {
      return TimeoutServer.render(serverData)
    }

    const server = Server.getServerRow(serverData)
    const mode = Mode.getModeRow(serverData)
    const map = Map.getMapRow(serverData)
    const players = Players.getPlayersRow(serverData)
    const mapImg = Server.getMapImg(serverData)
    const clan = Clan.getClansRow(serverData)
    const ping = Ping.getPingRow(serverData)
    const time = Time.getTimeRow(serverData)

    return `
      <div class="server-wrapper">
        <div class="server-column-wrapper">
            <div class="server-top-row-wrapper">
                ${ server }
            </div>
            <div>${ players }</div>
        </div>
        <div class="server-column-wrapper">
            <div class="server-top-row-wrapper">
                ${ mode }
            </div>
            <div>
                ${ clan }
            </div>
        </div>
        <div class="server-column-wrapper">
            <div class="server-top-row-wrapper">
                ${ time }
            </div>
            <div>${ ping }</div>
        </div>
        <div class="server-column-wrapper">
            <div class="server-top-row-wrapper">
                ${ map }
            </div>
            <div>${ mapImg }</div>
        </div>
      </div>
`
  }
}

class ListOfServers {
  static getListOfServersElements(serversData) {
    return serversData.map(Server.render)
  }

  static render(serversData) {
    const elements = ListOfServers.getListOfServersElements(serversData)
    $('article').append(elements)
  }
}

async function init() {
  removeOldStuff()
  const data = await DataLoader.fetchData()
  ListOfServers.render(data)
}

init()