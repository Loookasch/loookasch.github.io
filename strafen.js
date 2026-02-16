// 1. Kopiere deine CSV-Daten hier in die Backticks (``)
const csvData = `Name,Startkiste bezahlt?,,,,,,,,,,,,,,,,,,,,,,,,
Apel,✓,,,,,,,,,,,,,,,,,,,,,,,,
Cilgin,✓,,5.0€,17.08,Spiel zu spät,X,Kiste,17.08,Kapitän,X,1.0€,11.10,Trikot falschrum,,,,,,,,,,,,
Daube,✓,X,0.5€,01.08,Tunnel,X,5.0€,29.08,Training zu spät,X,1.0€,15.10,Tunnel,,,,,,,,,,,,
Dirschke,✓,,1.0€,01.07,Zaun,,1.0€,07.07,Zaun,,5.0€,17.08,Spiel zu spät,,5.0€,29.08,Training zu spät,X,5.0€,26.10,Spiel zu spät,X,5.0€,02.11,Spiel zu spät
Grafe,✓,,0.5€,01.08,Tunnel,,1.0€,29.08,Tunnel,,,,,,,,,,,,,,,,
Grimm,✓,X,0.5€,01.08,Tunnel,X,1.5€,17.08,Spiel zu spät,,,,,,,,,,,,,,,,
T.Heyer,✓,,1.0€,01.07,Zaun,,1.5€,17.08,Spiel zu spät,,,,,,,,,,,,,,,,
M.Heyer,✓,,1.0€,01.07,Zaun,,1.0€,14.07,Zaun,,,,,,,,,,,,,,,,
Holl,✓,X,1.0€,05.07,Zaun,X,2.5€,01.08,u. Fehlen Sitzung,,,,,,,,,,,,,,,,
Jakob,✓,,1.0€,10.07,Zaun,X,5.0€,26.10,Spiel zu spät,,,,,,,,,,,,,,,,
Jordan,✓,,1.0€,18.07,Zaun,,1.0€,26.07,Zaun,,0.5€,16.09,Tunnel,X,1.0€,11.10,Trikot falschrum,,,,,,,,
Kahya,✓,X,1.0€,14.07,Zaun,X,1.0€,16.07,Zaun,X,1.0€,18.07,Zaun,X,0.5€,13.08,Tunnel,X,Kiste,17.08,Gelb-Rot,X,1.0€,15.10,Tunnel
Kesebir,✓,,1.0€,14.07,Zaun,X,0.5€,13.08,Tunnel,X,5.0€,22.08,Gelb (Unsportl.),,,,,,,,,,,,
Müller,✓,X,1.0€,25.09,Tunnel,,,,,,,,,,,,,,,,,,,,
Noori,,X,0.5€,18.07,Tunnel,X,0.5€,13.08,Tunnel,X,1.5€,17.08,Spiel zu spät,X,5.0€,26.10,Spiel zu spät,X,4.0€,02.11,Spiel zu spät,,,,
Opitz,✓,X,0.5€,13.08,Tunnel,X,1.0€,22.08,falscher Einwurf,X,1.0€,25.09,Tunnel,,,,,,,,,,,,
Röhr,✓,X,1.0€,14.07,Zaun,X,1.0€,13.08,Zaun,X,5.0€,17.08,Spiel zu spät,X,1.0€,29.08,Zaun,X,Kiste,11.10,Zeitungsbild,,,,
Salehy,✓,X,1.0€,07.07,Zaun,x,0.5€,07.08,Tunnel,X,Kiste,12.08,Zeitungsbild,X,5.0€,17.08,Gelb (Dummheit),X,1.0€,14.09,falscher Einwurf,X,5.0€,26.10,Spiel zu spät
Ünal,,X,17.5€,-,u. Fehlen Training,X,Kiste,10.08,Rot Tätlichkeit ,,,,,,,,,,,,,,,,
Vollmer,✓,X,0.5€,16.09,Tunnel,,,,,,,,,,,,,,,,,,,,
T.Henning,,X,1.0€,31.10,Trikot falschrum,,,,,,,,,,,,,,,,,,,,
Quant,,X,1.0€,07.07,Zaun,X,1.0€,16.07,Zaun,X,0.5€,12.09,Tunnel,,,,,,,,,,,,
Marinov,,X,1.0€,13.07,Zaun,X,1.0€,31.10,Trikot falschrum,,,,,,,,,,,,,,,,
Uhrig,✓,,0.5€,01.07,Tunnel,,,,,,,,,,,,,,,,,,,,
Hopf,✓,,,,,,,,,,,,,,,,,,,,,,,,
Krotzky,✓,,,,,,,,,,,,,,,,,,,,,,,,
Kurtay,✓,,,,,,,,,,,,,,,,,,,,,,,,
Sadiku,,,2.0€,25.07,unbekannt,,1.0€,07.09,Trikot falschrum,X,1.0€,31.10,Trikot falschrum,,,,,,,,,,,,
Mironenko,,,1.0€,07.09,Trikot falschrum,,,,,,,,,,,,,,,,,,,,
Alberro,,X,1.0€,31.10,Trikot falschrum,,,,,,,,,,,,,,,,,,,,`;

function renderTable(data) {
    const container = document.getElementById('table-container');
    const rows = data.trim().split('\n'); // Teilt den Text in Zeilen
    let unpaid = false;
    let highlight = "";

    let html = '<table>';

    rows.forEach((row, index) => {
        const columns = row.split(','); // Teilt die Zeile bei jedem Komma
        const tag = (index === 0) ? 'th' : 'td'; // Erste Zeile als Header (th)

        html += '<tr>';
        columns.forEach((col, index) => {
            if (index == 1 || index == 0) {
                html += `<${tag}>${col.trim()}</${tag}>`;
            }

            if ((index % 4 == 2)) {
                unpaid = col.trim() == "X" ? true : false;
            } else if (index % 4 == 3) {

                html += `<${tag} ${unpaid ? 'class="highlight"' : ""}data-tooltip="${columns[index + 1] + " " + columns[index + 2]}">${col.trim().replace(".",",")}</${tag}>`;
                unpaid = false;
            }
        });
        html += '</tr>';
    });

    html += '</table>';
    container.innerHTML = html;
}

// Tabelle beim Laden der Seite generieren
renderTable(csvData);