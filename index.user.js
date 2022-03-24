// ==UserScript==
// @name        New script - quake4.net
// @namespace   Violentmonkey Scripts
// @match       https://quake4.net/servers/
// @grant       none
// @version     1.0
// @author      -
// @description 23/03/2022, 23:28:00
// ==/UserScript==
const $ = jQuery
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
  border: 1px solid #9fcfa1;
  border-radius: 8px;
  margin-bottom: 25px;
  font-family: 'Open Sans';
  color: #444444;
  font-weight: 400;
  padding: 25px 25px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.server-top-row-wrapper {
  min-height: 100px;
}

.server-top-row {
  display: flex;
  flex-direction: row;
}
.server-name-header-wrapper {
  text-transform: uppercase;
  font-size: 14pt;
  margin-bottom: 10px;
}
.serverName-wrapper {
  display: flex;
  flex-direction: row;
  align-items: end;
  margin-top: 10px;
  font-size: 12pt;
  margin-bottom: 15px;
}

.serverName-wrapper img {
  width: 25px;
  margin-right: 10px;
  border-radius: 0;
  padding-bottom: 16px;
}

.player-list-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-transform: uppercase;
  font-size: 14pt;
  margin-bottom: 10px;
}

.player-list-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 12pt;
}

.server-bottom-wrapper {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}

.server-bottom-wrapper img, .server-img-wrapper img {
  max-width: 300px;
  height: auto;
}

.mode-name-wrapper {
  width: 15%;
}

.map-name-header {
  display: flex;
  flex-direction: row;
  align-items: space-between;
  text-transform: uppercase;
  font-size: 13pt;
  margin-bottom: 10px;
}
.map-name-wrapper {
  display: flex;
  flex-direction: column;
  align-items: end;
}
.map-image-wrapper {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.mode-name-text-wrapper {
  margin-top: 10px;
}

.server-img-wrapper {
  display: flex;
  flex-direction: row;
  align-items: end;
  width: 100%;
}

.server-name-header-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.server-name-mode-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.server-column-wrapper {
  display: flex;
  flex-direction: column;
}
`

function removeOldStuff() {
  $('.uk-article').find('a,p,div').each((i, e) => {
    $(e).remove()
  })
}

function injectStyles() {
  const style = document.createElement('style')
  style.textContent = styles
  document.head.append(style)
}

function injectRobotoFont() {
  const style = document.createElement('style')
  style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');`
  document.head.append(style)
}

class DataLoader {
  static async fetchTestData() {
    const data = [
      {
        'protocol': 'q4s',
        'address': 'se.quake4.net:28004',
        'status': 'online',
        'hostname': 'se.quake4.net:28004',
        'name': '^3W^5w^3W ^c999Quake^c9024^c999.net ^c049N^c999orthern ^c960EU',
        'gametype': 'q4max',
        'map': 'mp/l4dm2_1',
        'numplayers': 0,
        'maxplayers': 14,
        'numspectators': 0,
        'maxspectators': 0,
        'ping': 0,
        'retries': 0,
        'rules': {
          'protocol': '2.85',
          'sv_punkbuster': '0',
          'si_version': 'Quake4  V1.4.2 linux-x86 Jun 15 2007',
          'fs_game_base': '',
          'fs_game': 'q4max',
          'net_serverMaxClientRate': '25600',
          'net_serverSnapshotDelay': '25',
          'net_serverDedicated': '1',
          'si_fragLimit': '0',
          'si_timeLimit': '8',
          'si_map': 'mp/l4dm2_1',
          'si_gameType': 'Duel',
          'si_modes': 'FFA240 CTF240 TDM240 CA240 DUEL240 IFFA240 IDUEL240 IFT240 ITDM240 ICTF240 ARENA240 CTFSBM240 ATDM240 FTEU240 FTUS240 TOURNEY240 DEADZONE240',
          'si_mode': 'DUEL240',
          'si_gameplay': '',
          'si_flags': '1593316',
          'si_brand': '',
          'si_autoAction': '',
          'g_allowSpecTimers': '0',
          'si_serverURL': '',
          'si_fps': '240',
          'si_controlTime': '120',
          'si_autobalance': '0',
          'si_shuffle': '0',
          'si_spectators': '1',
          'si_pure': '1',
          'si_usepass': '0',
          'si_warmup': '1',
          'si_teamDamage': '0',
          'si_suddenDeathRestart': '1',
          'si_privatePlayers': '0',
          'si_allowVoting': '1',
          'si_useReady': '1',
          'si_tourneyLimit': '8',
          'si_captureLimit': '0',
          'si_minPlayers': '2',
          'si_maxPlayers': '14',
          'si_mapCycle': '',
          'si_dropWeaponsInBuyingModes': '0',
          'si_isBuyingEnabled': '0',
          'si_name': '^3W^5w^3W ^c999Quake^c9024^c999.net ^c049N^c999orthern ^c960EU',
          'si_voiceChat': '1',
          '.Administrator': 'Wylsa aka earthlukas',
          '.Email': 'lukas@earthlukas.com',
          '.URL': 'https://quake4.net',
          '.Location': 'Stockholm',
          '.Players_Strogg': '',
          '.Players_Marine': '',
          '.Players_Active': '',
          '.Score_Strogg': '',
          '.Score_Marine': '',
          '.Score': '',
          '.Score_Time': 'Warmup',
          '.matchid': '0',
          '.serverid': '0',
          'si_inhibit': '0',
          'si_buyModeMinCredits': '0',
          'si_buyModeMaxCredits': '25000',
          'si_buyModeStartingCredits': '1000',
          'si_deadZonePowerupTime': '45',
          'si_countDown': '10',
          'si_numPrivatePlayers': '0',
          'gamename': 'Q4MAX 0.82',
          'osmask': '0x7'
        },
        'players': [
          {
            'number': 0,
            'name': '958wylsa',
            'score': 0,
            'clan': 'WwW',
            'type': 'player',
            'rate': '16000',
            'ping': 54
          },
          {
            'number': 999,
            'name': 'GOD OF WAR SANCHEZ',
            'score': 999,
            'clan': 'WwW',
            'type': 'player',
            'rate': '16000',
            'ping': 0,
          },

        ]
      },
      {
        'protocol': 'q4s',
        'address': 'msk.quake4.net:28004',
        'status': 'online',
        'hostname': 'msk.quake4.net:28004',
        'name': '^3W^5w^3W ^c999Quake^c9024^c999.net ^c910Mo^c059sc^c999ow',
        'gametype': 'q4max',
        'map': 'mp/l4dm2_1',
        'numplayers': 0,
        'maxplayers': 10,
        'numspectators': 0,
        'maxspectators': 0,
        'ping': 19,
        'retries': 0,
        'rules': {
          'protocol': '2.85',
          'sv_punkbuster': '0',
          'si_version': 'Quake4  V1.4.2 linux-x86 Jun 15 2007',
          'fs_game_base': '',
          'fs_game': 'q4max',
          'net_serverMaxClientRate': '25600',
          'net_serverSnapshotDelay': '25',
          'net_serverDedicated': '1',
          'si_maxPlayers': '10',
          'si_fragLimit': '0',
          'si_timeLimit': '8',
          'si_map': 'mp/l4dm2_1',
          'si_gameType': 'Duel',
          'si_autobalance': '0',
          'si_shuffle': '0',
          'si_spectators': '1',
          'si_usepass': '0',
          'si_warmup': '1',
          'si_teamDamage': '0',
          'si_allowVoting': '1',
          'si_useReady': '1',
          'si_tourneyLimit': '8',
          'si_captureLimit': '0',
          'si_minPlayers': '2',
          'si_mapCycle': '',
          'si_name': '^3W^5w^3W ^c999Quake^c9024^c999.net ^c910Mo^c059sc^c999ow',
          'si_serverURL': '',
          'si_suddenDeathRestart': '1',
          'si_privatePlayers': '0',
          'si_voiceChat': '1',
          'si_modes': 'FFA240 CTF240 TDM240 CA240 DUEL240 IFFA240 IDUEL240 IFT240 ITDM240 ICTF240 ARENA240 CTFSBM240 ATDM240 FTEU240 FTUS240 TOURNEY240 DEADZONE240',
          'si_mode': 'DUEL240',
          'si_gameplay': '',
          'si_flags': '1593316',
          'si_brand': '',
          'si_autoAction': '',
          'g_allowSpecTimers': '0',
          'si_fps': '240',
          'si_controlTime': '120',
          'si_pure': '1',
          'si_dropWeaponsInBuyingModes': '0',
          'si_isBuyingEnabled': '0',
          '.Administrator': 'Wylsa aka earthlukas',
          '.Email': 'lukas@earthlukas.com',
          '.URL': 'https://quake4.net',
          '.Location': 'Moscow',
          '.Players_Strogg': '',
          '.Players_Marine': '',
          '.Players_Active': '',
          '.Score_Strogg': '',
          '.Score_Marine': '',
          '.Score': '',
          '.Score_Time': 'Warmup',
          '.matchid': '0',
          '.serverid': '0',
          'si_inhibit': '0',
          'si_buyModeMinCredits': '0',
          'si_buyModeMaxCredits': '25000',
          'si_buyModeStartingCredits': '1000',
          'si_deadZonePowerupTime': '45',
          'si_countDown': '10',
          'si_numPrivatePlayers': '0',
          'gamename': 'Q4MAX 0.82',
          'osmask': '0x7'
        },
        'players': []
      },
      {
        'protocol': 'q4s',
        'address': 'ua.quake4.net:28004',
        'status': 'online',
        'hostname': 'ua.quake4.net:28004',
        'name': '^3W^5w^3W ^c999Quake^c9024^c999.net ^c982Ukr^c379aine',
        'gametype': 'q4max',
        'map': 'mp/l4dm2_1',
        'numplayers': 0,
        'maxplayers': 16,
        'numspectators': 0,
        'maxspectators': 0,
        'ping': 55,
        'retries': 0,
        'rules': {
          'protocol': '2.85',
          'sv_punkbuster': '0',
          'si_version': 'Quake4  V1.4.2 linux-x86 Jun 15 2007',
          'fs_game_base': '',
          'fs_game': 'q4max',
          'net_serverMaxClientRate': '25600',
          'net_serverSnapshotDelay': '25',
          'net_serverDedicated': '1',
          'si_fragLimit': '0',
          'si_timeLimit': '8',
          'si_map': 'mp/l4dm2_1',
          'si_gameType': 'Duel',
          'si_modes': 'FFA240 CTF240 TDM240 CA240 DUEL240 IFFA240 IDUEL240 IFT240 ITDM240 ICTF240 ARENA240 CTFSBM240 ATDM240 FTEU240 FTUS240 TOURNEY240 DEADZONE240',
          'si_mode': 'DUEL240',
          'si_gameplay': '',
          'si_flags': '1593316',
          'si_brand': '',
          'si_autoAction': '',
          'g_allowSpecTimers': '0',
          'si_serverURL': '',
          'si_fps': '240',
          'si_controlTime': '120',
          'si_autobalance': '0',
          'si_shuffle': '0',
          'si_spectators': '1',
          'si_pure': '1',
          'si_usepass': '0',
          'si_warmup': '1',
          'si_teamDamage': '0',
          'si_suddenDeathRestart': '1',
          'si_privatePlayers': '0',
          'si_allowVoting': '1',
          'si_useReady': '1',
          'si_tourneyLimit': '8',
          'si_captureLimit': '0',
          'si_minPlayers': '2',
          'si_maxPlayers': '16',
          'si_mapCycle': '',
          'si_dropWeaponsInBuyingModes': '0',
          'si_isBuyingEnabled': '0',
          'si_name': '^3W^5w^3W ^c999Quake^c9024^c999.net ^c982Ukr^c379aine',
          'si_voiceChat': '1',
          '.Administrator': 'Wylsa aka earthlukas',
          '.Email': 'lukas@earthlukas.com',
          '.URL': 'https://quake4.net',
          '.Location': 'Kyiv',
          '.Players_Strogg': '',
          '.Players_Marine': '',
          '.Players_Active': '',
          '.Score_Strogg': '',
          '.Score_Marine': '',
          '.Score': '',
          '.Score_Time': 'Warmup',
          '.matchid': '0',
          '.serverid': '0',
          'si_inhibit': '0',
          'si_buyModeMinCredits': '0',
          'si_buyModeMaxCredits': '25000',
          'si_buyModeStartingCredits': '1000',
          'si_deadZonePowerupTime': '45',
          'si_countDown': '10',
          'si_numPrivatePlayers': '0',
          'gamename': 'Q4MAX 0.82',
          'osmask': '0x7'
        },
        'players': []
      },
      {
        'protocol': 'q4s',
        'address': 'eu.quake4.net:28004',
        'status': 'online',
        'hostname': 'eu.quake4.net:28004',
        'name': '^3W^5w^3W ^c999Quake^c9024^c999.net ^c179Europe',
        'gametype': 'q4max',
        'map': 'mp/l4dm5_tmp',
        'numplayers': 0,
        'maxplayers': 10,
        'numspectators': 0,
        'maxspectators': 0,
        'ping': 29,
        'retries': 0,
        'rules': {
          'protocol': '2.85',
          'sv_punkbuster': '0',
          'si_version': 'Quake4  V1.4.2 linux-x86 Jun 15 2007',
          'fs_game_base': '',
          'fs_game': 'q4max',
          'net_serverMaxClientRate': '25600',
          'net_serverSnapshotDelay': '25',
          'net_serverDedicated': '1',
          'si_maxPlayers': '10',
          'si_fragLimit': '0',
          'si_timeLimit': '10',
          'si_map': 'mp/l4dm5_tmp',
          'si_gameType': 'Team DM',
          'si_autobalance': '0',
          'si_shuffle': '0',
          'si_spectators': '1',
          'si_usepass': '0',
          'si_warmup': '1',
          'si_teamDamage': '0',
          'si_allowVoting': '1',
          'si_useReady': '1',
          'si_tourneyLimit': '8',
          'si_captureLimit': '0',
          'si_minPlayers': '2',
          'si_mapCycle': '',
          'si_name': '^3W^5w^3W ^c999Quake^c9024^c999.net ^c179Europe',
          'si_serverURL': '',
          'si_suddenDeathRestart': '1',
          'si_privatePlayers': '0',
          'si_voiceChat': '1',
          'si_modes': 'FFA240 CTF240 TDM240 CA240 DUEL240 IFFA240 IDUEL240 IFT240 ITDM240 ICTF240 ARENA240 CTFSBM240 ATDM240 FTEU240 FTUS240 TOURNEY240 DEADZONE240',
          'si_mode': 'TDM240',
          'si_gameplay': '',
          'si_flags': '1593316',
          'si_brand': '',
          'si_autoAction': '',
          'g_allowSpecTimers': '0',
          'si_fps': '240',
          'si_controlTime': '120',
          'si_pure': '1',
          'si_dropWeaponsInBuyingModes': '0',
          'si_isBuyingEnabled': '0',
          '.Administrator': 'Wylsa aka earthlukas',
          '.Email': 'lukas@earthlukas.com',
          '.URL': 'https://quake4.net',
          '.Location': 'Frankfurt',
          '.Players_Strogg': '',
          '.Players_Marine': '',
          '.Players_Active': '',
          '.Score_Strogg': '35 ',
          '.Score_Marine': '72 ',
          '.Score': '',
          '.Score_Time': 'Warmup',
          '.matchid': '0',
          '.serverid': '0',
          'si_inhibit': '0',
          'si_buyModeMinCredits': '0',
          'si_buyModeMaxCredits': '25000',
          'si_buyModeStartingCredits': '1000',
          'si_deadZonePowerupTime': '45',
          'si_countDown': '10',
          'si_numPrivatePlayers': '0',
          'gamename': 'Q4MAX 0.82',
          'osmask': '0x7'
        },
        'players': []
      },
      {
        'protocol': 'q4s',
        'address': 'uk1.quake4.net:28004',
        'status': 'online',
        'hostname': 'uk1.quake4.net:28004',
        'name': '^3W^5w^3W ^c999Quake^c9024^c999.net ^c037U^c999nited ^c912K^c999ingdom',
        'gametype': 'q4max',
        'map': 'mp/l4dm2_1',
        'numplayers': 0,
        'maxplayers': 10,
        'numspectators': 0,
        'maxspectators': 0,
        'ping': 31,
        'retries': 0,
        'rules': {
          'protocol': '2.85',
          'sv_punkbuster': '0',
          'si_version': 'Quake4  V1.4.2 linux-x86 Jun 15 2007',
          'fs_game_base': '',
          'fs_game': 'q4max',
          'net_serverMaxClientRate': '25600',
          'net_serverSnapshotDelay': '25',
          'net_serverDedicated': '1',
          'si_maxPlayers': '10',
          'si_fragLimit': '0',
          'si_timeLimit': '8',
          'si_map': 'mp/l4dm2_1',
          'si_gameType': 'Duel',
          'si_autobalance': '0',
          'si_shuffle': '0',
          'si_spectators': '1',
          'si_usepass': '0',
          'si_warmup': '1',
          'si_teamDamage': '0',
          'si_allowVoting': '1',
          'si_useReady': '1',
          'si_tourneyLimit': '8',
          'si_captureLimit': '0',
          'si_minPlayers': '2',
          'si_mapCycle': '',
          'si_name': '^3W^5w^3W ^c999Quake^c9024^c999.net ^c037U^c999nited ^c912K^c999ingdom',
          'si_serverURL': '',
          'si_suddenDeathRestart': '1',
          'si_privatePlayers': '0',
          'si_voiceChat': '1',
          'si_modes': 'FFA240 CTF240 TDM240 CA240 DUEL240 IFFA240 IDUEL240 IFT240 ITDM240 ICTF240 ARENA240 CTFSBM240 ATDM240 FTEU240 FTUS240 TOURNEY240 DEADZONE240',
          'si_mode': 'DUEL240',
          'si_gameplay': '',
          'si_flags': '1593316',
          'si_brand': '',
          'si_autoAction': '',
          'g_allowSpecTimers': '0',
          'si_fps': '240',
          'si_controlTime': '120',
          'si_pure': '1',
          'si_dropWeaponsInBuyingModes': '0',
          'si_isBuyingEnabled': '0',
          '.Administrator': 'Wylsa aka earthlukas',
          '.Email': 'lukas@earthlukas.com',
          '.URL': 'https://quake4.net',
          '.Location': 'London',
          '.Players_Strogg': '',
          '.Players_Marine': '',
          '.Players_Active': '',
          '.Score_Strogg': '',
          '.Score_Marine': '',
          '.Score': '',
          '.Score_Time': 'Warmup',
          '.matchid': '0',
          '.serverid': '0',
          'si_inhibit': '0',
          'si_buyModeMinCredits': '0',
          'si_buyModeMaxCredits': '25000',
          'si_buyModeStartingCredits': '1000',
          'si_deadZonePowerupTime': '45',
          'si_countDown': '10',
          'si_numPrivatePlayers': '0',
          'gamename': 'Q4MAX 0.82',
          'osmask': '0x7'
        },
        'players': []
      },
      {
        'protocol': 'q4s',
        'address': 'uk2.quake4.net:28004',
        'status': 'online',
        'hostname': 'uk2.quake4.net:28004',
        'name': '^3W^5w^3W ^c999Quake^c9024^c999.net ^c359United ^c923Kingdom',
        'gametype': 'q4max',
        'map': 'mp/l4dm2_1',
        'numplayers': 0,
        'maxplayers': 10,
        'numspectators': 0,
        'maxspectators': 0,
        'ping': 41,
        'retries': 0,
        'rules': {
          'protocol': '2.85',
          'net_serverMaxClientRate': '25600',
          'net_serverSnapshotDelay': '20',
          'net_serverDedicated': '1',
          'fs_game_base': '',
          'fs_game': 'q4max',
          'sv_punkbuster': '0',
          'si_version': 'Quake4  V1.4.2 win-x86 Jun 15 2007',
          'si_maxPlayers': '10',
          'si_fragLimit': '0',
          'si_timeLimit': '8',
          'si_map': 'mp/l4dm2_1',
          'si_gameType': 'Duel',
          'si_autobalance': '0',
          'si_shuffle': '0',
          'si_spectators': '1',
          'si_usepass': '0',
          'si_warmup': '1',
          'si_teamDamage': '0',
          'si_allowVoting': '1',
          'si_useReady': '1',
          'si_tourneyLimit': '8',
          'si_captureLimit': '0',
          'si_minPlayers': '2',
          'si_mapCycle': '',
          'si_name': '^3W^5w^3W ^c999Quake^c9024^c999.net ^c359United ^c923Kingdom',
          '.Administrator': 'sTPHN',
          '.Email': 'stephen@stphnwlkr.com',
          '.Location': 'London',
          '.URL': 'stphnwlkr.com',
          'si_voiceChat': '1',
          'si_mode': 'DUEL240',
          'si_gameplay': '',
          'si_flags': '1593316',
          'si_brand': '',
          'si_autoAction': '',
          'g_allowSpecTimers': '0',
          'si_serverURL': '',
          'si_fps': '240',
          'si_controlTime': '120',
          'si_pure': '1',
          'si_suddenDeathRestart': '1',
          'si_privatePlayers': '0',
          'si_dropWeaponsInBuyingModes': '0',
          'si_isBuyingEnabled': '0',
          'si_modes': 'FFA240 CTF240 TDM240 CA240 DUEL240 IFFA240 IDUEL240 IFT240 ITDM240 ICTF240 ARENA240 CTFSBM240 ATDM240 FTEU240 FTUS240 TOURNEY240 DEADZONE240',
          '.matchid': '0',
          '.serverid': '0',
          'si_inhibit': '0',
          'si_buyModeMinCredits': '0',
          'si_buyModeMaxCredits': '25000',
          'si_buyModeStartingCredits': '1000',
          'si_deadZonePowerupTime': '45',
          'si_countDown': '10',
          'si_numPrivatePlayers': '0',
          'gamename': 'Q4MAX 0.82',
          '.Players_Strogg': '',
          '.Players_Marine': '',
          '.Players_Active': '',
          '.Score_Strogg': '',
          '.Score_Marine': '',
          '.Score': '',
          '.Score_Time': 'Warmup',
          'osmask': '0x7'
        },
        'players': []
      },
      {
        'protocol': 'q4s',
        'address': 'useast.quake4.net:28004',
        'status': 'online',
        'hostname': 'useast.quake4.net:28004',
        'name': '^3W^5w^3W ^c999Quake^c9024^c999.net ^c902New ^c999Jer^c249sey',
        'gametype': 'q4max',
        'map': 'mp/l4dm2_1',
        'numplayers': 0,
        'maxplayers': 12,
        'numspectators': 0,
        'maxspectators': 0,
        'ping': 101,
        'retries': 0,
        'rules': {
          'protocol': '2.85',
          'sv_punkbuster': '0',
          'si_version': 'Quake4  V1.4.2 linux-x86 Jun 15 2007',
          'fs_game_base': '',
          'fs_game': 'q4max',
          'net_serverMaxClientRate': '25600',
          'net_serverSnapshotDelay': '30',
          'net_serverDedicated': '1',
          'si_maxPlayers': '12',
          'si_fragLimit': '0',
          'si_timeLimit': '8',
          'si_map': 'mp/l4dm2_1',
          'si_gameType': 'Duel',
          'si_autobalance': '0',
          'si_shuffle': '0',
          'si_spectators': '1',
          'si_usepass': '0',
          'si_warmup': '1',
          'si_teamDamage': '0',
          'si_allowVoting': '1',
          'si_useReady': '1',
          'si_tourneyLimit': '3',
          'si_captureLimit': '12',
          'si_minPlayers': '2',
          'si_mapCycle': '',
          'si_name': '^3W^5w^3W ^c999Quake^c9024^c999.net ^c902New ^c999Jer^c249sey',
          'si_serverURL': '',
          'si_suddenDeathRestart': '1',
          'si_privatePlayers': '0',
          'si_voiceChat': '1',
          'si_modes': 'FFA240 ; CTF240 ; TDM240 ; DUEL240 ; CA240 ; IFFA240',
          'si_mode': 'DUEL240',
          'si_gameplay': '',
          'si_flags': '1593316',
          'si_brand': '',
          'si_autoAction': '',
          'g_allowSpecTimers': '0',
          'si_fps': '240',
          'si_controlTime': '120',
          'si_pure': '1',
          'si_dropWeaponsInBuyingModes': '0',
          'si_isBuyingEnabled': '0',
          '.Administrator': 'admin',
          '.Email': 'admin@whatever.com',
          '.URL': 'http://somewebsite.com',
          '.Players_Strogg': '',
          '.Players_Marine': '',
          '.Players_Active': '',
          '.Score_Strogg': '',
          '.Score_Marine': '',
          '.Score': '',
          '.Score_Time': 'Warmup',
          '.matchid': '0',
          '.serverid': '0',
          'si_inhibit': '0',
          'si_buyModeMinCredits': '0',
          'si_buyModeMaxCredits': '25000',
          'si_buyModeStartingCredits': '1000',
          'si_deadZonePowerupTime': '45',
          'si_countDown': '10',
          'si_numPrivatePlayers': '0',
          'gamename': 'Q4MAX 0.82',
          'osmask': '0x7'
        },
        'players': []
      },
      {
        'protocol': 'q4s',
        'address': 'uscentral.quake4.net:28004',
        'status': 'timeout',
        'hostname': 'uscentral.quake4.net:28004'
      }
    ]

    return Promise.resolve(data)
  }

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
            <div>${ Players.getPlayerName(player.name) }</div>
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
            <div>${ player.clan }</div>
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
    const currentTime = `
        <div class="player-list-wrapper">
            <div>${ serverData?.rules?.['.Score_Time'] }</div>
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
            <div>${ serverData?.rules?.si_mode }</div>
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
      msk: 'ru',
      useast: 'us',
      uk1: 'uk',
      uk2: 'uk',
      uscentral: 'us',
      se: 'se',
      eu: 'eu',
      ua: 'ua',
    }

    return `${ config.imagePath }flags/${ flagMap[flag] }.svg`
  }

  static getFlag(serverData) {
    const serverFlagUrl = Server.getServerFlagUrl(serverData)

    return `<img src="${ serverFlagUrl }" width="${ config.styles.serverBlock.flagSize }" />`
  }

  static getModeRow() {
    return `
        <div class="mode-name-wrapper">
            <div>Mode</div>
            <div class="mode-name-text-wrapper">Duel</div>
        </div>
      
    `
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
                    <div>${ serverName }</div>
                    <div>${ address }</div>
                </div>
              </div>
            </div>
        </div>  
    `
  }

  static getMapRow(serverData) {
    const mapName = serverData.map
    return `
        <div class="map-name-wrapper">
            <div class="map-name-header">
                <div>Map</div>
            </div>
            <div class="map-name-wrapper">
                <div>${ mapName }</div>
            </div>
        </div>
    `
  }

  static render(serverData) {
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
            <div class="server-top-row-wrapper">${ server }</div>
            <div>${ players }</div>
        </div>
        <div class="server-column-wrapper">
            <div class="server-top-row-wrapper">${ mode }</div>
            <div>${ clan }</div>
        </div>
        <div class="server-column-wrapper">
            <div class="server-top-row-wrapper">${ time }</div>
            <div>${ ping }</div>
        </div>
        <div class="server-column-wrapper">
            <div class="server-top-row-wrapper">${ map }</div>
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
  injectStyles()
  injectRobotoFont()
  const data = await DataLoader.fetchTestData()
  console.log(data)
  ListOfServers.render(data)
}

init()