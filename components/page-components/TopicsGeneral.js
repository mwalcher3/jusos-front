import React from 'react'
import {global} from '../../pages/_app'
import Image from 'next/image'
import PopUp from '../other-components/PopUp'
import generalcss from '../../styles/component-modules/topics.general.module.scss'


const TopicsGeneral = ({data}) => {

  const [accordionCount, setAccordionCount] = React.useState(-1)
    const dataAttributes= data.data.attributes

  return (
    <div className="container">
      <section className="mainimage">
        <Image
          src={`${global.host}${dataAttributes.mainImage.data.attributes.url}`}
          alt={dataAttributes.mainImage.data.attributes.alternativeText}
          layout="fill"
          objectFit="cover"
          objectPosition="50% left"
          priority
      />
      </section>
      <h1>{dataAttributes.title}</h1>
      <PopUp data={dataAttributes.popups.data}/>

      <section className={generalcss.accordioncontainer}>
        {dataAttributes.topics.data.map((item, index)=>{
          return(
            <div key={index}>
              <div className={generalcss.accordionbanner}>
                <h2>{item.attributes.title}</h2>

                <span onClick={()=> {index==accordionCount? setAccordionCount(-1): setAccordionCount(index)}} className={generalcss.more}>
                    <div className={generalcss.plushorizontal}></div>
                    <div className={accordionCount==index? generalcss.minus: generalcss.plusvertical}></div>
                </span>
              </div>

              <p className={accordionCount==index? generalcss.paragraphs: generalcss.paragraphsclosed}>{item.attributes.text}</p>
              <div className="horizontalLine"></div>
              </div>
          )
        })}
      </section>

      <div className="lastupdated">{dataAttributes.updatedAt}</div> 
    </div>
  )
}

export default TopicsGeneral






/*const json= {
  data:[
    {
      title:"OB-Kandidat Sören Michelsburg fordert preiswerten Wohnraum für Studierende",
      description:"Heidelberger Studierende leiden unter hohen Mietpreisen // SPD-Stadtrat Sören Michelsburg will dem Studierendenwerk Flächen zum Wohnungsbau zur Verfügung zu stellen // Michelsburg: „Günstiger Wohnraum kann nur mit öffentlicher Unterstützung geschaffen werden“ // ",
      text: "Heidelberg - Seit Jahren rangiert Heidelberg unter den zehn teuersten Universitätsstädten in Deutschland. Heidelbergs  Studierende stehen unter enormem finanziellen Druck. Dazu tragen neben hohen Lebensmittel- und Energiepreisen vor allem steigende Mieten bei. Während die Quadratmeterpreise für Wohnungen in privater Hand meist über dem Bundesdurchschnitt liegen, vermietet das Studierendenwerk Wohnraum deutlich günstiger. OB-Kandidat Sören Michelsburg will den Preissteigerungen deshalb mit dem Ausbau von studentischem Wohnraum in öffentlicher Hand begegnen: „Die Stadt muss dem Studierendenwerk Flächen zur Verfügung stellen, damit mehr Wohnheime gebaut werden können“. Konkret möchte der SPD-Stadtrat Patrick-Henry Village möglichst bald für Studierende öffnen. „So bieten wir jungen Menschen eine langfristige Perspektive in Heidelberg und beleben nebenbei den Stadtteil“, hofft Michelsburg. Außerdem fordert der OB-Kandidat, die im Masterplan Neuenheimer Feld freigegebenen Flächen möglichst zügig zu nutzen. Diesen Samstag (24.09.2022) diskutiert Michelsburg mit Bauministerin Klara Geywitz und Vertreter*innen der Heidelberger Wohnungsbaugesellschaften darüber, welche Weichen Stadt und Bund stellen müssen, um in Zukunft alle Bevölkerungsschichten mit günstigem Wohnraum zu versorgen. Die Veranstaltung findet im SPD-Regionalzentrum in der Bergheimerstraße 88 statt und beginnt um 10:00 Uhr.",
    },
    {
      title:"OB-Kandidat Sören Michelsburg fordert: Bundesgartenschau 2025 auf dem Airfield",
      description:"Rostocker Bürgerschaft sagt Bundesgartenschau 2025 ab // SPD-Stadtrat Sören Michelsburg bringt Heidelberger Airfield als Ausrichtungsort ins Spiel // Michelsburg: „Sehe hier eine große Chance, das Airfield zu einer hochwertigen Aufenthaltsfläche zu entwickeln“ ",
      text: "Heidelberg - Bis zum Ende der Sommerferien öffnet die Stadt das Airfield für Besucher*innen. Allerdings lockt das karge Angebot aus Imbissbude, Pumptrack und Strandbereich nur wenige Menschen auf den ehemaligen Flugplatz. SPD-Stadtrat Sören Michelsburg ist überzeugt: „Wir brauchen ein langfristiges Konzept für das Airfield.“ Im Gegensatz zu anderen politischen Akteuren macht Michelsburg konkrete Vorschläge für die Nutzung des Airfields. So kann er sich auf dem Airfield dringend benötigte Sportflächen, einen Badesee und eine Freilichtbühne vorstellen. Die SPD-Fraktion verfolgt die Idee, das Airfield zu einer Grün- und Freifläche für alle Bürger*innen zu entwickeln bereits seit 2018. Michelsburg möchte nun die Gunst der Stunde nutzen und in die Lücke springen, die Rostock mit der Absage der Bundesgartenschau 2025 hinterlässt. „Das ist eine einzigartige Chance für Heidelberg: Im Rahmen der Bundesgartenschau können wir die ohnehin geplante Entwicklung des Airfields zum Stadtpark beschleunigen“. Abgesehen davon zahlt sich die Organisation der Bundesgartenschau auch finanziell aus. So förderte das Land die Bundesgartenschau in Heilbronn 2019 mit 59 Millionen Euro. Das Projekt und der zeitliche Rahmen sind ehrgeizig, doch das schreckt Michelsburg nicht ab. „Eine Entwicklung des Airfields bis 2025 ist sportlich, aber nicht unmöglich. Wenn wir jetzt gemeinsam entschlossen handeln, können wir aus dem Airfield in kurzer Zeit viel für die Stadt machen“. Damit würde Heidelberg zum Vorreiter in Deutschland hinsichtlich der Planungsgeschwindigkeit. Gleichwohl soll die Bürgerbeteiligung nicht zu kurz kommen: „Ich stehe für einen Dialog auf Augenhöhe. Deshalb möchte ich alle Bürger*innen in den Planungsprozess einbeziehen“, kündigt der OB-Kandidat an."
    },
    {
      title:"OB-Kandidat Sören Michelsburg will Heidelberg näher an den Neckar rücken",
      description:"Während Amtsinhaber Würzner noch für den Neckarufertunnel wirbt, schlägt SPD-Stadtrat Sören Michelsburg als Alternative die Sperrung der B37 an Sommerwochenenden vor // Michelsburg: „So verbessern wir die Aufenthaltsqualität schneller und ohne teure Baumaßnahmen“",
      text: "Am letzten Wochenende flanierten zwei Tage lang tausende Menschen auf der Neckarpromenande und genossen das autofreie Altstadtufer. Geht es nach OB Eckart Würzner, soll das bald das ganze Jahr über möglich sein. Bei einer Wahlkampfveranstaltung warb der Amtsinhaber für den Bau eines Neckarufertunnels, der den Verkehr von der B37 unter die Erde verlagern soll. Ganz neu ist diese Idee nicht. Bereits im Wahlkampf 2009 schrieb sich Würzner das Projekt Neckarufertunnel auf die Fahne. Doch schon damals scheiterte das Projekt an den hohen Kosten, die mit rund 180 Millionen Euro beziffert wurden und an denen sich das Land nicht beteiligen wollte. Auch OB-Kandidat Sören Michelsburg gefällt die Idee einer autofreien B37. Aus der Sicht von Michelsburg bedarf es dazu jedoch keiner aufwendigen Baumaßnahmen: „Das letzte Wochenende hat es bewiesen: Eine Sperrung der Bundesstraße B37 stürzt Heidelberg nicht ins Verkehrschaos“, erklärt Michelsburg. Deshalb schlägt der SPD-Stadtrat zur Verbesserung der Aufenthaltsqualität am Neckar eine Sperrung der B37 an Sommerwochenenden vor. „Das Geld für den Neckarufertunnel können wir uns sparen“, meint Michelsburg und verweist auf zahlreiche Projekte, die er lieber umgesetzt sehen würde. So haben für den OB-Kandidaten der Ausbau der Radwege und barrierefreie Gehwege Priorität. „In den letzten Jahren ist in Heidelberg oft die Kür vor der Pflicht gekommen“, analysiert Michelsburg. Das scheinen auch viele Heidelberger Bürger*innen so zu sehen. Schließlich scheiterten die letzten drei Großprojekte von OB Würzner (Ausbau der Stadthalle zum Kongresszentrum, Verlegung des Betriebshofs, Ankunftszentrum in den Wolfsgärten) allesamt an Bürgereintscheiden. Einen solchen hatte Würzner im Jahr 2011 auch in Bezug auf den Neckarufertunnel gefordert. Wie eine solche Abstimmung wohl ausgehen würde? Den Vorschlag, die Geschwindigkeit auf der B37 dauerhaft zu begrenzen, lehnt Michelsburg ab, da sich dadurch keine Verbesserung der Situation ergibt. „Bereits jetzt kann die B37 nur langsam befahren werden.  Und trotzdem haben wir mit Lärm und Abgasen zu kämpfen. Hier können wir mehr ermöglichen.“, stellt der OB-Kandidat fest."
    },
    {
      title:"OB-Kandidat Sören Michelsburg fordert Personaloffensive im Klimasektor",
      description:"OB-Kandidat Sören Michelsburg will Heidelberg bis 2030 klimaneutral machen // Fachkräftemangel gefährdet Klimaziel // Michelsburg: „Wir brauchen eine Personaloffensive im Klimasektor“ // ",
      text: "Heidelberg - Bis 2030 möchte Heidelberg klimaneutral werden. Zu diesem Ziel hat sich die Stadt mit ihrer Teilnahme am EU-Projekt „klimaneutrale und smarte Städte“ bekannt. OB-Kandidat Sören Michelsburg steht voll hinter dem ehrgeizigen Plan. Doch dem SPD-Stadtrat ist klar: „Ohne Fachkräfte erreichen wir unser Klimaziel nicht.“ Schon jetzt bringt der Fachkräftemangel im Handwerk den Ausbau der erneuerbaren Energien und die energetische Sanierung von Gebäuden ins Stocken.  Deshalb fordert Michelsburg eine Personaloffensive im Klimasektor: „Wir müssen junge Menschen wieder für Berufe im Bereich der Anlagenmechanik, Heizungsinstallation und Gebäudedämmung begeistern“, erläutert der OB-Kandidat. Dazu möchte Michelsburg in weiterführenden Schulen im Rahmen von Praktika und Berufsorientierungstagen über Jobs im Klimasektor informieren. Auszubildende möchte Michelsburg bei der Wohnungssuche zu unterstützen. Einen guten Ansatz böten Ausbildungshäuser. Das erste dieser Art wurde auf Betreiben der SPD-Fraktion bereits 2016 auf den Konversionsflächen in Mark-Twain-Village eingerichtet. Nun möchte Michelsburg die Initiative auf weitere Stadteile wie z.B. Patrick-Henry-Village ausweiten. Zusätzlich setzt der SPD-Stadtrat auf Fachkräfte aus dem Ausland. Die Rahmenbedingungen zu deren Anwerbung hat der Bund mit dem neuen Fachkräfteeinwanderungsgesetz bereits verbessert. „Heidelberg konkurriert nun mit anderen Städten um Fachkräfte aus dem Ausland“, stellt Michelsburg fest. Der OB-Kandidat möchte diese Fachkräfte für Heidelberg gewinnen: „Heidelberg ist weltweit bekannt und ein Top-Reiseziel. Die Attraktivität unserer Stadt müssen wir gezielter nutzen, um Fachkräfte nach Heidelberg zu bringen und sie hier zu halten“."
    },
    {
      title:"OB-Kandidat Sören Michelsburg fordert: Verantwortungsvolle Stadtplanung statt Tiny Houses",
      description:"OB Eckart Würzner präsentiert Tiny House Projekt // 15-20 € Miete pro Quadratmeter für einen Wohnwagen ohne Sanitäranlagen  // Michelsburg: „Als OB möchte ich Wohnungsnot wirkungsvoll bekämpfen“",
      text: "Heidelberg - Am Dienstag präsentierte OB Eckart Würzner sein Tiny House Projekt. Die mobilen Wohnhäuser sollen zur Übergangsnutzung auf brachliegenden Bauflächen stehen und so den Wohnraummangel in Heidelberg eindämmen.  OB-Kandidat Sören Michelsburg glaubt nicht, dass dies gelingen kann: „Ein Wohnwagen ohne Toilette und Dusche. Das ist die Antwort des amtierenden Oberbürgermeisters auf die Frage nach dem Umgang mit Entwicklungsflächen in Heidelberg“. Neben dem hohen Mietpreis von 15-20 € pro Quadratmeter stört den SPD-Stadtrat vor allem die wenig vorausschauende Planung der Stadt:  „Wenn bekannt ist, dass ein Wohnheim abgerissen wird, dann muss die Planung für den Folgebau so laufen, dass nahtlos gebaut wird, anstatt Land brachliegend zu lassen und dort übergangsweise Wohnwagensiedlungen zu schaffen“, fordert Michelsburg. „Per se habe ich gegen vernünftig ausgestattete Tiny Houses nichts einzuwenden“, hebt Michelsburg hervor. Allerdings würde er diese vor allem zur Nachverdichtung einsetzen. Große Freiflächen möchte der SPD-Stadtrat lieber direkt entwickeln. Als Beispiel nennt er den Messplatz. „Wenn die GGH nördlich des Messplatzes bis 2026 einen Neubau mit 60 Wohnungen schafft, dann sollte die Planung aufgrund des Wohnraummangels auf den Messplatz erweitert werden“. So könnte dort statt weniger Wohnwägen eine Siedlung mit mehreren hundert Wohnungen entstehen. Und das zu einem Preis weit unter 15-20 € pro Quadratmeter. Als Oberbürgermeister möchte der SPD-Stadtrat Wohnraum schafft, der attraktiv und bezahlbar ist. Statt Tiny Houses möchte Michelsburg Leerstand und Zweckentfremdung bekämpfen und die Bedürfnisse von Familien beim Wohnungsbau berücksichtigen. „Aktuell verlassen vor allem Familien mit mehr als zwei Kindern Heidelberg. Diese Familien vermissen preiswerte Wohnungen mit mehreren Kinderzimmern statt einer großen Loggia“, erklärt Michelsburg. Damit junge Familien sich den Traum vom Eigenheim erfüllen können, ohne dass die Stadt Grundstücke aus der Hand gibt, setzt der OB-Kandidat auf Erbpacht. Außerdem möchte Michelsburg das städtische Vorkaufsrecht verstärkt nutzen, um mehr Grundstücke in städtische Hand zu bringen und in Neubaugebieten den Anteil preisgebundener Sozialwohnungen erhöhen."
    },
    {
      title: "OB-Kandidat Sören Michelsburg gegen Ausweitung der Maskenpflicht für Bewohner*innen von Pflegeeinrichtungen",
      description:"Maskenpflicht in Pflegeeinrichtungen verschärft // Wohlfahrtsverbände, Betreiber und Beschäftigte laufen Sturm // SPD-Stadtrat Sören Michelsburg solidarisiert sich mit Betroffenen //",
      text: "Heidelberg - Mit Inkrafttreten des neuen Corona-Infektionsschutzgesetzes müssen seit Anfang des Monats nicht nur Beschäftigte, sondern auch Bewohner*innen von Pflegeeinrichtungen in Gemeinschaftsräumen Masken tragen. Oft vereinen Pflegeeinrichtungen mehrere Hausgemeinschaften unter einem Dach. Innerhalb dieser Gemeinschaften greift die neue Regelung zwar nicht. Kommen allerdings Bewohner*innen verschiedener Hausgemeinschaften zu einer Veranstaltung zusammen, müssen sie nun einen Mund-Nase-Schutz tragen. Besonders hart trifft die Regel Pflegebedürftige in Tagespflegeeinrichtungen. Diese müssen ihre Maske gemäß der Gesetzesnovelle den ganzen Tag über tragen. Wohlfahrtsverbände, Beschäftigte und Betreiber*innen von Pflegeeinrichtungen kritisieren diese Neuregelung im Corona-Infektionsschutzgesetzt scharf. OB-Kandidat Sören Michelsburg solidarisiert sich mit den Betroffenen. „Ich stehe für eine Politik des Augenmaßes. Hier ist das Maß verloren gegangen“. Der SPD-Gemeinderat kann nachvollziehen, dass Beschäftigte in Pflegeeinrichtungen zum Schutz der Bewohner*innen Masken tragen müssen. Für die Bewohner*innen selbst sieht er in der neuen Regelung allerdings eine unzumutbare Härte, vor allem für Demenzkranke. „Ich kann mir nicht vorstellen, wie diese Vorschrift in der Praxis umgesetzt werden soll“, erklärt Michelsburg. "
    },
    
  ]
}*/